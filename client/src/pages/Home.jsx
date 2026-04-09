import React from 'react'
import Navbar from '../Components/Navbar'
import { assets } from '../assets/assets'
import Header from '../Components/Header'


const Home = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-cover bg-center' style={{ backgroundImage: `url(${assets.bg_img})` }}>
      <Navbar />
      <Header />
    </div>
  )
}




export default Home