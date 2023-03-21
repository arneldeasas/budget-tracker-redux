import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Navbar from '@/components/navbar'
import Link from 'next/link'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className='get-started w-full h-[100vh] flex flex-col items-center justify-between p-8 '>
      <div className='w-auto h-[60%] flex place-items-center'>
        <Image src="/icon.png" alt="coinsense logo" width={80} height={80} />
        <h1 className='text-4xl font-bold ml-2'><span className='text-[#0081a7]'>Coin</span><span className='text-[#3fd9d7]'>Sense</span></h1>
      </div>
      
      <Link className='w-full' href='/login'><div className='getstarted-button '>Get Started</div></Link>
    </div>
  )
}
