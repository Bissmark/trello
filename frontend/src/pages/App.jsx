import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Home from './Home'
import { QueryClient, QueryClientProvider} from '@tanstack/react-query';

function App() {

  return (
    <div>
        <Navbar />
        <QueryClientProvider client={new QueryClient()}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </QueryClientProvider>
    </div>
  )
}

export default App
