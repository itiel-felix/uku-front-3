import { Play } from "lucide-react";
const TodaysTab = () => {
    return (
        <div className="w-full h-2/16 rounded-lg flex flex-col items-center justify-center text-black p-8 text-white todays-tab gap-4">
            <div className="w-full h-full flex flex-col items-center justify-center">
                <div className="w-full h-full flex flex-row items-center justify-center text-sm md:text-md font-bold">
                    TODAYS TOP TAB!
                </div>

                <div className=" text-xl md:text-4xl w-full h-full flex flex-col md:flex-row items-center justify-center font-bold ">
                    CAN'T HELP FALLING IN LOVE WITH YOU&nbsp;<span className="text-[var(--safron-mango-light)]">BY</span>&nbsp;ELVIS PRESLEY
                </div>
                <div className="w-full h-full flex flex-row items-center justify-center text-xs font-sans">
                    Submitted by&nbsp;<span className="text-[var(--safron-mango-light)] ">[user_name]</span>
                </div>
            </div>
            <div className="play-now-button flex flex-row items-center justify-center gap-2">
                <Play className="w-4 h-4 font-bold" />
                PLAY NOW!
            </div>
        </div>
    )
}

export default TodaysTab;