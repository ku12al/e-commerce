import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductsShop, deleteProduct } from '../../redux/action/product';
import { AiOutlineArrowRight, AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Loader from "../Layout/Loader";
import { getAllOrdersOfShop } from "../../redux/action/order";

const AllRefundsOrders = () => {
  const { orders, isLoading } = useSelector((state) => state.orders);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();

  console.log(seller);

  useEffect(() => {
    if (seller && seller._id) {
      dispatch(getAllOrdersOfShop(seller._id));
    }
  }, [dispatch, seller]);

  console.log(orders +"kunal");
  console.log(orders._id);

  const refundOrders = orders && orders.filter((item)=> item.status === "Processing Refund" || item.status==="Refund success")

  const columns = [
      { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
  
      {
        field: "status",
        headerName: "Status",
        minWidth: 130,
        flex: 0.7,
        cellClassName: (params) => {
          return params.getValue(params.id, "status") === "Delivered"
            ? "greenColor"
            : "redColor";
        },
      },
      {
        field: "itemsQty",
        headerName: "Items Qty",
        type: "number",
        minWidth: 130,
        flex: 0.7,
      },
  
      {
        field: "total",
        headerName: "Total",
        type: "number",
        minWidth: 130,
        flex: 0.8,
      },
  
      {
        field: " ",
        flex: 1,
        minWidth: 150,
        headerName: "",
        type: "number",
        sortable: false,
        renderCell: (params) => {
          return (
            <>
              <Link to={`/order/${params.id}`}>
                <Button>
                  <AiOutlineArrowRight size={20} />
                </Button>
              </Link>
            </>
          );
        },
      },
    ];
  
    const rows = [];
  
    refundOrders &&
      refundOrders.forEach((item) => {
        rows.push({
          id: item._id,
          itemsQty: item.cart.length,
          total: "Rs. " + item.totalPrice,
          status: item.status,
        });
      });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      )}
    </>
  );
}

export default AllRefundsOrders;
