import React from "react";
import { isEmpty } from "lodash";
import { sanitize } from "../../../utils/miscellaneous";

export default function IntroFeaturedImage({ data }) {
  return (
    <div className="px-4">
      {!isEmpty(data?.page?.nodes[0]?.roundupFields?.roundupFeatureImage) ? (
        <img
          className="sm:w-80 sm:float-right sm:p-5 mt-5"
          src={data?.page?.nodes[0]?.roundupFields?.roundupFeatureImage}
        />
      ) : null}
      {!isEmpty(data?.page?.nodes[0]?.roundupFields?.intro) ? (
        <div
          className="prose max-w-none py-8"
          dangerouslySetInnerHTML={{
            __html: sanitize(data?.page?.nodes[0]?.roundupFields?.intro ?? {}),
          }}
        />
      ) : null}
    </div>
  );
}
