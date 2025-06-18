"use client"

import { useGlobalContext } from '@/context/GlobalContext';
import { useEffect, useState } from 'react';

export default function ProductPrice2({ price, discount = 0, list = true, tcmb, fontSize = '', fontWeight = '' }) {
    const [loading, setLoading] = useState(true)
    const { currencyType } = useGlobalContext();
    const [exchangeRates, setExchangeRates] = useState({});
    const [convertedPrice, setConvertedPrice] = useState(price);

    useEffect(() => {
        const fetchExchangeRates = async () => {
            try {
                const text = tcmb
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(text, "text/xml");

                const rates = {
                    usd: parseFloat(xmlDoc.querySelector("Currency[CurrencyCode='USD'] > ForexBuying").textContent),
                    eur: parseFloat(xmlDoc.querySelector("Currency[CurrencyCode='EUR'] > ForexBuying").textContent),
                    gbp: parseFloat(xmlDoc.querySelector("Currency[CurrencyCode='GBP'] > ForexBuying").textContent),
                };

                setExchangeRates(rates);
            } catch (error) {
                console.error("Döviz kurları alınamadı:", error);
            }
        };

        fetchExchangeRates();
    }, []);

    useEffect(() => {
        if (currencyType && exchangeRates[currencyType]) {
            setConvertedPrice(price / exchangeRates[currencyType]);
            setLoading(false)
        } else {
            setConvertedPrice(price);
            setLoading(false)
        }
    }, [price, currencyType, exchangeRates]);

    if (loading) return list ? <span className="font-Poppins text-[12px] text-[#1374E0] mr-[18px]">...</span> : <div className="text-center mt-[15px] font-Poppins text-[22px] text-[#1E5CCE] font-semibold relative">...</div>

    return (
        <>
            {
                list ?
                    <span className="font-Poppins text-[12px] text-[#1374E0] mr-[18px]">{convertedPrice.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} {currencyType === 'tl' ? 'TL' : currencyType === 'usd' ? 'USD' : currencyType === 'gbp' ? 'GBP' : currencyType === 'eur' ? 'EUR' : 'TL'}</span>
                    :
                    <>
                        {
                            discount > 0 &&
                            <span className='text-[14px] whitespace-nowrap mr-[6px] font-medium text-[#9e9e9e] decoration-th [text-decoration:line-through] ![text-decoration-color:#d32f2f] inline-block'>
                                {convertedPrice?.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} {currencyType === 'tl' ? 'TL' : currencyType === 'usd' ? 'USD' : currencyType === 'gbp' ? 'GBP' : currencyType === 'eur' ? 'EUR' : 'TL'}
                            </span>
                        }
                        <span style={{ fontSize: fontSize ? fontSize : '', fontWeight: fontWeight ? fontWeight : '' }} className='text-[13px] whitespace-nowrap ml-[2px]'>
                            {discount > 0 ? (convertedPrice - ((convertedPrice * discount) / 100))?.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : convertedPrice?.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} {currencyType === 'tl' ? 'TL' : currencyType === 'usd' ? 'USD' : currencyType === 'gbp' ? 'GBP' : currencyType === 'eur' ? 'EUR' : 'TL'}
                        </span>
                    </>


            }
        </>
    )
}
