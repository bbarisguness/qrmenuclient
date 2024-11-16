import { getProduct } from "@/services/productService";
import Link from "next/link";

export const metadata = {
    title: "Grande Cafe",
    description: "Grande Cafe Qr Menü",
};

export default async function Page({ params }) {

    const { productSlug } = await params
    const product = getProduct(productSlug)

    return (
        <div className="max-w-[600px] bg-[#F6F6F9] w-full relative m-auto h-full">
            <div className="w-full pt-[14px]" >
                <div className="bg-[#F5F5F5] rounded-[20px] w-full h-[98px] flex items-center justify-between pl-[25px] pr-[25px]">
                    <Link href={'/asd/kategori/asd'} className="flex">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M15 18L9 12L15 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-[16px] font-semibold text-black font-Poppins">Geri dön</span>
                    </Link>
                    <div>
                        <div className="w-[72px] h-[72px] relative rounded-full bg-[#1374E0] flex flex-col justify-center pl-[10px]">
                            <p className="font-AlfaSlabOne text-white text-[14px] leading-4">JDA</p>
                            <p className="font-AlfaSlabOne text-white text-[14px] leading-4">COFFE</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-[17px] pl-[50px] pr-[50px] relative flex justify-center">
                <img className="rounded-full w-[241px] h-[241px] object-cover object-center" src="https://mudavim.net/wp-content/uploads/2023/11/grungy.jpg" alt="" />
            </div>

            <div className="text-center mt-[50px] font-Poppins text-[28px] text-black font-semibold relative">
                Ketçaplı Makarna
            </div>

            <div className="text-center mt-[15px] font-Poppins text-[22px] text-[#1E5CCE] font-semibold relative">
                100 TL
            </div>

            <div className="mt-[40px] pl-[53px] pr-[53px] relative">
                <div className="text-[17px] font-semibold text-black font-Poppins">
                    Ürün Hakkında
                </div>
                <div className="text-[15px] mt-[7px] font-normal text-black font-Poppins opacity-50">
                    Lezzetli ketçaplı makarnamız, taptaze malzemelerle ve özenle hazırlanmaktadır.
                </div>
            </div>
            <div className="mt-[24px] pl-[53px] pr-[53px] relative">
                <div className="text-[17px] font-semibold text-black font-Poppins">
                    İçindekiler
                </div>
                <div className="opacity-50 text-[15px] mt-[7px] font-normal text-black font-Poppins relative before:content-[''] before:inline-block before:w-[6px] before:h-[6px] before:bg-[#000000] before:rounded-full before:mr-[8px]">
                    Durum buğdayı irmiği (makarna)
                </div>
                <div className="opacity-50 text-[15px] mt-[7px] font-normal text-black font-Poppins relative before:content-[''] before:inline-block before:w-[6px] before:h-[6px] before:bg-[#000000] before:rounded-full before:mr-[8px]">
                    Domates püresi (ketçap için)
                </div>
                <div className="opacity-50 text-[15px] mt-[7px] font-normal text-black font-Poppins relative before:content-[''] before:inline-block before:w-[6px] before:h-[6px] before:bg-[#000000] before:rounded-full before:mr-[8px]">
                    Şeker
                </div>
            </div>

            <div className="pb-[20px]">
                <Link href={'/asd/kategori/as'} className="mt-[45px] relative  rounded-[30px] bg-[#1E5CCE] h-[70px] mr-[50px] ml-[50px] justify-center items-center flex font-Poppins font-bold text-white text-[20px] transition-all hover:bg-[#1e5cced3]">
                    Geri Dön
                </Link>
            </div>
        </div>
    );
}
