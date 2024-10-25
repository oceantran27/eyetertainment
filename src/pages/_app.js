import Layout from '@/components/Layout'
import { Toaster } from 'react-hot-toast';
import '../styles/globals.css'
import { DefaultSeo } from 'next-seo';
import seo from "@/configs/seo.config";
import "swiper/css";
import "swiper/css/pagination";
import { useContext, useEffect } from 'react';
import { UserProvider, useUser } from '@/context/user';
import { WebGazerProvider } from '../context/webgazerContext';



export default function App({ Component, pageProps }) {
  return (
    <>
      <UserProvider>
        <WebGazerProvider> {/* Wrap with WebGazerProvider */}
          <DefaultSeo {...seo} />
          <Layout>
            <Component {...pageProps} />
            <Toaster 
              toastOptions={{
                style: {
                  background: '#363636',
                  color: '#fff',
                }
              }} 
            />
          </Layout>
        </WebGazerProvider>
      </UserProvider>
    </>
  );
}
