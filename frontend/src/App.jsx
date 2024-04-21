import React from 'react'
import "./App.css"

import Head from './components/Head'
import Demo from './components/Demo'

const App = () => {
  return (
    <main>
      <div className='bg-gradient-to-r from-gray-200 to-gray-400 h-[100vh] text-center'>
        <Head />
        <Demo />
      </div>
    </main>
  )
}

export default App