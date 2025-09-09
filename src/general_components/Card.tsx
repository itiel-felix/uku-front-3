
const Card = (
    {
        image_url,
        title,
        description,
        button_text,
    }: { image_url: string, title: string, description: string, button_text: string, className: string }) => {


    return (
        <div className="card bg-neutral text-neutral-content w-full h-full aspect-[1/1] min-w-0 overflow-hidden">
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