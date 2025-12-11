import { useParams, useNavigate } from 'react-router-dom'
import { Song } from '../../interfaces/Song'
import Rating from '../../general_components/Rating'
import { useEffect, useState } from 'react'
import { song as songApi } from '../../services/api'
import { chords as chordsApi } from '../../services/api'
import { useSearchParams } from 'react-router-dom';
import {mapAllPreviewElements, generatePreview, getChords} from '../../pages/submit/utils.jsx'

const SongPage = () => {
    const { id } = useParams<{ id: string }>()
    const [searchParams] = useSearchParams();
    const navigate = useNavigate()

    // Buscar la canción por ID
    const [song, setSong] = useState<Song | undefined>(undefined)
    const [version, setVersion] = useState<Number>(1)
    const [chords, setChords] = useState([])
    const [preview, setPreview] = useState<any>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    useEffect(() => {

        const setParams = () => {
            const version = searchParams.get('version')
            if(version) {
                setVersion(Number(version))
            }
        }
        const loadSong = async () => {
            setIsLoading(true)
            const responseSong = await songApi.getSongs(id ?? '', undefined)
            setSong(responseSong as Song)

            // const responsePreview = await songApi.getSongTabs(id ?? '', undefined)
            let tab;
                tab = (responseSong as Song).tabs.find(tab => tab.version == version) 
                
            if(tab.content != null) {
                setPreview(tab?.content)
                const usedChords = getChords(tab.content)
                const fetchedChords = await chordsApi.getChords(usedChords.join(','), undefined)
                setChords(fetchedChords as any[])
            }
            setIsLoading(false)
        }
        loadSong()
        setParams()
    }, [id, version])


    if (!song && !isLoading) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                <h1 className="text-3xl font-bold text-gray-800">Canción no encontrada</h1>
                <p className="text-gray-600">La canción que buscas no existe.</p>
                <button
                    onClick={() => navigate('/')}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Volver al inicio
                </button>
            </div>
        )
    }

    const displayContentAfterLoading = () => {
        if(preview == null){
            return  (
            <div className="flex items-center justify-center h-96">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">No favorites found</h1>
                    <p className="text-gray-600">You don't have any favorites yet.</p>
                </div>
            </div>
            )
        }else{
            return (
                    <div className='flex'>
                        <div
                            className="w-full rounded-lg text-gray-900 text-[10px] text-left justify-start"
                            style={{
                                fontFamily: 'Consolas, monospace',
                                whiteSpace: 'pre'
                            }}
                        >
                            {chords?.length > 0 && mapAllPreviewElements(generatePreview(preview,chords))}
                        </div>
                        
                        <div className='w-1/3'>
                            {
                                song.tabs.length > 0 &&
                                <div className='flex flex-col'>
                                    {...song.tabs.map(tab => {
                                        return <a className='text-black hover:text-orange-500' href={`/song/${song.id}?version=${tab.version}`}>{`Version ${tab.version}`}</a>
                                    })}
                                </div>
                            }
                        </div>
                    </div>
            )
        }
    }

    return (
        <div className="w-full h-full flex flex-col gap-6">
            {/* Botón de regreso */}
            <button
                onClick={() => navigate(-1)}
                className="self-start bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors p-2 text-xs"
            >
                ← Volver
            </button>
            {/* Header */}
            <div className="w-full h-full flex flex-col sticky ">
                <div>
                    <h1 className="text-4xl font-bold text-gray-800">{song?.title}</h1>
                    <h2 className="text-2xl text-gray-600">{song?.album?.artist?.name}</h2>
                </div>
                <div>
                    <p className="text-sm text-gray-600">Tab submitted by: {song?.submittedBy ?? 'Unknown'}</p>
                    <p className="text-sm text-gray-600">
                        Difficulty: Beginner</p>
                    <Rating onClick={() => { }} />
                </div>
                <span
                    className="border-b-1 border-gray-400"
                >
                    {song?.genre ?? ''}
                </span>
            </div>


                    {/* Tab Area */}
                    {isLoading ? (
                        <div
                            className="w-full h-full flex items-center justify-center absolute inset-0"
                            style={{
                                opacity: !isLoading ? 0 : 1,
                                transition: 'opacity 0.5s ease-out',
                                pointerEvents: !isLoading ? 'none' : 'auto',
                                zIndex: 10
                            }}
                        >
                            <span className="loading loading-spinner loading-xl text-orange-500"></span>
                        </div>
                    ) : 
                    displayContentAfterLoading()
                    }

        </div >

    )
}

export default SongPage
