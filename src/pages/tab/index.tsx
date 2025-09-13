import { useParams, useNavigate } from 'react-router-dom'
import { Song } from '../../interfaces/Song'
import Rating from '../../general_components/Rating'
const TabPage = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    // Buscar la canción por ID
    const song: Song | undefined = undefined

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
                className="self-start px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
                ← Volver
            </button>
            {/* Header */}
            <div className="w-full h-full flex flex-col sticky ">
                <div>
                    <h1 className="text-4xl font-bold text-gray-800">{song?.name}</h1>
                    <h2 className="text-2xl text-gray-600">{song?.artist}</h2>
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
                    {song?.genre}
                </span>
            </div>


            {/* Tab Area */}
            <div
                className="w-full rounded-lg text-gray-900 text-[10px] text-left justify-start"
                style={{
                    fontFamily: 'Consolas, monospace',
                    whiteSpace: 'pre'
                }}
            >
                {tab}
                finish
            </div>


        </div >
    )
}

export default TabPage
