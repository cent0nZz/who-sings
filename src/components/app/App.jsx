import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from '../header/Header'
import Dashboard from '../dashboard/Dashboard'
import Quiz from '../quiz/Quiz'
import Leaderboard from '../leaderboard/Leaderboard'

import './App.css'

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="quiz" element={<Quiz />} />
        <Route path="leaderboard" element={<Leaderboard />} />
      </Routes>
    </>
  );
}

export default App;
