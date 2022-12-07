import client from "../src/apollo/client";
import { GET_PAGE } from "../src/queries/pages/get-page";
import { useRouter } from "next/router";
import { isEmpty } from "lodash";
import {
  FALLBACK,
  handleRedirectsAndReturnData,
  isCustomPageUri,
} from "../src/utils/slug";
import { sanitize } from "../src/utils/miscellaneous";
import Layout from "../src/components/layout";
import { empty } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";

export default function Home({ data }) {
  console.log({ data });
  return (
    <Layout data={data}>
      <div>
        <section className="bg-white dark:bg-gray-900 ">
          <div className=" grid max-w-screen-2xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0  lg:py-16  xl:py-16  lg:grid-cols-12">
            <div className=" lg:col-span-6 w-full pr-10 flex flex-col my-auto">
              <div className="max-w-screen-xl  py-4 mr-auto text-center lg:py-4 lg:px-2">
                <dl className="grid max-w-screen-md gap-2 sm:gap-8 mx-auto text-gray-900 grid-cols-3 dark:text-white">
                  <div className="rounded-lg lg:hover:-translate-y-2 duration-500 flex flex-col items-center justify-center bg-green-400 xl:p-3 p-1 shadow-lg">
                    <dt className="mb-2 text-3xl md:text-4xl ">73M+</dt>
                    <dd className="font-medium text-gray-900 dark:text-gray-400">
                      developers
                    </dd>
                  </div>
                  <div className="rounded-lg lg:hover:-translate-y-2 duration-500 flex flex-col items-center justify-center bg-yellow-300 xl:p-3 p-1 shadow-lg">
                    <dt className="mb-2 text-3xl md:text-4xl ">1B+</dt>
                    <dd className="font-medium  text-gray-900 dark:text-gray-400">
                      contributors
                    </dd>
                  </div>
                  <div className="rounded-lg lg:hover:-translate-y-2 duration-500 flex flex-col items-center justify-center bg-red-400 xl:p-3 p-1 shadow-lg">
                    <dt className="mb-2 text-3xl md:text-4xl ">4M+</dt>
                    <dd className="font-medium text-gray-900 dark:text-gray-400">
                      organizations
                    </dd>
                  </div>
                </dl>
              </div>
              <h1 className="w-full mb-4 text-4xl  tracking-tight leading-none md:text-5xl lg:text-4xl 2xl:text-6xl dark:text-white">
                {data?.header?.siteTagLine}
              </h1>
              <p className="max-w-xl mb-6  text-gray-600 lg:mb-4 md:text-lg lg:text-lg dark:text-gray-400">
                From checkout to global sales tax compliance, companies around
                the world use Flowbite to simplify their payment stack. From
                checkout to global sales tax compliance, companies around the
                world use Flowbite to simplify their payment stack.
              </p>

              <Link
                href="/shop/category/pet-supplies"
                className="inline-flex rounded-full items-center justify-center px-5 mr-auto py-3 text-lg font-medium text-center text-gray-700 border border-gray-600  hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              >
                Go to shop
              </Link>
            </div>

            <div className=" lg:col-span-6 justify-center flex xl:flex 2xl:h-full  max-h-almost-screen">
              <Image
                className="xl:h-full"
                src="https://images.unsplash.com/photo-1551730458-be400bef0161?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                width={800}
                height={600}
                alt="majestic dog"
              />
            </div>
          </div>
        </section>

        {/* The gaaaye animals box */}

        <section className="bg-white bg-no-repeat bg-cover bg-center bg-blend-multiply max-w-screen-2xl mx-auto px-6">
          <div className="relative py-4 2xl:px-0 lg:py-6  lg:px-6 mx-auto text-black  z-1 flex flex-col">
            <div className="grid gap-0 md:gap-2 lg:pt-6 2xl:mt-0 lg:mt-0 md:grid-cols-2 lg:grid-cols-7 ">
              <div className="flex flex-col justify-items-center items-center shadow-lg lg:rounded-full bg-green-300 p-2 lg:hover:-translate-y-2 duration-500">
                <Image
                  src="https://s7d2.scene7.com/is/image/PetSmart/WEB-1178113-Jan22_DEAL1_Dog"
                  className="rounded-full"
                  width={200}
                  height={200}
                  alt="dog"
                />

                <Link
                  href="/shop/category/pet-supplies"
                  className="mt-2 mb-4 inline-flex  p-2 bg-green-400 rounded-2xl items-center text-sm font-semibold text-primary-500 hover:underline"
                >
                  <button className="y-1.5  m-2 uppercase px-7 justify-center text-sm font-medium text-gray-700 bg-white rounded-full border-2 border-gray-200 hover:bg-gray-100 hover:text-blue-700  focus:outline-none  dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center">
                    Dogs
                  </button>
                </Link>
              </div>
              <div className="flex flex-col justify-items-center items-center shadow-lg lg:rounded-full bg-yellow-300 p-2 lg:hover:-translate-y-2 duration-500">
                <Image
                  src="https://s7d2.scene7.com/is/image/PetSmart/WEB-1178113-Jan22_DEAL2_Cat"
                  className="rounded-full"
                  width={200}
                  height={200}
                  alt="cat"
                />
                <Link
                  href="/shop/category/pet-supplies"
                  className="mt-2 mb-4 inline-flex  p-2 bg-yellow-400 rounded-2xl items-center text-sm font-semibold text-primary-500 hover:underline"
                >
                  <button className="y-1.5  m-2 uppercase px-7 justify-center text-sm font-medium text-gray-700 bg-white rounded-full border-2 border-gray-200 hover:bg-gray-100 hover:text-blue-700  focus:outline-none  dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center">
                    Cats
                  </button>
                </Link>
              </div>
              <div className="flex flex-col justify-items-center items-center shadow-lg lg:rounded-full bg-red-400 p-2 lg:hover:-translate-y-2 duration-500">
                <Image
                  src="https://s7d2.scene7.com/is/image/PetSmart/WEB-1178113-Jan22_DEAL3_Fish"
                  className="rounded-full"
                  width={200}
                  height={200}
                  alt="dog"
                />
                <Link
                  href="/shop/category/pet-supplies"
                  className="mt-2 mb-4 inline-flex  p-2 bg-red-600  rounded-2xl items-center text-sm font-semibold text-primary-500 hover:underline"
                >
                  <button className="y-1.5  m-2 uppercase px-7 justify-center text-sm font-medium text-gray-700 bg-white rounded-full border-2 border-gray-200 hover:bg-gray-100 hover:text-blue-700  focus:outline-none  dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center">
                    Fish
                  </button>
                </Link>
              </div>
              <div className="flex flex-col justify-items-center items-center shadow-lg lg:rounded-full bg-blue-400 p-2 lg:hover:-translate-y-2 duration-500">
                <Image
                  src="https://s7d2.scene7.com/is/image/PetSmart/WEB-1178113-Jan22_DEAL4_Bird"
                  className="rounded-full"
                  width={200}
                  height={200}
                  alt="bird"
                />
                <Link
                  href="/shop/category/pet-supplies"
                  className="mt-2 mb-4 inline-flex  p-2 bg-blue-600  rounded-2xl items-center text-sm font-semibold text-primary-500 hover:underline"
                >
                  <button className="y-1.5  m-2 uppercase px-7 justify-center text-sm font-medium text-gray-700 bg-white rounded-full border-2 border-gray-200 hover:bg-gray-100 hover:text-blue-700  focus:outline-none  dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center">
                    Birds
                  </button>
                </Link>
              </div>
              <div className="flex flex-col justify-items-center items-center shadow-lg lg:rounded-full bg-orange-400 p-2 lg:hover:-translate-y-2 duration-500">
                <Image
                  src="https://s7d2.scene7.com/is/image/PetSmart/WEB-1178113-Jan22_DEAL5_Reptile"
                  className="rounded-full"
                  width={200}
                  height={200}
                  alt="reptile"
                />
                <Link
                  href="/shop/category/pet-supplies"
                  className="mt-2 mb-4 inline-flex  p-2 items-center bg-orange-600 rounded-2xl text-sm font-semibold text-primary-500 hover:underline "
                >
                  <button className="y-1.5  m-2 uppercase px-7 justify-center text-sm font-medium text-gray-700 bg-white rounded-full border-2 border-gray-200 hover:bg-gray-100 hover:text-blue-700  focus:outline-none  dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center">
                    Reptiles
                  </button>
                </Link>
              </div>
              <div className="flex flex-col justify-items-center items-center shadow-lg lg:rounded-full  bg-amber-300 p-2 lg:hover:-translate-y-2 duration-500">
                <Image
                  src="https://i.pinimg.com/736x/26/78/bc/2678bc60b5cd20ed745ae0fba79d23dd.jpg"
                  className="rounded-full max-h-64"
                  width={200}
                  height={200}
                  alt="horse"
                />
                <Link
                  href="/shop/category/pet-supplies"
                  className="mt-2 mb-4 inline-flex  p-2 items-center bg-amber-400 rounded-2xl text-sm font-semibold text-primary-500 hover:underline "
                >
                  <button className="y-1.5  m-2 uppercase px-7 justify-center text-sm font-medium text-gray-700 bg-white rounded-full border-2 border-gray-200 hover:bg-gray-100 hover:text-blue-700  focus:outline-none  dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center">
                    Horses
                  </button>
                </Link>
              </div>
              <div className="flex flex-col justify-items-center items-center shadow-lg lg:rounded-full bg-purple-400 p-2 lg:hover:-translate-y-2 duration-500">
                <Image
                  src="https://s7d2.scene7.com/is/image/PetSmart/WEB-1178113-Jan22_DEAL6_SmPet"
                  className="rounded-full"
                  width={200}
                  height={200}
                  alt="small pets"
                />
                <Link
                  href="/shop/category/pet-supplies"
                  className="mt-2 mb-4 inline-flex  p-2 items-center bg-purple-600 rounded-2xl text-sm border font-semibold text-primary-500 hover:underline "
                >
                  <button className="y-1.5  m-2 uppercase px-7 justify-center text-sm font-medium text-gray-700 bg-white rounded-full border-2 border-gray-200 hover:bg-gray-100 hover:text-blue-700  focus:outline-none  dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center">
                    Small Animals
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Animal news */}
        <section className="bg-white dark:bg-gray-900 max-w-screen-2xl mx-auto px-6 ">
          <div className="py-8 px-0  mx-auto max-w-screen-2xl sm:py-8 lg:px-0">
            <div className="mx-auto max-w-screen-2xl text-left">
              <h2 className="mb-6 text-4xl tracking-tight text-gray-800 dark:text-white">
                Best Picks
              </h2>
            </div>
            <div className="grid gap-8 mb-16  lg:grid-cols-5">
              {!isEmpty(data?.productTags?.nodes)
                ? data?.productTags?.nodes.map((tag) => {
                    return (
                      <article
                        key={tag.name}
                        className="border-2 p-2  justify-center content-center flex-col flex"
                      >
                        <h2 className="my-1 text-2xl  text-center tracking-tight text-gray-900 dark:text-white capitalize">
                          <Link href={tag?.uri}>{tag?.name}</Link>
                        </h2>
                        <div
                          className="prose-headings:font-normal text-center prose-h3:text-sm text-gray-500 my-2 max-w-none"
                          dangerouslySetInnerHTML={{
                            __html: sanitize(tag?.roundupFields?.hero),
                          }}
                        />

                        <Link href={tag?.uri}>
                          <div className="py-1.5 mt-auto mb-1 uppercase px-7 justify-center text-sm font-medium text-gray-700 bg-white rounded-full border-2 border-gray-200 hover:bg-gray-100 hover:text-blue-700  focus:outline-none  dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center">
                            Read more
                            <svg
                              className="ml-2 w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </div>
                        </Link>
                      </article>
                    );
                  })
                : null}
            </div>
          </div>
        </section>
        {/* Product box one */}
        <section className="bg-gradient-to-tq  dark:bg-gray-900 max-w-screen-2xl 2xl:px-5 mx-auto">
          <div className="py-8 px-4 mx-auto max-w-screen-2xl lg:py-6 lg:pb-2 lg:px-2 border-yellow-200 border-8">
            <div className="grid gap-6 lg:gap-0  md:grid-cols-3 lg:grid-cols-6 sm:grid-cols-2 justify-center">
              {!isEmpty(data?.productTaxonomies?.nodes)
                ? data?.productTaxonomies?.nodes.map((tag) => {
                    return (
                      <div
                        key={tag.name}
                        className="p-3 pb-3 max-w-sm bg-white rounded-none  dark:bg-gray-800 dark:border-gray-700"
                      >
                        <Link href={tag.uri}>
                          {!isEmpty(
                            tag.products?.nodes[0]?.single_product_acf
                              ?.productImageMainUrl
                          ) ? (
                            <div className="2xl:max-h-72 flex flex-col bg-white">
                              <Image
                                src={
                                  tag.products?.nodes[0]?.single_product_acf
                                    ?.productImageMainUrl
                                }
                                className="m-auto h-56 lg:h-44 2xl:max-h-72"
                                width={200}
                                height={200}
                                objectFit="contain"
                                alt={tag?.name}
                              />
                              <h5 className=" py-3 px-2 font-medium tracking-tight text-gray-900 dark:text-white text-center">
                                {tag?.name}
                              </h5>
                            </div>
                          ) : null}
                        </Link>
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
        </section>

        {/* <section className="bg-white dark:bg-gray-900 px-6">
          <div className="py-8  mx-auto max-w-screen-2xl lg:py-16 lg:px-0">
            <div className="mx-auto max-w-screen-2xl text-left mb-8 lg:mb-8">
              <h2 className="mb-4 text-4xl tracking-tight  text-gray-900 dark:text-white">
                Featured Product Reviews
              </h2>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <article className=" bg-white  dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                  <Image
                    className="mb-2 "
                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/blog/office-laptops-2.png"
                    alt="office laptops"
                    width={300}
                    height={200}
                    objectFit="contain"
                  />
                </a>

                <h2 className="my-1 text-2xl  tracking-tight text-gray-900 dark:text-white">
                  <a href="#">Our first project with React</a>
                </h2>
                <div className="flex items-center space-x-4">
                  <div className="font-medium dark:text-white">
                    <div>Sofia McGuire</div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section> */}

        <section className="bg-white dark:bg-gray-900 ">
          <div className="grid gap-16 py-8 px-6 mx-auto max-w-screen-2xl lg:grid-cols-2 lg:py-16 lg:px-6">
            <div className="text-gray-700 sm:text-lg dark:text-gray-400">
              <h2 className="mb-4 text-4xl tracking-tight  text-gray-900 dark:text-white">
                We share your deep love for animals
              </h2>
              <p className="mb-2 md:text-lg text-gray-700">
                At our website, we are dedicated to providing high-quality
                animal products for all of your furry friends. You can trust
                that every product we offer has been carefully selected and
                reviewed by experts in the field. We offer a wide variety of
                products from trusted and reputable brands, and we are
                constantly updating our selection to provide the latest and
                greatest in pet care.
              </p>
              <p className=" md:text-lg mb-2  text-gray-700">
                Our knowledgeable and friendly staff are always on hand to
                answer any questions you may have and to help you find the
                perfect products for your pets. In addition to our wide range of
                products, we also provide helpful information and resources on
                pet care and nutrition, so you can make informed decisions for
                your pets.
              </p>

              <p className=" md:text-lg mt-2 text-gray-700">
                We are dedicated to promoting the well-being of animals, and a
                portion of all of our profits goes towards research and
                expanding access to useful pet information. Thank you for
                choosing our website for all of your animal product needs. As an
                customer, you can trust that you are getting the best products
                at the best prices, and you are supporting a company that is
                committed to animal welfare.
              </p>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              <div className="flex flex-col items-center pb-8 sm:flex-row">
                <Image
                  className="mx-auto mb-4 w-36 h-36 rounded-full sm:ml-0 sm:mr-6"
                  src="https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=717&q=80"
                  alt="Benjamin Puginton - Pug with an attitude"
                  width={200}
                  height={200}
                  objectFit="cover"
                />
                <div className="text-center sm:text-left ml-4">
                  <h3 className="text-xl  tracking-tight text-gray-900 dark:text-white">
                    <p>Benjamin Puginton</p>
                  </h3>
                  <span className="text-gray-700 dark:text-gray-400">
                    CEO/Co-founder
                  </span>
                  <p className="mt-2 mb-4 max-w-sm  text-gray-700 dark:text-gray-400">
                    A top dog. Just looking to make an impact in the world of
                    animal Products.
                  </p>
                  <ul className="flex justify-center space-x-4 sm:justify-start">
                    <li>
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </li>
                    <li>
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </li>
                    <li>
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </li>
                    <li>
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col items-center pt-8 pb-8 sm:flex-row">
                <Image
                  className="mx-auto mb-4 w-36 h-36 rounded-full sm:ml-0 sm:mr-6"
                  src="https://images.unsplash.com/photo-1589652739890-77a7733b8a23?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  alt="Pamela Pomerian - Cute dog with glasses"
                  width={200}
                  height={200}
                  objectFit="cover"
                />
                <div className="text-center ml-4 sm:text-left">
                  <h3 className="text-xl  tracking-tight text-gray-900 dark:text-white">
                    <p>Pamela Pomerian</p>
                  </h3>
                  <span className="text-gray-700 dark:text-gray-400">
                    CTO/Co-founder
                  </span>
                  <p className="mt-2 mb-4 max-w-sm  text-gray-700 dark:text-gray-400">
                    With years of experience as a vetenarian assistant and
                    patient. Pamela knows what is up when it comes to caring for
                    your animals.
                  </p>
                  <ul className="flex justify-center space-x-4 sm:justify-start">
                    <li>
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </li>
                    <li>
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </li>
                    <li>
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </li>
                    <li>
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
export async function getStaticProps(context) {
  const { data, errors } = await client.query({
    query: GET_PAGE,
    variables: {
      uri: "/",
    },
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

  return handleRedirectsAndReturnData(defaultProps, data, errors, "page");
}
