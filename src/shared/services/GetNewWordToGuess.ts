import easyWords from '../assets/classic-words/easy.json';
import normalWords from '../assets/classic-words/normal.json';
import hardWords from '../assets/classic-words/hard.json';
import { StorageGuessedWords } from './StorageGuessedWords';


interface IWord {
  tip: string;
  word: string;
}

export const GetNewWordToGuess = {
  async getWord(difficulty: 'easy' | 'medium' | 'hard'): Promise<IWord | Error> {
    const wordsGuessed = await StorageGuessedWords.getWords();

    const words = difficulty === 'easy'
      ? easyWords
      : difficulty === 'medium'
        ? normalWords
        : difficulty === 'hard'
          ? hardWords
          : [...easyWords, ...normalWords, ...hardWords];


    for (const word of words) {
      if (wordsGuessed.includes(word.word)) continue;
      return word;
    }

    for (const word of [...easyWords, ...normalWords, ...hardWords]) {
      if (wordsGuessed.includes(word.word)) continue;
      return word;
    }


    return new Error("Limit of classic words achieved");
  }
};