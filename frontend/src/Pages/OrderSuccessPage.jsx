import React from 'react'
import Header from '../component/Layout/Header'
import Footer from '../component/Layout/Footer'
import Lottie from 'react-lottie'
import animationData from "../Assets/107043-success.json";

const OrderSuccessPage = () => {
  return (
    <div>
      <Header/>
      <Success/>
      <Footer/>
    </div>
  )
}

const Success = () => {
      const defaultOptions = {
            loop: false,
            autoplay: true,
            animationData: animationData,
            rendererSettings: {
                  preserveAspectRatio: "xMidYMid slice",
            }
      }
      return(
            <div>
                  <Lottie options={defaultOptions} width={300} height={300}/>
                  <h5 className='text-center mb-4 text-[25px] text-[#000000a1]'>Your order is successfull </h5>
            </div>
      )
}

export default OrderSuccessPage