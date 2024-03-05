import React from 'react'
import Ranking from './Ranking'
import Header from './Header'


const App = () => {
  return (
    <>
    <Header></Header>
    <Ranking chart='melon' type='TOP100'></Ranking>
    </>
  )
}

export default App