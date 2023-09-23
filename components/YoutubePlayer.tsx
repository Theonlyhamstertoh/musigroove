"use client";

import { SpotifyIcon } from "@/components/Icons";
import { ModeToggle } from "@/components/ModeToggle";
import { SpotifyProfile } from "@/components/SpotifyProfile";
import { StampCard } from "@/components/StampCard";
import { Button } from "@/components/ui/button";
import Youtube, { YouTubeProps } from "react-youtube";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import useSpotify from "@/hooks/useSpotify";
import { useSpotifyStore, useYoutubeStore } from "@/hooks/useStore";
import { SpotifySDK } from "@/types/types";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Scopes, SpotifyApi } from "@spotify/web-api-ts-sdk";
import { LegacyRef, use, useCallback, useEffect, useRef, useState } from "react";
import {
    BackwardFiveIcon,
    BackwardTenIcon,
    ForwardFiveIcon,
    ForwardTenIcon,
    PauseTrackIcon,
    PlayTrackIcon,
    SkipTrackIcon,
    YoutubeIcon,
} from "../components/Icons";
import { cn, formatTime } from "@/lib/utils";
import { Options, YouTubePlayer } from "youtube-player/dist/types";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import Marquee from "react-fast-marquee";
import youtube from "@googleapis/youtube";
import Link from "next/link";

export const YoutubePlayer = ({}: Options) => {
    const [setVideoId, videoId] = useYoutubeStore((state) => [state.setVideoId, state.videoId]);
    const [player, setPlayer] = useState<null | YouTubePlayer>(null);
    const [input, setInput] = useState("");
    const [end, setEnd] = useState<number | 0>(0);
    const [playerReady, setPlayerReady] = useState(false);
    const [start, setStart] = useState(0);
    const [scrub, setScrub] = useState(false);
    const [playMode, setPlayMode] = useState(false);
    const [elapsed, setElapsed] = useState<number>(0);

    const handlePlayMode = () => {
        if (!player) return;
        if (playMode) {
            player.pauseVideo();
        } else {
            player.playVideo();
        }
        setPlayMode(!playMode);
    };

    const onPlayerReady: YouTubeProps["onReady"] = async (event) => {
        // access to player in all event handlers via event.target
        const target: YouTubePlayer = event.target;
        setPlayer(target);
        target.getOption;
        setEnd(await target.getDuration());
    };

    const opts: YouTubeProps["opts"] = {
        height: "128",
        width: "128",
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
            loop: 1,
            controls: 0,
        },
    };

    useEffect(() => {
        if (!player || !playMode) return;
        const interval = setInterval(async () => {
            const elapsed_sec = await player.getCurrentTime(); // this is a promise. dont forget to await

            setElapsed(elapsed_sec);
        }, 100);

        return () => {
            clearInterval(interval);
        };
    }, [player, playMode]);

    const getCurrentTime = async () => {
        if (!player) return 0;
        return await player.getCurrentTime();
    };
    const seekTo = async (timestamp: number) => {
        if (!player) return;
        const currentTime = await player.getCurrentTime();
        console.log(currentTime);
        player.seekTo(currentTime + timestamp, true);
        setElapsed(currentTime + timestamp);
    };
    const jumpTo = async (timestamp: number) => {
        if (!player) return;
        player.seekTo(timestamp, true);
        setElapsed(timestamp);
    };

    useEffect(() => {
        if (!player) return;
        player.loadVideoById(videoId);
    }, [videoId]);
    return (
        <div className="grid grid-cols-1 md:grid-cols-2  grid-flow-row gap-6  mx-auto md:max-w-[48rem]">
            <Card className="pt-6 max-w-sm md:w-full md:max-w-none md:col-span-2">
                <CardHeader>
                    <CardTitle>Welcome to Musigroove!</CardTitle>
                    <CardDescription>
                        This is an app made for dancers to easily add labeled timestamps to the
                        music they are performing for rehearsaling and practice. If you like to
                        tool, feel free to share it! To get started, paste in the youtube video you
                        like below:
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex gap-1">
                    <form
                        className="w-full flex flex-col md:flex-row gap-2"
                        onSubmit={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setVideoId(extractYouTubeVideoId(input));
                        }}
                    >
                        <Input
                            id="id"
                            onInput={({ currentTarget }) => setInput(currentTarget.value)}
                            placeholder="https://www.youtube.com/watch?v=G1Pv-ceq4NE"
                        />
                        <Button type="submit">Search</Button>
                    </form>
                </CardContent>
            </Card>

            <Card
                className="max-w-sm self-start"
                onPointerOver={() => setScrub(true)}
                onPointerOut={() => setScrub(false)}
            >
                <CardHeader>
                    <CardTitle className="">Music Player</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-6 ">
                        {!player && (
                            <Skeleton className=" h-32 w-32 flex justify-center items-center">
                                Loading
                            </Skeleton>
                        )}
                        <Youtube
                            className={cn(
                                "cursor-none select-none transition-opacity duration-300",
                                player ? "opacity-100" : "opacity-0 absolute"
                            )}
                            videoId={videoId}
                            opts={opts}
                            onReady={onPlayerReady}
                            // onStateChange={}
                            onPlay={() => setPlayMode(true)}
                            onPause={() => setPlayMode(false)}
                        />

                        <div className="">
                            <p className="text-lg font-medium leading-none">I Like Dat</p>
                            <p className="mt-2.5 text-sm text-muted-foreground">Kehlani, T-Pain</p>
                            <Button
                                variant="secondary"
                                className="mt-3 md:w-36 overflow-x-clip flex "
                                asChild
                            >
                                <Link
                                    href={`https://www.youtube.com/watch?v=${videoId}`}
                                    target="_blank"
                                >
                                    <YoutubeIcon className="mr-2 h-4 w-4 shrink-0" /> Open
                                </Link>
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
                                key={crypto.randomUUID()}
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
                    </div>
                </CardContent>
            </Card>

            <StampCard
                getCurrentTime={getCurrentTime}
                jumpTo={jumpTo}
                end={end}
                elapsed={elapsed}
            />
        </div>
    );
};

function extractYouTubeVideoId(url: string) {
    // Regular expression to match the 'v' parameter in YouTube URLs
    const regex = /[?&]v=([^?&]+)/;

    // Use the regex to find the video ID in the URL
    const match = url.match(regex);

    // If a match is found, return the video ID (the value after 'v')
    if (match && match[1]) {
        return match[1];
    } else {
        // Return null if no match is found
        return "";
    }
}
