import React from "react";
import { isEmpty } from "lodash";
import { sanitize } from "../../../utils/miscellaneous";
import Image from "next/image";

export default function IntroFeaturedImage({ data }) {
  return (
    <div className="px-4">
      {!isEmpty(data?.page?.roundupFields?.roundupFeatureImage) ? (
        <div className="sm:w-80 sm:float-right p-8">
          <Image
            src={data?.page?.roundupFields?.roundupFeatureImage}
            width="400"
            height="400"
          />
        </div>
      ) : null}
      {!isEmpty(data?.page?.roundupFields?.intro) ? (
        <div
          className="prose max-w-none py-8"
          dangerouslySetInnerHTML={{
            __html: sanitize(data?.page?.roundupFields?.intro ?? {}),
          }}
        />
      ) : null}
    </div>
  );
}
