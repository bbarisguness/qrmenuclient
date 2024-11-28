"use client"
import React, { useEffect, useRef } from 'react'
import ProductPrice from '../productPrice';

export default function ProductModal({ open, setOpen, selectedItem, tcmb, productModalColor, globalVariables }) {

    const menuRef = useRef()


    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
            window.scrollTo({ top: 0, behavior: 'smooth' })
        } else {
            document.body.style.overflow = '';
        }
    }, [open])


    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setOpen(false); // Dışarı tıklandığında menüyü kapat
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    if (open && selectedItem) {
        return (
            <>
                <div className="w-full h-full absolute top-0 left-0 bottom-0 right-0 bg-black bg-opacity-50 z-10"></div>
                <div className='px-[26px] z-30 w-full absolute top-0 bottom-0 flex items-center '>
                    <div ref={menuRef} className='w-full bg-white relative rounded-[15px]'>
                        <div className='flex w-full justify-end absolute top-[-15px] right-[-13px]'>
                            <div style={{ backgroundColor: `#${productModalColor || "7BB4FE"}` }} onClick={() => setOpen(false)} className='px-2 cursor-pointer py-2 rounded-full relative'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 13 13" fill="none">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M9.65203 0.806156L6.50102 3.95484L3.35001 0.803665C2.89813 0.333026 2.22705 0.143608 1.59579 0.308522C0.964533 0.473436 0.471832 0.966887 0.307853 1.59842C0.143875 2.22995 0.334266 2.90079 0.805543 3.35201L3.95531 6.50318L0.808034 9.65062C0.123449 10.358 0.132501 11.4836 0.828373 12.1799C1.52424 12.8761 2.64984 12.8857 3.35749 12.2015L6.50102 9.04779L9.64954 12.1977C10.1018 12.6674 10.7724 12.8562 11.4032 12.6915C12.034 12.5267 12.5267 12.034 12.6915 11.4031C12.8562 10.7723 12.6674 10.1016 12.1977 9.64937L9.05421 6.50443L12.2015 3.35699C12.8861 2.64964 12.877 1.52398 12.1811 0.827731C11.4853 0.131482 10.3597 0.12188 9.65203 0.806156Z" fill="white" />
                                </svg>
                            </div>
                        </div>
                        {
                            selectedItem?.image?.url &&
                            <div style={{ backgroundColor: `#${productModalColor || "7BB4FE"}` }} className='mx-[34px] mt-[34px] mb-[17px] h-[213px] relative rounded-[40px] flex justify-center items-center'>
                                {
                                    selectedItem?.image?.url ?
                                        <img className='rounded-full aspect-square relative max-w-[170px] w-full' src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${selectedItem?.image?.url}`} alt="" />
                                        :
                                        <div className='rounded-full aspect-square relative max-w-[170px] w-full'></div>
                                }
                            </div>
                        }
                        {
                            !(selectedItem?.image?.url) &&

                            <div style={{ overflowWrap: 'break-word' }} className='text-center px-8 relative text-[#172b4d] font-Poppins mt-8 text-[22px] font-semibold'>
                                {selectedItem?.name}
                            </div>
                        }
                        <div style={{ marginTop: selectedItem?.image?.url ? '0px' : '30px' }} className='text-center mb-[17px] font-Poppins text-[22px] text-[#1E5CCE] font-semibold relative'>
                            <ProductPrice list={false} tcmb={tcmb} price={selectedItem?.price} />
                        </div>
                        {
                            selectedItem?.longDescription &&
                            <div className='mx-[34px] text-[17px] text-black font-normal font-Poppins'>
                                {globalVariables?.data?.aboutProductText}
                            </div>
                        }

                        <div style={{ marginBottom: selectedItem?.contents?.length === 0 ? '34px' : '17px' }} className='mx-[34px] leading-5 text-[15px] font-Poppins opacity-50 tracking-[0.3px]'>
                            {selectedItem?.longDescription}
                        </div>
                        {
                            selectedItem?.contents?.length !== 0 &&
                            <div className="mt-[17px] mx-[34px] mb-[34px] relative">
                                <div className='text-[17px] text-black font-normal font-Poppins'>
                                    {globalVariables?.data?.contentsText}
                                </div>
                                {
                                    selectedItem?.contents?.map((item, i) => {
                                        return (
                                            <div key={i} className="opacity-50 text-[15px] mt-[7px] font-normal text-black font-Poppins relative before:content-[''] before:inline-block before:w-[6px] before:h-[6px] before:bg-[#000000] before:rounded-full before:mr-[8px]">
                                                {item?.name}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        }
                    </div>
                </div>
            </>
        )
    }
}
