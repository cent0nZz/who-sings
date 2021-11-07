import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Header from '../header/Header'
import Dashboard from '../dashboard/Dashboard'
import Quiz from '../quiz/Quiz'
import Leaderboard from '../leaderboard/Leaderboard'
import { useSelector } from 'react-redux'
import Footer from '../footer/Footer'
import './App.css'

function App() {
  const currentUser = useSelector((state) => state.currentUser)

  return (
    <>
      <Header />

      <main>
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path='quiz' element={
            currentUser.isLogged
              ? <Quiz />
              : <Navigate replace to='/' />
          } />
          <Route path='leaderboard' element={<Leaderboard />} />
        </Routes>
      </main>

      <Footer />
    </>
  )
}

export default App
