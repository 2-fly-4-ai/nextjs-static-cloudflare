import { isEmpty } from "lodash";
import { useState } from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import { isCustomPageUri } from "../../../utils/slug";
import Image from "next/image";

const Nav = ({ footer, header, headerMenus, slug }) => {
  if (isEmpty(headerMenus)) {
    return null;
  }

  const [isMenuVisible, setMenuVisibility] = useState("");
  const [isMenuVisible2, setMenuVisibility2] = useState("");

  return (
    <header>
      {/* Level 1 */}

      {/* Level 2 */}
      <nav className="bg-green-400  mx-auto dark:bg-gray-700 dark:border-gray-600 pr-4 flex justify-center py-2 md:py-0">
        <div className="flex max-w-screen-2xl w-full ">
          <div className="flex items-center mr-auto ml-3  ">
            <Link href="/" className="flex items-center" passHref>
              <Image
                src={header?.siteLogoUrl}
                className="-mb-"
                alt=""
                width="40"
                height="40"
              />
              {/* <span className="ml-5 self-center text-white text-xl font-bold whitespace-nowrap dark:text-white">{header?.siteTitle}</span> */}
            </Link>

            {/* HEre are the social Icons */}
            <span className="mr-0 ml-2 w-px h-5 bg-gray-200 dark:bg-gray-600 lg:inline lg:mr-3 lg:ml-3"></span>
            <a
              href={footer?.socialLinks[0]?.iconUrl}
              className="inline-flex items-center p-2 text-sm font-medium text-white  rounded-none dark:text-gray-400 hover:bg-green-400 dark:hover:bg-gray-600"
              passHref
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
              </svg>
            </a>

            <a
              href={footer?.socialLinks[1]?.iconUrl}
              className="inline-flex items-center p-2 text-sm font-medium text-white  rounded-none dark:text-gray-400 hover:bg-green-400 dark:hover:bg-gray-600"
              passHref
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
              </svg>
            </a>
            <a
              href={footer?.socialLinks[2]?.iconUrl}
              className="inline-flex items-center p-2 text-sm font-medium text-white  rounded-none dark:text-gray-400 hover:bg-green-400 dark:hover:bg-gray-600"
              passHref
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
              </svg>
            </a>
            <a
              href={footer?.socialLinks[3]?.iconUrl}
              className="inline-flex items-center p-2 text-sm font-medium text-white  rounded-none dark:text-gray-400 hover:bg-green-400 dark:hover:bg-gray-600"
              passHref
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
              </svg>
            </a>
          </div>

          <div className="ml-auto py-3 px-4 max-w-screen-2xl lg:grid-cols-1 md:px-2 hidden md:grid ">
            <div className="mx-left ">
              <form className="flex mb-4 lg:order-2 lg:mb-0 ">
                <label
                  htmlFor="search-dropdown"
                  className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
                >
                  Your Email
                </label>
                <button
                  id="dropdown-button"
                  data-dropdown-toggle="dropdown"
                  className=" rounded-l-full  hidden md:inline-flex flex-shrink-0 z-10 items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-200  dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                  type="button"
                >
                  All categories{" "}
                  <svg
                    className="ml-1 w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
                <div
                  id="dropdown"
                  className=" hidden z-10 w-44 bg-white divide-y divide-gray-100 shadow dark:bg-gray-700 absolute m-0"
                  data-popper-reference-hidden=""
                  data-popper-escaped=""
                  data-popper-placement="top"
                  style={{ transform: "translate3d(897px, 5637px, 0px)" }}
                >
                  <ul
                    className="py-1 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdown-button"
                  >
                    <li>
                      <button
                        type="button"
                        className="inline-flex py-2 px-4 w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Mockups
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="inline-flex py-2 px-4 w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Templates
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="inline-flex py-2 px-4 w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Design
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="inline-flex py-2 px-4 w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Logos
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="relative w-full flex">
                  <input
                    type="search"
                    id="search-dropdown"
                    className=" block p-2.5 w-full  z-20 text-sm text-gray-900 bg-gray-50  md:rounded-l-none md:border-l-gray-50 border-l-1 md:border-l-6 border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:border-l-gray-600  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-primary-500"
                    placeholder="Search anything..."
                    required
                  />
                  <button
                    type="submit"
                    className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-primary-700 border-primary-500 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-r-full text-sm px-5 py-2.5 mr-2  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  >
                    SHOP
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </nav>
      {/* Level 3 */}
      {/* <div id="megamenu" className={`${isMenuVisible ? 'flex' : "hidden"} bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-600`}>

        <div className="grid py-4 px-4 mx-auto max-w-screen-2xl text-gray-900 dark:text-white md:grid-cols-2 lg:grid-cols-4 md:px-6">

          <Link href="#" className="text-sm flex p-3 rounded-none hover:bg-gray-50 dark:hover:bg-gray-700">
            <svg className="mr-2 w-6 h-6 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
            <div className="col-span-2  lg:col-span-1 ">
              <h2 className="mb-2 font-semibold text-gray-900 dark:text-white">Dogs</h2>
              <p className="mb-2 font-light text-gray-500 dark:text-gray-400">Caring for a dog isn't easy, we're here to help! From training and grooming to nourishment and exercise.</p>
            </div>
          </Link>

          <Link href="#" className="text-sm flex p-3 rounded-none hover:bg-gray-50 dark:hover:bg-gray-700">
            <svg className="mr-2 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
            <div className="col-span-2 lg:col-span-1">
              <h2 className="mb-2 font-semibold text-gray-900 dark:text-white">Cats</h2>
              <p className="mb-2 font-light text-gray-500 dark:text-gray-400">Cats may look cute, but keeping track of their litter box and cleaning up their messes is a top priority.</p>
            </div>
          </Link>

          <Link href="#" className="text-sm flex p-3 rounded-none hover:bg-gray-50 dark:hover:bg-gray-700">
            <svg className="mr-2 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
            <div className="col-span-2  lg:col-span-1">
              <h2 className="mb-2 font-semibold text-gray-900 dark:text-white">Birds</h2>
              <p className="mb-2 font-light text-gray-500 dark:text-gray-400">Avian enthusiasts sometimes keep a stash of toys and treats on hand to help their feathered friends. </p>
            </div>
          </Link>

          <Link href="#" className="text-sm flex p-3 rounded-none hover:bg-gray-50 dark:hover:bg-gray-700">
            <svg className="mr-2 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
            <div className="col-span-2 lg:col-span-1">
              <h2 className="mb-2 font-semibold text-gray-900 dark:text-white">Small Pets</h2>
              <p className="mb-2 font-light text-gray-500 dark:text-gray-400">Small Pets may be cute and cuddly, but they can also be a little rambunctious. </p>
            </div>
          </Link>

          <Link href="#" className="text-sm flex p-3 rounded-none hover:bg-gray-50 dark:hover:bg-gray-700">
            <svg className="mr-2 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
            <div className="col-span-2 lg:col-span-1">
              <h2 className="mb-2 font-semibold text-gray-900 dark:text-white">Fish & Aquatic Pets</h2>
              <p className="mb-2 font-light text-gray-500 dark:text-gray-400">Keep your fish and aquatic pets safe, sound, and swimming with the best care tips.</p>
            </div>
          </Link>

          <Link href="#" className="text-sm flex p-3 rounded-none hover:bg-gray-50 dark:hover:bg-gray-700">
            <svg className="mr-2 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
            <div className="col-span-2 lg:col-span-1">
              <h2 className="mb-2 font-semibold text-gray-900 dark:text-white">Reptiles & Amphibians</h2>
              <p className="mb-2 font-light text-gray-500 dark:text-gray-400">Amphibians should be safe, sound, and successfully contained with a quality enclosure.</p>
            </div>
          </Link>

          <Link href="#" className="text-sm flex p-3 rounded-none hover:bg-gray-50 dark:hover:bg-gray-700">
            <svg className="mr-2 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
            <div className="col-span-2 lg:col-span-1">
              <h2 className="mb-2 font-semibold text-gray-900 dark:text-white">Horses</h2>
              <p className="mb-2 font-light text-gray-500 dark:text-gray-400">Keep your horse safe, sound, and in good condition with the best tips for caring for horses.</p>
            </div>
          </Link>
        </div>
      </div> */}

      {/* Bottom Slither */}

      <nav className="bg-gray-100 dark:bg-gray-700 border-b hidden lg:flex">
        <div className="py-3 px-4 mx-auto max-w-screen-xl md:px-6">
          <div className="flex items-center">
            <ul className="flex flex-row mt-0 mr-6 space-x-20 text-sm font-medium">
              <li className="text-gray-900 dark:text-white hover:underline uppercase">
                <Link
                  href="/dogs"
                  className="text-gray-900 dark:text-white hover:underline uppercase"
                  aria-current="page"
                >
                  Dogs
                </Link>
              </li>
              <li className="text-gray-900 dark:text-white hover:underline uppercase">
                <Link
                  href="/cats"
                  className="text-gray-900 dark:text-white hover:underline uppercase"
                >
                  Cats
                </Link>
              </li>
              <li className="text-gray-900 dark:text-white hover:underline uppercase">
                <Link
                  href="/birds"
                  className="text-gray-900 dark:text-white hover:underline uppercase"
                >
                  Birds
                </Link>
              </li>
              <li className="text-gray-900 dark:text-white hover:underline uppercase">
                <Link
                  href="/small-pets"
                  className="text-gray-900 dark:text-white hover:underline uppercase"
                >
                  Small Pets
                </Link>
              </li>
              <li className="text-gray-900 dark:text-white hover:underline uppercase">
                <Link
                  href="/fish-aquatic-pets"
                  className="text-gray-900 dark:text-white hover:underline uppercase"
                >
                  Fish & Aquatic Pets
                </Link>
              </li>
              <li className="text-gray-900 dark:text-white hover:underline uppercase">
                <Link
                  href="/reptiles-amphibians"
                  className="text-gray-900 dark:text-white hover:underline uppercase"
                >
                  Reptiles & Amphibians
                </Link>
              </li>
              <li className="text-gray-900 dark:text-white hover:underline uppercase">
                <Link href="/horses">Horses</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

Nav.propTypes = {
  header: PropTypes.object,
  headerMenus: PropTypes.array,
  slug: PropTypes.string,
};

Nav.defaultProps = {
  header: {},
  headerMenus: [],
  slug: "",
};

export default Nav;

// <nav classNameName="bg-black flex items-center justify-between flex-wrap p-6">
//       <div classNameName="flex items-center flex-shrink-0 text-white mr-6">
//         <svg classNameName="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" /></svg>
//         <span classNameName="font-semibold text-xl tracking-tight">Tailwind CSS</span>
//       </div>
//       <div classNameName="block lg:hidden">
//         <button
//           onClick={() => setMenuVisibility(!isMenuVisible)}
//           classNameName="flex items-center px-3 py-2 border text-teal-200 border-teal-400 hover:text-white hover:border-white">
//           <svg classNameName="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
//         </button>
//       </div>

//       <div classNameName={`${isMenuVisible ? 'max-h-full' : "h-0"} overflow-hidden w-full block flex-grow lg:flex lg:items-center lg:w-auto`}>
//         {headerMenus?.length ? (
//           <div classNameName="text-sm lg:flex-grow">
//             {headerMenus?.map(menu => {
//               if (!isCustomPageUri(menu?.node?.path)) {
//                 return (
//                   <Link key={menu?.node.id} href={menu?.node?.path}>
//                     <Link
//                       classNameName="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
//                       data-cy="nav-item"
//                     >
//                       {menu?.node?.label}
//                     </Link>
//                   </Link>
//                 );
//               }
//             })}
//           </div>
//         ) : null}

//       </div>
//       <div>
//       </div>
//     </nav>
