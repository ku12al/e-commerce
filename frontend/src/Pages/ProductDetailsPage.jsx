import React, { useEffect, useState } from 'react'
import Header from '../component/Layout/Header'
import Footer from '../component/Layout/Footer'
import ProductDetails from "../component/Products/ProductDetails.jsx"
import { useParams, useSearchParams } from 'react-router-dom'
import { productData } from '../static/data.js'
import SuggestedProduct from "../component/Products/SuggestedProduct.jsx"
import { useSelector } from 'react-redux'

const ProductDetailsPage = () => {
  const {allProducts} = useSelector((state) => state.products);
  const {allEvents} = useSelector((state) => state.events);
      const {id} = useParams();
      const [data, setData] = useState(null);
      const [searchParams] = useSearchParams();
      const eventData = searchParams.get("isEvent");
      

      useEffect(()=> {
           if(eventData !== null){
            const data = allEvents && allEvents.find((i) => i._id === id);
            setData(data);
           }else{
            const data = allProducts && allProducts.find((i) => i._id === id);
            setData(data);
           }
      }, [allEvents, allProducts] )
  return (
    <div>
      <Header/>
      <ProductDetails data={data}/>
      {
        !eventData && (
          <>
          {data && <SuggestedProduct data={data} />}
          </>
        )
      }
      <Footer/>
    </div>
  )
}

export default ProductDetailsPage