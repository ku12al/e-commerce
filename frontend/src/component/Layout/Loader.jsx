import React from 'react'
import Lottie from 'react-lottie'
import animationData from "../../Assets/Animation - 1713329095525 (1).json"


const Loader = () => {
      const defaultOptioins = {
            loop: false,
            autoplay: true,
            animationData: animationData,
            rendererSettings:{
                  preserveAspectRatio: "xMidYMid slice",
            }
      }
  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <Lottie options={defaultOptioins} width={300} height={300}/>
    </div>
  )
}

export default Loader