
import './index.css'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Song } from '../../interfaces/Song'
import { ListElement } from '../../interfaces/ListElement'
import { Artist } from '../../interfaces/Artist'
import TodaysSong from './components/TodaysSong'
import NewbiesSection from './components/NewbiesSection'
import List from '../../general_components/List'
import { Heart } from "lucide-react";
import { Share } from "lucide-react";



import { artist, song } from '../../services/api'
import { useFavorites } from '../../hooks/useFavorites'


function App() {
    const navigate = useNavigate()
    const { favorites, getFavorites, addFavorite, removeFavorite } = useFavorites()
    const [songs, setSongs] = useState<Song[]>([])
    const [artists, setArtists] = useState<Artist[]>([])
    const [songsLoading, setSongsLoading] = useState<boolean>(false)

    useEffect(() => {
        setSongsLoading(true)
        const getElements = async () => {
            await song.getPopularSongs(undefined, { limit: '10' }).then((songs) => {
                setSongs(songs as Song[])
            })
            await artist.getArtists(undefined, undefined).then((artists) => {
                setArtists(artists as Artist[])
            })
            await getFavorites()
            setSongsLoading(false)
        }
        getElements()
    }, [])
    const formatSongs = (songs: Song[], artists: Artist[]) => {
        const formattedSongs = songs.map((song) => {
            return {
                ...song,
                title: song.name,
                subtitle: artists.find((element) => element.id == song.artist_id)?.name,
                image_url: artists.find((element) => element.id == song.artist_id)?.image_url,
                button_text: 'PLAY',
                url: `/tab/${song.id}`
            }
        })
        return formattedSongs
    }
    const generateButtonArray = (element: ListElement) => {
        const isFavorite = favorites.some((favorite) => favorite.song_id === element.id)
        return (
            <div className="flex flex-row gap-2 text-gray h-full items-center justify-center pr-5">
                <Heart className="w-4 h-4 hover:fill-red-500 hover:text-red-500 text-gray-500 cursor-pointer"
                    onClick={async () => isFavorite ? await removeFavorite(element.id as string) : await addFavorite(element.id as string)}
                    style={{ fill: isFavorite ? 'red' : 'none', color: isFavorite ? 'red' : '' }}
                />
                <Share className="w-4 h-4 hover:text-green-500 text-gray-500 cursor-pointer" />
            </div>
        )
    }
    return (
        <div className="w-full h-full flex flex-col gap-5 ">
            {<TodaysSong />}
            <NewbiesSection />
            <div className="w-full flex flex-col gap-10">
                <div className="w-full h-full flex gap-10">
                    <div className="h-full flex-2 flex flex-col gap-2">

                        <div className="text-5xl font-bold text-black">TOP SONGS</div>
                        <List
                            isLoading={songsLoading}
                            items={formatSongs(songs, artists)}
                            onClick={(id) => navigate(`/tab/${id}`)}
                            sub_title={'artist'}
                            onSubtitleClick={(element: ListElement) => navigate(`/artist/${element.id}`)}
                            elements_qty={10}
                            buttonsArray={generateButtonArray}
                        />
                    </div>
                </div>
                <div className="w-full h-full flex flex-col gap-10">
                    <div className="text-5xl font-bold text-black">MOST LIKED SONGS</div>
                    <List items={formatSongs(songs, artists)} />
                </div>
            </div>
        </div>

    )
}

export default App
