import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider} from '@tanstack/react-query';
import Navbar from '../components/Navbar'
import Home from './Home'
import CardDetail from '../components/CardDetail'

const queryClient = new QueryClient();

function App() {

  return (
    <div>
        <Navbar />
        <QueryClientProvider client={queryClient}>
            <Routes>
                <Route path="/" element={<Home client={queryClient} />} />
                <Route path="/card/:id" element={<CardDetail />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </QueryClientProvider>
    </div>
  )
}

export default App
