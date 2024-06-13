import React from 'react'
import styles from '../../style/Style'

const Sponsored = () => {
  return (
    <div className={`${styles.section} sm:block bg-white py-10 px-5 mb-12 cursor-pointer shadow-2xl rounded-xl`}>
      <div className='flex justify-between w-full'>
            <div className='flex items-start '>
                  <img src="https://logos-world.net/wp-content/uploads/2020/04/Sony-Logo-1961-1962.png" alt="" style={{width:"150px", objectFit:"contain"}}/>

            </div>

            <div className='flex items-start'>
                  <img src="https://logos-world.net/wp-content/uploads/2020/05/LG-Logo-2014-present.png" alt="" style={{width:"150px", objectFit:"contain"}}/>

            </div>

            <div className='flex items-start'>
                  <img src="https://itc.ua/wp-content/uploads/2014/08/Samsung_Logo1.jpg" alt="" style={{width:"150px", objectFit:"contain"}}/>

            </div>

            <div className='flex items-start'>
                  <img src="https://logos-world.net/wp-content/uploads/2020/08/Canon-Logo.png" alt="" style={{width:"150px", objectFit:"contain"}}/>

            </div>

            <div className='flex items-start'>
                  <img src="https://d1lss44hh2trtw.cloudfront.net/assets/article/2023/08/17/lenovo-logo-2_feature.jpg" alt="" style={{width:"150px", objectFit:"contain"}}/>

            </div>

      </div>

    </div>
  )
}

export default Sponsored