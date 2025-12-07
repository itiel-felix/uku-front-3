import { Artist } from "./Artist";
import { Tab } from "./Tab.ts";

export interface Song {
    id: string,
    name: string,
    artist: Artist,
    artist_id: string,
    genre: string,
    rating: number,
    tabs: Tab[],
    submitted_by: string,
}