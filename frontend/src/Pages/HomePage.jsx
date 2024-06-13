import React from 'react'
import Header from "../component/Layout/Header"
import Hero from "../component/Routes/Hero/Hero"
import Catogories from "../component/Routes/Catogories/Catogories"
import BestDeals from "../component/Routes/BestDeals/BestDeals"
import FeaturedProduct from "../component/Routes/FeaturedProduct/FeaturedProduct";
import Events from "../component/Events/Events.jsx";
import Sponsored from "../component/Routes/Sponsored"
import Footer from "../component/Layout/Footer"

const HomePage = () => {
  return (
    <div>
      <Header activeHeading={1}/>
      <Hero/>
      <Catogories/>
      <BestDeals/>
      {/* <Events/> */}
      <FeaturedProduct/>
      <Sponsored/>
      <Footer/>

    </div>
  )
}

export default HomePage