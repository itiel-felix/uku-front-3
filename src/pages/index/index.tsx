
import TodaysSong from './components/TodaysSong'
import './index.css'
import { Songs } from '../../dummy_data/Cards'
import NewbiesSection from './components/NewbiesSection'
import List from '../../general_components/List'
import { useNavigate } from 'react-router-dom'

function App() {
    const navigate = useNavigate()
    return (
        <div className="w-full h-full flex flex-col gap-5 ">
            {<TodaysSong />}
            <NewbiesSection />
            <div className="w-full flex flex-col gap-10">
                <div className="w-full h-full flex gap-10">
                    <div className="h-full flex-2 flex flex-col gap-2">

                        <div className="text-5xl font-bold text-black">TOP SONGS</div>
                        <List items={Songs} onClick={(id) => navigate(`/tab/${id}`)} />
                    </div>
                </div>
                <div className="w-full h-full flex flex-col gap-10">
                    <div className="text-5xl font-bold text-black">UPRISING SONGS</div>
                    <List items={Songs} />
                </div>
                <div className="w-full h-full flex flex-col gap-10">
                    <div className="text-5xl font-bold text-black">UPRISING SONGS</div>
                    <List items={Songs} />
                </div>
                <div className="w-full h-full flex flex-col gap-10">
                    <div className="text-5xl font-bold text-black">UPRISING SONGS</div>
                    <List items={Songs} />
                </div>
            </div>
        </div>

    )
}

export default App
