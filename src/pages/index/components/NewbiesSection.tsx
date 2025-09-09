

const NewbiesSection = () => {

    const newbieCard = (title: string, description: string) => {
        return (
            <div className="card bg-neutral text-neutral-content w-full h-full ">
                <div className="card-body items-start text-start flex flex-col justify-end h-full">
                    <div className="w-full h-fit-content flex flex-col justify-end">
                        <div className="w-[100%] h-full flex flex-col items-start ">
                            <h2 className="card-title text-sm font-bold max-w-full">{title}</h2>
                            <p className="text-xs max-w-full">{description}</p>
                        </div>
                    </div>
                    {/* <div className="card-actions justify-end">
                    <button className="btn btn-primary">{button_text}</button>
                </div> */}
                </div>
            </div>
        )
    }
    return (
        <div className="w-full h-full flex flex-col bg-[var(--safron-mango-light)]">
            <div className="w-full h-full flex flex-col justify-center bg-red-500 p-5">
                <div className="text-2xl font-bold text-black">Newbies Section</div>
            </div>
            <div className="w-full h-full flex flex-row gap-4 p-5">
                {newbieCard("Newbie 1", "Newbie 1 description")}
                {newbieCard("Newbie 2", "Newbie 2 description")}
                {newbieCard("Newbie 3", "Newbie 3 description")}
                {newbieCard("Newbie 4", "Newbie 4 description")}
            </div>
        </div>
    )
}

export default NewbiesSection;