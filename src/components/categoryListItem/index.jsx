"use client"
import Link from "next/link"
import { useGlobalContext } from '@/context/GlobalContext';

export default function CategoryListItem({ categories, item }) {
    const { toggleActiveMenu } = useGlobalContext();
    return (
        <Link
            onClick={() => toggleActiveMenu(item?.id)}
            href={`/${categories?.data[0]?.company?.slug}/kategori/${item?.slug}`}
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
    )
}
