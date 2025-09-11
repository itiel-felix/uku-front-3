
import TodaysSong from './components/TodaysSong'
import TopCards from './components/TopCards'
import './index.css'
import { Songs } from '../../dummy_data/Cards'
import { UprisingSongs } from '../../dummy_data/UprisingSongs'
import NewbiesSection from './components/NewbiesSection'

function App() {
    return (
        <div className="w-full h-full flex flex-col gap-5">
            {<TodaysSong />}
            <NewbiesSection />
            <div className="w-full flex flex-col gap-10">
                <div className="w-full h-full flex gap-10">
                    <div className="h-full flex-2 flex flex-col">
                        <TopCards title="TOP CARDS" elements={Songs} columns={4} />
                    </div>
                    <div className="h-full flex-1 flex flex-col">
                        <TopCards title="UPRISING SONGS" elements={UprisingSongs} columns={2} />
                    </div>
                </div>
                <div className="w-full h-full flex gap-10">
                    <div className="h-full flex-2 flex flex-col">
                        <TopCards title="ARTISTS" elements={Songs} columns={4} />
                    </div>
                    <div className="h-full flex-1 flex flex-col">
                        <TopCards title="GENRES" elements={UprisingSongs} columns={2} />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default App
