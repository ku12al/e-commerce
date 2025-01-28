import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../style/Style.js";
import { categoriesData, productData } from "../../static/data.js";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import DropDown from "./DropDown.jsx";
import Navbar from "./Navbar.jsx";
import { useSelector } from "react-redux";
import Cart from "../cart/Cart.jsx";
import Wishlist from "../Wishlist/Wishlist.jsx";
import { RxCross1 } from "react-icons/rx";
import { backend_url } from "../../server.js";

/**
 * The `Header` component represents the header section of the application. It includes the following functionality:
 * - Displays the application logo and name
 * - Provides a search bar to search for products
 * - Displays links for the user to login, sign up, or access their profile
 * - Displays icons for the user's wishlist and shopping cart
 * - Includes a dropdown menu for navigating through different product categories
 * - Includes a mobile-friendly version of the header with a sidebar menu
 *
 * The component uses various state variables to manage the state of the search, dropdown menu, and other UI elements.
 * It also listens for scroll events to change the appearance of the header when the user scrolls down the page.
 *
 * @param {Object} props - The component props
 * @param {string} props.activeHeading - The currently active heading in the navigation menu
 * @returns {JSX.Element} The `Header` component
 */
const Header = ({ activeHeading }) => {
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);
  const { isSeller } = useSelector((state) => state.seller);
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { allProducts } = useSelector((state) => state.products);
  const [searchData, setSearchData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts =
      allProducts &&
      allProducts.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredProducts);
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });
  return (
    <>
      <div className={`${styles.section}`}>
        <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
          <div>
            <Link to="/">
              <h1 className="font-extrabold flex text-[#9cef4e] text-4xl">
                QuirkyCart
              </h1>
            </Link>
            {/* <h1 className="font-extrabold flex items-center justify-center text-[#9cef4e] text-2xl">Kunal</h1> */}
          </div>

          {/* search bar */}
          <div className="w-[50%] relative">
            <input
              type="text"
              placeholder="Search item...."
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[45px] px-3 w-full border-stone-900 border-[2px] rounded-lg"
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1.5 cursor-text"
            />
            {searchData && searchData.length !== 0 ? (
              <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                {searchData &&
                  searchData.map((i, index) => {
                    return (
                      <Link to={`/product/${i._id}`}>
                        <div className="w-full flex items-start-py-3">
                          <img
                            src={`${i.images[0]?.url}`}
                            alt=""
                            className="w-[40px] h-[40px] mr-[10px]"
                          />
                          <h1>{i.name}</h1>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            ) : null}
          </div>

          <div className={`${styles.button} `}>
            <Link to={`${isSeller ? "/dashboard" : "/shop-create"}`}>
              <h1 className="text-[#fff] flex items-center cursor-pointer">
                {isSeller ? "Go Dashboard" : "Become Seller"}
                <IoIosArrowForward className="ml-1" />
              </h1>
            </Link>
          </div>
        </div>
      </div>

      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        } transition hidden 800px:flex items-center justify-between w-full bg-[#9cef4e] h-[70px]`}
      >
        <div
          className={`${styles.section} relative ${styles.noramlFlex} justify-between `}
        >
          {/* categories */}
          <div onClick={() => setDropDown(!dropDown)}>
            <div className="relative h-[60px] mt-[5px] w-[270px] hidden 1000px:block">
              <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
              <button
                className={`h-[100%] w-full flex justify-between items-center  pl-10 bg-white font-sans text-lg font-[500] select-none rounded-md`}
              >
                All Categories
              </button>
              <IoIosArrowDown
                size={20}
                className="absolute right-2 top-4 cursor-pointer"
                onClick={() => setDropDown(!dropDown)}
              />
              {dropDown ? (
                <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              ) : null}
            </div>
          </div>

          {/* navitems */}
          <div className={`${styles.noramlFlex}`}>
            <Navbar active={activeHeading} />
          </div>

          <div className="flex">
            <div className={`${styles.noramlFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenWishlist(true)}
              >
                <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
                <span className="absolute right-0 top-0 rounded-full bg-[#ff5a3d] w-4 h-4 right top p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {wishlist && wishlist.length}
                </span>
              </div>
            </div>

            <div className={`${styles.noramlFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenCart(true)}
              >
                <AiOutlineShoppingCart
                  size={30}
                  color="rgb(255 255 255 / 83%)"
                />
                <span className="absolute right-0 top-0 rounded-full bg-[#ff5a3d] w-4 h-4 right top p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {cart && cart.length}
                </span>
              </div>
            </div>

            <div className={`${styles.noramlFlex}`}>
              <div className="relative cursor-pointer">
                {isAuthenticated ? (
                    <Link to="/profile">
                      {user && user.avatar && (
                        <img
                          src={`${user?.avatar?.url}`}
                          alt=""
                          className="w-[50px] h-[50px] rounded-full border-[3px] border-[#0eae88]"
                        />
                      )}
                    </Link>
                ) : (
                    <Link
                      to="/login"
                    >
                      <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                    </Link>
                )}
              </div>
            </div>

            {/* cart popup */}
            {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

            {/* cart popup */}
            {openWishlist ? (
              <Wishlist setOpenWishlist={setOpenWishlist} />
            ) : null}
          </div>
        </div>
      </div>

      {/* Mobile header */}
      <div
        className={`w-full h-[55px] fixed bg-[#fff] z-50 top-0 left-0 shodow-sm 800px:hidden`}
      >
        <div className="w-full flex items-center justify-between">
          <div>
            <BiMenuAltLeft
              size={40}
              className="ml-4 cursor-pointer"
              onClick={() => setOpen(true)}
            />
          </div>
          <div className="w-14">
            <Link to="/">
              {/* <img
                src="https://ouch-cdn2.icons8.com/0leESmvkns4GrVJPfvmlzEAg0WCsNMhwCm8AcWAyyaM/rs:fit:368:254/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvNzYv/ZjZiZDQ3YzgtNmY2/YS00ODk1LWIzMDMt/YWNhOTU4M2M4M2Nk/LnN2Zw.png"
                alt="kunal pic"
                className="mt-3 cursor-pointer"
              /> */}
              <h1 className="font-extrabold flex text-[#9cef4e] text-4xl">
                QuirkyCart
              </h1>
            </Link>
          </div>

          <div>
            <div className="relative mr-[20px]">
              <AiOutlineShoppingCart size={30} className="cursor-pointer" />
              <span className="absolute right-0 top-0 rounded-full bg-[#ff5a3d] w-4 h-4 right top p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                {cart && cart.length}
              </span>
            </div>
          </div>
        </div>

        {/* header sidebar */}
        {open && (
          <div
            className={`fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0`}
          >
            <div className="fixed w-[60%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll">
              <div className="w-full justify-between flex pr-3">
                <div>
                  <div className="relative mr-[15px]">
                    <AiOutlineHeart size={30} className="mt-5 ml-3" />
                    <span className="absolute right-0 top-0 rounded-full bg-[#ff5a3d] w-4 h-4 right top p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                      0
                    </span>
                  </div>
                </div>
                <div className="flex w-full justify-end pt-5 pr-5">
                  <RxCross1
                    size={25}
                    className="cursor-pointer"
                    onClick={() => setOpen(false)}
                  />
                </div>
              </div>

              <div className="my-8 w-[92%] m-auto h-[40px] relative">
                <input
                  type="text"
                  placeholder="Search item...."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="rounded-lg h-[40px] px-3 w-full border-stone-900 border-[2px] shadow-2xl drop-shadow-xl"
                />
                {searchData && (
                  <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-10 p-4">
                    {searchData.map((i) => {
                      const d = i.name;

                      const Product_name = d.replace(/\s+/g, "-");
                      return (
                        <Link to={`/product/${Product_name}`}>
                          <div className="w-full flex items-start-py-3">
                            <img
                              src={i.image_Url[0].url}
                              alt=""
                              className="w-[40px] h-[40px] mr-[10px]"
                            />
                            <h1>{i.name}</h1>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className={`${styles.noramlFlex}`}>
                <Navbar active={activeHeading} />
              </div>
              <div className={`${styles.button} ml-4 !rounded-[4px] `}>
                <Link to={`${isSeller ? "/dashboard" : "/shop-create"}`}>
                  <h1 className="text-[#fff] flex items-center">
                    {isSeller ? "Go Dashboard" : "Become Seller"}
                    <IoIosArrowForward className="ml-1" />
                  </h1>
                </Link>
              </div>

              <br />
              <br />

              <div className="flex w-full justify-center">
                {isAuthenticated ? (
                  <div>
                    <Link to="/profile">
                      <img
                        src={`${backend_url}${user.avatar}`}
                        alt=""
                        className="w-[40px] h-[40px] rounded-full border-[4px] border-[#0eae88]"
                      />
                    </Link>
                  </div>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-[18px] pr-[10px] text-[#000000b7]"
                    >
                      Login /
                    </Link>
                    <Link
                      to="/sign-up"
                      className="text-[18px] text-[#000000b7]"
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
