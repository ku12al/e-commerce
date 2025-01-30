import React, { useEffect, useState } from "react";
import { AiOutlineMoneyCollect } from "react-icons/ai";
import styles from "../../style/Style";
import { Link } from "react-router-dom";
import { MdBorderClear } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/action/order";
import { getAllProductsShop } from "../../redux/action/product";

const DashboardHero = () => {
      const dispatch = useDispatch();
      const { orders} = useSelector((state) => state.order)
      console.log(orders)
      const { seller} = useSelector((state) => state.seller)

      const {products} = useSelector((state) => state.products);
      const [deliveredOrder, setDeliveredOrder] = useState(null);
      console.log(products)

      useEffect(() => {
        if (seller && seller._id) {  // Check if seller and seller._id exist
          dispatch(getAllOrdersOfShop(seller._id));
          dispatch(getAllProductsShop(seller._id));
      
          const orderData = orders && orders.filter((item) => item.status === "Delivered");
          setDeliveredOrder(orderData);
        }
      }, [dispatch, seller, orders]);
      

      const totalEarningEithoutTax = deliveredOrder ? deliveredOrder.reduce((acc, item) => acc + item.totalPrice, 0) : 0;

      const serviceCharge = totalEarningEithoutTax ? totalEarningEithoutTax * 0.1 : 0;
      const availableBalance = totalEarningEithoutTax - serviceCharge.toFixed(2) || 0;
  return (
    <div className="w-full p-8">
      <h3 className="text-[22px] font-Poppins pb-2">Overview</h3>
      <div className="w-full block 800px:flex items-center justify-between">
        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <AiOutlineMoneyCollect
              size={30}
              className="mr-2"
              fill="#00000085"
            />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              Account Balance{" "}
              <span className="text-[16px]">(with 10% service charge)</span>
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">${availableBalance}</h5>
          <Link to="/dashboard-withdraw-money">
            <h5 className="pt-4 pl-2 text-[#077f9c]">Withdraw Money</h5>
          </Link>
        </div>

        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <MdBorderClear size={30} className="mr-2" fill="#00000085" />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              All Orders
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">{orders && orders.length}</h5>
          <Link to="/dashboard-orders">
            <h5 className="pt-4 pl-2 text-[#077f9c]">View Orders</h5>
          </Link>
        </div>

        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <AiOutlineMoneyCollect
              size={30}
              className="mr-2"
              fill="#00000085"
            />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              All Product
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">{products && products.length}</h5>
          <Link to="/dashboard-products">
            <h5 className="pt-4 pl-2 text-[#077f9c]">View Products</h5>
          </Link>
        </div>
      </div>
      <br />
      <h3 className="text-[22px] font-Poppins pb-2">Latest Orders</h3>
      <div className="w-full min-h-[43vh] bg-white rounded">

      </div>
    </div>
  );
};

export default DashboardHero;
