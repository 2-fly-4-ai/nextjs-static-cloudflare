import client from "../../../src/apollo/client";
import Layout from "../../../src/components/layout";
import { PER_PAGE_FIRST } from "../../../src/utils/pagination";
import { handleRedirectsAndReturnData } from "../../../src/utils/slug";
import { GET_PAGE } from "../../../src/queries/category_index/index";
import Link from "next/link";
import { isEmpty } from "lodash";

const Category = ({ data }) => {
  console.log({ data });
  return (
    <Layout data={data}>
      <div className="py-8 bg-gray-100">
        <div className="mx-auto max-w-screen-2xl text-center flex px-4 flex-col-reverse lg:flex-row ">
          {/* HEADER COMPONENT */}
          <div className="py-8">
            <div className="mx-auto max-w-screen-2xl text-left">
              <h1 className="mb-6 text-5xl tracking-tight text-gray-800 dark:text-white">
                Product Categories
              </h1>
              <h2 className="mb-6 text-2xl tracking-tight text-gray-800 dark:text-white">
                Select category below to see recommended pet products
              </h2>
            </div>
            <div className="mx-auto max-w-screen-2xl text font-medium text-left flex cursor-pointer flex-wrap">
              <span className="px-2 font-bold hover:bg-gray-100 hover:text-blue-700 ">
                Jump To:{" "}
              </span>
              {data?.productTaxonomies?.nodes.map((tax) => {
                return tax?.children?.nodes.map((tax2) => {
                  return (
                    <span
                      key={tax2?.name}
                      className="border-r px-2 hover:bg-gray-100 hover:text-blue-700 "
                    >
                      {tax2?.name}
                    </span>
                  );
                });
              })}
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-screen-2xl text-center flex px-4 flex-col gap-6 ">
          {/* HEADER COMPONENT */}

          {data?.productTaxonomies?.nodes.map((tax) => {
            return tax?.children?.nodes.map((tax) => {
              return (
                <div className="flex flex-col content-start items-start w-full border bg-white shadow-lg">
                  <div className="max-w-screen-2xl border-b w-full flex content-start p-6">
                    <h2 className="text-3xl tracking-tight text-gray-800 dark:text-white  hover:text-blue-700">
                      <a href={tax?.uri}>{tax?.name}</a>
                    </h2>
                  </div>
                  <div className="mx-auto max-w-screen-2xl text-sm font-medium text-left  cursor-pointer  w-full p-8">
                    <div className="grid gap-10 lg:gap-6 lg:grid-cols-1 sm:grid-cols-2">
                      {tax?.children?.nodes?.map((tax) => {
                        return (
                          <div>
                            <Link
                              key={tax?.name}
                              href={tax?.uri}
                              className="px-2  hover:text-blue-700"
                            >
                              <h3 className="text-2xl font-normal  hover:text-blue-700">
                                {tax?.name}
                              </h3>
                            </Link>
                            <div className="grid gap-10 lg:gap-6  md:grid-cols-3 lg:grid-cols-5 sm:grid-cols-2 py-6">
                              {!isEmpty(tax?.children?.nodes)
                                ? tax?.children?.nodes?.map((tax) => {
                                    return (
                                      <div
                                        className="font-base text-base text text-gray-500 hover:text-blue-700 antialiased"
                                        key={tax?.name}
                                      >
                                        {tax?.name}
                                      </div>
                                    );
                                  })
                                : null}
                            </div>
                          </div>
                        );
                      })}

                      {/* <div>
                        {!isEmpty(tax?.children?.nodes)
                          ? tax?.children?.nodes?.map((tax) => {
                              return tax?.children?.nodes?.map((tax) => {
                                console.log(tax);
                                return <div key={tax?.name}>{tax?.name}</div>;
                              });
                            })
                          : null}
                      </div> */}
                    </div>
                  </div>
                </div>
              );
            });
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Category;

export async function getStaticProps() {
  const { data, errors } = await client.query({
    query: GET_PAGE,
  });

  const defaultProps = {
    props: {
      data: data || {},
    },
    /**
     * Revalidate means that if a new request comes to server, then every 1 sec it will check
     * if the data is changed, if it is changed then it will update the
     * static file inside .next folder with the new data, so that any 'SUBSEQUENT' requests should have updated data.
     */
    revalidate: 1,
  };

  return handleRedirectsAndReturnData(defaultProps, data, errors, "posts");
}
