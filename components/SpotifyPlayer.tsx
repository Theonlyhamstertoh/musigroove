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
    BackwardTenIcon,
    ForwardFiveIcon,
    ForwardTenIcon,
    PauseTrackIcon,
    PlayTrackIcon,
    SkipTrackIcon,
    SpotifyIcon,
} from "./Icons";
import { Slider } from "./ui/slider";
import { formatTime } from "@/lib/utils";
import { Progress } from "./ui/progress";
import { getRandomValues } from "crypto";

export const SpotifyPlayer = ({
    start,
    jumpTo,
    playMode,
    end,
    elapsed,
    seekTo,
    handlePlayMode,
}: any) => {
    const [scrub, setScrub] = useState(false);
    return (
        <Card
            className="max-w-sm min-w-fit self-start"
            onTouchStart={() => setScrub(true)}
            onMouseOver={() => setScrub(true)}
            onTouchEnd={() => setScrub(false)}
            onMouseOut={() => setScrub(false)}
        >
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
                            <SpotifyIcon className="mr-2 h-4 w-4" /> Open Youtube
                        </Button>
                    </div>
                </div>

                <div className="mt-9 h-6 space-y-2">
                    {scrub && (
                        <Slider
                            className="h-2 cursor-grab"
                            defaultValue={[elapsed]}
                            max={end}
                            step={1}
                            // ref={sliderRef}
                            // key={crypto.randomUUID()}
                            onValueChange={(value: number[]) => jumpTo(value[0])}
                        />
                    )}
                    {!scrub && <Progress value={(elapsed / end) * 100} />}
                    <span className="float-left text-muted-foreground text-sm">
                        {formatTime(elapsed)}
                    </span>
                    <span className="float-right text-muted-foreground text-sm ">
                        {formatTime(end)}
                    </span>
                </div>

                <div className="flex mt-8 items-center justify-center">
                    <Button
                        onClick={() => seekTo(-10)}
                        variant={"ghost"}
                        size={"icon"}
                        className="w-12 shrink-0 h-12"
                    >
                        <BackwardTenIcon className=" stroke-slate-400" />
                    </Button>
                    <Button
                        onClick={() => seekTo(-5)}
                        variant={"ghost"}
                        size={"icon"}
                        className="w-12 h-12 shrink-0"
                    >
                        <BackwardFiveIcon className="stroke-slate-400 " />
                    </Button>
                    {/* <Button variant={"ghost"} size={"icon"} className="w-12 h-12">
                        <SkipTrackIcon className="rotate-180 fill-slate-500 dark:fill-slate-50" />
                    </Button> */}
                    <Button
                        onClick={handlePlayMode}
                        variant={"ghost"}
                        size={"icon"}
                        className="w-16 h-16"
                    >
                        {playMode && <PauseTrackIcon className="w-14 h-14 fill-primary" />}
                        {!playMode && <PlayTrackIcon className="w-14 h-14 fill-primary" />}
                    </Button>
                    <Button
                        onClick={() => seekTo(5)}
                        variant={"ghost"}
                        size={"icon"}
                        className="w-12 shrink-0 h-12"
                    >
                        <ForwardFiveIcon className=" stroke-slate-400" />
                    </Button>
                    <Button
                        onClick={() => seekTo(10)}
                        variant={"ghost"}
                        size={"icon"}
                        className="w-12 shrink-0 h-12"
                    >
                        <ForwardTenIcon className=" stroke-slate-400" />
                    </Button>
                    {/* <Button variant={"ghost"} size={"icon"} className="w-12 h-12">
                        <SkipTrackIcon className="fill-slate-500 dark:fill-slate-50" />
                    </Button> */}
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
