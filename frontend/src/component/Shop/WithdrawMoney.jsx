import React, { useEffect, useState } from 'react'
import styles from "../../style/Style";
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrdersOfShop } from '../../redux/action/order';

const WithdrawMoney = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const {orders} = useSelector((state) => state.order);
  const {seller} = useSelector((state) => state.seller);
  const [paymentMethod, setPaymentMethod] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(50);
  const [bankInfo, setBankInfo] = useState();

  const [deliveredOrder, setDeliveredOrder] = useState(null);

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller?._id));
    const orderData = orders && orders.filter((item) => item.status === "Delivered");
    setDeliveredOrder(orderData);
  }, [dispatch]);

  const totalEarningWithoutTax = deliveredOrder && deliveredOrder.reduce((acc, item) => acc + item.totalPrice, 0);
  const serviceCharge = totalEarningWithoutTax * 0.1;
  const availbleBalance = (totalEarningWithoutTax - serviceCharge).toFixed(2);
  
  return (
    <div className='w-full h-[90vh] p-8'>
      <div className='w-full bg-white h-full rounded flex items-center justify-center flex-col shadow-2xl'>
            <h5 className='text-[20px] mb-2'>Available Balance: ₹{availbleBalance}</h5>
            <div className={`${styles.button} text-white !h-[42px] !rounded`}>Withdraw</div>
      </div>
    </div>
  )
}

export default WithdrawMoney