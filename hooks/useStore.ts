import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { create } from "zustand";

interface StampState {
    timestamps: Timestamp[];
    addStamp: (stamp: Timestamp) => void;
    removeStamp: (id: string) => void;
    editStamp: (id: string, time: number, label: string) => void;
    findStamp: (id: string) => void;
}

interface Timestamp {
    time: number;
    id: string;
    label?: string;
}

interface SpotifyState {
    sdk: SpotifyApi | null;
}
export const useSpotifyStore = create<SpotifyState>()((set, get) => ({
    sdk: null,
    // setSDK:
}));
export const useStampStore = create<StampState>()((set, get) => ({
    timestamps: [],
    addStamp: (stamp) => set((state) => ({ timestamps: [...state.timestamps, stamp] })),
    removeStamp: (id) => {
        set((state) => {
            const filteredStamps = state.timestamps.filter((stamp) => stamp.id !== id);

            return { timestamps: filteredStamps };
        });
    },

    editStamp: (id, time, label) => {
        set((state) => {
            const filteredStamps: Timestamp[] = state.timestamps.map((stamp) => {
                if (stamp.id === id) {
                    return {
                        id,
                        time,
                        label,
                    };
                }
                return stamp;
            });

            return { timestamps: filteredStamps };
        });
    },
    findStamp: (id) => get().timestamps.find((stamp) => stamp.id === id),
}));
