import Link from "next/link";
import Image from "../../image";
import { sanitize } from "../../../utils/miscellaneous";

const Product = ({ product, index }) => {
  return (
    <div className="p-0 pb-3 h-68 max-w-sm bg-white rounded-none  dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col relative bg-white">
        <Image
          src={product?.single_product_acf?.productImageMainUrl}
          height="256"
          width="256"
          objectFit="contain"
          alt={product?.title}
        />
        <div className="hidden md:flex bg-opacity-0 hover:bg-opacity-20 group bg-black w-full h-full absolute duration-500">
          <a
            className="py-1 px-5 opacity-0 hover:bg-gray-300 border-gray-300 border-2 leading-tight font-semibold group-hover:opacity-80 text-black text-sm -mt-8 rounded-full p-1 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white"
            href={product?.single_product_acf?.productUrl}
          >
            View On Amazon
          </a>
          <div className="opacity-0 hover:bg-gray-200 font-semibold border-gray-300 border-2 leading-tight group-hover:opacity-80 item mt-10 rounded-full text-black absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-white">
            <button
              id="readProductButton"
              onClick={() => {
                setMenuVisibility(!isMenuVisible);
                activeCategory(index);
              }}
              className={`${
                isActive(index) ? "..." : ""
              } block text-black bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-0.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
              data-modal-toggle="readProductModal"
              type="button"
            >
              Quick View
            </button>
          </div>
        </div>
      </div>
      {/* Button */}

      {/* modal */}
      <div
        id="readProductModal"
        tabIndex="-1"
        aria-hidden="true"
        className={`${
          isMenuVisible && index == activeId ? "flex" : "hidden"
        } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center bg-black bg-opacity-60 w-screen h-screen`}
      >
        <div className="relative p-4 w-full max-w-4xl h-full md:h-auto">
          {/* <!-- Modal content --> */}
          <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            {/* <!-- Modal header --> */}
            <div className="flex overscroll-contain">
              <div className="flex justify-between mb-4 rounded-t sm:mb-5">
                <div className="text-lg w-80 justify-center items-center flex text-gray-900 md:text-xl dark:text-white">
                  <Image
                    src={product?.single_product_acf?.productImageMainUrl}
                    height="256"
                    width="256"
                    objectFit="cover"
                    alt={product?.title}
                  />
                </div>
              </div>
              <dl className="text-left p-6">
                <div className="absolute right-3 top-3">
                  <button
                    onClick={() => {
                      setMenuVisibility(!isMenuVisible);
                      activeCategory(index);
                    }}
                    className={`${
                      isActive(index) ? "..." : ""
                    } text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex dark:hover:bg-gray-600 dark:hover:text-white`}
                    type="button"
                    data-modal-toggle="readProductModal"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
                <h3 className="font-semibold text-xl ">{product?.title}</h3>
                <div
                  className="mt-4 text-gray-700 prose"
                  dangerouslySetInnerHTML={{
                    __html: sanitize(
                      product?.single_product_acf?.productAida ?? {}
                    ),
                  }}
                />
                <div className="mt-6 flex gap-3 border-b border-gray-200 pb-6 pt-0">
                  <a
                    href={product?.single_product_acf?.productUrl}
                    className="text-sm border border-gray-500 bg-green-400 text-gray-600 px-8 py-2 font-medium rounded-full uppercase flex items-center gap-2 hover:text-primary transition"
                  >
                    <i className="fa-solid fa-heart"></i> View On Amazon
                  </a>
                  <a
                    href={product?.uri}
                    className="text-sm border border-gray-500 bg-yellow-300 text-gray-600 px-8 py-2 font-medium rounded-full uppercase flex items-center gap-2 hover:text-primary transition"
                  >
                    <i className="fa-solid fa-heart"></i>Product Details
                  </a>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
      <h5 className="py-3 text px-2 tracking-tight text-gray-900 font-semibold dark:text-white uppercase hover:text-blue-500">
        <a href={product?.uri}>
          {product?.title.split(" ").slice(0, 8).join(" ")}
        </a>
      </h5>
    </div>
  );
};

{
  product_list.map((product, index) => {
    return (
      <div
        className="p-0 pb-3 h-68 max-w-sm bg-white rounded-none  dark:bg-gray-800 dark:border-gray-700"
        key={product?.title}
      >
        <div className="flex flex-col relative bg-white">
          <Image
            src={product?.single_product_acf?.productImageMainUrl}
            height="256"
            width="256"
            objectFit="contain"
            alt={product?.title}
          />
          <div className="hidden md:flex bg-opacity-0 hover:bg-opacity-20 group bg-black w-full h-full absolute duration-500">
            <a
              className="py-1 px-5 opacity-0 hover:bg-gray-300 border-gray-300 border-2 leading-tight font-semibold group-hover:opacity-80 text-black text-sm -mt-8 rounded-full p-1 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white"
              href={product?.single_product_acf?.productUrl}
            >
              View On Amazon
            </a>
            <div className="opacity-0 hover:bg-gray-200 font-semibold border-gray-300 border-2 leading-tight group-hover:opacity-80 item mt-10 rounded-full text-black absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-white">
              <button
                id="readProductButton"
                onClick={() => {
                  setMenuVisibility(!isMenuVisible);
                  activeCategory(index);
                }}
                className={`${
                  isActive(index) ? "..." : ""
                } block text-black bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-0.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
                data-modal-toggle="readProductModal"
                type="button"
              >
                Quick View
              </button>
            </div>
          </div>
        </div>
        {/* Button */}

        {/* modal */}
        <div
          id="readProductModal"
          tabIndex="-1"
          aria-hidden="true"
          className={`${
            isMenuVisible && index == activeId ? "flex" : "hidden"
          } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center bg-black bg-opacity-60 w-screen h-screen`}
        >
          <div className="relative p-4 w-full max-w-4xl h-full md:h-auto">
            {/* <!-- Modal content --> */}
            <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
              {/* <!-- Modal header --> */}
              <div className="flex overscroll-contain">
                <div className="flex justify-between mb-4 rounded-t sm:mb-5">
                  <div className="text-lg w-80 justify-center items-center flex text-gray-900 md:text-xl dark:text-white">
                    <Image
                      src={product?.single_product_acf?.productImageMainUrl}
                      height="256"
                      width="256"
                      objectFit="cover"
                      alt={product?.title}
                    />
                  </div>
                </div>
                <dl className="text-left p-6">
                  <div className="absolute right-3 top-3">
                    <button
                      onClick={() => {
                        setMenuVisibility(!isMenuVisible);
                        activeCategory(index);
                      }}
                      className={`${
                        isActive(index) ? "..." : ""
                      } text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex dark:hover:bg-gray-600 dark:hover:text-white`}
                      type="button"
                      data-modal-toggle="readProductModal"
                    >
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </div>
                  <h3 className="font-semibold text-xl ">{product?.title}</h3>
                  <div
                    className="mt-4 text-gray-700 prose"
                    dangerouslySetInnerHTML={{
                      __html: sanitize(
                        product?.single_product_acf?.productAida ?? {}
                      ),
                    }}
                  />
                  <div className="mt-6 flex gap-3 border-b border-gray-200 pb-6 pt-0">
                    <a
                      href={product?.single_product_acf?.productUrl}
                      className="text-sm border border-gray-500 bg-green-400 text-gray-600 px-8 py-2 font-medium rounded-full uppercase flex items-center gap-2 hover:text-primary transition"
                    >
                      <i className="fa-solid fa-heart"></i> View On Amazon
                    </a>
                    <a
                      href={product?.uri}
                      className="text-sm border border-gray-500 bg-yellow-300 text-gray-600 px-8 py-2 font-medium rounded-full uppercase flex items-center gap-2 hover:text-primary transition"
                    >
                      <i className="fa-solid fa-heart"></i>Product Details
                    </a>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <h5 className="py-3 text px-2 tracking-tight text-gray-900 font-semibold dark:text-white uppercase hover:text-blue-500">
          <a href={product?.uri}>
            {product?.title.split(" ").slice(0, 8).join(" ")}
          </a>
        </h5>
      </div>
    );
  });
}

export default Product;
