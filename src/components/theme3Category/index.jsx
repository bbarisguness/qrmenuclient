"use client"
import Link from 'next/link';
import React, { useEffect, useState, useRef } from 'react'
import { CiPause1 } from "react-icons/ci";
import ProductPrice2 from '../productPrice2';
import { useGlobalContext } from '@/context/GlobalContext';
import { photoFormatsDetect } from '@/utils/photoFormatsDetect';

export default function Theme3Category({ categories, tcmb, lang }) {
    const [menu, setMenu] = useState(false)
    const [activeCategory, setActiveCategory] = useState("")
    const { grid, setGrid } = useGlobalContext();
    // Create an object to store refs for each category
    const categoryRefs = useRef({});
    // Ref for the horizontal menu container
    const menuContainerRef = useRef(null);
    // Refs for menu items to track their positions
    const menuItemRefs = useRef({});
    // Track the last scroll position to detect actual scrolling
    const lastScrollY = useRef(0);
    // Track if component just mounted to avoid initial auto-scroll
    const justMounted = useRef(true);

    // Function to calculate active category based on scroll position
    const calculateActiveCategory = () => {
        if (categories?.data) {
            const scrollPosition = window.scrollY + 100; // Offset for better UX

            // Check each category section's position
            for (let i = categories.data.length - 1; i >= 0; i--) {
                const category = categories.data[i];
                const ref = categoryRefs.current[category.id];

                if (ref && ref.current) {
                    const position = ref.current.offsetTop;

                    if (scrollPosition >= position) {
                        return category.id;
                    }
                }
            }
            // Default to first category if no match found
            return categories.data[0]?.id;
        }
        return "";
    };

    // Initialize the active category based on current scroll position when data loads
    useEffect(() => {
        if (categories?.data?.length > 0) {
            // Small delay to ensure DOM is ready
            setTimeout(() => {
                const activeCat = calculateActiveCategory();
                setActiveCategory(activeCat);
                // lastScrollY.current = window.scrollY;
                // console.log(menuItemRefs.current[activeCat].offsetLeft);
                menuContainerRef.current.scrollLeft = menuItemRefs.current[activeCat].offsetLeft
                // Mark as mounted after initial setup
                setTimeout(() => {
                    justMounted.current = false;
                }, 500);
            }, 100);
        }
    }, [categories]);

    // Function to scroll menu to active category
    const scrollMenuToActiveCategory = (categoryId) => {
        const menuContainer = menuContainerRef.current;
        const menuItem = menuItemRefs.current[categoryId];

        if (menuContainer && menuItem) {
            const containerRect = menuContainer.getBoundingClientRect();
            const itemRect = menuItem.getBoundingClientRect();

            // Calculate the position to center the item
            const scrollLeft = menuItem.offsetLeft - (containerRect.width / 2) + (itemRect.width / 2);

            menuContainer.scrollTo({
                left: scrollLeft,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        // Create refs for all categories
        if (categories?.data) {
            categories.data.forEach(category => {
                if (!categoryRefs.current[category.id]) {
                    categoryRefs.current[category.id] = React.createRef();
                }
            });
        }

        const handleScroll = () => {
            // Show/hide menu based on scroll position
            setMenu(window.scrollY > 300);

            // Check if this is actual scrolling (not just page load/back button)
            const currentScrollY = window.scrollY;
            const actuallyScrolling = Math.abs(currentScrollY - lastScrollY.current) > 5;
            lastScrollY.current = currentScrollY;

            // Check which category is currently visible
            const newActiveCategory = calculateActiveCategory();
            if (newActiveCategory && activeCategory !== newActiveCategory) {
                setActiveCategory(newActiveCategory);
                // Only auto scroll menu if user is actually scrolling and component has been mounted for a while
                if (actuallyScrolling && !justMounted.current) {
                    setTimeout(() => {
                        scrollMenuToActiveCategory(newActiveCategory);
                    }, 100);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [categories, activeCategory]);

    // Function to scroll to category when menu item is clicked
    const scrollToCategory = (categoryId) => {
        const ref = categoryRefs.current[categoryId];
        if (ref && ref.current) {
            window.scrollTo({
                top: ref.current.offsetTop - 70, // Offset for the fixed header
                behavior: 'smooth',
            });
            setActiveCategory(categoryId);
        }
    };

    return (
        <>
            <div
                ref={menuContainerRef}
                style={{
                    opacity: menu ? '1' : '0',
                    backgroundColor: 'white',
                    overscrollBehavior: 'none',
                    scrollbarWidth: 'none'
                }}
                className={`top-0 w-full overflow-x-auto rounded-b-[8px] shadow fixed h-[60px] px-[16px] py-[8px] box-border scroll-menu flex gap-[16px] pr-[16px] ${menu ? 'z-[999]' : 'translate-y-[-100%] z-[-999]'}`}
            >
                {
                    categories?.data?.map((category, i) => {
                        return (
                            <div
                                key={i}
                                ref={(el) => menuItemRefs.current[category.id] = el}
                                onClick={() => scrollToCategory(category.id)}
                                style={{
                                    backgroundColor: activeCategory === category.id ? `#${categories?.data?.[0]?.company?.theme?.primaryColor}` : 'white',
                                    color: activeCategory === category.id ? 'white' : 'black',
                                    borderColor: `#${categories?.data?.[0]?.company?.theme?.primaryColor}`
                                }}
                                className='rounded-[8px] cursor-pointer text-[14px] flex gap-[12px] items-center min-w-fit border px-[12px] py-[2px] transition-colors duration-300'
                            >
                                <span className='max-w-[150px] text-ellipsis overflow-hidden one-line break-all'>
                                    {category?.name}
                                </span>
                            </div>
                        )
                    })
                }
            </div>
            <div>
                <div style={{ overscrollBehavior: 'none', scrollbarWidth: 'none' }} className="pl-[16px] overflow-x-auto overflow-y-hidden">
                    <div style={{ flexDirection: 'row', paddingRight: '16px' }} className="flex gap-[8px] w-max h-max">
                        {
                            categories?.data?.map((category, i) => {
                                return (
                                    <div key={i} style={{ opacity: 1, transform: 'translateX(0%) scale(1) translateZ(0px)' }}>
                                        <div
                                            onClick={() => scrollToCategory(category.id)}
                                            style={{
                                                backgroundColor: activeCategory === category.id ? `#${categories?.data?.[0]?.company?.theme?.primaryColor}` : 'white',
                                                color: activeCategory === category.id ? 'white' : 'black',
                                                borderColor: `#${categories?.data?.[0]?.company?.theme?.primaryColor}`
                                            }}
                                            className="rounded-[8px] cursor-pointer menu-button h-[42px] flex gap-[12px] items-center min-w-max border p-[4px] pr-[16px] transition-colors duration-300"
                                        >
                                            <div className="rounded-lg aspect-square !w-[32px] !h-[32px] overflow-hidden">
                                                <div className="relative w-full h-full">
                                                    <img style={{ opacity: 100 }} className="!w-full !h-full object-cover duration-200" width={80} height={80} src={`${category?.image?.url ? photoFormatsDetect(category?.image, "thumbnail")?.url : categories?.data?.[0]?.company?.logo?.url}`} alt="" />
                                                </div>
                                            </div>
                                            <span className="max-w-[180px] text-ellipsis overflow-hidden one-line break-all">{category?.name}</span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className="overflow-y-hidden flex-col">
                {
                    categories?.data?.[0] &&
                    <div ref={categoryRefs.current[categories.data[0]?.id]} className="px-[16px] w-full">
                        {
                            categories?.data?.[0]?.image?.url &&
                            <div className="w-full overflow-hidden h-[150px] rounded-[8px] mb-[16px]">
                                <div className="relative w-full h-full">
                                    <img width={80} height={80} className="!w-full !h-full object-cover duration-200" src={photoFormatsDetect(categories?.data?.[0]?.image, "medium")?.url} alt="" />
                                </div>
                            </div>
                        }
                        <div className="flex items-center justify-between">
                            <span style={{ color: 'black' }} className="text-[16px] font-semibold">{categories?.data?.[0]?.name}</span>
                            <div><CiPause1 onClick={() => grid === 1 ? setGrid(2) : setGrid(1)} style={{ transform: grid === 1 ? 'rotateZ(90deg)' : '' }} className='cursor-pointer' size={26} /></div>
                        </div>
                    </div>
                }

                <div className="px-[16px] pt-[16px] pb-[20px]">
                    {
                        categories?.data?.[0] &&
                        <div className="flex flex-col gap-[16px]">
                            <div className={`${grid === 1 ? 'gap-[8px] grid grid-cols-1' : 'gap-[16px] grid grid-cols-2'}`}>
                                {
                                    categories?.data?.[0]?.products?.map((itm, i) => {
                                        return (
                                            <div key={i} className="relative">
                                                <Link className="relative cursor-pointer" href={`/${categories?.data?.[0]?.company?.slug}/${itm?.documentId}?lang=${lang || 'tr'}`}>
                                                    <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} className={`cursor-pointer shadow-md h-full relative rounded-[20px] ${grid === 1 ? 'flex p-[8px]' : ''} gap-[16px] border`}>
                                                        <div>
                                                            <div className={`${grid === 1 ? '!h-[80px] !w-[80px] max-w-max' : ''} aspect-square overflow-hidden rounded-[16px]`}>
                                                                <div className="relative w-full h-full">
                                                                    <img style={{ opacity: 100 }} className="!w-full !h-full object-cover duration-200" src={`${itm?.image?.url ? photoFormatsDetect(itm?.image, "medium")?.url : categories?.data?.[0]?.company?.logo?.url}`} alt="" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div style={{ color: 'black' }} className={`${grid === 1 ? 'w-[calc(100%-120px)]' : 'p-[8px] mt-[10px] w-full'} flex flex-col justify-center`}>
                                                            <div className={`${grid === 1 ? 'w-[85%]' : 'w-full'}`}>
                                                                <span className="w-full line-clamp-1">{itm?.name}</span>
                                                            </div>
                                                            <div className="flex items-center justify-between">
                                                                <div className="mt-auto flex justify-between items-center">
                                                                    <span className="text-[18px] font-semibold">
                                                                        <ProductPrice2 fontSize='18px' fontWeight={600} list={false} tcmb={tcmb} discount={itm?.discount || 0} price={itm?.price} />
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    }

                    {
                        categories?.data?.map((category, i) => {
                            if (i !== 0) {
                                return (
                                    <div
                                        key={i}
                                        ref={categoryRefs.current[category.id]}
                                        style={{ marginTop: '32px' }}
                                        className="flex flex-col gap-[16px]"
                                    >
                                        {
                                            category?.image?.url &&
                                            <div className="w-full h-[150px] rounded-[8px] overflow-hidden">
                                                <div className="relative w-full h-full">
                                                    <img style={{ opacity: 100 }} width={80} height={80} className="!w-full !h-full object-cover duration-200" src={`${photoFormatsDetect(category?.image, "medium")?.url}`} alt="" />
                                                </div>
                                            </div>
                                        }
                                        <span className="text-[16px] font-semibold">
                                            {category?.name}
                                        </span>
                                        <div className={`grid ${grid === 1 ? 'gap-[8px] grid-cols-1' : 'gap-[16px] grid-cols-2'}`}>
                                            {
                                                category?.products?.map((product, x) => {
                                                    return (
                                                        <div key={x} className="relative">
                                                            <Link className="relative cursor-pointer" href={`/${categories?.data?.[0]?.company?.slug}/${product?.documentId}?lang=${lang || 'tr'}`}>
                                                                <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} className={`cursor-pointer shadow-md relative rounded-[20px] ${grid === 1 ? 'flex p-[8px]' : ''} gap-[16px] border`}>
                                                                    <div>
                                                                        <div className={`${grid === 1 ? '!h-[80px] !w-[80px] max-w-max' : ''} aspect-square overflow-hidden rounded-[16px]`}>
                                                                            <div className="relative w-full h-full">
                                                                                <img style={{ opacity: 100 }} className="!w-full !h-full object-cover duration-200" src={`${product?.image?.url ? photoFormatsDetect(product?.image, "medium")?.url : categories?.data?.[0]?.company?.logo?.url}`} alt="" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div style={{ color: 'black' }} className={`${grid === 1 ? 'w-[calc(100%-120px)]' : 'p-[8px] mt-[10px] w-full'} flex flex-col justify-center`}>
                                                                        <div className={`${grid === 1 ? 'w-[85%]' : 'w-full'}`}>
                                                                            <span className="w-full line-clamp-1">{product?.name}</span>
                                                                        </div>
                                                                        <div className="flex items-center justify-between">
                                                                            <div className="mt-auto flex justify-between items-center">
                                                                                <span className="text-[18px] font-semibold">
                                                                                    <ProductPrice2 fontSize='18px' fontWeight={600} list={false} tcmb={tcmb} price={product?.price} />
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            }
                            return null;
                        })
                    }
                </div>
            </div>
        </>
    )
}