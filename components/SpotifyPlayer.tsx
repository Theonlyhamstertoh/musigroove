"use client";

import { SpotifySDK } from "@/types/types";
import { Device, PlaybackState } from "@spotify/web-api-ts-sdk";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
export const SpotifyPlayer = ({ sdk }: SpotifySDK) => {
    const [deviceId, setDeviceId] = useState<Device[]>([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playback, setPlayback] = useState<PlaybackState>();
    // const [playingType, ]
    const getActiveDevice = async () => {
        const devices = await sdk.player.getAvailableDevices();
        if (devices.devices.length === 0) return [];

        setDeviceId(devices.devices);
        return devices.devices;
    };

    const getPlaybackState = async () => {
        const playback: PlaybackState = await sdk.player.getPlaybackState();
        if (playback === null) return null;
    };
    useEffect(() => {
        (async () => {
            getActiveDevice();

            const user: PlaybackState = await sdk.player.getCurrentlyPlayingTrack();
            console.log(user);
            // setInterval(async () => {
            //     const track = await sdk.player.getCurrentlyPlayingTrack();
            //     console.log((track.progress_ms / 1000).toFixed(0), "seconds");
            // }, 970);
            // console.log(sdk.player.)
        })();
    }, [sdk]);

    // const playNext = async () => {
    //     // if(deviceId[])
    //     await sdk.player.skipToNext(deviceId[0]);
    // };
    // const playPrev = async () => {
    //     // if(deviceId[])
    //     await sdk.player.skipToPrevious(deviceId[0]);
    // };
    return (
        <div>
            {/* <button onClick={playPrev}>Prev</button> */}
            {/* <button onClick={playNext}>Next</button> */}
        </div>
    );
};
