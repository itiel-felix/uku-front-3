import { useEffect, useState } from "react"
import { useFavorites } from "../../../hooks/useFavorites"
import { useAuth } from "../../../hooks/useAuth"
import List from "../../../general_components/List"
import { Artist, Song, Favorite } from "../../../interfaces"
import { song as songApi } from "../../../services/api/song"

const Favorites = () => {
    const { user } = useAuth()
    const { getFavorites } = useFavorites()
    const [songs, setSongs] = useState<Song[]>([])
    const [artists, setArtists] = useState<Artist[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    useEffect(() => {
        const fetchInfo = async () => {
            const actualFavorites = await getFavorites()
            if (actualFavorites.length > 0) {
                const songIds = actualFavorites.map((favorite: Favorite) => favorite.songId)
                setIsLoading(true)
                const songsResponse = await songApi.getFavoriteSongs(user.id, undefined) as Song[]
                const songsObjects = songsResponse.reduce((acc: Record<string, Song>, song: Song) => {
                    acc[song.id] = song
                    return acc
                }, {})
                const reOrderedSongs = actualFavorites.map((favorite: Favorite) => songsObjects[favorite.songId])
                setSongs(reOrderedSongs)

                const artists = reOrderedSongs.map((song: Song) => song.artist as Artist)
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
                title: song.title,
                subtitle: song.album.artist.name,
                imageUrl: song.album.artist.imageUrl,
                button_text: 'PLAY',
                url: `/song/${song.id}`
            }
        })
        return formattedSongs
    }
    return (
        <div className="w-full h-full flex flex-col gap-5">
            {songs.length > 0 || isLoading ?
                <List items={formatSongs(songs)} isLoading={isLoading} elements_qty={10} showIndex={false} /> :
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