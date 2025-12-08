import { useEffect, useState } from "react"
import { Song, Artist } from "../../interfaces"
import { artist as artistApi } from "../../services/api"
import { song as songApi } from "../../services/api"
import { tab as tabApi } from "../../services/api"
import { generatePreview } from "./utils"

// Hooks

import { useAuth } from "../../hooks/useAuth"

const SubmitPage = () => {
    const [artists, setArtists] = useState<Artist[]>([])
    const [songs, setSongs] = useState<Song[]>([])
    const { user, isLoggedIn } = useAuth()
    const [isLoading, setIsLoading] = useState<'artist' | 'songs' | undefined>(undefined)


    // form state
    const [artist, setArtist] = useState<Artist | undefined>(undefined)
    const [song, setSong] = useState<Song | undefined>(undefined)
    const [tab, setTab] = useState<string>('')
    const [type, setType] = useState<string | undefined>(undefined)
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
                const response = await songApi.getSongs(undefined, { artistId: artist.id })
                setSongs(response as Song[])
                setIsLoading(undefined)
            }
            fetchSongs()
        }
    }, [artist])

    const formatOptions = (elements: Song[] | Artist[] | { id: string, name: string, value: string }[]) => {
        return elements.map((element) => {
            return (
                <option className="text-gray-500" value={element.id ?? element.value}>{element.name}</option>
            )
        })
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        // Submitt version
        e.preventDefault()
        if (!isLoggedIn) {
            return
        }
        const submittedInfo = await tabApi.submitTab({
            tab: tab,
            artistId: artist?.id,
            song_id: song?.id,
            type: type ?? 'chords',
            user_id: user?.id,
        })
        console.log(submittedInfo)
    }
    const handleGeneratePreview = async () => {
        const chords = await tabApi.generatePreview({
            tab: tab,
        })

        const formattedChords = (chords as (any[])).map((chord: any) => {
            return chord.uc.chord[0]
        })

        const preview = generatePreview(tab, formattedChords)
        setPreview(preview)
    }

    const selectorComponent = (
        options: any[],
        label: string,
        placeholder: string,
        onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
        disabled: boolean = false
    ) => {
        return (
            <fieldset disabled={disabled} className="fieldset w-full">
                <legend className="label text-gray-500">{label}</legend>
                <select
                    defaultValue={placeholder}
                    className="select text-gray-500"
                    onChange={onChange}>
                    <option disabled={true}>{placeholder}</option>
                    {formatOptions(options ?? [])}
                </select>
            </fieldset>
        )
    }

    const mapAllPreviewElements = (preview: any[]) => {
        const elementsArray = []
        let actualShit = []
        const groupedChordsByLine = preview.reduce((acc, item) => {
            if (typeof item === 'string') {
                return acc
            }
            if (acc[item.chord.line]) {
                acc[item.chord.line].push(item)
            } else {
                acc[item.chord.line] = [item]
            }
            return acc
        }, {})

        const processActualShit = (actualShit: any[]) => {
            elementsArray.push(<div className="flex flex-row" style={{ position: 'relative' }}>
                {...actualShit}
            </div>)
            actualShit = []
        }
        for (let i = 0; i < preview.length; i++) {
            const item = preview[i]
            if (typeof item === 'string') {
                elementsArray.push(item)
            } else {
                actualShit.push(item.component)
                groupedChordsByLine[item.chord.line] = groupedChordsByLine[item.chord.line].filter((element: any) => element.chord.start !== item.chord.start)

                if (groupedChordsByLine[item.chord.line].length === 0) {
                    processActualShit(actualShit)
                    actualShit = []
                }
            }
        }
        return elementsArray
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

                <div className="flex flex-row  w-full">
                    {/* Song select */}
                    {selectorComponent(songs ?? [], 'Song', 'Pick a song', (e) => {
                        setSong(songs.find((song) => song.id == e.target.value))
                    }, !artist)}


                    {/* Song select */}
                    {selectorComponent([{ name: 'Chords', value: 'chords' }, { name: 'Tabs', value: 'tabs' }], 'Type', 'Choose a type', (e) => {
                        setType(e.target.value as 'chords' | 'tabs')
                    }, !song)}
                </div>

                <div className="flex flex-row w-full gap-4 h-100">
                    {/*Tab textarea*/}
                    <fieldset className="fieldset w-full h-full flex flex-col">
                        <legend className="label text-gray-500">Tab</legend>
                        {/* Use consolas font for text area */}
                        <textarea
                            className="textarea flex w-full h-full text-gray-500 resize-none !font-mono text-xs white-space; pre-wrap;"
                            style={{ tabSize: 4 }}
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
                                    // Actualizar el estado para que React re-renderice
                                    setTab(target.value);
                                }
                            }}
                            value={tab}
                            onChange={(e) => setTab(e.target.value)}
                        />
                    </fieldset>

                    {/* Preview space */}
                    <div className="w-full h-full flex flex-col">
                        <legend className="label text-gray-500 text-xs">Preview</legend>
                        <div className="w-full h-full flex flex-col items-start justify-start text-gray-500 !font-mono !text-xs border-1 border-gray-200 p-4 rounded-md bg-gray-50 mt-1.5 overflow-y-auto"
                            style={{ whiteSpace: 'pre-wrap', tabSize: 4 }}>
                            {mapAllPreviewElements(preview)}
                        </div>
                    </div>
                </div>
                <button type="button" className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer" onClick={async () => {
                    await handleGeneratePreview()
                }}>Generate Preview</button>
                <button type="submit" className="w-full p-2 bg-green-500 text-white rounded-md hover:bg-green-600 cursor-pointer">Submit</button>
            </form>
            {/* <div>
                <h2 className="text-2xl font-bold text-gray-800">Preview</h2>
                <div className="w-full h-full flex flex-col items-start justify-start text-gray-500 !font-mono !text-xs"
                    style={{ whiteSpace: 'pre-wrap', tabSize: 4 }}>
                    {mapAllPreviewElements(preview)}
                </div>
            </div> */}
        </div >
    )
}

export default SubmitPage