import React, { useEffect, useState } from "react";
import Header from "../component/Layout/Header";
import { productData } from "../static/data";
import styles from "../style/Style";
import ProductCart from "../component/Routes/ProductCart/ProductCart";
import Loader from "../component/Layout/Loader";
import Footer from "../component/Layout/Footer";
import { useSelector } from "react-redux";

const BestSellingPage = () => {
  const [data, setData] = useState([]);
  const { allProducts, isLoading } = useSelector((state) => state.products);
  console.log(allProducts);

  useEffect(() => {
    const allProductsData = allProducts ? [...allProducts] : [];
    const sortedData = allProductsData?.sort((a, b) => b.sold_out - a.sold_out);
    setData(sortedData);
  }, [allProducts]);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={2} />
          <br />
          <br />
          <div className={`${styles.section}`}>
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
              {data &&
                data.map((i, index) => <ProductCart data={i} key={index} />)}

              {data && data.length === 0 ? (
                <h1 className="text-center w-full pb-[100px] text-[20px] ">
                  No Product Available!
                </h1>
              ) : null}
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default BestSellingPage;
