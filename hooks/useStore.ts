import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { create } from "zustand";
import initializeSpotify from "./useSpotify";

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
    isPremiumAccount: boolean;
    setSDK: () => Promise<boolean>;
    setAccountType: (value: boolean) => void;
    resetSDK: () => void;
}

export const useSpotifyStore = create<SpotifyState>()((set, get) => ({
    sdk: null,
    isPremiumAccount: false,
    setAccountType: async (value) => set((state) => ({ isPremiumAccount: value })),
    setSDK: async () => {
        const sdk = await initializeSpotify();
        if (sdk) {
            const profile = await sdk.currentUser.profile();
            const isPremiumAccount = profile.product === "premium" ? true : false;
            set(() => ({ sdk: sdk, isPremiumAccount }));
        }
        return sdk ? true : false;
    },

    resetSDK: () => set(() => ({ sdk: null })),
}));

interface YoutubeState {
    videoId: string;
    setVideoId: (id: string) => void;
}

export const useYoutubeStore = create<YoutubeState>()((set, get) => ({
    videoId: "",
    setVideoId: (id) => set(() => ({ videoId: id })),
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
