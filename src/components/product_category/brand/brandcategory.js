import React from "react";
import { isEmpty } from "lodash";
import Link from "next/link";
import { sanitize } from "../../../../src/utils/miscellaneous";

export default function brandcategory({ data }) {
  return (
    <div>
      {!isEmpty(
        data?.page?.nodes[0]?.products?.nodes[0]?.productTaxonomies?.nodes
      ) ? (
        <div className="space-x-2 mt-2 flex flex-col">
          <span className="text-gray-800 mx-2 my-4 text-left font-semibold">
            Categories:{" "}
          </span>
          <div>
            <ul className="flex flex-wrap align items-start gap-1">
              {data?.page?.nodes[0]?.products?.nodes[0]?.productTaxonomies?.nodes.map(
                (child) => (
                  <li
                    key={child.name}
                    className="text-gray-500 dark:text-gray-400 mb-3"
                  >
                    <Link href={child.uri}>
                      <a
                        className="text-gray-600 border border-gray-500 rounded-full px-2 text-sm py-0.5 pb-1.5 hover:bg-gray-200"
                        dangerouslySetInnerHTML={{
                          __html: sanitize(child.name ?? {}),
                        }}
                      />
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}
