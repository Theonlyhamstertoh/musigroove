"use client";
import { EditorPopover } from "@/components/EditorPopover";
import {
    BackwardFiveIcon,
    ForwardFiveIcon,
    PlayTrackIcon,
    SkipTrackIcon,
    SpotifyIcon,
} from "@/components/Icons";
import { ModeToggle } from "@/components/ModeToggle";
import { SpotifyPlayer } from "@/components/SpotifyPlayer";
import { SpotifyProfile } from "@/components/SpotifyProfile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import useSpotify from "@/hooks/useSpotify";
import { SpotifySDK } from "@/types/types";

import {
    CountdownTimerIcon,
    Cross1Icon,
    Cross2Icon,
    CrossCircledIcon,
    Crosshair1Icon,
    DotsVerticalIcon,
    ExitIcon,
    LapTimerIcon,
    LoopIcon,
    PlayIcon,
    PlusIcon,
    StopIcon,
    SunIcon,
    TimerIcon,
} from "@radix-ui/react-icons";
import { Scopes } from "@spotify/web-api-ts-sdk";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Home() {
    const sdk = useSpotify(
        process.env.NEXT_PUBLIC_SPOTIFY_ID!,
        process.env.NEXT_PUBLIC_REDIRECT_TARGET!,
        Scopes.all
    );

    if (sdk) {
        return (
            <div className="p-2 ">
                <div className="mx-auto flex  justify-end">
                    <ModeToggle />
                </div>
                <div className="flex gap-8 p-4">
                    <SpotifyPlayer />
                    <StampCard />
                    <SpotifyProfile sdk={sdk} />

                    {/* <SpotifyProfile sdk={sdk} /> */}
                    {/* <Logout sdk={sdk} /> */}
                </div>
            </div>
        );
    }
    return <></>;
}

const StampCard = () => {
    return (
        <Card className="max-w-sm">
            <CardHeader className="">
                <CardTitle className="h-4 flex justify-between items-center">
                    Stamps
                    <EditorPopover />
                </CardTitle>
            </CardHeader>
            <CardContent className="flex max-h-[28rem] gap-3  flex-wrap overflow-scroll ">
                <Stamp time={"0:00"} label={"Starting"} />
                <Stamp time={"0:30"} label={"asfasfs"} />
                <Stamp time={"0:30"} label={"asfasfs"} />
                <Stamp time={"0:30"} label={"asfasfs"} />
                <Stamp time={"0:30"} label={"asfasfs"} />
                <Stamp time={"0:30"} label={"asfasfs"} />
                <Stamp time={"0:56"} />
                <Stamp time={"1:10"} />
                <Stamp time={"1:10"} />
                <Stamp time={"1:10"} />
                <Stamp time={"1:54"} />
            </CardContent>
        </Card>
    );
};

const Stamp = ({ time, label }: { time: string; label?: string }) => {
    return (
        <div className="p-2 w-full border-secondary flex items-center gap-4 border shadow-sm rounded-md">
            <Button className="sm:w-24 w-20 text-xs">
                <TimerIcon className="w-4 h-4 mr-2" /> {time}
            </Button>
            <span className=" text-muted">|</span>
            <span className="text-xs sm:text-sm font-light text-muted-foreground"> {label}</span>
            <div className="ml-auto">
                <StampOptionToggle />
            </div>
        </div>
    );
};

// const StampEditor = () => {
//     return (

//     )
// }

export function StampOptionToggle({}) {
    // const { setTheme } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="" size="icon">
                    <DotsVerticalIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => console.log("edit")}>Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={() => console.log("delete")}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

const Logout = ({ sdk }: SpotifySDK) => {
    // useEffect(() => {
    //     (async () => {
    //         sdk.logOut();
    //     })();
    // }, [sdk]);

    return (
        <>
            <button onClick={() => sdk.logOut()}>logout</button>;
        </>
    );
};

