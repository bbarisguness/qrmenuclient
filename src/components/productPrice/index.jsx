"use client"

import { useGlobalContext } from '@/context/GlobalContext';
import { useEffect, useState } from 'react';

export default function ProductPrice({ price, list = true, tcmb }) {
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
                    : <div className="text-center mt-[15px] font-Poppins text-[22px] text-[#1E5CCE] font-semibold relative">
                        {convertedPrice?.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} {currencyType === 'tl' ? 'TL' : currencyType === 'usd' ? 'USD' : currencyType === 'gbp' ? 'GBP' : currencyType === 'eur' ? 'EUR' : 'TL'}
                    </div>
            }
        </>
    )
}
