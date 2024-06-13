import React, { useState } from 'react'
import Header from '../component/Layout/Header'
import styles from '../style/Style'
import ProfileSidebar from "../component/Profile/ProfileSidebar.jsx"
import ProfileContent from "../component/Profile/ProfileContent.jsx"

const ProfilePage = () => {
      const [active, setActive] = useState(1);
  return (
    <div>
      <Header/>
      <div className={`${styles.section} flex bg-[#f5f5f5] py-10`}>
            <div className='w-[50px] 800px:w-[335px] sticky 800px:mt-0 mt-[30%]'>
                  <ProfileSidebar active={active} setActive={setActive}/>
            </div>
            <ProfileContent active={active}/>
      </div>
    </div>
  )
}

export default ProfilePage