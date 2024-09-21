import React from 'react'
import styles from '../../../style/Style'
import { productData } from '../../../static/data'
import ProductCart from '../ProductCart/ProductCart'
import {useSelector} from 'react-redux'

const FeaturedProduct = () => {
      const {allProducts} = useSelector((state) => state.products)
  return (
    <div>
      <div className={`${styles.section}`}>
            <div className={`${styles.heading} py-5`}>
                  <h1>Feature Products</h1>
            </div>

            <div className="grid grid-cols-1 pb-10 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] border-0">
                  {
                        allProducts && allProducts.map((i, index) => <ProductCart data={i} key={index} />)
                  }
            </div>
      </div>
    </div>
  )
}

export default FeaturedProduct