// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import FirstPage from './pages/index/index'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div className="h-screen w-screen  flex items-center justify-center bg-red-500" style={{ backgroundColor: 'var(--safron-mango-light)' }}>
        <FirstPage />
      </div>
    </>
  )
}

export default App
