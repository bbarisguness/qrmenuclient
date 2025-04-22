import Link from 'next/link'
import React from 'react'

export const metadata = {
  title: 'GDMENU | NotFound',
  description: 'Gdmenu ile işletmenizin sınırlarını zorlayın',
}

export default function NotFound() {
  return (
    <div className='flex flex-col items-center mt-[10px]'>
      <div>Not Found</div>
      <Link className='underline' href={"/"}>Anasayfa'ya dön</Link>
    </div>
  )
}
