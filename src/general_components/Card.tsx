
import { useNavigate } from 'react-router-dom'

const Card = (
    {
        title,
        description,
        songId,
    }: {
        image_url: string,
        title: string,
        description: string,
        button_text: string,
        className?: string,
        songId?: string
    }) => {

    const navigate = useNavigate()

    const handleClick = () => {
        if (songId) {
            navigate(`/tab/${songId}`)
        }
    }

    return (
        <div
            className="card bg-neutral text-neutral-content w-full h-full aspect-[1/1] min-w-0 overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200"
            onClick={handleClick}
        >
            <div className="card-body items-start text-start flex flex-col justify-end h-full">
                <div className="w-full h-fit-content flex flex-col justify-end">
                    <div className="w-full h-full flex flex-col items-start min-w-0">
                        <h2 className="text-sm w-full font-bold truncate min-w-0">{title}</h2>
                        <p className="text-xs w-full truncate">{description}</p>
                    </div>
                </div>
                {/* <div className="card-actions justify-end">
                    <button className="btn btn-primary">{button_text}</button>
                </div> */}
            </div>
        </div>
    )
}

export default Card;