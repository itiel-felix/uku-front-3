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
                            <div className="header-button !pointer-events-none !justify-start text-xl " onClick={() => setIsOpen(false)}>TABS</div>
                            <div className="header-button !justify-start text-sm" onClick={() => setIsOpen(false)}>GENRES</div>
                            <div className="header-button !justify-start text-sm" onClick={() => setIsOpen(false)}>ARTISTS</div>
                        </div>
                        <div className="w-full flex flex-col flex-start">
                            <div className="header-button !pointer-events-none !justify-start text-xl " onClick={() => setIsOpen(false)}>MORE</div>
                            <div className="header-button !justify-start text-sm" onClick={() => setIsOpen(false)}>TOOLS</div>
                            <div className="header-button !justify-start text-sm" onClick={() => setIsOpen(false)}>ABOUT</div>
                        </div>
                        {
                            isLoggedIn && (
                                <div className="w-full flex flex-col flex-start">
                                    <div className="header-button !pointer-events-none  !justify-start text-xl " onClick={() => navigate('/user/profile')}>MY PROFILE</div>
                                    <div className="header-button !justify-start text-sm" onClick={() => navigate('/user/favorites')}>FAVORITES</div>
                                    <div className="header-button !justify-start text-sm" onClick={() => navigate('/submit')}>SUBMIT</div>
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