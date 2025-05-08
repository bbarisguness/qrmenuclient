"use client"
import { getCompanyHome } from '@/services/companyService'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

// export const metadata = {
//   title: 'GDMENU | NotFound',
//   description: 'Gdmenu ile işletmenizin sınırlarını zorlayın',
// }

export default function NotFound() {
  const path = usePathname()
  const [link, setLink] = useState('')
  
  useEffect(() => {
    getCompanyHome({ slug: path?.split('/')[1], lang: 'tr' }).then((res) => {
      if (res?.data?.[0]) {
        setLink(`/${res?.data[0]?.slug}`)
      } else {
        setLink('/')
      }
    })
  }, [])

  return (
    <div className='flex flex-col items-center mt-[10px]'>
      <div>Sayfa Bulunamadı</div>
      <Link className='underline' href={link}>Anasayfa'ya dön</Link>
    </div>
  )
}
