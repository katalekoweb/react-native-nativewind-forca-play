import AsyncStorage from "@react-native-async-storage/async-storage";

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

interface IMatch {
  id: string;
  mode: "classic";
  rounds: IRound[];
  currentRound: number;
  numberOfRounds: number;
  timeForEachRound: number;
  wordDifficulty: "normal" | "easy" | "hard";
  status: "ongoing" | "win" | "lose" | "draw";
}

export const StorageMatchService = {
  async getById(id: number): Promise<IMatch> {
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
  async updateRoundByMatchId(id: string, round: IRound) {
    
  }
};
