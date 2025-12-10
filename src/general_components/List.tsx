import React from "react"
import { ListElement } from "../interfaces/ListElement"

const List = ({ items,
    onClick,
    onSubtitleClick,
    buttonsArray,
    isLoading,
    elements_qty,
    showIndex = true,
}: {
    items: ListElement[],
    onClick?: (id: string) => void,
    onSubtitleClick?: (item: ListElement) => void,
    buttonsArray?: ((item: ListElement) => React.ReactNode),
    sub_title?: string | undefined, isLoading?: boolean, elements_qty?: number, showIndex?: boolean
}) => {

    const generateListItems = () => {
        if (isLoading) {
            const listItems = Array.from({ length: elements_qty ?? 10 }, (_, index) => {
                return (
                    <li key={index} className="list-row w-full flex flex-row">
                        <div className="skeleton h-20  aspect-square"></div>
                        <div className="flex flex-col gap-2 w-full">
                            <div className="skeleton h-3 w-full"></div>
                            <div className="skeleton h-3 w-full"></div>
                            <div className="skeleton h-3 w-full"></div>
                        </div>
                    </li>
                )
            })
            return listItems
        }
        return items.map((item, index) => {
            const imageUrl = item?.imageUrl ?? 'https://img.daisyui.com/images/profile/demo/1@94.webp'
            return (
                <li key={index} className={`list-row hover:bg-gray-100 items-center`}>
                    {showIndex && <div className="text-4xl font-thin opacity-30 tabular-nums font-bold text-black" style={{ fontFamily: 'Arial' }}>{index + 1}</div>}
                    <div>
                        <img className="size-10 rounded-box" src={imageUrl} />
                    </div>
                    <div className="list-col-grow text-black text-xs">
                        <div className="w-fit  font-semibold text-xs hover:cursor-pointer hover:text-blue-500 hover:underline"
                            onClick={(e) => {
                                e.stopPropagation();
                                onClick?.(item.id ?? '')
                            }}>{item.title}</div>
                        <div className="text-[10px] w-fit opacity-60 text-gray-500 hover:cursor-pointer hover:text-blue-500 hover:underline"
                            onClick={(e) => {
                                e.stopPropagation();
                                onSubtitleClick?.(item);
                            }}>
                            {item.subtitle ?? ''}
                        </div>
                    </div>

                    {buttonsArray && buttonsArray(item)}
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