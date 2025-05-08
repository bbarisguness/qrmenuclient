"use client"
import React from 'react'
import { createRoot } from 'react-dom/client'
import { CiCircleAlert } from "react-icons/ci"

const AlertItem = ({ type = 'success', title = '', message = '' }) => {
    const colorScheme = {
        error: 'text-[#F8285A] border-[#F8285A] bg-[#FFEEF3]',
        success: 'text-[#17C653] border-[#17C653] bg-[#DFFFEA]',
        warning: 'text-[#F6C000] border-[#F6C000] bg-[#FFF8DD]'
    }

    return (

        <div className='relative min-w-min right-[1rem] bottom-[1rem] mt-[1rem]'>
            <div className={`relative ${colorScheme[type]} rounded-[.475rem] border border-solid flex items-center gap-[10px] p-5 justify-end`}>
                <CiCircleAlert size={30} />
                <div className="flex flex-col">
                    <h4 className="mb-1 font-semibold leading-[1.2] text-[1.25rem] text-inherit">
                        {title}
                    </h4>
                    <span>{message}</span>
                </div>
            </div>
        </div>
    )
}

const Alert = ({ type = 'success', time = 1500, title = '', message = '' }) => {
    const alertContainer = document.getElementById('alertContainer')
    if (alertContainer) {
        const itemContainer = document.createElement('div')
        alertContainer.appendChild(itemContainer)
        const root = createRoot(itemContainer)
        root.render(<AlertItem type={type} title={title} message={message} />)
        setTimeout(() => {
            root.unmount()
            alertContainer.removeChild(itemContainer)
        }, time)
    } else {
        const container = document.createElement('div')
        const itmCont = document.createElement('div')
        container.className = 'min-w-min fixed right-0 z-[1500] bottom-0 flex flex-col items-end'
        container.id = 'alertContainer'
        container.appendChild(itmCont)
        document.body.appendChild(container)

        const root = createRoot(itmCont)

        root.render(<AlertItem type={type} title={title} message={message} />)

        setTimeout(() => {
            root.unmount()
            container.removeChild(itmCont)
        }, time)
    }
}

export default Alert