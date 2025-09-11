import UpperBar from "./upperBar"
import "./layout.css"
import LeftSideBar from "./leftSideBar"

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='h-full w-full flex flex-col'>
            <UpperBar />
            <div className='flex flex-1 w-full bg-white box-border'>
                {/* // First Column */}
                <div className='w-1/12 h-full flex flex-col z-10'>
                    <LeftSideBar />
                </div>
                {/* </div> */}
                {/* // Second Column */}
                <div className='w-full flex flex-col p-5 bg-white gap-5 box-border'>
                    {children}
                </div>
                {/* // third column (empty) */}
                {/* <div className='w-1/12 h-full '> */}
                {/* </div> */}
            </div>
        </div>
    )
}

export default layout