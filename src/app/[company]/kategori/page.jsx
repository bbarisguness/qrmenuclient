import { getCategoriesByCompanySlug } from "@/services/categoryService";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
    const { company } = await params
    const categories = await getCategoriesByCompanySlug({ slug: company })

    return {
        title: `${categories?.data[0]?.company?.name} - Kategoriler`
    }
}


export default async function Page({ params }) {
    const { company } = await params
    const categories = await getCategoriesByCompanySlug({ slug: company })

    if (categories?.data?.length === 0) {
        notFound()
    }

    return (

        <div className="max-w-[600px] bg-[#EEE] w-full relative m-auto h-screen">
            <div className="w-full pt-[14px]" >
                <div className="bg-[#F5F5F5] rounded-[20px] w-full h-[98px] flex items-center justify-between pl-[25px] pr-[25px]">
                    <Link href={`/${categories?.data[0]?.company?.slug}`} className="flex">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M15 18L9 12L15 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-[16px] font-semibold text-black font-Poppins">Ana menüye dön</span>
                    </Link>
                    {
                        categories?.data[0]?.company?.logo?.url ?
                            <div className="w-[72px] h-[72px]">
                                <img width={'100%'} height={'100%'} src={categories?.data[0]?.company?.logo?.url ? process.env.NEXT_PUBLIC_BACKEND_URL + categories?.data[0]?.company?.logo?.url : null} alt="" />
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
                            <Link
                                href={`/${categories?.data[0]?.company?.slug}/kategori/${item?.slug}`}
                                key={index}
                                className="w-[49%] cursor-pointer aspect-square border-[5px] border-[#ffffffe6] relative overflow-hidden group"
                            >
                                <img
                                    className="object-center object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                                    src={item?.image?.url ? process.env.NEXT_PUBLIC_BACKEND_URL + item?.image?.url : null}
                                    alt=""
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                <div className="absolute bottom-3 w-full">
                                    <p className="text-center text-[20px] text-white font-Poppins">{item.name}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    );
}
