import ProductList from "@/components/productList";
import ProductPrice from "@/components/productPrice";
import { getGlobalVariables } from "@/services/globalVariablesService";
import { getProductsByCategorySlug } from "@/services/productService";
import { getTcmb } from "@/services/tcmbService";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

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
    const tcmb = await getTcmb()
    

    if (products.data.length === 0) {
        notFound()
    }

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
                                <Image className="rounded-[10px]" priority={true} alt="logo" width={72} height={72} src={products?.data[0]?.category?.company?.logo?.url ? process.env.NEXT_PUBLIC_BACKEND_URL + products?.data[0]?.category?.company?.logo?.url : null} />
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
                        products?.data[0]?.category?.image &&
                        < Image
                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${products?.data[0]?.category?.image?.formats?.medium?.url ? products?.data[0]?.category?.image?.formats?.medium?.url : products?.data[0]?.category?.image?.url}`}
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
                            <Link key={i} href={`/${products?.data[0]?.category?.company?.slug}/${item.documentId}?lang=${lang || 'tr'}`} className="block w-full pl-[25px] pr-[25px] mb-[15px] group">
                                <div className="flex items-center">
                                    {/* <img className="w-[80px] h-[80px] object-cover rounded-[15px]" src={item?.image?.url ? process.env.NEXT_PUBLIC_BACKEND_URL + item.image.url : null} alt="" /> */}
                                    {
                                        item?.image?.url ?
                                            <Image alt={item.image.hash} className="w-[80px] h-[80px] object-cover rounded-[15px]" width={80} height={80} src={item?.image?.url ? process.env.NEXT_PUBLIC_BACKEND_URL + item.image.formats.thumbnail.url : null} />
                                            :
                                            <div className="w-[80px] h-[80px] border-2 border-white"></div>
                                    }

                                    <div className="pl-[16px] pr-[16px]">
                                        <p className="font-Poppins text-[16px] font-medium mb-[8px] text-[#172B4D]">{item.name}</p>
                                        <div>
                                            {/* <span className="font-Poppins text-[12px] text-[#1374E0] mr-[18px]">{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} TL</span> */}
                                            <ProductPrice tcmb={tcmb} price={item?.price} />
                                            <span className="font-Poppins text-[12px] text-[#7A869A] relative before:content-[''] before:inline-block before:w-[6px] before:h-[6px] before:bg-[#C1C7D0] before:rounded-full before:mr-[8px]">{item.longDescription}</span>
                                        </div>
                                    </div>
                                </div>
                                {
                                    products.data?.length != i + 1 &&
                                    <div className="w-full h-[1px] duration-500 bg-white mt-[15px] group-hover:bg-[#62C3FF]"></div>
                                }
                            </Link>
                        ))
                        : <ProductList globalVariables={globalVariables} productModalColor={products?.data[0]?.category?.company?.theme?.productModalColor} tcmb={tcmb} products={products} />
                }
            </div>
        </div >
    );
}
