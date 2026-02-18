import { useState } from 'react'
import './App.css'
import notepad from './assets/notepad.png'
import NoteCard from './NoteCard'

function App() {
  

  return (
    <>
      <div className='flex flex-col justify-center items-center'>
        <img src={notepad} className="w-12 h-12" />
        <h1 className='text-3xl font-bold text-center mt-10'>
          Notes App
        </h1>
      </div>
      
      <div className='flex items-center justify-center mt-20'>
        <NoteCard />
      </div>
    </>
  )
}

export default App
