import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { backend_url, server } from '../../server';
import { Link, useParams } from 'react-router-dom';
import styles from '../../style/Style';
import axios from 'axios';
import { getAllProductsShop } from '../../redux/action/product';
import Loader from '../Layout/Loader';

const ShopInfo = ({ isOwner }) => {
  const { seller } = useSelector((state) => state.seller);
  const [data, setData] = useState({});
  const {products} = useSelector((state) => state.products);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  // console.log(seller)
  console.log(products)

  useEffect(() => {
    // dispatch(getAllProductsShop(_id));
    setIsLoading(true);
    axios.get(`${server}/shop/get-shop-info/${id}`)
      .then((res) => {
        setData(res.data.shop);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  const logoutHandler = async () => {
    await axios.get(`${server}/shop/logout`, { withCredentials: true });
    window.location.reload();
  };

  const totalReviewsLength = products?.reduce((acc, product) => acc + (product.reviews?.length || 0), 0) || 0;
  const totalRatings = products?.reduce((acc, product) => acc + (product.reviews?.reduce((sum, review) => sum + review.rating, 0) || 0), 0) || 0;
  const averageRating = totalRatings / (totalReviewsLength || 1); // To avoid division by zero

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className='w-full py-5'>
          <div className="w-full flex items-center justify-center">
            <img
              src={`${backend_url}${seller?.avatar}`}
              alt=""
              className="w-[150px] h-[150px] rounded-full border-[2px] border-b-slate-600 object-cover"
            />
          </div>
          <h3 className="text-center py-2 text-[20px]">{seller?.name}</h3>
          <p className="text-[16px] text-[#000000a6] p-[10px] flex items-center">
            {seller?.description}
          </p>
          <div className="p-3">
            <h5 className="font-[600]">Address</h5>
            <h4 className="text-[#000000a6]">{seller?.address}</h4>
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Phone Number</h5>
            <h4 className="text-[#000000a6]">{seller?.phoneNumber}</h4>
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Total Products</h5>
            <h4 className="text-[#000000a6]">{products && products?.length}</h4>
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Shop Ratings</h5>
            <h4 className="text-[#000000b0]">{averageRating}/5</h4>
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Joined On</h5>
            <h4 className="text-[#000000b0]">{seller?.createdAt?.slice(0, 10)}</h4>
          </div>
          {isOwner && (
            <div className="py-3 px-4">
              <Link to="/settings">
                <div className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}>
                  <span className="text-white">Edit Shop</span>
                </div>
              </Link>
              <div
                className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
                onClick={logoutHandler}
              >
                <span className="text-white">Log Out</span>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ShopInfo;
