import { useEffect, useState } from "react"
import { Song, Artist } from "../../interfaces"
import { artist as artistApi } from "../../services/api"
import { song as songApi } from "../../services/api"
import { tab as tabApi } from "../../services/api"
import { generatePreview } from "./utils"

const SubmitPage = () => {
    const [artists, setArtists] = useState<Artist[]>([])
    const [songs, setSongs] = useState<Song[]>([])
    const [isLoading, setIsLoading] = useState<'artist' | 'songs' | undefined>(undefined)


    // form state
    const [artist, setArtist] = useState<Artist | undefined>(undefined)
    const [song, setSong] = useState<Song | undefined>(undefined)
    const [tab, setTab] = useState<string>('')
    const [preview, setPreview] = useState<any[]>([])
    useEffect(() => {
        setIsLoading('artist')
        const fetchArtist = async () => {
            const response = await artistApi.getArtists(undefined, undefined)
            setArtists(response as Artist[])
            setIsLoading(undefined)
        }
        fetchArtist()
    }, [])

    useEffect(() => {
        console.log('useEffect triggered, artist:', artist)
        if (artist) {
            setIsLoading('songs')
            const fetchSongs = async () => {
                const response = await songApi.getSongs(undefined, { artist_id: artist.id })
                setSongs(response as Song[])
                setIsLoading(undefined)
            }
            fetchSongs()
        }
    }, [artist])

    const formatOptions = (elements: Song[] | Artist[]) => {
        return elements.map((element) => {
            return (
                <option className="text-gray-500" value={element.id}>{element.name}</option>
            )
        })
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('Form submitted')
        const chords = await tabApi.generatePreview({
            tab: tab,
        })

        const formattedChords = (chords as (any[])).map((chord: any) => {
            return chord.uc.chord[0]
        })

        const preview = generatePreview(tab, formattedChords)
        setPreview(preview)
    }
    return (
        <div>
            <h1 className="text-5xl font-bold text-black">SUBMIT A TAB</h1>

            {/* Form to submit a tab */}
            <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>

                {/* Artist select */}
                <fieldset className="fieldset">
                    <legend className="label text-gray-500">Artist</legend>
                    <select defaultValue="Pick an artist" className="select text-gray-500" onChange={(e) => {
                        setArtist(artists.find((artist) => artist.id == e.target.value))
                    }}>
                        <option disabled={true}>Pick an artist</option>
                        {formatOptions(artists ?? [])}
                    </select>
                </fieldset>

                {/* Song select */}
                <fieldset disabled={!artist} className="fieldset">
                    <legend className="label text-gray-500">Song</legend>
                    <select defaultValue="Pick a song" className="select text-gray-500" onChange={(e) => {
                        setSong(songs.find((song) => song.id == e.target.value))
                    }}>
                        <option disabled={true}>Pick a song</option>
                        {formatOptions(songs ?? [])}
                    </select>
                </fieldset>

                {/*Tab textarea*/}
                <fieldset className="fieldset">
                    <legend className="label text-gray-500">Tab</legend>
                    {/* Use consolas font for text area */}
                    <textarea
                        className="textarea w-full h-24 text-gray-500 resize-none !font-mono text-xs"
                        placeholder="Write your tab here"
                        onKeyDown={(e) => {
                            if (e.key === 'Tab') {
                                e.preventDefault();
                                // Insertar un tab en lugar de cambiar el foco
                                const target = e.target as HTMLTextAreaElement;
                                const start = target.selectionStart;
                                const end = target.selectionEnd;
                                const value = target.value;
                                target.value = value.substring(0, start) + '\t' + value.substring(end);
                                target.selectionStart = target.selectionEnd = start + 1;
                            }
                        }}
                        value={tab}
                        onChange={(e) => setTab(e.target.value)}
                    ></textarea>
                </fieldset>
                <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md">Submit</button>
            </form>
            <div>
                <h2 className="text-2xl font-bold text-gray-800">Preview</h2>
                <div className="w-full h-full flex flex-row items-center justify-center text-gray-500">

                    {...preview}
                </div>
            </div>
        </div >
    )
}

export default SubmitPage