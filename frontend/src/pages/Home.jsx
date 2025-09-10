import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import BlogList from '../components/BlogList'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
// Home page component assembling the main sections of the site
const Home = () => {
  return (
    <>
      <Navbar/>
      <Header/>
      <BlogList />
      <Newsletter />
      <Footer />
    </>
  )
}

export default Home
