import React from "react";
import { isEmpty, slice } from "lodash";
import Link from "next/link";
import { sanitize } from "../../../utils/miscellaneous";

export default function subcategory({ data }) {
  console.warn({ data });
  return (
    <div>
      {!isEmpty(data?.page?.nodes[0]?.children?.nodes) ? (
        <div className="space-x-2 mt-2 flex flex-col">
          <span className="text-gray-800 mx-4 my-4 text-left font-semibold">
            Refine Your Search to See More Products :{" "}
          </span>
          <div>
            <ul className="flex flex-wrap align  items-start gap-2 p-2">
              {data?.page?.nodes[0]?.children?.nodes.map((child) => (
                <li
                  key={child.name}
                  className="text-gray-500 dark:text-gray-400 mb-3"
                >
                  <Link href={child.uri}>
                    <a
                      className="bg-green-400 hover:bg-blue-400 text-white font-medium py-2 px-4 border-b-4 border-green-700 hover:border-blue-500 rounded"
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
