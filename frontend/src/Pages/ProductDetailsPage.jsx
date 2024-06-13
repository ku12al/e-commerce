import React, { useEffect, useState } from 'react'
import Header from '../component/Layout/Header'
import Footer from '../component/Layout/Footer'
import ProductDetails from "../component/Products/ProductDetails.jsx"
import { useParams } from 'react-router-dom'
import { productData } from '../static/data.js'
import SuggestedProduct from "../component/Products/SuggestedProduct.jsx"

const ProductDetailsPage = () => {
      const {name} = useParams();
      const [data, setData] = useState(null);
      const productName = name.replace(/-/g," ");

      useEffect(()=> {
            const data = productData.find((i) => i.name === productName);
            setData(data);
      }, [] )
  return (
    <div>
      <Header/>
      <ProductDetails data={data}/>
      {
        data && <SuggestedProduct data={data} />
      }
      <Footer/>
    </div>
  )
}

export default ProductDetailsPage