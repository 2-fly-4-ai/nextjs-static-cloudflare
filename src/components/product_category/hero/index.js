import React from "react";
import { isEmpty } from "lodash";

export default function Hero({ data }) {
  return (
    <div
      className="flex flex-col lg:items-start  my-5 border pt-2 content-center bg-gradient-to-r from-gray-100 to-gray-300
    "
    >
      <h1 className="px-2  pt-2">
        <a
          className="m-5 text-gray-800 text-5xl"
          href={data?.page?.nodes[0]?.name}
        >
          {data?.page?.nodes[0]?.name}
        </a>
      </h1>
      {/* <p className="text-gray-400 p-1 ml-1 text-lg font-medium">RESULTS</p> */}
      <p className="text-gray-700 font-medium m-auto gap-1.5 py-5 flex-col flex max-w-max sm:flex-row lg:ml-0 px-5 ">
        {!isEmpty(
          data?.page?.nodes[0]?.parent?.node?.parent?.node?.parent?.node?.name
        ) ? (
          <a
            className="text-sm text-gray-700 border border-gray-300 rounded-full px-4  py-1 pb-1.5 bg-white hover:bg-gray-200"
            href={data?.page?.nodes[0]?.parent?.node?.parent?.node?.uri}
          >
            {
              data?.page?.nodes[0]?.parent?.node?.parent?.node?.parent?.node
                ?.name
            }
          </a>
        ) : null}

        {!isEmpty(data?.page?.nodes[0]?.parent?.node?.parent?.node?.name) ? (
          <a
            className="text-sm text-gray-700 border border-gray-300 rounded-full px-4  py-1 pb-1.5 bg-white hover:bg-gray-200"
            href={data?.page?.nodes[0]?.parent?.node?.parent?.node?.uri}
          >
            {data?.page?.nodes[0]?.parent?.node?.parent?.node?.name}
          </a>
        ) : null}

        {!isEmpty(data?.page?.nodes[0]?.parent?.node?.name) ? (
          <a
            className="text-sm text-gray-700 border border-gray-300 rounded-full px-4  py-1 pb-1.5 bg-white hover:bg-gray-200"
            href={data?.page?.nodes[0]?.parent?.node?.uri}
          >
            {data?.page?.nodes[0]?.parent?.node?.name}
          </a>
        ) : null}

        {!isEmpty(data?.page?.nodes[0]?.name) ? (
          <a
            className="text-sm text-gray-700 border border-gray-300 rounded-full px-4  py-1 pb-1.5 bg-white hover:bg-gray-200"
            href={data?.page?.nodes[0]?.name}
          >
            {data?.page?.nodes[0]?.name}
          </a>
        ) : null}
      </p>
    </div>
  );
}
