"use client"

import { useRouter } from "next/navigation"

export default function RadioButtonCurrency({ isChecked, color, name, setCurrencyType }) {
    const changeLanguage = () => {
        setCurrencyType(name)
        localStorage.setItem('currencyType', name)
    }

    return (
        <div className="flex items-center justify-center gap-3" onClick={() => changeLanguage()}>
            <div
                className={`w-6 h-6 rounded-full p-[1px] relative bottom-[1.5px]`}
                style={{ backgroundColor: color }}
            >
                <div className="w-[100%] h-[100%] bg-[white] rounded-full p-[5px]">
                    {
                        isChecked &&
                        <div
                            className={`w-[100%] h-[100%] rounded-full`}
                            style={{ backgroundColor: color }}
                        >
                        </div>
                    }
                </div>
            </div>
            <span>{name.toUpperCase()}</span>
        </div>
    );
}
