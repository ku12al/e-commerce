import React, { useEffect } from 'react'
import ShopLogin from "../component/Shop/ShopLogin.jsx"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ShopLoginPage = () => {
  const navigate = useNavigate();
  const { isSeller,seller} = useSelector((state) => state.seller);

  useEffect(() =>{
    if(isSeller === true){
      navigate(`/dashboard`);
    }
  }, [])
  return (
    <div>
      <ShopLogin/>
    </div>
  )
}

export default ShopLoginPage