import { CardElement } from "../../../interfaces/CardElement";
import { Songs } from "../../../dummy_data/Cards";
import Card from "../../../general_components/Card";
const TopCards = (
    {
        title,
        elements = Songs,
        columns = 2,
        rows = 2
    }: {
        title: string,
        elements: CardElement[],
        columns: number,
        rows?: number
    }
) => {
    const newElements = elements.slice(0, columns * rows);
    return (
        <div className="w-full h-full flex flex-col min-w-0">
            <div className="w-full h-full flex flex-col justify-center min-w-0">
                <div className="text-2xl font-bold text-black">{title}</div>
                <div
                    className="w-full h-full grid gap-3 min-w-0"
                    style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
                >
                    {newElements.map((element, index) => (
                        <Card
                            key={index}
                            image_url={'https://aimm.edu/hs-fs/hubfs/rock-guitar-genre.jpg?width=719&name=rock-guitar-genre.jpg'}
                            title={element.name}
                            description={element.sub_title}
                            button_text={element.button_text}
                        />
                    ))}
                </div>
            </div>
        </div>

    )
}

export default TopCards;