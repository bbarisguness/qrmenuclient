import CategoryListItem from "@/components/categoryListItem";
import { getCategoriesByCompanySlug, getCategoriesByCompanySlug2 } from "@/services/categoryService";
import { getGlobalVariables } from "@/services/globalVariablesService";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import Theme3Category from "@/components/theme3Category";
import ScrollToTopButton from "@/components/scrollTop";

export async function generateMetadata({ params }) {
    const { company } = await params
    const categories = await getCategoriesByCompanySlug({ slug: company, lang: 'tr' })

    return {
        title: `${categories?.data[0]?.company?.name} - Kategoriler`
    }
}


export default async function Page({ params, searchParams }) {
    const { company } = await params
    const { lang } = await searchParams

    const globalVariables = await getGlobalVariables({ lang: lang })
    const categories = await getCategoriesByCompanySlug({ slug: company, lang: lang || 'tr' })


    if (categories?.data?.length === 0 || categories?.data?.[0]?.company?.isActive === false || categories?.data?.[0]?.company?.themeVersion === 'theme2') {
        notFound()
    }

    if (categories?.data[0]?.company?.themeVersion === 'theme1') {
        return (
            <div className="max-w-[600px] bg-[#EEE] w-full relative m-auto h-screen">
                <div className="w-full pt-[14px]" >
                    <div className="bg-[#F5F5F5] rounded-[20px] w-full h-[98px] flex items-center justify-between pl-[25px] pr-[25px]">
                        <Link href={`/${categories?.data[0]?.company?.slug}?lang=${lang || 'tr'}`} className="flex">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M15 18L9 12L15 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="text-[16px] font-semibold text-black font-Poppins">{globalVariables?.data?.goBackToHomePageButtonText}</span>
                        </Link>
                        {
                            categories?.data[0]?.company?.logo?.url ?
                                <div className="w-[72px] h-[72px] relative">
                                    {/* <img width={'100%'} height={'100%'} src={categories?.data[0]?.company?.logo?.url ? process.env.NEXT_PUBLIC_BACKEND_URL + categories?.data[0]?.company?.logo?.url : null} alt="" /> */}
                                    <Image className="rounded-[10px] h-full" priority={true} width={72} height={72} alt="logo" src={categories?.data[0]?.company?.logo?.url ? categories?.data[0]?.company?.logo?.url : null} />
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

                <div className="bg-[#E4E4E4] w-full mt-[17px]  rounded-l-[30px] rounded-r-[30px]">
                    <div className="pt-[22px] pb-[22px] pl-[22px] pr-[22px]">
                        <div className="flex flex-wrap gap-[2%] gap-y-[15px]">
                            {categories?.data.map((item, index) => (
                                <CategoryListItem key={index} categories={categories} item={item} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        );
    } else if (categories?.data[0]?.company?.themeVersion === 'theme3') {
        const categories2 = await getCategoriesByCompanySlug2({ slug: company, lang: lang || 'tr' })

        const tcmbRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/currency`);
        const tcmb = await tcmbRes.text();

        return (
            <div className="min-h-screen h-full m-auto w-full">
                <div style={{ backgroundColor: 'rgb(250, 250, 250)' }} className="w-full min-h-screen flex flex-col gap-[24px]">
                    <div>
                        <div style={{ color: 'white', backgroundColor: `#${categories2?.data?.[0]?.company?.theme?.primaryColor}` }} className="flex items-center justify-between px-[16px] pt-[12px] pb-[12px] min-h-[65px]  shadow-md relative">
                            <Link href={`/${categories2?.data?.[0]?.company?.slug}?lang=${lang || 'tr'}`}>
                                <IoIosArrowBack size={25} />
                            </Link>
                            <div className="text-center max-w-[200px] truncate">
                                <span style={{ color: 'white' }} className="text-[20px]">{categories2?.data?.[0]?.company?.name}</span>
                            </div>
                            <div className="flex items-center justify-end gap-4"></div>
                        </div>
                    </div>
                    <Theme3Category lang={lang || 'tr'} tcmb={tcmb} categories={categories2} />
                </div>
                <ScrollToTopButton color={`#${categories2?.data?.[0]?.company?.theme?.primaryColor}`} />
            </div>
        )
    }
}
