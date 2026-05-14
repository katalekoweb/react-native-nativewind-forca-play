import AsyncStorage from "@react-native-async-storage/async-storage";
import { GetNewWordToGuess } from "./GetNewWordToGuess";
import { StorageGuessedWords } from "./StorageGuessedWords";
import {addMinutes} from "date-fns"
import { StorageMatchHistoryService } from "./StorageMatchHistoryService";

// AsyncStorage.clear()
interface IRound {
  tip: string;
  round: number;
  startTime: number;
  endTime: number;
  secretWord: string;
  maskedWord: string[];
  wrongGuesses: string[];
  correctGuesses: string[];
  status: "playing" | "win" | "lose" | "setup";
}

export interface IMatch {
  id: string;
  mode: "classic";
  rounds: IRound[];
  currentRound: number;
  numberOfRounds: number;
  timeForEachRound: number;
  wordDifficulty: "medium" | "easy" | "hard";
  status: "ongoing" | "win" | "lose" | "draw";
}

export const StorageMatchService = {
  async getById(id: string): Promise<IMatch> {
    const match = await AsyncStorage.getItem(`Match${id}`).then(
      (matchesAsString) => {
        if (!matchesAsString) return null;

        const match = JSON.parse(matchesAsString);

        return match;
      },
    );

    return match;
  },
  async create(match: IMatch) {
    const matchesAsString = JSON.stringify(match);
    await AsyncStorage.setItem(`Match${match.id}`, matchesAsString);
  },
  async update(match: IMatch) {

    const current_match = await StorageMatchService.getById(match.id)
    if (!current_match) return 

    if (match.status === "ongoing") {
      const finalizedRounds  = match.rounds.filter(round => ['win', 'lose'].includes(round.status))

      if (match.numberOfRounds === finalizedRounds.length) {
        const newStatus = match.rounds.reduce((previous, current) => {
          if (current.status === 'lose') return previous - 1
          if (current.status === 'win') return previous + 1

          return previous
        }, 0)

        const newStatusName = newStatus === 0
          ? 'draw'
            : newStatus > 0
            ? 'win'
              : newStatus < 0
                ? 'lose' : 'ongoing'

        match.status = newStatusName;

        await StorageMatchHistoryService.updateById({
          id: match.id,
          mode: match.mode,
          status: match.status,
          numberOfRounds: match.numberOfRounds
        })
      }
    }

    const matchesAsString = JSON.stringify(match);
    await AsyncStorage.setItem(`Match${match.id}`, matchesAsString);
  },
  async addRoundByMatchId(id: string) : Promise<IRound> {
    const match = await StorageMatchService.getById(id)

    if (!match) throw new Error('Match not found')

    let wordToGuess = await GetNewWordToGuess.getWord(match.wordDifficulty)

    if (wordToGuess instanceof Error) {
      await StorageGuessedWords.update('')
      wordToGuess = await GetNewWordToGuess.getWord(match.wordDifficulty)

      if (wordToGuess instanceof Error) throw wordToGuess
    }

    const startTime = Date.now()
    const endTime = addMinutes(startTime, match.timeForEachRound).getTime()

    const newRound: IRound = {
      endTime,
      startTime,
      wrongGuesses: [],
      correctGuesses: [],
      status: 'playing',
      tip: wordToGuess.tip,
      secretWord: wordToGuess.word,
      round: match.rounds.length >= 1 ? match.rounds.length + 1 : 1,
      maskedWord: wordToGuess.word.split('').map((letter) => letter === '-' ? '-' : '_')
    }

    match.rounds.push(newRound)
    match.currentRound = match.rounds.length

    await StorageMatchService.update(match)
    await StorageGuessedWords.addWord(wordToGuess.word)

    return newRound
  },
  async guessALetterByMatchId(matchId: string, letter: string) {
    const match = await StorageMatchService.getById(matchId)

    if (!match) return 'match-not-found' as const
    if (match.status !== 'ongoing') return 'match-ended' as const

    console.log("Log 1");    

    const currentRound = match.rounds.find(round => round.round === match.currentRound)
      
    if (!currentRound) return 'round-not-found' as const

    if (currentRound.status !== 'playing') return 'round-ended' as const

    console.log("Log 2");    

    if (currentRound.endTime < Date.now()) {
      currentRound.status = 'lose'
      await StorageMatchService.update(match)

      console.log("Log 3. tempo expirado");    
      return 'round-time-expired' as const
    }

    if ([...currentRound.correctGuesses, currentRound.wrongGuesses].includes(letter)) {
      return 'letter-already-used' as const
    }

    const nomralizedSecretWord = currentRound.secretWord
      .split('')
      .map(letter => letter
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
      )

    const isCorrectGuess = nomralizedSecretWord.includes(letter)

    console.log("Log 4. correto");    

    if (!isCorrectGuess) {
      currentRound.wrongGuesses.push(letter)
    } else {
      currentRound.correctGuesses.push(letter)

      const originalWordAsArray = currentRound.secretWord.split('')

      currentRound.maskedWord = nomralizedSecretWord.map((letter, index) => {
        if (currentRound.correctGuesses.includes(letter)) return originalWordAsArray[index];
        return letter === '-' ? '-' : '_'
      })
    }

    if (currentRound.wrongGuesses.length >= 7) {
      currentRound.status = 'lose'
      await StorageMatchService.update(match)
      return 'round-ended' as const
    } else if (!currentRound.maskedWord.includes('_')) {
      currentRound.status = 'win'
      await StorageMatchService.update(match)
      return 'round-ended' as const
    } else {
      await StorageMatchService.update(match)
      return currentRound
    }

  }
};
