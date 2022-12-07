import React from "react";
import Link from "next/link";
import { sanitize } from "../../../utils/miscellaneous";

export default function Brands({ data }) {
  return (
    <div className="space-x-2 mt-5 flex flex-col">
      <span className="text-gray-800 mx-2 my-4 text-left font-semibold">
        Brands:{" "}
      </span>
      <div>
        <ul className="flex flex-wrap  align items-start gap-1 p-2">
          {data.map((brand) =>
            brand?.seo?.robots[1] != "noindex" ? (
              <li
                key={brand?.name}
                className="text-gray-500 dark:text-gray-400 mb-3"
              >
                <Link href={brand.uri}>
                  <a
                    className="text-gray-600 border-2 border-gray-300 rounded-full px-2 overflow-hidden text-sm py-0.5 pb-1.5 hover:bg-gray-200"
                    dangerouslySetInnerHTML={{
                      __html: sanitize(brand?.name ?? {}),
                    }}
                  />
                </Link>
              </li>
            ) : null
          )}
        </ul>
      </div>
    </div>
  );
}
