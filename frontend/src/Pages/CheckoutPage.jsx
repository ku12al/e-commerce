import React from 'react'
import Header from '../component/Layout/Header'
import Footer from '../component/Layout/Footer'
import CheckoutSteps from "../component/checkout/CheckoutSteps.jsx"
import Checkout from "../component/checkout/Checkout.jsx"

const CheckoutPage = () => {
  return (
    <div>
      <Header />
      <br />
      <br />
      <CheckoutSteps active={1} />
      <Checkout />
      <br />
      <br />
      <Footer />
    </div>
  )
}

export default CheckoutPage