import React from "react";
import { sanitize } from "../../../utils/miscellaneous";
import Link from "next/link";
import Image from "next/image";

export default function TagProducts({ product }) {
  return (
    <div className="w-full">
      {product?.nodes.map((product) => {
        return (
          <div
            key={product?.title}
            className="border flex my-5 flex-col max-w-full lg:max-w-full items-center bg-white rounded-none  shadow-lg md:flex-row  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <div className=" flex justify-between rounded-t my-auto ">
              <div className="w-80 text-lg justify-center items-center flex text-gray-900 md:text-xl dark:text-white my-auto py-6">
                <Image
                  src={product?.single_product_acf?.productImageMainUrl}
                  height="256"
                  width="256"
                  objectFit="contain"
                />
              </div>
            </div>

            <div className="flex flex-col p-4 leading-normal ">
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white px-4">
                {product?.title}
              </h5>

              <div
                className="text tracking-tight py-2 px-4 text-gray-600"
                dangerouslySetInnerHTML={{
                  __html: sanitize(
                    product?.single_product_acf?.productDescription ?? {}
                  ),
                }}
              />
              <div className="flex  flex-col my-3 px-4 items-center  xs:flex-row">
                <Link href={product?.single_product_acf?.productUrl}>
                  <button
                    type="button"
                    className="py-2.5 w-40 px-5 mr-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border-4 border-gray-300 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    View Latest Price
                  </button>
                </Link>

                <Link href={product?.uri}>
                  <button
                    type="button"
                    className="py-2.5 w-40 px-5 mr-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border-4 border-gray-300 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    Product Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
