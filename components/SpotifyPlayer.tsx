"use client";

import { SpotifySDK } from "@/types/types";
import { Device, PlaybackState } from "@spotify/web-api-ts-sdk";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import {
    BackwardFiveIcon,
    ForwardFiveIcon,
    PlayTrackIcon,
    SkipTrackIcon,
    SpotifyIcon,
} from "./Icons";
import { Slider } from "./ui/slider";

export const SpotifyPlayer = () => {
    return (
        <Card className="max-w-sm self-start">
            <CardHeader>
                <CardTitle className="">Music Player</CardTitle>
                {/* <CardDescription></CardDescription> */}
            </CardHeader>
            <CardContent>
                <div className="flex gap-6 ">
                    <Image
                        src="https://picsum.photos/100"
                        alt="Track Cover"
                        className="shrink-0 self-start"
                        width={100}
                        height={100}
                    />

                    <div className="">
                        <p className="text-lg font-medium leading-none">I Like Dat</p>
                        <p className="mt-2.5 text-sm text-muted-foreground">T-pain Kehlani</p>
                        <Button variant="secondary" className="mt-3">
                            <SpotifyIcon className="mr-2 h-4 w-4" /> Open Spotify
                        </Button>
                    </div>
                </div>

                <div className="mt-9 space-y-2">
                    <Slider className="" defaultValue={[33]} max={100} step={1} />
                    <span className="float-left text-muted-foreground text-sm">1:20</span>
                    <span className="float-right text-muted-foreground text-sm ">3:34</span>
                </div>

                <div className="flex mt-8 items-center justify-center">
                    <Button variant={"ghost"} size={"icon"} className="w-12 h-12 shrink-0 mr-8 ">
                        <BackwardFiveIcon className="fill-slate-400 " />
                    </Button>
                    <Button variant={"ghost"} size={"icon"} className="w-12 h-12">
                        <SkipTrackIcon className="rotate-180 fill-slate-500 dark:fill-slate-50" />
                    </Button>
                    <Button variant={"ghost"} size={"icon"} className="w-16 h-16">
                        <PlayTrackIcon className="w-14 h-14" />
                    </Button>
                    <Button variant={"ghost"} size={"icon"} className="w-12 h-12">
                        <SkipTrackIcon className="fill-slate-500 dark:fill-slate-50" />
                    </Button>

                    <Button variant={"ghost"} size={"icon"} className="w-12 shrink-0 h-12 ml-8">
                        <ForwardFiveIcon className=" fill-slate-400" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

// export const SpotifyPlayer = ({ sdk }: SpotifySDK) => {
//     const [deviceId, setDeviceId] = useState<Device[]>([]);
//     const [isPlaying, setIsPlaying] = useState(false);
//     const [playback, setPlayback] = useState<PlaybackState>();
//     // const [playingType, ]
//     const getActiveDevice = async () => {
//         const devices = await sdk.player.getAvailableDevices();
//         if (devices.devices.length === 0) return [];

//         setDeviceId(devices.devices);
//         return devices.devices;
//     };

//     const getPlaybackState = async () => {
//         const playback: PlaybackState = await sdk.player.getPlaybackState();
//         if (playback === null) return null;
//     };
//     useEffect(() => {
//         (async () => {
//             getActiveDevice();

//             const user: PlaybackState = await sdk.player.getCurrentlyPlayingTrack();
//             console.log(user);
//             // setInterval(async () => {
//             //     const track = await sdk.player.getCurrentlyPlayingTrack();
//             //     console.log((track.progress_ms / 1000).toFixed(0), "seconds");
//             // }, 970);
//             // console.log(sdk.player.)
//         })();
//     }, [sdk]);

//     const playNext = async () => {
//         // if(deviceId[])
//         console.log(deviceId);
//         await sdk.player.skipToNext(deviceId[0].id);
//     };
//     const playPrev = async () => {
//         // if(deviceId[])
//         await sdk.player.skipToPrevious(deviceId[0].id);
//     };
//     return (
//         <div>
//             <button onClick={playPrev}>Prev</button>
//             <button onClick={playNext}>Next</button>
//         </div>
//     );
// };
