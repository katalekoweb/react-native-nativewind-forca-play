import AsyncStorage from '@react-native-async-storage/async-storage';


export const StorageGuessedWords = {
  async getWords(): Promise<string> {
    const words = await AsyncStorage
      .getItem('GuessedWords')
      .then((wordsAsString) => {
        if (!wordsAsString) return '';
        return wordsAsString;
      });

    return words;
  },
  async update(words: string) {
    await AsyncStorage.setItem('GuessedWords', words);
  },
  async addWord(word: string) {
    let words = await StorageGuessedWords.getWords();
    if (!words.includes(word)) {
      words += `${word},`
      await StorageGuessedWords.update(words)
    }
  }
};