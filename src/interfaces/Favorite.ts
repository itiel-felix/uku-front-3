import { Song } from "./Song";

export interface Favorite {
    id: string;
    songId: string;
    userId: string;
    song: Song;
    created_at: string;
}