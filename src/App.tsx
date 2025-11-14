import './App.css'
import { Landing } from './components/Landing'
import { ChatInterface } from './components/ChatInterface'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing onStartChat={function (): void {
          throw new Error('Function not implemented.')
        } }/>}>

        </Route>
        <Route path='/chat' element={<ChatInterface onBackToLanding={function (): void {
          throw new Error('Function not implemented.')
        } }/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
