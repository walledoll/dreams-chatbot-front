
import { Landing } from './components/Landing'
import { ChatInterface } from './components/ChatInterface'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './components/Register/Register'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Login from './components/Login/Login';

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
          <Routes>
            <Route path='/register' element={<Register/>}/>
            <Route path='login' element={<Login/>} />
            <Route path='/' element={<Landing /> } />
            <Route path='/chat' element={<ChatInterface />} />
          </Routes>
        </BrowserRouter>
    </QueryClientProvider>
   
  )
}

export default App
