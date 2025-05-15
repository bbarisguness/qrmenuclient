"use client"
import React, { useState } from 'react'
import Alert from '../alert';

export default function WifiButton({ data, color, variant = 1, bgColor = '' }) {
    const [wifiCopied, setWifiCopied] = useState(false)

    const handleCopy = async (textToCopy) => {
        setWifiCopied(true);
        if (!wifiCopied) {
            Alert({ message: 'Şifre kopyalandı', title: '', type: 'success', time: 1000 })
        }
        try {
            if (navigator.clipboard) {
                await navigator.clipboard.writeText(textToCopy);
            } else {
                const textArea = document.createElement("textarea");
                textArea.value = textToCopy;
                textArea.style.position = "fixed"; // Görünmez yapmak için.
                textArea.style.top = "-9999px";
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand("copy");
                document.body.removeChild(textArea);
            }
            setTimeout(() => {
                setWifiCopied(false);
            }, 1000);
        } catch (err) {
            console.error("Kopyalama işlemi başarısız!", err);
        }
    };
    if (variant === 1) {
        return (
            <>
                <div onClick={() => handleCopy(data?.copyText)} style={{ color: `#${color}` }} className='font-semibold cursor-pointer mb-[10px] text-center m-auto text-[13px] underline w-fit'>{data?.name}</div>
            </>
        )
    } else if (variant === 2) {
        return (
            <>
                <div style={{ backgroundColor: bgColor, color: 'rgb(255, 255, 255)' }} onClick={() => handleCopy(data?.copyText)} className="inline-flex cursor-pointer items-center justify-center active:duration-200 duration-200 active:opacity-60 whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 w-[50%] min-w-[215px] text-black !m-auto p-[10px] rounded-[20px] h-[2.75rem]">{data?.name}</div>
            </>
        )
    }

}
