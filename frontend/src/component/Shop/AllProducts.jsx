import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../Layout/Loader";
import { deleteProduct, getAllProductsShop } from "../../redux/action/product";

const AllProducts = () => {
  const { products, isLoading, deleteSuccess } = useSelector((state) => state.products);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();

  // ✅ Fix: Ensure seller exists before accessing seller._id
  useEffect(() => {
    if (seller && seller._id) {
      dispatch(getAllProductsShop(seller._id));
    }
  }, [dispatch, seller]); // ✅ Fix: Added `seller` in dependency array

  // ✅ Fix: Re-fetch products after deletion (instead of reloading page)
  useEffect(() => {
    if (deleteSuccess && seller && seller._id) {
      dispatch(getAllProductsShop(seller._id));
    }
  }, [dispatch, deleteSuccess, seller]);

  // ✅ Fix: Remove page reload after delete
  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
    { field: "name", headerName: "Name", minWidth: 180, flex: 1.4 },
    { field: "price", headerName: "Price", minWidth: 100, flex: 0.6 },
    { field: "Stock", headerName: "Stock", type: "number", minWidth: 80, flex: 0.5 },
    { field: "sold", headerName: "Sold out", type: "number", minWidth: 130, flex: 0.6 },
    {
      field: "Preview",
      flex: 0.8,
      minWidth: 100,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => (
        <Link to={`/product/${params.id}`}>
          <Button>
            <AiOutlineEye size={20} />
          </Button>
        </Link>
      ),
    },
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => (
        <Button onClick={() => handleDelete(params.id)}>
          <AiOutlineDelete size={20} />
        </Button>
      ),
    },
  ];

  const row = products
    ? products.map((item) => ({
        id: item._id,
        name: item.name,
        price: "US$ " + item.discountPrice,
        Stock: item.stock,
        sold: item?.sold_out,
      }))
    : [];

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <DataGrid rows={row} columns={columns} pageSize={10} disableSelectionOnClick autoHeight />
        </div>
      )}
    </>
  );
};

export default AllProducts;
