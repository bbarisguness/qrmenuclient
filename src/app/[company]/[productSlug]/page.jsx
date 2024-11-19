import CategoryButton from "@/components/categoryButton";
import { SideMenu } from "@/components/sideMenu/SideMenu";
import { getCategoriesByCompanySlug } from "@/services/categoryService";
import { getProductById } from "@/services/productService";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
    const { productSlug } = await params
    const { company } = await params
    const product = await getProductById({ id: productSlug, company: company })

    return {
        title: `${product?.data?.category?.company?.name} - ${product?.data?.name}`
    }
}

export default async function Page({ params, searchParams }) {
    const { lang } = await searchParams
    const { productSlug } = await params
    const { company } = await params

    const product = await getProductById({ id: productSlug, company: company })
    const categories = await getCategoriesByCompanySlug({ slug: company, lang: lang })

    if (!(product.data)) {
        notFound()
    }

    return (
        <>
            <SideMenu categories={categories} />
            <div className="min-h-[100dvh] bg-[#F6F6F9] flex-1 justify-center items-center">
                <div className="max-w-[600px] bg-[#F6F6F9] w-full relative m-auto h-full">
                    <div className="w-full pt-[14px]" >
                        <div className="bg-[#F5F5F5] rounded-[20px] w-full h-[98px] flex items-center justify-between pl-[25px] pr-[25px]">
                            <Link href={`/${product?.data?.category?.company?.slug}/kategori/${product?.data?.category?.slug}?lang=${lang || 'tr'}`} className="flex">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M15 18L9 12L15 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span className="text-[16px] font-semibold text-black font-Poppins">Geri dön</span>
                            </Link>
                            {/* {
                            product?.data?.category?.company?.logo?.url ?
                                <div className="w-[72px] h-[72px]">
                                    <img width={'100%'} height={'100%'} src={product.data?.category?.company?.logo?.url ? process.env.NEXT_PUBLIC_BACKEND_URL + product?.data?.category?.company?.logo?.url : null} alt="" />
                                </div> :
                                <div>
                                    <div className="w-[72px] h-[72px] relative rounded-full bg-[#1374E0] flex flex-col justify-center pl-[10px]">
                                        <p className="font-AlfaSlabOne text-white text-[14px] leading-4">NO</p>
                                        <p className="font-AlfaSlabOne text-white text-[14px] leading-4">LOGO</p>
                                    </div>
                                </div>
                        } */}
                            <CategoryButton theme={product?.data?.category?.company?.theme} />
                        </div>
                    </div>

                    <div className="mt-[17px] pl-[50px] pr-[50px] relative flex justify-center">
                        <img className="rounded-full aspect-square max-w-[241px] max-h-[241px] w-full h-full object-cover object-center" src={product?.data?.image?.url ? process.env.NEXT_PUBLIC_BACKEND_URL + product?.data?.image?.url : null} alt="" />
                    </div>

                    <div className="text-center mt-[50px] font-Poppins text-[28px] text-black font-semibold relative pl-[25px] pr-[25px]">
                        {product?.data?.name}
                    </div>

                    <div className="text-center mt-[15px] font-Poppins text-[22px] text-[#1E5CCE] font-semibold relative">
                        {product?.data?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} TL
                    </div>

                    <div className="mt-[40px] pl-[53px] pr-[53px] relative">
                        <div className="text-[17px] font-semibold text-black font-Poppins">
                            Ürün Hakkında
                        </div>
                        <div className="text-[15px] mt-[7px] font-normal text-black font-Poppins opacity-50">
                            {product?.data?.longDescription}
                        </div>
                    </div>
                    {
                        product?.data?.contents.length !== 0 &&
                        <div className="mt-[24px] pl-[53px] pr-[53px] relative">
                            <div className="text-[17px] font-semibold text-black font-Poppins">
                                İçindekiler
                            </div>
                            {
                                product?.data?.contents?.map((item, i) => {
                                    return (
                                        <div key={i} className="opacity-50 text-[15px] mt-[7px] font-normal text-black font-Poppins relative before:content-[''] before:inline-block before:w-[6px] before:h-[6px] before:bg-[#000000] before:rounded-full before:mr-[8px]">
                                            {item?.name}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    }

                    <div className="pb-[20px]">
                        <Link style={{ backgroundColor: `#${product?.data?.category?.company?.theme?.primaryColor}`, color: `#${product?.data?.category?.company?.theme?.secondaryColor}` }} href={`/${product?.data?.category?.company?.slug}/kategori/${product?.data?.category?.slug}?lang=${lang || 'tr'}`} className={"mt-[45px] relative  rounded-[30px] h-[70px] mr-[50px] ml-[50px] justify-center items-center flex font-Poppins font-bold text-[20px] transition-all"}>
                            Geri Dön
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
