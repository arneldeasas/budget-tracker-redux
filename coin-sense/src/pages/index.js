import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Navbar from '@/components/navbar'
import Link from 'next/link'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className='w-full'>
     
      <h1>Coin Sense</h1>
      <Link href='/login'><div className='bg-green-400 p-3 text-center w-auto'>get started</div></Link>
    </div>
  )
}
