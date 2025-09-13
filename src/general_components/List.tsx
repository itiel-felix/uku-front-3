import { ListElement } from "../interfaces/ListElement"

const List = ({ items,
    onClick,
    onArtistClick,
    isLoading,
}: { items: ListElement[], onClick?: (id: string) => void, onArtistClick?: (id: string) => void, sub_title?: string | undefined, isLoading?: boolean }) => {

    const generateListItems = () => {
        if (isLoading) {
            return (
                <li className="list-row">
                    <div className="text-4xl font-thin opacity-30 tabular-nums font-bold text-black" style={{ fontFamily: 'Arial' }}>1</div>
                    <div><img className="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/1@94.webp" /></div>
                </li>
            )
        }
        return items.map((item, index) => {
            return (
                <li key={index} className={`list-row hover:bg-gray-100 ${onClick ? 'cursor-pointer' : ''}`} onClick={() => {
                    onClick?.(item.id ?? '')
                }}>
                    <div className="text-4xl font-thin opacity-30 tabular-nums font-bold text-black" style={{ fontFamily: 'Arial' }}>{index + 1}</div>
                    <div><img className="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/1@94.webp" /></div>
                    <div className="list-col-grow text-black">
                        <div>{item.title}</div>
                        <div className="text-xs w-fit uppercase font-semibold opacity-60 text-black hover:cursor-pointer hover:text-blue-500"
                            onClick={(e) => {
                                e.stopPropagation();
                                onArtistClick?.(item.subtitle ?? '');
                            }}>
                            {item.subtitle ?? ''}
                        </div>
                    </div>
                    <button className="btn btn-square btn-ghost text-black">
                        <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M6 3L20 12 6 21 6 3z"></path></g></svg>
                    </button>
                </li>
            )
        })
    }
    return (
        <ul className="list bg-base-100 rounded-box shadow-md">

            {generateListItems()}

        </ul>
    )
}

export default List;