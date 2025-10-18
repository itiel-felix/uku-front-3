import { Album } from './Album';
import { Song } from './Song';

export interface Artist {
    id: string;
    name: string;
    image_url: string;
    rating: number;
    genres: string[];
    albums: Album[];
    songs: Song[];
    description: string;
    spotify_id: string;
}

// Función utilitaria para capitalizar géneros
export const getCapitalizedGenres = (genres: string[]): string[] => {
    return genres.map(genre =>
        genre.charAt(0).toUpperCase() + genre.slice(1).toLowerCase()
    );
};
