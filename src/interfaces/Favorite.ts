import { Song } from "./Song";

export interface Favorite {
    id: string;
    song_id: string;
    user_id: string;
    song: Song;
    created_at: string;
}