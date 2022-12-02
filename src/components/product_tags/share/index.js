import React from "react";
import { useState } from "react";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { FacebookIcon, TwitterIcon } from "react-share";

export default function Share({ data }) {
  return (
    <div className="flex justify-between items-center py-6 border-t border-b border-gray-200 dark:border-gray-700">
      <aside aria-label="Share social media" s>
        <div className="inline-flex items-center  mr-2 text-xs font-medium text-gray-900 no-underline bg-white rounded-lg border border-gray-200 focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600  dark:hover:text-white dark:hover:bg-gray-700">
          <FacebookShareButton
            url={`https://petsmarketplace.com${data?.page?.nodes[0]?.uri}`}
            quote={"Best Pets Products"}
            hashtag={`#${data?.page?.nodes[0]?.name.replace(" ", "")}`}
            description={"aiueo"}
            className="inline-flex items-center  text-xs font-medium w-24 justify-center h-8 border"
          >
            <FacebookIcon
              size={18}
              iconFillColor="white"
              round
              className="mr-2 p-0 "
              bgStyle={{ fill: "black" }}
            />{" "}
            Share
          </FacebookShareButton>
        </div>
        <div className="inline-flex items-center  mr-2 text-xs font-medium text-gray-900 no-underline bg-white rounded-lg border border-gray-200 focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600  dark:hover:text-white dark:hover:bg-gray-700">
          <TwitterShareButton
            title={"test"}
            url={`https://petsmarketplace.com${data?.page?.nodes[0]?.uri}`}
            hashtags={[`#${data?.page?.nodes[0]?.name.replace(" ", "")}`]}
            className="inline-flex items-center  text-xs font-medium w-24 justify-center h-8 border"
          >
            <TwitterIcon
              size={18}
              iconFillColor="white"
              round
              className="mr-2 p-0 "
              bgStyle={{ fill: "black" }}
            />
            Tweet
          </TwitterShareButton>
        </div>
        <button
          type="button"
          onClick={() =>
            navigator.clipboard.writeText(
              `https://petsmarketplace.com${data?.page?.nodes[0]?.uri}`
            )
          }
          className="inline-flex items-center py-2 px-6 text-xs font-medium text-gray-900 no-underline bg-white rounded-lg border border-gray-200 focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-0 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          {" "}
          <svg
            className="mr-2 w-4 h-4"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
              clipRule="evenodd"
            ></path>
          </svg>{" "}
          Copy link
        </button>
        <button
          data-tooltip-target="tooltip-save"
          className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-gray-400 focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600"
          type="button"
        >
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            ></path>
          </svg>
        </button>
      </aside>
    </div>
  );
}
