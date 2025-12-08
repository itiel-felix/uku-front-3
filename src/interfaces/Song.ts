import { Artist } from "./Artist";
import { Tab } from "./Tab.ts";

export interface Song {
    id: string,
    title: string,
    artist: Artist,
    artistId: string,
    genre: string,
    rating: number,
    tabs: Tab[],
    submittedBy: string,
}