import { useParams } from "react-router-dom"
import List from "../../general_components/List"
import { useNavigate } from "react-router-dom"
import { Artist, Song } from "../../interfaces"
import { useState, useEffect } from "react"

//A Actions
import { song, artist as artistApi } from "../../services/api"
const ArtistPage = ({
    propArtist,
}: {
    propArtist: Artist,
}) => {
    const [artist, setArtist] = useState<Artist>(propArtist)
    const { id: artist_id } = useParams<{ id: string }>()
    // const [artistSongs, setArtistSongs] = useState<Song[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        const loadArtist = async () => {
            const responseArtist = await artistApi.getArtists(artist_id ?? '', undefined)
            // const artistSongs = await song.getSongs(undefined, { artist_id: propArtist.id })
            setArtist(responseArtist as Artist)
        }
        if (propArtist) {
            loadArtist()
        }
    }, [])

    if (!artist) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-600 mb-4">Artista no encontrado</h1>
                    <p className="text-gray-500">El artista no existe en nuestra base de datos.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="text-black min-h-screen">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-gray-900 to-gray-700 text-white">
                <div className="absolute inset-0 bg-black opacity-40"></div>
                <div className="relative px-6 py-16 md:px-12">
                    <div className="flex flex-col md:flex-row items-center md:items-end gap-8">
                        {/* Artist Image */}
                        <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shadow-2xl border-4 border-white">
                            <img
                                src={artist.image_url}
                                alt={artist.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Artist Info */}
                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-4xl md:text-6xl font-bold mb-4">{artist.name}</h1>
                            <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6">
                                {artist.genres.map((genre, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm font-medium"
                                    >
                                        {genre}
                                    </span>
                                ))}
                            </div>
                            <div className="flex items-center justify-center md:justify-start gap-4">
                                <div className="flex items-center gap-1">
                                    <span className="text-yellow-400">★</span>
                                    <span className="font-semibold">{artist.rating}/5</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="px-6 py-8 md:px-12">
                {/* Description */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Acerca de</h2>
                    <p className="text-gray-700 leading-relaxed max-w-3xl">
                        {artist.description}
                    </p>
                </div>

                {/* Albums Section */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-6">Álbumes</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {artist.albums.map((album, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer"
                            >
                                <div className="w-full h-32 bg-gray-200 rounded mb-3 flex items-center justify-center">
                                    <span className="text-gray-500 text-sm">Álbum Cover</span>
                                </div>
                                <h3 className="font-semibold text-lg">{album}</h3>
                                <p className="text-gray-600 text-sm">2024</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Popular Songs */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-6">Canciones Populares</h2>
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <List items={[]} onClick={(id) => navigate(`/tab/${id}`)} elements_qty={10} isLoading={false} />
                    </div>
                </div>

                {/* External Links */}
                {/* {artist.url && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">Enlaces</h2>
                        <a
                            href={artist.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            Ver perfil oficial
                        </a>
                    </div>
                )} */}
            </div>
        </div>
    )
}

export default ArtistPage