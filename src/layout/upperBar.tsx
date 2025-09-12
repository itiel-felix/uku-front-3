
import { useState } from "react"
import { Link } from "react-router-dom"

const UpperBar = ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (isOpen: boolean) => void }) => {
    const [search, setSearch] = useState("")
    const burgerMenu = () => {
        return (
            <div className="flex flex-row justify-start items-center hover:cursor-pointer md:hidden"
                onClick={() => setIsOpen(!isOpen)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>

            </div>
        )
    }
    return (
        <div className="bg-[var(--dark-slate-gray)] flex flex-col items-center justify-center sticky top-0 left-0 right-0 z-[100] p-4 box-border">
            <div className="bg-[var(--dark-slate-gray)] w-full flex justify-center items-center pl-4 pr-4 ">
                <div className="w-full flex flex-row gap-4 justify-center">
                    {burgerMenu()}
                    <span className="flex flex-row items-center justify-center ">
                        <Link to="/" className="aspect-square rounded-full border border-gray-500 h-full flex items-center justify-center text-white text-xs font-bold hover:bg-gray-600 transition-colors">
                            UKUweb
                        </Link>
                    </span>
                    <span className="flex-1 flex flex-row justify-end items-center justify-center">
                        <div className=" bg-[var(--dark-slate-gray-dark)] text-white pl-4 p-2 rounded-full border border-gray-500">
                            <input className="w-full" type="text" placeholder="Buscar" value={search} onChange={(e) => setSearch(e.target.value)} />
                        </div>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default UpperBar