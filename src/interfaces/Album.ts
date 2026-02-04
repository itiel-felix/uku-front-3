import { Artist } from "./Artist";
import { Song } from "./Song";

export interface Album {
    id: string,
    artist: Artist,
    title: string,
    image_url: string,
    rating: number,
    release_date: string,
    spotifyUrl: string,
    songs: Song[]
}