/**
 * 
 * {
    "timestamp": 1694997808752,
    "context": {
        "external_urls": {
            "spotify": "https://open.spotify.com/collection/tracks"
        },
        "href": "https://api.spotify.com/v1/me/tracks",
        "type": "collection",
        "uri": "spotify:user:eswggww5eu0qes3rs778hsrxj:collection"
    },
    "progress_ms": 108104,
    "item": {
        "album": {
            "album_type": "album",
            "artists": [
                {
                    "external_urls": {
                        "spotify": "https://open.spotify.com/artist/4AK6F7OLvEQ5QYCBNiQWHq"
                    },
                    "href": "https://api.spotify.com/v1/artists/4AK6F7OLvEQ5QYCBNiQWHq",
                    "id": "4AK6F7OLvEQ5QYCBNiQWHq",
                    "name": "One Direction",
                    "type": "artist",
                    "uri": "spotify:artist:4AK6F7OLvEQ5QYCBNiQWHq"
                }
            ],
            "available_markets": [
                "AR",
                "AU",
                "AT",
                "BE",
                "BO",
                "BR",
                "BG",
                "CA",
                "CL",
                "CO",
                "CR",
                "CY",
                "CZ",
                "DK",
                "DO",
                "DE",
                "EC",
                "EE",
                "SV",
                "FI",
                "FR",
                "GR",
                "GT",
                "HN",
                "HK",
                "HU",
                "IS",
                "IE",
                "IT",
                "LV",
                "LT",
                "LU",
                "MY",
                "MT",
                "MX",
                "NL",
                "NZ",
                "NI",
                "NO",
                "PA",
                "PY",
                "PE",
                "PH",
                "PL",
                "PT",
                "SG",
                "SK",
                "ES",
                "SE",
                "CH",
                "TW",
                "TR",
                "UY",
                "US",
                "GB",
                "AD",
                "LI",
                "MC",
                "ID",
                "JP",
                "TH",
                "VN",
                "RO",
                "IL",
                "ZA",
                "SA",
                "AE",
                "BH",
                "QA",
                "OM",
                "KW",
                "EG",
                "MA",
                "DZ",
                "TN",
                "LB",
                "JO",
                "PS",
                "IN",
                "BY",
                "KZ",
                "MD",
                "UA",
                "AL",
                "BA",
                "HR",
                "ME",
                "MK",
                "RS",
                "SI",
                "KR",
                "BD",
                "PK",
                "LK",
                "GH",
                "KE",
                "NG",
                "TZ",
                "UG",
                "AG",
                "AM",
                "BS",
                "BB",
                "BZ",
                "BT",
                "BW",
                "BF",
                "CV",
                "CW",
                "DM",
                "FJ",
                "GM",
                "GE",
                "GD",
                "GW",
                "GY",
                "HT",
                "JM",
                "KI",
                "LS",
                "LR",
                "MW",
                "MV",
                "ML",
                "MH",
                "FM",
                "NA",
                "NR",
                "NE",
                "PW",
                "PG",
                "WS",
                "SM",
                "ST",
                "SN",
                "SC",
                "SL",
                "SB",
                "KN",
                "LC",
                "VC",
                "SR",
                "TL",
                "TO",
                "TT",
                "TV",
                "VU",
                "AZ",
                "BN",
                "BI",
                "KH",
                "CM",
                "TD",
                "KM",
                "GQ",
                "SZ",
                "GA",
                "GN",
                "KG",
                "LA",
                "MO",
                "MR",
                "MN",
                "NP",
                "RW",
                "TG",
                "UZ",
                "ZW",
                "BJ",
                "MG",
                "MU",
                "MZ",
                "AO",
                "CI",
                "DJ",
                "ZM",
                "CD",
                "CG",
                "IQ",
                "LY",
                "TJ",
                "VE",
                "ET",
                "XK"
            ],
            "external_urls": {
                "spotify": "https://open.spotify.com/album/4gCNyS7pidfK3rKWhB3JOY"
            },
            "href": "https://api.spotify.com/v1/albums/4gCNyS7pidfK3rKWhB3JOY",
            "id": "4gCNyS7pidfK3rKWhB3JOY",
            "images": [
                {
                    "height": 640,
                    "url": "https://i.scdn.co/image/ab67616d0000b273d304ba2d71de306812eebaf4",
                    "width": 640
                },
                {
                    "height": 300,
                    "url": "https://i.scdn.co/image/ab67616d00001e02d304ba2d71de306812eebaf4",
                    "width": 300
                },
                {
                    "height": 64,
                    "url": "https://i.scdn.co/image/ab67616d00004851d304ba2d71de306812eebaf4",
                    "width": 64
                }
            ],
            "name": "FOUR (Deluxe)",
            "release_date": "2014-11-17",
            "release_date_precision": "day",
            "total_tracks": 16,
            "type": "album",
            "uri": "spotify:album:4gCNyS7pidfK3rKWhB3JOY"
        },
        "artists": [
            {
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/4AK6F7OLvEQ5QYCBNiQWHq"
                },
                "href": "https://api.spotify.com/v1/artists/4AK6F7OLvEQ5QYCBNiQWHq",
                "id": "4AK6F7OLvEQ5QYCBNiQWHq",
                "name": "One Direction",
                "type": "artist",
                "uri": "spotify:artist:4AK6F7OLvEQ5QYCBNiQWHq"
            }
        ],
        "available_markets": [
            "AR",
            "AU",
            "AT",
            "BE",
            "BO",
            "BR",
            "BG",
            "CA",
            "CL",
            "CO",
            "CR",
            "CY",
            "CZ",
            "DK",
            "DO",
            "DE",
            "EC",
            "EE",
            "SV",
            "FI",
            "FR",
            "GR",
            "GT",
            "HN",
            "HK",
            "HU",
            "IS",
            "IE",
            "IT",
            "LV",
            "LT",
            "LU",
            "MY",
            "MT",
            "MX",
            "NL",
            "NZ",
            "NI",
            "NO",
            "PA",
            "PY",
            "PE",
            "PH",
            "PL",
            "PT",
            "SG",
            "SK",
            "ES",
            "SE",
            "CH",
            "TW",
            "TR",
            "UY",
            "US",
            "GB",
            "AD",
            "LI",
            "MC",
            "ID",
            "JP",
            "TH",
            "VN",
            "RO",
            "IL",
            "ZA",
            "SA",
            "AE",
            "BH",
            "QA",
            "OM",
            "KW",
            "EG",
            "MA",
            "DZ",
            "TN",
            "LB",
            "JO",
            "PS",
            "IN",
            "BY",
            "KZ",
            "MD",
            "UA",
            "AL",
            "BA",
            "HR",
            "ME",
            "MK",
            "RS",
            "SI",
            "KR",
            "BD",
            "PK",
            "LK",
            "GH",
            "KE",
            "NG",
            "TZ",
            "UG",
            "AG",
            "AM",
            "BS",
            "BB",
            "BZ",
            "BT",
            "BW",
            "BF",
            "CV",
            "CW",
            "DM",
            "FJ",
            "GM",
            "GE",
            "GD",
            "GW",
            "GY",
            "HT",
            "JM",
            "KI",
            "LS",
            "LR",
            "MW",
            "MV",
            "ML",
            "MH",
            "FM",
            "NA",
            "NR",
            "NE",
            "PW",
            "PG",
            "WS",
            "SM",
            "ST",
            "SN",
            "SC",
            "SL",
            "SB",
            "KN",
            "LC",
            "VC",
            "SR",
            "TL",
            "TO",
            "TT",
            "TV",
            "VU",
            "AZ",
            "BN",
            "BI",
            "KH",
            "CM",
            "TD",
            "KM",
            "GQ",
            "SZ",
            "GA",
            "GN",
            "KG",
            "LA",
            "MO",
            "MR",
            "MN",
            "NP",
            "RW",
            "TG",
            "UZ",
            "ZW",
            "BJ",
            "MG",
            "MU",
            "MZ",
            "AO",
            "CI",
            "DJ",
            "ZM",
            "CD",
            "CG",
            "IQ",
            "LY",
            "TJ",
            "VE",
            "ET",
            "XK"
        ],
        "disc_number": 1,
        "duration_ms": 226600,
        "explicit": false,
        "external_ids": {
            "isrc": "GBHMU1400165"
        },
        "external_urls": {
            "spotify": "https://open.spotify.com/track/5O2P9iiztwhomNh8xkR9lJ"
        },
        "href": "https://api.spotify.com/v1/tracks/5O2P9iiztwhomNh8xkR9lJ",
        "id": "5O2P9iiztwhomNh8xkR9lJ",
        "is_local": false,
        "name": "Night Changes",
        "popularity": 88,
        "preview_url": "https://p.scdn.co/mp3-preview/359be833b46b250c696bbb64caa5dc91f2a38c6a?cid=954913d13a4e4e1dba7dd78c097e7e97",
        "track_number": 7,
        "type": "track",
        "uri": "spotify:track:5O2P9iiztwhomNh8xkR9lJ"
    },
    "currently_playing_type": "track",
    "actions": {
        "disallows": {
            "resuming": true
        }
    },
    "is_playing": true
}
 */
