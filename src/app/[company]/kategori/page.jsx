import { getCategories } from "@/services/categoryService";
import { getCompany } from "@/services/companyService";
import Link from "next/link";

export const metadata = { title: "Grande Cafe", };


export default async function Page() {

    const company = getCompany()
    const categories = getCategories()

    return (

        <div className="max-w-[600px] bg-[#EEE] w-full relative m-auto h-screen">
            <div className="w-full pt-[14px]" >
                <div className="bg-[#F5F5F5] rounded-[20px] w-full h-[98px] flex items-center justify-between pl-[25px] pr-[25px]">
                    <Link href={'/asd'} className="flex">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M15 18L9 12L15 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-[16px] font-semibold text-black font-Poppins">Ana menüye dön</span>
                    </Link>
                    <div>
                        <div className="w-[72px] h-[72px] relative rounded-full bg-[#1374E0] flex flex-col justify-center pl-[10px]">
                            <p className="font-AlfaSlabOne text-white text-[14px] leading-4">JDA</p>
                            <p className="font-AlfaSlabOne text-white text-[14px] leading-4">COFFE</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-[#E4E4E4] w-full mt-[17px]  rounded-l-[30px] rounded-r-[30px]">
                <div className="pt-[22px] pb-[22px] pl-[22px] pr-[22px]">
                    <div className="flex flex-wrap gap-[2%] gap-y-[15px]">
                        {[
                            {
                                src: "https://imgrosetta.mynet.com.tr/file/16305727/16305727-900x900.jpg",
                                text: "Kahvaltılar",
                                slug: 'kahvaltilar'
                            },
                            {
                                src: "https://as2.ftcdn.net/v2/jpg/00/86/94/01/1000_F_86940105_PXqevyzFO0VZNXJ0LHCu10K3QPPtNv2c.jpg",
                                text: "Izgaralar",
                                slug: 'izgaralar'
                            },
                            {
                                src: "https://i.lezzet.com.tr/images-xxlarge/salcali-makarna-f60e9ce7-6ad0-49ab-8dae-a3f6aa385734",
                                text: "Makarnalar",
                                slug: 'makarnalar'
                            },
                            {
                                src: "https://www.bobajoy.com.tr/data/haber/QelOWQHhi1buj8dP.jpg",
                                text: "Soguk İçecekler",
                                slug: 'soguk-icecekler'
                            },
                            {
                                src: "https://qrmenuv3.sitelab.com.tr/resimler/471-sicak-icecekler.webp",
                                text: "Sıcak İçecekler",
                                slug: 'sicak-icecekler'
                            },
                            {
                                src: "https://www.avcikoru.com/wp-content/uploads/2021/02/cay-saati-salatalari-1.jpg",
                                text: "Salatalar",
                                slug: 'salatalar'
                            },
                            {
                                src: "https://panel.beyazfirin.com/customimage/0/640/Urun/00012/00012378_4pwan2d47ew42.jpg",
                                text: "Tatlılar",
                                slug: 'tatlilar'
                            },
                            {
                                src: "https://image.hurimg.com/i/hurriyet/75/0x0/651ace3c4e3fe017e458c706.jpg",
                                text: "Tantuniler",
                                slug: 'tantuniler'
                            },

                        ].map((item, index) => (
                            <Link
                                href={`/aaa/kategori/${item?.slug}`}
                                key={index}
                                className="w-[49%] cursor-pointer aspect-square border-[5px] border-[#ffffffe6] relative overflow-hidden group"
                            >
                                <img
                                    className="object-center object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                                    src={item.src}
                                    alt=""
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                <div className="absolute bottom-3 w-full">
                                    <p className="text-center text-[20px] text-white font-Poppins">{item.text}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    );
}
