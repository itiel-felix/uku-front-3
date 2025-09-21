
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Song } from '../../interfaces/Song'
import { Artist } from '../../interfaces/Artist'
import TodaysSong from './components/TodaysSong'
import NewbiesSection from './components/NewbiesSection'
import List from '../../general_components/List'

import './index.css'

import { artist, song } from '../../services/api'


function App() {
    const navigate = useNavigate()
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
            setSongsLoading(false)
        }
        getElements()
    }, [])
    const formatSongs = (songs: Song[], artists: Artist[]) => {
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
                            onArtistClick={(artist_id: string) => navigate(`/artist/${artist_id}`)}
                            elements_qty={10}
                        />
                    </div>
                </div>
                <div className="w-full h-full flex flex-col gap-10">
                    <div className="text-5xl font-bold text-black">UPRISING SONGS</div>
                    <List items={formatSongs(songs, artists)} />
                </div>
                <div className="w-full h-full flex flex-col gap-10">
                    <div className="text-5xl font-bold text-black">UPRISING SONGS</div>
                    <List items={formatSongs(songs, artists)} />
                </div>
                <div className="w-full h-full flex flex-col gap-10">
                    <div className="text-5xl font-bold text-black">UPRISING SONGS</div>
                    <List items={formatSongs(songs, artists)} />
                </div>
            </div>
        </div>

    )
}

export default App
