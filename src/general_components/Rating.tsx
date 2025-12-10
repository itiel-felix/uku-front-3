

const Rating = ({ onClick }: { onClick: ((rating: number) => void) | null }) => {
    let notClickable = ''
    if (onClick == null)
        notClickable = 'pointer-events-none'
    const ariaLabels = [.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]
    const generateOptions = () => {
        return ariaLabels.map((label, index) => {
            const half = index % 2 === 0 ? 'mask-half-1' : 'mask-half-2'
            return (
                <input
                    key={index}
                    type="radio"
                    name="rating-11"
                    className={`mask mask-star-2 ${half} bg-orange-400 hover:bg-orange-500 ${notClickable}`}
                    aria-label={`${label.toString()} star`}
                    onClick={() => onClick?.(label)}
                />
            )
        })
    }
    return (
        <div className="rating rating-lg rating-half">
            {generateOptions()}
        </div>
    )
}

export default Rating;