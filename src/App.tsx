import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Landing } from './components/Landing'
import { ChatInterface } from './components/ChatInterface'
import Index from './components/Index'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Landing onStartChat={function (): void {
        throw new Error('Function not implemented.')
      } }/>
      <ChatInterface onBackToLanding={function (): void {
        throw new Error('Function not implemented.')
      } }/>
      <Index/>
    </>
  )
}

export default App
