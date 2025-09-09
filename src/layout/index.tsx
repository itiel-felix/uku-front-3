import UpperBar from "./upperBar"
import "./layout.css"

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='h-full w-full flex flex-col'>
            <UpperBar />
            <div className='flex flex-1 w-full bg-[var(--safron-mango-light)]'>
                {/* // First Column */}
                <div className='w-1/12 h-full flex flex-col'>
                </div>
                {/* // Second Column */}
                <div className='w-10/12 h-full flex flex-col m-2 p-5 bg-white rounded-xl gap-5'>
                    {children}
                </div>
                {/* // third column (empty) */}
                <div className='w-1/12 h-full '>
                </div>
            </div>
        </div>
    )
}

export default layout