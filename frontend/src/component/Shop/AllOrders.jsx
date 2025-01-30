import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop, deleteProduct } from "../../redux/action/product";
import {
  AiOutlineArrowRight,
  AiOutlineDelete,
  AiOutlineEye,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import Loader from "../Layout/Loader";
import { getAllOrdersOfShop } from "../../redux/action/order";

const AllOrders = () => {
  const { orders, isLoading } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();

  useEffect(() => {
    if (seller?._id) {
      dispatch(getAllOrdersOfShop(seller._id));
    }
  }, [dispatch, seller]);

  console.log(orders ? orders : "Orders are undefined");

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.value === "Delivered" ? "greenColor" : "redColor";
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
  console.log(columns);
  const rows =
    orders?.map((item) => ({
      id: item._id,
      itemsQty: item.cart.length,
      total: "Rs. " + item.totalPrice,
      status: item.status,
    })) || [];
  console.log(rows);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : orders && orders.length > 0 ? (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      ) : (
        <p>No orders available</p> // Fallback when no orders are present
      )}
    </>
  );
};

export default AllOrders;
