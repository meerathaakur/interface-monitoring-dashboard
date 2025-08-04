import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import Dashboard from './pages/Dashboard'
import Logs from './pages/Logs'
import {LocalizationProvider}from "@mui/x-date-pickers"
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

function App() {

  return (
    <BrowserRouter>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/logs' element={<Logs />} />
        <Route path='*' element={<h2>Page Not Found</h2>} />
      </Routes>
    </LocalizationProvider>
    </BrowserRouter>
  )
}

export default App
