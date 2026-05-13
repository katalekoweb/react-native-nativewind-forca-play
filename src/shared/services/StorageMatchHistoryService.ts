import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Crypto from "expo-crypto";

export interface IMatchHistory {
  id: string;
  mode: "classic";
  status: "ongoing" | "lose" | "win" | "draw";
  numberOfRounds: number;
}

export const StorageMatchHistoryService = {
  async getAll(): Promise<IMatchHistory[]> {
    const matches = await AsyncStorage.getItem("MatchHistory").then(
      (matchesAsString) => {
        if (!matchesAsString) return null;

        const matches = JSON.parse(matchesAsString);

        return matches;
      },
    );

    return matches;
  },
  async create(match: Omit<IMatchHistory, "id">) : Promise<string> {
    const matchToInsert = {
      ...match,
      id: Crypto.randomUUID(),
    };

    const matches = await StorageMatchHistoryService.getAll() ?? [];

    const matchesOnGoing = matches?.filter(match => match.status === 'ongoing') ?? []

    if (matchesOnGoing.length > 0) throw new Error("Match ongoing limit archived")

    matches.unshift(matchToInsert);

    const matchesAsString = JSON.stringify(matches);

    await AsyncStorage.setItem("MatchHistory", matchesAsString);

    return matchToInsert.id
  },
  async updateById(match: IMatchHistory) {
    let matches = await StorageMatchHistoryService.getAll();
    
    matches = matches.map(item => {
        if (item.id === match.id) return match
        return item
    });

    const matchesAsString = JSON.stringify(matches);

    await AsyncStorage.setItem("MatchHistory", matchesAsString);
  },
};
