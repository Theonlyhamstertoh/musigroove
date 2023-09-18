"use client";
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
import { Slider } from "@/components/ui/slider";
import useSpotify from "@/hooks/useSpotify";
import { SpotifySDK } from "@/types/types";
import { ExitIcon, PlayIcon } from "@radix-ui/react-icons";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Home() {
    // const sdk = useSpotify(
    //     process.env.NEXT_PUBLIC_SPOTIFY_ID!,
    //     process.env.NEXT_PUBLIC_REDIRECT_TARGET!,
    //     Scopes.all
    // );

    // if (sdk) {
    return (
        <div className="p-2">
            {/* <SpotifyProfile sdk={sdk} /> */}
            <div className="mx-auto flex justify-end">
                <ModeToggle />
            </div>
            <Card className="max-w-sm">
                <CardHeader>
                    <CardTitle>Music Player</CardTitle>
                    <CardDescription></CardDescription>
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
                        <Button
                            variant={"ghost"}
                            size={"icon"}
                            className="w-12 h-12 shrink-0 mr-8 "
                        >
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
            {/* <SpotifyPlayer sdk={sdk} /> */}
            {/* <Logout sdk={sdk} /> */}
        </div>
    );
    // }
    // return <></>;
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
