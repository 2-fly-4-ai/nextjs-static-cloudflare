
import { GET_PAGE } from '../../src/queries/pages/get-page';
import { FALLBACK, handleRedirectsAndReturnData, isCustomPageUri } from '../../src/utils/slug';
import { sanitize } from '../../src/utils/miscellaneous';
import Layout from '../../src/components/layout';
import client from '../../src/apollo/client';

export default function category({ data }) {
    return (
        <Layout data={data}>
            <section className="bg-white dark:bg-gray-900">
                <div className='h-4 border-b'>



                </div>

                <div className="py-8 px-4 mx-auto max-w-screen-2xl text-center lg:py-0 lg:px-5 flex bg-gray-50">



                    <div className="w-56 mb-5 flex-none border-r">
                        TEST

                    </div>



                    <div className="flex-1 flex-col px-3 bg-gray-50">
                        <div className="h-10 flex rounded-lg">
                            <p className="text-gray-400 p-1 ml-1 text-lg font-medium">RESULTS</p>


                        </div>

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