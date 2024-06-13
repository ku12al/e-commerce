import React from 'react'
import styles from '../../../style/Style'
import {Link } from 'react-router-dom'

const Hero = () => {
  return (
      <div
      className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.noramlFlex}`}
      style={{
        backgroundImage:
          "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-1.jpg)",
      }}
    >
      <div className={`${styles.section} mt-20 md:mt-0 w-[90%] 800px:w-[80%]`}>
        <h1
          className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[#474545] font-[600] capitalize`}
        >
          Best Collection for <br /> Your Choice
        </h1>
        <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-[#000000d6]">
        "Engaged in the art of self-expression through fashion."<br /> 
        "Explore a world of endless possibilities, one purchase at a time."<br /> 
        "Unlock your style potential with every click."<br /> 
        "From essentials to extravagance, find it all under one roof."{" "} <br/>
    
        </p>
        <p className='pt-3 text-[24px] font-Poppins font-[800] text-[#241d1dbc]'>Shop Smart, Live Stylishly: Your One-Stop Destination!</p>
        <Link to="/products" className="inline-block">
            <div className={`${styles.button} mt-5`}>
                 <span className="text-[#fff] font-[Poppins] text-[18px]">
                    Shop Now
                 </span>
            </div>
        </Link>
      </div>
    </div>
  )
}

export default Hero