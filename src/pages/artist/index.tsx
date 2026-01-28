import { useParams } from "react-router-dom"
import List from "../../general_components/List"
import { useNavigate } from "react-router-dom"
import { Artist, Album, Song } from "../../interfaces"
import { useState, useEffect } from "react"

//A Actions
import { artist as artistApi } from "../../services/api"
const ArtistPage = ({
    propArtist,
}: {
    propArtist: Artist | undefined,
}) => {
    const [artist, setArtist] = useState<Artist | undefined>(propArtist)
    const [albums, setAlbums] = useState([])
    const [songs, setSongs] = useState([]);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { id: artistId } = useParams<{ id: string }>()
    // const [artistSongs, setArtistSongs] = useState<Song[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        const loadArtist = async () => {

            setIsLoading(true)
            try {
                const responseArtist = await artistApi.getArtistPage(artistId ?? '')
                setIsLoading(false)
                setArtist(responseArtist as Artist)
                const allSongs = (responseArtist as Artist).albums.reduce((acc, album) => {
                    return [...acc, ...(album as Album).songs]
                },[])
                setSongs(allSongs);
            } catch (error) {
                console.error(error)
                setIsLoading(false)
            }
        }
        if (!propArtist) {
            loadArtist()
        }
    }, [])

    if (!artist && isLoading) {
        return (
            <div className="flex items-center justify-center h-96">

                <div className="text-center">
                    <span className="loading loading-spinner loading-xl text-orange-500"></span>
                    <h1 className="text-2xl font-bold text-gray-600 mb-4">Cargando...</h1>
                    <p className="text-gray-500">Espera un momento mientras cargamos la información del artista.</p>
                </div>
            </div>
        )
    } else if (!artist && !isLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-600 mb-4">Artista no encontrado</h1>
                    <p className="text-gray-500">El artista no existe en nuestra base de datos.</p>
                </div>
            </div>
        )
    }

    const formatSongs = (songs: Song[]) => {
        const formattedSongs = songs.map((song) => {
            return {
                ...song,
                title: song.title,
                subtitle: artist?.name,
                imageUrl: artist?.imageUrl,
                button_text: 'PLAY',
                url: `/song/${song.id}`
            }
        })
        return formattedSongs
    }
    return (
        <div className="text-black min-h-screen animate-fade-in">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-gray-900 to-gray-700 text-white rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-40"></div>
                <div className="relative px-6 py-16 md:px-12">
                    <div className="flex flex-col md:flex-row items-center md:items-end gap-8">
                        {/* Artist Image */}
                        <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shadow-2xl border-4 border-white">
                            <img
                                src={artist?.imageUrl}
                                alt={artist?.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Artist Info */}
                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-4xl md:text-6xl font-bold mb-4">{artist?.name}</h1>
                            {/* Description */}
                            <div className="mb-8">
                                <p className="text-gray-700 leading-relaxed max-w-3xl">
                                    {artist?.description}
                                </p>
                            </div>
                            <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6">
                                {/* {artist?.genres.map((genre: string, index: number) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm font-medium text-gray-700 capitalize"
                                    >
                                        {genre}
                                    </span>
                                ))} */}
                            </div>
                            <div className="flex items-center justify-center md:justify-start gap-4">
                                <div className="flex items-center gap-1">
                                    <span className="text-yellow-400">★</span>
                                    <span className="font-semibold">{artist?.rating}/5</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="px-6 py-8 md:px-12">

                {/* Popular Songs */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-6">Popular songs</h2>
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <List items={formatSongs(songs ?? [])} 
                        onClick={(id) => navigate(`/song/${id}`)} 
                        elements_qty={10} 
                        isLoading={artist == null} />
                    </div>
                </div>
                {/* Albums Section */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-6">Albums</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {artist?.albums.map((album: Album, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center justify-center max-w-45 max-h-55 bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer aspect-square"
                            >
                                <div className="h-full w-full bg-gray-200 rounded mb-3 flex items-center justify-center aspect-square rounded-lg">
                                    <img src={album.imageUrl} alt={album.title} className="w-full h-full object-cover rounded-lg" />
                                </div>
                                <div className="h-full w-full flex flex-col ">
                                    <h3 className="font-semibold text-sm ">{album.title}</h3>
                                    <p className="text-gray-600 text-xs">{album.release_date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>



                {/* External Links */}
                {artist?.spotifyId && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">Links</h2>
                        <a
                            href={`https://open.spotify.com/artist/${artist?.spotifyId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            Go to official Spotify page
                        </a>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ArtistPage