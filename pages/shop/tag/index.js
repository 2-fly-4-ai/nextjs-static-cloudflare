
import { GET_PAGE } from '../../../src/queries/pages/get-page';
import { FALLBACK, handleRedirectsAndReturnData, isCustomPageUri } from '../../../src/utils/slug';
import { sanitize } from '../../../src/utils/miscellaneous';
import Layout from '../../../src/components/layout';
import client from '../../../src/apollo/client';
import { Tabs } from 'flowbite-react';

export default function brand({ data }) {
    return (
        <Layout data={data}>
            <section className="bg-white dark:bg-gray-900 py-2">
                <div className=" border-b max-w-screen-2xl mx-auto h-max bg-no-repeat bg-cover flex ">
                    <img src="http://staging-petsmarketplace-staging.kinsta.cloud/wp-content/uploads/2022/10/adidas-originals-logo-8D33C5A1DB-seeklogo.com_.png" className='h-72 mb-5 ' />


                    <div className='flex-col  justify-center px-8 my-auto'>
                        <h1 className='text-6xl pl-8 mt-4 '>Addidas</h1>
                        <p className='px-8 pt-2'>Adidas is a world-renowned German sportswear company that has been crafting quality athletic apparel since 1949. Today, Adidas is a global leader in the design and manufacture of sportswear, footwear, and accessories, and their products are worn by athletes and casual wearers alike. With a commitment to innovation and a passion for sports, Adidas has created some of the most iconic products in the industry, and their three stripes logo is recognized around the world.<br /><br /> From the stadium to the street, Adidas is a brand that inspires and enables athletes to reach their full potential.
                            Take a look at our great selection of  Adidas products  and join the millions of people who have already fallen in love with this legendary brand!</p>


                        <div className='pl-8 mt-4'>

                        </div>
                    </div>

                </div>



                <div className="py-8 px-4 mx-auto max-w-screen-2xl text-center lg:py-5 lg:px-5  flex bg-gray-50">








                    <div className="flex-1 flex-col px-3 bg-gray-50">


                        {/* PRODUCT BOX */}
                        <div className="flex-1">
                            <div className="grid gap-4 p-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                                {/* Number 1 */}
                                <div className="p-0 pb-3 max-w-sm bg-white rounded-none  dark:bg-gray-800 dark:border-gray-700">
                                    <a href="#">
                                        <div className="h-72 flex flex-col bg-white">
                                            <img src="https://m.media-amazon.com/images/I/61mDBGHFcxL.__AC_SX300_SY300_QL70_FMwebp_.jpg" className="m-auto max-h-72" />
                                        </div>
                                        <h5 className="py-3 text-xl px-2 tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                                    </a>

                                </div>


                                {/* Number 2 */}
                                <div className="p-0 pb-3 max-w-sm bg-white rounded-none  dark:bg-gray-800 dark:border-gray-700">
                                    <a href="#">
                                        <div className="h-72 flex flex-col bg-white">
                                            <img src="https://m.media-amazon.com/images/I/61mDBGHFcxL.__AC_SX300_SY300_QL70_FMwebp_.jpg" className="m-auto max-h-72" />
                                        </div>
                                        <h5 className="py-3 text-xl px-2 tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                                    </a>

                                </div>


                                {/* number 3 */}
                                <div className="p-0 pb-3 max-w-sm bg-white rounded-none  dark:bg-gray-800 dark:border-gray-700">
                                    <a href="#">
                                        <div className="h-72 flex flex-col bg-white">
                                            <img src="https://m.media-amazon.com/images/I/712OyBPPL0L._AC_SX679_.jpg" className="m-auto max-h-72" />
                                        </div>
                                        <h5 className="py-3 text-xl px-2 tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                                    </a>

                                </div>

                                {/* number 3 */}
                                <div className="p-0 pb-3 max-w-sm bg-white rounded-none  dark:bg-gray-800 dark:border-gray-700">
                                    <a href="#">
                                        <div className="h-72 flex flex-col bg-white">
                                            <img src="https://m.media-amazon.com/images/I/61j6ey6mBpL._AC_SX679_.jpg" className="m-auto max-h-72" />
                                        </div>
                                        <h5 className="py-3 text-xl px-2 tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                                    </a>

                                </div>

                                {/* number 4 */}
                                <div className="p-0 pb-3 max-w-sm bg-white rounded-none  dark:bg-gray-800 dark:border-gray-700">
                                    <a href="#">
                                        <div className="h-72 flex flex-col bg-white">
                                            <img src="https://m.media-amazon.com/images/I/71wXQyxCENL.__AC_SX300_SY300_QL70_FMwebp_.jpg" className="m-auto max-h-72" />
                                        </div>
                                        <h5 className="py-3 text-xl px-2 tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                                    </a>

                                </div>

                                {/* number 5*/}
                                <div className="p-0 pb-3 max-w-sm bg-white rounded-none  dark:bg-gray-800 dark:border-gray-700">
                                    <a href="#">
                                        <div className="h-72 flex flex-col bg-white">
                                            <img src="https://m.media-amazon.com/images/I/71+jTaVbHxL._AC_UY327_FMwebp_QL65_.jpg" className="m-auto max-h-72" />
                                        </div>
                                        <h5 className="py-3 text-xl px-2 tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                                    </a>

                                </div>

                                {/* number 6 */}
                                <div className="p-0 pb-3 max-w-sm bg-white rounded-none  dark:bg-gray-800 dark:border-gray-700">
                                    <a href="#">
                                        <div className="h-72 flex flex-col bg-white">
                                            <img src="https://m.media-amazon.com/images/I/61+iCbVTWcS._AC_UY327_FMwebp_QL65_.jpg" className="m-auto max-h-72" />
                                        </div>
                                        <h5 className="py-3 text-xl px-2 tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                                    </a>

                                </div>

                                {/* number 7 */}
                                <div className="p-0 pb-3 max-w-sm bg-white rounded-none  dark:bg-gray-800 dark:border-gray-700">
                                    <a href="#">
                                        <div className="h-72 flex flex-col bg-white">
                                            <img src="https://m.media-amazon.com/images/I/51CSzjwiYyL._AC_UY327_FMwebp_QL65_.jpg" className="m-auto max-h-72" />
                                        </div>
                                        <h5 className="py-3 text-xl px-2 tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                                    </a>

                                </div>



                            </div>


                        </div>

                    </div>


                </div>
            </section>


        </Layout>

    )
}
export async function getStaticProps(context) {

    const { data, errors } = await client.query({
        query: GET_PAGE,
        variables: {
            uri: '/',
        },
    });

    const defaultProps = {
        props: {
            data: data || {}
        },
        /**
         * Revalidate means that if a new request comes to server, then every 1 sec it will check
         * if the data is changed, if it is changed then it will update the
         * static file inside .next folder with the new data, so that any 'SUBSEQUENT' requests should have updated data.
         */
        revalidate: 1,
    };

    return handleRedirectsAndReturnData(defaultProps, data, errors, 'page');
}