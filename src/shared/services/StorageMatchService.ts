import AsyncStorage from "@react-native-async-storage/async-storage";
import { GetNewWordToGuess } from "./GetNewWordToGuess";
import { StorageGuessedWords } from "./StorageGuessedWords";

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
    const endTime = startTime // addMinutes(startTime, match.timeForEachRound).getTime()

    const newRound: IRound = {
      endTime,
      startTime,
      wrongGuesses: [],
      correctGuesses: [],
      status: 'playing',
      tip: wordToGuess.tip,
      secretWord: wordToGuess.word,
      round: match.rounds.length || 1,
      maskedWord: wordToGuess.word.split('').map(() => "_")
    }

    match.rounds.push(newRound)
    match.currentRound = match.rounds.length

    await StorageMatchService.update(match)

    return newRound
  }
};
