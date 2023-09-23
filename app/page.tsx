"use client";

import { SpotifyIcon } from "@/components/Icons";
import { ModeToggle } from "@/components/ModeToggle";

import { YoutubePlayer } from "@/components/YoutubePlayer";

export default function Home() {
    return (
        <div className="p-2 ">
            <div className="mx-auto flex items-center pl-4  justify-between">
                <h1 className="font-bold">Musigroove</h1>
                <ModeToggle />
            </div>
            <div className="flex gap-8 p-4">
                {/* <SpotifyPlayer /> */}
                <YoutubePlayer videoId="G1Pv-ceq4NE" />
            </div>
        </div>
    );
}
