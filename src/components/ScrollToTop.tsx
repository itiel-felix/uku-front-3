import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
    const { pathname } = useLocation()

    useEffect(() => {
        // Resetear scroll de la ventana
        window.scrollTo(0, 0)

        // Resetear scroll del contenedor principal
        const scrollContainer = document.querySelector('.overflow-y-auto')
        if (scrollContainer) {
            scrollContainer.scrollTop = 0
        }
    }, [pathname])

    return null
}

export default ScrollToTop
