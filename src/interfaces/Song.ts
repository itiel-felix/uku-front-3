import { Artist } from "./Artist";
import { Tab } from "./Tab.ts";
import { Album } from "./Album.ts";

export interface Song {
    id: string,
    title: string,
    artist: Artist,
    album: Album,
    artistId: string,
    albumId: string,
    genre: string,
    rating: number,
    tabs: Tab[],
    submittedBy: string,
}