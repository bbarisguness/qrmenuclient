"use client"
import React, { useState } from 'react'
import Alert from '../alert';

export default function WifiButton({ data, color }) {
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
    return (
        <>
            <div onClick={() => handleCopy(data?.copyText)} style={{ color: `#${color}` }} className='font-semibold cursor-pointer mb-[10px] text-center m-auto text-[13px] underline w-fit'>{data?.name}</div>
        </>
    )
}
