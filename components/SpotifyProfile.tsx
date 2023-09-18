"use client";
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
import { SpotifySDK } from "@/types/types";
import { ExitIcon } from "@radix-ui/react-icons";

import { UserProfile } from "@spotify/web-api-ts-sdk";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
export function SpotifyProfile({ sdk }: SpotifySDK) {
    const [profile, setProfile] = useState<UserProfile | null>(null);

    useEffect(() => {
        (async () => {
            const profile = await sdk.currentUser.profile();
            console.log(profile);
            setProfile(profile);
        })();
    }, [sdk]);

    return (
        profile && (
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Account Details</CardTitle>
                    <CardDescription>You Spotify authentication was successful</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center">
                        <Avatar>
                            <AvatarImage
                                src={profile.images[0].url}
                                alt="Spotify Profile Picture"
                            />
                            <AvatarFallback>:)</AvatarFallback>
                        </Avatar>
                        <div className="ml-4 space-y-1 ">
                            <Link href={profile.href} className="text-sm font-medium leading-none">
                                {profile.display_name}
                            </Link>
                            <Badge variant="outline" className="block w-min">
                                {profile.product.toUpperCase()}
                            </Badge>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full font-medium">
                        <ExitIcon className="mr-2 " />
                        Sign out
                    </Button>
                </CardFooter>
            </Card>
        )
    );
}
