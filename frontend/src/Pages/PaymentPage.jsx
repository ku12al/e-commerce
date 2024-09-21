import React from 'react'
import Header from '../component/Layout/Header'
import CheckoutSteps from '../component/checkout/CheckoutSteps'
import Footer from '../component/Layout/Footer'
import Payment from '../component/Payment/Payment.jsx'

const PaymentPage = () => {
  return (
    <div className='w-full min-h-screen bg-[#f6f9fc]'>
      <Header />
      <br />
      <br />
      <CheckoutSteps active={2} />
      <Payment />
      <br />
      <br />
      <Footer />
    </div>
  )
}

export default PaymentPage