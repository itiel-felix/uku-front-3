

const TodaysSong = () => {
    return (
        <div className="w-full h-2/16 rounded-lg flex flex-col items-center justify-center text-black p-4 stamp-border">
            <div className="w-full h-full flex flex-row items-center justify-center text-sm font-bold">
                TODAYS TOP SONG!
            </div>

            <div className="w-full h-full flex flex-row items-center justify-center font-bold italic">
                CAN'T HELP FALLING IN LOVE WITH YOU&nbsp;<span className="text-[var(--safron-mango-dark)]">BY</span>&nbsp;ELVIS PRESLEY
            </div>
            <div className="w-full h-full flex flex-row items-center justify-center text-xs italic">
                Submitted by&nbsp;<span className="text-[var(--safron-mango-dark)] ">[user_name]</span>
            </div>
            <div className="play-now-button">
                PLAY NOW!
            </div>
        </div>
    )
}

export default TodaysSong;