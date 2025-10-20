import { useEffect, useState } from "react"
import { useFavorites } from "../../../hooks/useFavorites"
import List from "../../../general_components/List"
import { Artist, Song, Favorite } from "../../../interfaces"
import { song as songApi } from "../../../services/api/song"

const Favorites = () => {
    const { getFavorites } = useFavorites()
    const [songs, setSongs] = useState<Song[]>([])
    const [artists, setArtists] = useState<Artist[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    useEffect(() => {
        const fetchInfo = async () => {
            const actualFavorites = await getFavorites()
            if (actualFavorites.length > 0) {
                const songIds = actualFavorites.map((favorite: Favorite) => favorite.song_id)
                setIsLoading(true)
                const songsResponse = await songApi.getSongs('', { id: songIds.join(',') }).then((songs) => {
                    setSongs(songs as Song[])
                    return songs as Song[]
                })
                const artists = songsResponse.map((song: Song) => song.artist as Artist)
                setArtists(artists)
            }
            else {
                setSongs([])
                setArtists([])
            }

            setIsLoading(false)
        }
        fetchInfo()
    }, [])

    const formatSongs = (songs: Song[]) => {
        const formattedSongs = songs.map((song) => {
            return {
                ...song,
                title: song.name,
                subtitle: artists.find((artist) => artist.id == song.artist_id)?.name,
                image_url: artists.find((artist) => artist.id == song.artist_id)?.image_url,
                button_text: 'PLAY',
                url: `/tab/${song.id}`
            }
        })
        return formattedSongs
    }
    return (
        <div className="w-full h-full flex flex-col gap-5">
            {songs.length > 0 || isLoading ?
                <List items={formatSongs(songs)} isLoading={isLoading} elements_qty={10} /> :
                <div className="flex items-center justify-center h-96">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-800 mb-4">No favorites found</h1>
                        <p className="text-gray-600">You don't have any favorites yet.</p>
                    </div>
                </div>
            }
        </div>
    )
}

export default Favorites