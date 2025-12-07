import { useParams, useNavigate } from 'react-router-dom'
import { Song } from '../../interfaces/Song'
import Rating from '../../general_components/Rating'
import { useEffect, useState } from 'react'
import { song as songApi } from '../../services/api'
import { generatePreview, mapAllPreviewElements } from '../submit/utils'
const TabPage = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    // Buscar la canción por ID
    const [song, setSong] = useState<Song | undefined>(undefined)
    const [preview, setPreview] = useState<any>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    useEffect(() => {
        const loadSong = async () => {
            setIsLoading(true)
            const responseSong = await songApi.getSongs(id ?? '', undefined)
            setSong(responseSong as Song)

            const responsePreview = await songApi.getSongTabs(id ?? '', undefined)
            setPreview(responsePreview)
            setIsLoading(false)
        }
        loadSong()
    }, [id])


    if (!song) {
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
                    <h1 className="text-4xl font-bold text-gray-800">{song?.name}</h1>
                    <h2 className="text-2xl text-gray-600">{song?.artist?.name}</h2>
                </div>
                <div>
                    <p className="text-sm text-gray-600">Tab submitted by: {song?.submitted_by}</p>
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
            ) : (
                <div
                    className="w-full rounded-lg text-gray-900 text-[10px] text-left justify-start"
                    style={{
                        fontFamily: 'Consolas, monospace',
                        whiteSpace: 'pre'
                    }}
                >
                    {preview?.length > 0 && mapAllPreviewElements(generatePreview(preview[0]?.tab, preview[0]?.chords))}
                </div>
            )}

        </div >
    )
}

export default TabPage
