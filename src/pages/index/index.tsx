import Layout from '../../layout'
import TodaysSong from './components/TodaysSong'
import TopCards from './components/TopCards'
import './index.css'
import { Songs } from '../../dummy_data/Cards'
import { UprisingSongs } from '../../dummy_data/UprisingSongs'
import NewbiesSection from './components/NewbiesSection'

function App() {
    // const [count, setCount] = useState(0)

    return (
        <Layout>
            {<TodaysSong />}
            <NewbiesSection />
            <div className="w-full flex flex-col gap-10">
                <div className="w-full h-full flex gap-10">
                    <div className="h-full flex-2 flex flex-col">
                        <TopCards title="Top Cards" elements={Songs} columns={4} />
                    </div>
                    <div className="h-full flex-1 flex flex-col">
                        <TopCards title="Uprising Songs" elements={UprisingSongs} columns={2} />
                    </div>
                </div>
                <div className="w-full h-full flex gap-10">
                    <div className="h-full flex-2 flex flex-col">
                        <TopCards title="Artists" elements={Songs} columns={4} />
                    </div>
                    <div className="h-full flex-1 flex flex-col">
                        <TopCards title="Genres" elements={UprisingSongs} columns={2} />
                    </div>
                </div>
            </div>
        </Layout>

    )
}

export default App
