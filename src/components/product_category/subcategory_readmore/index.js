import React from "react";
import { isEmpty, slice } from "lodash";
import Link from "next/link";
import { sanitize } from "../../../utils/miscellaneous";

export default function subcategory({ data }) {
  return (
    <div>
      {!isEmpty(data?.page?.children?.nodes) ? (
        <div className="space-x-2 mt-2 flex flex-col">
          <span className="text-gray-800 mx-4 my-4 text-left font-semibold">
            Refine Your Search to See More Products :{" "}
          </span>
          <div>
            <ul className="flex flex-wrap align  items-start gap-2 p-2">
              {data?.page?.children?.nodes.map((child) => (
                <li
                  key={child.name}
                  className="text-gray-500 dark:text-gray-400 mb-3"
                >
                  <Link href={child.uri}>
                    <a
                      className="py-2.5 uppercase px-7 mr-2 text-sm font-medium text-gray-700 bg-white rounded-full border-4 border-gray-200 hover:bg-gray-100 hover:text-blue-700  focus:outline-none  dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
                      dangerouslySetInnerHTML={{
                        __html: sanitize(child.name ?? {}),
                      }}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}
