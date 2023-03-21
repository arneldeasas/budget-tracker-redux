import Layout from '@/components/layout'
import '@/styles/globals.css'
import configureStore from '@/redux/configureStore';
import { Provider } from 'react-redux';
import 'tailwindcss/tailwind.css';
import Head from 'next/head';
export default function App({ Component, pageProps }) {
  return (
    <>
      
      <Provider store={configureStore}>
      
        <Component {...pageProps} />
      </Provider>
    </>
    
      
    
  )
}
