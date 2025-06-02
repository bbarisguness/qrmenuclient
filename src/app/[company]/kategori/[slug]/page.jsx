import CurrencyMenu from "@/components/currencyMenu";
import LangMenu from "@/components/langMenu";
import ProductList from "@/components/productList";
import ProductPrice from "@/components/productPrice";
import ProductPrice2 from "@/components/productPrice2";
import WifiButton from "@/components/wifibutton";
import { getGlobalVariables } from "@/services/globalVariablesService";
import { getProductsByCategorySlug } from "@/services/productService";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaChevronLeft, FaComment, FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaTurkishLiraSign } from "react-icons/fa6";

export async function generateMetadata({ params }) {
    const { slug } = await params
    const { company } = await params

    const products = await getProductsByCategorySlug({ slug: slug, company: company })

    return {
        title: `${products?.data[0]?.category?.company?.name} - ${products?.data[0]?.category?.name}`
    }
}

export default async function Page({ params, searchParams }) {
    const { lang } = await searchParams
    const { slug } = await params
    const { company } = await params

    const products = await getProductsByCategorySlug({ slug: slug, company: company, lang: lang })
    const globalVariables = await getGlobalVariables({ lang: lang })


    const tcmbRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/currency`);
    const tcmb = await tcmbRes.text();

    if (products.data.length === 0 || products?.data?.[0]?.category?.company?.isActive === false || products?.data?.[0]?.category?.company?.themeVersion === 'theme3') {
        notFound()
    }

    if (products?.data?.[0]?.category?.company?.themeVersion === 'theme1') {
        return (
            <div className="max-w-[600px] bg-[#EEE] w-full relative m-auto h-screen">
                <div className="w-full pt-[14px]" >
                    <div className="bg-[#F5F5F5] rounded-[20px] w-full h-[98px] flex items-center justify-between pl-[25px] pr-[25px]">
                        <Link href={`/${products?.data[0]?.category?.company?.slug}/kategori?lang=${lang || 'tr'}`} className="flex">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M15 18L9 12L15 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="text-[16px] font-semibold text-black font-Poppins">{globalVariables?.data?.backButtonText}</span>
                        </Link>

                        {
                            products?.data[0]?.category?.company?.logo?.url ?
                                <div className="w-[72px] h-[72px] relative">
                                    {/* <img width={'100%'} height={'100%'} src={products?.data[0]?.category?.company?.logo?.url ? process.env.NEXT_PUBLIC_BACKEND_URL + products?.data[0]?.category?.company?.logo?.url : null} alt="" /> */}
                                    <Image className="rounded-[10px] h-full" priority={true} alt="logo" width={72} height={72} src={products?.data[0]?.category?.company?.logo?.url ? products?.data[0]?.category?.company?.logo?.url : null} />
                                </div> :
                                <div>
                                    <div className="w-[72px] h-[72px] relative rounded-full bg-[#1374E0] flex flex-col justify-center pl-[10px]">
                                        <p className="font-AlfaSlabOne text-white text-[14px] leading-4">NO</p>
                                        <p className="font-AlfaSlabOne text-white text-[14px] leading-4">LOGO</p>
                                    </div>
                                </div>
                        }

                    </div>
                </div>

                {/* <div className={`w-full h-full bg-center bg-no-repeat bg-cover max-h-[182px] mt-[17px] rounded-l-[30px] rounded-r-[30px] relative overflow-hidden flex items-center justify-center`} style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_BACKEND_URL}${products?.data[0]?.category?.image?.url})` }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/40 to-transparent"></div>
                    <h1 className="text-center text-white text-[32px] font-normal font-Sansita drop-shadow-md relative">{products?.data[0]?.category?.name}</h1>
                </div> */}
                {
                    products?.data[0]?.category?.company?.showCategoryBanner &&
                    <div className="w-full h-full max-h-[182px] mt-[17px] rounded-l-[30px] rounded-r-[30px] relative overflow-hidden flex items-center justify-center">
                        {
                            products?.data[0]?.category?.banner &&
                            <Image
                                src={`${products?.data[0]?.category?.banner?.formats?.medium?.url ? products?.data[0]?.category?.banner?.formats?.medium?.url : products?.data[0]?.category?.banner?.url}`}
                                alt={products?.data[0]?.category?.name || 'Kategori Görseli'}
                                width={600}
                                height={182}
                                priority={true}
                                className="rounded-l-[30px] object-cover rounded-r-[30px] absolute"
                            />
                        }
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/40 to-transparent"></div>
                        <h1 className="text-center text-white text-[32px] font-normal font-Sansita drop-shadow-md relative">
                            {products?.data[0]?.category?.name}
                        </h1>
                    </div>
                }

                <div className="bg-[#E4E4E4] w-full mt-[17px] pt-[14px] pb-[14px] rounded-l-[30px] rounded-r-[30px]">
                    {
                        products?.data[0]?.category?.company?.productDetailPage === true ?
                            products.data.map((item, i) => (
                                <Link key={i} href={`/${products?.data[0]?.category?.company?.slug}/${item.documentId}?lang=${lang || 'tr'}`} className="block w-full pl-[25px] pr-[25px] mb-[15px]">
                                    <div className="flex items-center">
                                        {/* <img className="w-[80px] h-[80px] object-cover rounded-[15px]" src={item?.image?.url ? process.env.NEXT_PUBLIC_BACKEND_URL + item.image.url : null} alt="" /> */}
                                        {
                                            item?.image?.url &&
                                            <Image alt={item.image.hash} className="w-[80px] h-[80px] object-cover rounded-[15px]" width={80} height={80} src={item?.image?.url ? item.image.formats.thumbnail.url : null} />
                                        }
                                        <div style={{ paddingLeft: item?.image?.url ? '16px' : '0px', paddingRight: item?.image?.url ? '16px' : '0px' }}>
                                            <p className="font-Poppins text-[16px] font-medium mb-[8px] text-[#172B4D]">{item.name}</p>
                                            <div>
                                                {/* <span className="font-Poppins text-[12px] text-[#1374E0] mr-[18px]">{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} TL</span> */}
                                                <ProductPrice tcmb={tcmb} price={item?.price} />
                                                {
                                                    item.longDescription &&
                                                    <span className="font-Poppins text-[12px] text-[#7A869A] relative before:content-[''] before:inline-block before:w-[6px] before:h-[6px] before:bg-[#C1C7D0] before:rounded-full before:mr-[8px]">{item.longDescription}</span>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        products.data?.length != i + 1 &&
                                        <div className="w-full h-[1px] duration-500 bg-white mt-[15px]"></div>
                                    }
                                </Link>
                            ))
                            : <ProductList globalVariables={globalVariables} productModalColor={products?.data[0]?.category?.company?.theme?.productModalColor} tcmb={tcmb} products={products} />
                    }
                </div>
            </div >
        );
    } else {
        return (
            <>
                <div className="bg-[#f4f4f4] w-full min-h-[calc(100vh-56px)] transition-all duration-300 absolute top-[56px] right-0">
                    <nav style={{ backgroundColor: products?.data?.[0]?.category?.company?.theme?.primaryColor ? `#${products?.data?.[0]?.category?.company?.theme?.primaryColor}` : "#0f263a" }} className='h-[56px] w-full fixed top-0 left-0 z-[10] flex items-center py-[.5rem] px-[1rem]'>
                        {
                            products?.data[0]?.category?.company?.currencies?.length > 0 &&
                            <CurrencyMenu modal color={products?.data?.[0]?.category?.company?.theme?.secondaryColor || 'ffffff'} data={products?.data[0]?.category?.company?.currencies} />
                        }
                        <div className='flex items-center justify-between w-full px-[15px] mx-auto'>
                            <div style={{ color: products?.data?.[0]?.category?.company?.theme?.secondaryColor ? `#${products?.data?.[0]?.category?.company?.theme?.secondaryColor}` : "#ffffff" }} className='text-[#ffffff] h-[30px] my-[5px] mx-0 text-[20px] font-extrabold w-full text-center max-[412px]:text-[16px]'>{products?.data[0]?.category?.company?.name}</div>
                        </div>
                        {
                            products?.data?.[0]?.category?.company?.localizations?.length > 0 &&
                            <LangMenu modal color={products?.data?.[0]?.category?.company?.theme?.secondaryColor || 'ffffff'} data={products?.data?.[0]?.category?.company?.localizations} locale={products?.data?.[0]?.category?.company?.locale} />
                        }
                    </nav>
                    <div className='mt-0 mb-0 p-0 bg-[#ffffff]'>
                        <div>
                            <div className='text-[14px] font-semibold py-[14px] pr-[15px] pl-[40px] relative border-[1px] border-solid border-[#ddd] h-[50px]'>
                                <Link className='text-[#212529] no-underline' href={`/${products?.data?.[0]?.category?.company?.slug}?lang=${lang || 'tr'}`}>
                                    {globalVariables?.data?.goBackToHomePageButtonText}
                                    <div className='absolute left-0 top-0 h-[50px] w-[40px] items-center justify-center flex'>
                                        <FaChevronLeft />
                                    </div>
                                </Link>
                            </div>
                            {
                                products?.data?.map((item, i) => {
                                    return (
                                        <div key={i} className='border-b-[1px] border-solid text-[#212529] border-[#ddd] p-[15px]'>
                                            <div className=''>
                                                <div className='text-[#212529]'>
                                                    <div className='relative w-full pl-[90px] flex items-center min-h-[70px]'>
                                                        <div className='w-[80px] absolute top-[5px] left-0 overflow-hidden h-full'>
                                                            <img style={{ maxHeight: '70px', objectFit: 'cover', height: '100%' }} className='h-auto max-h-[99999px] w-full rounded-[5px] max-w-[100%] align-middle' src={item?.image ? `${item?.image?.url}` : `${products?.data[0]?.category?.company?.logo?.url}`} alt="" />
                                                        </div>
                                                        <div className="">
                                                            <div className='font-semibold text-[13px] mt-[6px]'>{item?.name}</div>
                                                            <div className='text-[13px] mt-[6px]'>{item?.longDescription}</div>
                                                            <div className='text-[#7b7b7b] max-w-[100%] mt-[6px] mx-auto mb-0'>
                                                                <div className='w-full float-left flex'>
                                                                    {/* <FaTurkishLiraSign /> <span className='text-[13px] ml-[2px]'>{item?.price}</span> */}
                                                                    <ProductPrice2 list={false} tcmb={tcmb} price={item?.price} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div style={{ backgroundColor: products?.data?.[0]?.category?.company?.theme?.primaryColor ? `#${products?.data?.[0]?.category?.company?.theme?.primaryColor}` : "#0f263a" }} className='py-[20px] px-[35px] absolute w-full bottom-0 h-[100px] text-center text-[#ffffff]'>
                        {

                            products?.data?.[0]?.category?.company?.buttons?.find((itm) => itm?.type === "wifi") &&
                            <WifiButton color={products?.data?.[0]?.category?.company?.theme?.secondaryColor || 'ffffff'} bgColor={`#${products?.data?.[0]?.category?.company?.theme?.primaryColor}`} data={products?.data?.[0]?.category?.company?.buttons?.find((itm) => itm?.type === "wifi")} />
                        }
                        <div className='text-center gap-1 flex flex-wrap justify-center items-center w-full text-[#ffffff]'>
                            {
                                products?.data?.[0]?.category?.company?.buttons?.map((itm, i) => {
                                    if (itm?.type === "instagram") {
                                        return (
                                            <Link key={i} href={itm?.url} rel="nofollow" target="_blank" className='rounded-full flex items-center justify-center bg-[#ffffff] w-[30px] h-[30px]'>
                                                <FaInstagram color='#0f263a' />
                                            </Link>
                                        )
                                    } else if (itm?.type === "facebook") {
                                        return (
                                            <Link key={i} href={itm?.url} rel="nofollow" target="_blank" className='rounded-full flex items-center justify-center bg-[#ffffff] w-[30px] h-[30px]'>
                                                <FaFacebookF color='#0f263a' />
                                            </Link>
                                        )
                                    } else if (itm?.type === "comments") {
                                        return (
                                            <Link key={i} href={itm?.url} rel="nofollow" target="_blank" className='rounded-full flex items-center justify-center bg-[#ffffff] w-[30px] h-[30px]'>
                                                <FaComment color='#0f263a' />
                                            </Link>
                                        )
                                    }
                                })
                            }

                        </div>
                    </div>
                </div>
            </>
        )
    }
}
