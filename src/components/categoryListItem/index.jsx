"use client"
import Link from "next/link"
import { useGlobalContext } from '@/context/GlobalContext';
import { useSearchParams } from "next/navigation";
import Image from "next/image";

export default function CategoryListItem({ categories, item }) {
    const { toggleActiveMenu } = useGlobalContext();
    const searchParams = useSearchParams();
    const currentParams = new URLSearchParams(searchParams.toString());
    const param = currentParams?.size !== 0 ? currentParams.toString() : 'lang=tr'

    return (
        <Link
            onClick={() => toggleActiveMenu(item?.id)}
            href={`/${categories?.data[0]?.company?.slug}/kategori/${item?.slug}?${param}`}
            className="w-[49%] cursor-pointer aspect-square border-[5px] border-[#ffffffe6] relative overflow-hidden group"
        >
            {/* <img
                className="object-center object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                src={item?.image?.url ? process.env.NEXT_PUBLIC_BACKEND_URL + item?.image?.url : null}
                alt=""
            /> */}
            {
                item?.image?.url &&
                <Image
                    className="object-center object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    src={item?.image?.url ? item?.image?.formats?.medium?.url ? process.env.NEXT_PUBLIC_BACKEND_URL + item?.image?.formats?.medium?.url : process.env.NEXT_PUBLIC_BACKEND_URL + item?.image?.url : null}
                    alt={item?.image?.hash || ''}
                    width={500}
                    height={500}
                />
            }
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-3 w-full">
                <p className="text-center text-[20px] text-white font-Poppins">{item.name}</p>
            </div>
        </Link>
    )
}
