
import React, { useState } from "react"

const UpperBar = () => {
    const [search, setSearch] = useState("")
    return (
        <div className="bg-[var(--dark-slate-gray-dark)] flex flex-col">
            <div className="flex flex-row items-center w-full h-full gap-2 p-2">
                <div className="bg-[var(--dark-slate-gray-dark)] text-white p-2">
                    <input type="text" placeholder="Buscar" value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
            </div>
            <div className="bg-[var(--dark-slate-gray)] w-full h-full flex justify-center items-center">
                <div className="h-full w-[60%] flex flex-row items-center justify-center gap-4">
                    <div className="header-button ">Populares</div>
                    <div className="header-button ">Ultimos</div>
                    <div className="header-button ">Mas vistos</div>
                    <div className="header-button ">Mas vendidos</div>
                </div>
            </div>
        </div>
    )
}

export default UpperBar