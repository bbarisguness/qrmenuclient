"use client"
import { getCompanyHome } from '@/services/companyService'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import styles from './notFound.module.css'

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
    <>
      <Head>
        <title>Gdmenu | Sayfa Bulunamadı</title>
      </Head>
      <div className={`${styles.container} font-Poppins`}>
        <div className={styles.content}>
          <div className={styles.errorContent}>
            <h1 className={styles.text}>404</h1>
            <h3 className={styles.subtitle}>Sayfa Bulunamadı</h3>
            <Link className={styles.button} href={link}>Anasayfa'ya Dön</Link>
          </div>
        </div>
      </div>
    </>
  )
}
