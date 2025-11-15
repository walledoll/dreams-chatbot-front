
import { Landing } from './components/Landing'
import { ChatInterface } from './components/ChatInterface'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './components/Register/Register'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
          <Routes>
            <Route path='/register' element={<Register/>}/>
            <Route path='/' element={<Landing onStartChat={function (): void {
              throw new Error('Function not implemented.')
            } }/>}>

            </Route>
            <Route path='/chat' element={<ChatInterface onBackToLanding={function (): void {
              throw new Error('Function not implemented.')
            } }/>} />
          </Routes>
        </BrowserRouter>
    </QueryClientProvider>
   
  )
}

export default App
