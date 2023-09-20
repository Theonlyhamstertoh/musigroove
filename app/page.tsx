"use client";

import { SpotifyIcon } from "@/components/Icons";
import { ModeToggle } from "@/components/ModeToggle";
import { SpotifyPlayer } from "@/components/SpotifyPlayer";
import { SpotifyProfile } from "@/components/SpotifyProfile";
import { StampCard } from "@/components/StampCard";
import { Button } from "@/components/ui/button";
import Youtube, { YouTubeProps } from "react-youtube";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import useSpotify from "@/hooks/useSpotify";
import { useSpotifyStore } from "@/hooks/useStore";
import { SpotifySDK } from "@/types/types";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Scopes, SpotifyApi } from "@spotify/web-api-ts-sdk";
import { LegacyRef, use, useEffect, useRef, useState } from "react";
import { Options, YouTubePlayer } from "youtube-player/dist/types";
// youtube('v3').
// export default function Home() {
//     // const sdk = useSpotify(
//     //     process.env.NEXT_PUBLIC_SPOTIFY_ID!,
//     //     process.env.NEXT_PUBLIC_REDIRECT_TARGET!,
//     //     Scopes.all
//     // );

//     const [sdk, setSDK, isPremiumAccount] = useSpotifyStore((state) => [
//         state.sdk,
//         state.setSDK,
//         state.isPremiumAccount,
//     ]);

//     if (sdk && isPremiumAccount === false) {
//         return (
//             <div className="w-full h-full flex items-center justify-center">
//                 Sorry, you need Spotify Preimum to use Musigroove
//                 <Logout sdk={sdk!} />
//             </div>
//         );
//     }

//     if (sdk && isPremiumAccount) {
//         return (
//             <div className="p-2 ">
//                 <div className="bg-secondary w-full text-center  text-primary p-2 rounded-lg">
//                     In Development
//                 </div>
//                 <Button
//                     onClick={async () => {
//                         console.log(await sdk.player.getCurrentlyPlayingTrack());
//                         const devices = await sdk.player.getAvailableDevices();

//                         await sdk.player.seekToPosition(10000, devices.devices[0].id!);

//                         //         setDeviceId(devices.devices);
//                     }}
//                 >
//                     Sign In
//                 </Button>
//                 <div className="mx-auto flex  justify-end">
//                     <ModeToggle />
//                 </div>
//                 <div className="flex gap-8 p-4">
//                     <SpotifyPlayer />
//                     <StampCard />
//                     {/* <SpotifyProfile sdk={sdk} /> */}

//                     {/* <SpotifyProfile sdk={sdk} /> */}
//                     <Logout sdk={sdk} />
//                 </div>
//             </div>
//         );
//     }
//     return (
//         <div className="flex justify-center items-center h-full">
//             <Card className="">
//                 <CardHeader>
//                     <CardTitle>Login</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                     <Button
//                         onClick={async () => {
//                             if ((await setSDK()) === false) {
//                                 toast({
//                                     variant: "destructive",
//                                     title: "Uh oh! Something went wrong.",
//                                     description: "There was a problem with your request.",
//                                 });
//                             }
//                         }}
//                         variant="secondary"
//                     >
//                         <SpotifyIcon className="mr-2" /> Sign in to Spotify
//                     </Button>
//                 </CardContent>
//             </Card>
//         </div>
//     );
// }

const YoutubePlayer = ({ videoId }: Options) => {
    const [player, setPlayer] = useState<null | YouTubePlayer>(null);
    const [controls, setControls] = useState(false);
    const [end, setEnd] = useState<number | null>(null);
    const [start, setStart] = useState(0);
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
        // event.target.pauseVideo();
        const target: YouTubePlayer = event.target;
        setPlayer(target);
        setEnd(await target.getDuration());
    };

    useEffect(() => {
        if (!player) return;
        (async () => {
            // setEnd(await player.getDuration());
        })();
    }, [playMode]);
    const opts: YouTubeProps["opts"] = {
        height: "390",
        width: "640",
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
            loop: 1,
            // controls: 0,
        },
    };

    useEffect(() => {
        if (!player || !playMode) return;
        const interval = setInterval(async () => {
            const elapsed_sec = await player.getCurrentTime(); // this is a promise. dont forget to await

            setElapsed(elapsed_sec);
        }, 200); // 100 ms refresh. increase it if you don't require millisecond precision

        return () => {
            clearInterval(interval);
        };
    }, [player, playMode]);

    useEffect(() => console.log(end), [end]);

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

    return (
        <>
            <Youtube
                className="opacity-0 absolute left-96 "
                videoId={videoId}
                opts={opts}
                onReady={onPlayerReady}
            />
            <SpotifyPlayer
                start={start}
                elapsed={elapsed}
                jumpTo={jumpTo}
                end={end}
                playMode={playMode}
                seekTo={seekTo}
                handlePlayMode={handlePlayMode}
            />
        </>
    );
};

export default function Home() {
    return (
        <div className="p-2 ">
            <div className="mx-auto flex  justify-end">
                <ModeToggle />
            </div>
            <div className="flex gap-8 p-4">
                {/* <SpotifyPlayer /> */}
                <YoutubePlayer videoId="G1Pv-ceq4NE" />
                {/* <StampCard /> */}

                {/* https://youtu.be/f93Oc67LDe0?si=FE3vphcg4AiPCVnI */}

                {/* <SpotifyProfile sdk={sdk} /> */}

                {/* <SpotifyProfile sdk={sdk} /> */}
                {/* <Logout sdk={sdk} /> */}
            </div>
        </div>
    );
}

const Logout = ({ sdk }: SpotifySDK) => {
    // useEffect(() => {
    //     (async () => {
    //         console.log(await sdk.player.getCurrentlyPlayingTrack());
    //     })();
    // }, [sdk]);

    return (
        <>
            <button onClick={() => sdk.logOut()}>logout</button>;
        </>
    );
};
