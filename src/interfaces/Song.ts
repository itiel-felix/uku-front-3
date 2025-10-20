import { Artist } from "./Artist";

export interface Song {
    id: string,
    name: string,
    artist: Artist,
    artist_id: string,
    genre: string,
    rating: number,
    tab: string,
    submitted_by: string,
}