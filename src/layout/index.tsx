import UpperBar from "./upperBar"
import "./layout.css"
import LeftSideBar from "./leftSideBar"
import { useState } from "react"
import Footer from "./footer"

const Layout = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false)
    // Add Gray layer to the body
    return (
        <div className='h-screen w-full flex flex-col'>
            <UpperBar isOpen={isOpen} setIsOpen={setIsOpen} />
            <div className='flex flex-1 w-full bg-white box-border relative overflow-x-auto'>
                <div className={`
                md:w-2/16 
                w-3/4 
                h-full 
                flex flex-col 
                z-40 
                fixed left-0 
                md:relative 
                md:top-auto md:left-auto transition-transform duration-300 ease-in-out ${isOpen
                        ? 'translate-x-0 md:block'
                        : '-translate-x-full md:translate-x-0 md:block'
                    }`}>
                    <LeftSideBar setIsOpen={setIsOpen} />
                </div>
                <div className="h-full w-full flex flex-col">
                    <div className="flex-1 overflow-y-auto ">
                        <div className="min-h-full flex flex-col p-9">
                            <div className="flex-1">
                                {children}
                            </div>
                        </div>
                        <Footer />
                    </div>
                </div>



            </div>
        </div>
    )
}

export default Layout