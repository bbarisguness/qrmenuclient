import { getCompany } from "@/services/companyService";
import { getProducts } from "@/services/productService";
import Link from "next/link";

export const metadata = {
    title: "Grande Cafe",
    description: "Grande Cafe Qr Menü",
};

export default async function Page({ params }) {

    const { slug } = await params
    const company = getCompany();
    const products = getProducts(slug)

    const data = [
        {
            name: 'Sphagetti Rosso',
            price: 150,
            slug: 'sphagetti-rosso',
            src: "https://cdn.yemek.com/mnresize/1250/833/uploads/2022/04/soslu-makarna-tarifi-yemekcom.jpg",
        },
        {
            name: 'Burger',
            slug: 'burger',
            price: 250,
            src: "https://mudavim.net/wp-content/uploads/2023/11/grungy.jpg",
        },
        {
            name: 'İskender',
            slug: 'iskender',
            price: 250,
            src: "https://server.canakkaleolay.com/public/photos/news/2024/202401/haber-58076/51455387_58076_iskender-sosu-nasil-yapil.webp",
        },
        {
            name: 'Salata',
            slug: 'salata',
            price: 60,
            src: "https://www.avcikoru.com/wp-content/uploads/2021/02/cay-saati-salatalari-1.jpg",
        },
        {
            name: 'Tavuk Şiş',
            slug: 'tavuk-sis',
            price: 290,
            src: "https://as2.ftcdn.net/v2/jpg/00/86/94/01/1000_F_86940105_PXqevyzFO0VZNXJ0LHCu10K3QPPtNv2c.jpg",
        },
        {
            name: 'Tatlı',
            slug: 'tatli',
            price: 120,
            src: "https://tatli.gen.tr/images/tatli-tarifleri.gif",
        }
    ]

    return (
        <div className="max-w-[600px] bg-[#EEE] w-full relative m-auto h-screen">
            <div className="w-full pt-[14px]" >
                <div className="bg-[#F5F5F5] rounded-[20px] w-full h-[98px] flex items-center justify-between pl-[25px] pr-[25px]">
                    <Link href={'/asd/kategori'} className="flex">
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

            <div className="w-full bg-[url('https://qrmenuv3.sitelab.com.tr/resimler/471-sicak-icecekler.webp')] h-full bg-center bg-no-repeat bg-cover max-h-[182px] mt-[17px] rounded-l-[30px] rounded-r-[30px] relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
                <h1 className="text-center text-white text-[32px] font-normal font-Sansita drop-shadow-md relative">Popüler</h1>
            </div>

            <div className="bg-[#E4E4E4] w-full mt-[17px] pt-[14px] pb-[14px] rounded-l-[30px] rounded-r-[30px]">
                {data.map((item, i) => (
                    <Link key={i} href={`/asd/${item.slug}`} className="block w-full pl-[25px] pr-[25px] mb-[15px] group">
                        <div className="flex items-center">
                            <img className="w-[80px] h-[80px] object-cover rounded-[15px]" src={item.src} alt="" />
                            <div className="pl-[16px] pr-[16px]">
                                <p className="font-Poppins text-[16px] font-medium mb-[8px] text-[#172B4D]">{item.name}</p>
                                <div>
                                    <span className="font-Poppins text-[12px] text-[#1374E0] mr-[18px]">{item.price} TL</span>
                                    <span className="font-Poppins text-[12px] text-[#7A869A] relative before:content-[''] before:inline-block before:w-[6px] before:h-[6px] before:bg-[#C1C7D0] before:rounded-full before:mr-[8px]">Yogurdun essiz lezzeti </span>
                                </div>
                            </div>
                        </div>
                        {
                            data?.length != i + 1 &&
                            <div className="w-full h-[1px] duration-500 bg-white mt-[15px] group-hover:bg-[#62C3FF]"></div>
                        }
                    </Link>
                ))
                }
            </div>
        </div >
    );
}
