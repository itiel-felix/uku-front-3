import UpperBar from "./upperBar"
import "./layout.css"
import LeftSideBar from "./leftSideBar"
import { useState } from "react"

const Layout = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(true)
    // Add Gray layer to the body
    return (
        <div className='h-screen w-full flex flex-col'>
            <UpperBar isOpen={isOpen} setIsOpen={setIsOpen} />
            <div className='flex flex-1 w-full bg-white box-border relative overflow-x-auto'>
                <div className={`md:w-2/16 w-3/4 h-full flex flex-col z-40 fixed top-16 left-0 md:relative md:top-auto md:left-auto transition-transform duration-300 ease-in-out ${isOpen
                    ? 'translate-x-0 md:block'
                    : '-translate-x-full md:translate-x-0 md:block'
                    }`}>
                    <LeftSideBar setIsOpen={setIsOpen} />
                </div>
                <div className=" h-full w-full">
                    <div className="w-full h-full bg-transparent p-5 box-border overflow-y-auto">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout