
import { Link, useLocation } from "react-router-dom"


const LeftSideBar = () => {
    const location = useLocation()
    return (
        <div className="w-full h-full flex flex-col bg-gray-800">
            <div className="w-full h-full flex flex-col">
                <div className="bg-[var(--dark-slate-gray)] w-full h-full flex items-center">
                    <div className="h-full w-full flex flex-col flex-start">

                        <div className="w-full flex flex-col flex-start">
                            <Link
                                to="/"
                                className={`header-button !justify-start ${location.pathname === '/' ? 'text-[var(--safron-mango)]' : ''}`}
                            >
                                HOME
                            </Link>

                            <div className="header-button !justify-start ">GENRES</div>
                            <div className="header-button !justify-start ">ARTISTS</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeftSideBar