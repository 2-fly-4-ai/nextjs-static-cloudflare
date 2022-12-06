import React from "react";
import Link from "next/link";
import { sanitize } from "../../../utils/miscellaneous";

export default function Tags({ data }) {
  let page_tags = [];

  data?.page?.products?.nodes.map((product) => {
    product?.productTags?.nodes.map((product) => {
      let x = product?.name;
      let y = x.split(" ").length;
      let z = x.split("").length;
      if (y > 4 || z > 25) {
        return;
      }

      page_tags.push(product);
    });
  });

  page_tags = page_tags.filter(
    (v, i, a) =>
      a.findIndex((t) => JSON.stringify(t) === JSON.stringify(v)) === i
  );

  console.log(page_tags);

  console.log("YYYYYYYYYY", data?.page?.products);

  console.log(page_tags);

  return (
    <div className="space-x-2 mt-2 flex flex-col ">
      <span className="text-gray-800 mx-2 my-4 px-2 text-xl text-left font-semibold">
        Related Articles:{" "}
      </span>
      <div>
        <ul className="flex flex-wrap align items-start gap-1 p-2">
          {page_tags.map((tag) => (
            <li
              key={tag.name}
              className="text-gray-500 dark:text-gray-400 mb-3"
            >
              <Link href={tag.uri}>
                <a
                  className="text-gray-600 border-2 border-gray-300 rounded-full px-2 text-sm py-0.5 pb-1.5 hover:bg-gray-200"
                  dangerouslySetInnerHTML={{
                    __html: sanitize(tag?.name ?? {}),
                  }}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
