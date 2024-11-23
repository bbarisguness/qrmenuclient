"use client"

import { useState } from "react";
import ProductModal from "../productModal";
import ProductPrice from "../productPrice";

export default function ProductList({ products, tcmb, productModalColor, globalVariables }) {
    const [open, setOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState({})

    return (
        <>
            <ProductModal globalVariables={globalVariables} productModalColor={productModalColor} tcmb={tcmb} selectedItem={selectedItem} open={open} setOpen={setOpen} />
            {
                products.data.map((item, i) => (
                    <div onClick={() => { setOpen(true); setSelectedItem(item) }} key={i} className="block cursor-pointer w-full pl-[25px] pr-[25px] mb-[15px] group">
                        <div className="flex items-center">
                            <img className="w-[80px] h-[80px] object-cover rounded-[15px]" src={item?.image?.url ? process.env.NEXT_PUBLIC_BACKEND_URL + item.image.url : null} alt="" />
                            <div className="pl-[16px] pr-[16px]">
                                <p className="font-Poppins text-[16px] font-medium mb-[8px] text-[#172B4D]">{item.name}</p>
                                <div>
                                    {/* <span className="font-Poppins text-[12px] text-[#1374E0] mr-[18px]">{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} TL</span> */}
                                    <ProductPrice tcmb={tcmb} price={item?.price} />
                                    <span className="font-Poppins text-[12px] text-[#7A869A] relative before:content-[''] before:inline-block before:w-[6px] before:h-[6px] before:bg-[#C1C7D0] before:rounded-full before:mr-[8px]">{item.shortDescription}</span>
                                </div>
                            </div>
                        </div>
                        {
                            products.data?.length != i + 1 &&
                            <div className="w-full h-[1px] duration-500 bg-white mt-[15px] group-hover:bg-[#62C3FF]"></div>
                        }
                    </div>
                ))
            }
        </>
    )
}
