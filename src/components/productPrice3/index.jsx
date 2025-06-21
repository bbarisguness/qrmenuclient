"use client"

import { useGlobalContext } from '@/context/GlobalContext';
import { useEffect, useState } from 'react';

export default function ProductPrice3({ price, discount = 0, list = true, tcmb, fontSize = '', fontWeight = '' }) {
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

    if (loading) return <div>...</div>

    return (
        <>
            {
                list ?
                    <span className="font-Poppins text-[12px] text-[#1374E0] mr-[18px]">{convertedPrice.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} {currencyType === 'tl' ? 'TL' : currencyType === 'usd' ? 'USD' : currencyType === 'gbp' ? 'GBP' : currencyType === 'eur' ? 'EUR' : 'TL'}</span>
                    :
                    <>
                        {
                            discount > 0 &&
                            <span className="p-[8px] ml-[.5rem] bg-[#f0443820] rounded-[8px] text-[13px] font-semibold text-[#f04438]">
                                {convertedPrice?.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} {currencyType === 'tl' ? 'TL' : currencyType === 'usd' ? 'USD' : currencyType === 'gbp' ? 'GBP' : currencyType === 'eur' ? 'EUR' : 'TL'}
                            </span>
                        }
                        <span className="p-[8px] ml-[.5rem] bg-[#f0443820] rounded-[8px] text-[13px] font-semibold text-[#f04438]">
                            {discount > 0 ? (convertedPrice - ((convertedPrice * discount) / 100))?.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : convertedPrice?.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} {currencyType === 'tl' ? 'TL' : currencyType === 'usd' ? 'USD' : currencyType === 'gbp' ? 'GBP' : currencyType === 'eur' ? 'EUR' : 'TL'}
                        </span>
                    </>
            }
        </>
    )
}
