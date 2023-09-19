import { SpotifyApi, Scopes } from "@spotify/web-api-ts-sdk";

export default async function initializeSpotify() {
    const sdk = SpotifyApi.withUserAuthorization(
        process.env.NEXT_PUBLIC_SPOTIFY_ID!,
        process.env.NEXT_PUBLIC_REDIRECT_TARGET!,
        Scopes.all
    );

    try {
        const { authenticated } = await sdk.authenticate();

        if (authenticated) {
            return sdk;
        }
    } catch (e: Error | unknown) {
        const error = e as Error;
        console.error("There was an error authenticating with Spotify", error);
    }
    return null;
}
