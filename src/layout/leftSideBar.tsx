import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"

const LeftSideBar = ({ setIsOpen }: { setIsOpen: (isOpen: boolean) => void }) => {
    const { isLoggedIn } = useAuth()

    const navigate = useNavigate()
    return (
        <div className="w-full h-full flex flex-col bg-gray-800">
            <div className="w-full h-full flex flex-col">
                <div className="bg-[var(--dark-slate-gray)] w-full h-full flex items-center">
                    <div className="h-full w-full flex flex-col flex-start">

                        <div className="w-full flex flex-col flex-start">
                            <div className="header-button font-bold !pointer-events-none !justify-start text-sm " onClick={() => setIsOpen(false)}>TABS</div>
                            <div className="header-button font-light !justify-start text-[10px] hover:font-bold" onClick={() => setIsOpen(false)}>Top 100 tabs</div>
                            <div className="header-button !justify-start text-[10px] hover:font-bold" onClick={() => setIsOpen(false)}>Top 100 artists</div>
                        </div>
                        <div className="w-full flex flex-col flex-start">
                            <div className="header-button font-bold !pointer-events-none !justify-start text-sm " onClick={() => setIsOpen(false)}>TOOLS</div>
                            <div className="header-button !justify-start text-[10px] hover:font-bold" onClick={() => setIsOpen(false)}>Chord library</div>
                            <div className="header-button !justify-start text-[10px] hover:font-bold" onClick={() => setIsOpen(false)}>Metronome</div>
                            <div className="header-button !justify-start text-[10px] hover:font-bold" onClick={() => setIsOpen(false)}>About</div>
                        </div>
                        {
                            isLoggedIn && (
                                <div className="w-full flex flex-col flex-start">
                                    <div className="header-button !pointer-events-none  !justify-start text-sm " onClick={() => navigate('/user/profile')}>MY PROFILE</div>
                                    <div className="header-button !justify-start text-xs hover:font-bold" onClick={() => navigate('/user/favorites')}>FAVORITES</div>
                                    <div className="header-button !justify-start text-xs hover:font-bold" onClick={() => navigate('/submit')}>SUBMIT</div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeftSideBar