import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Roboto, Inter } from 'next/font/google'
import Header from '../components/Header/Header'
import { SessionProvider } from "next-auth/react"

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700'],
  subsets: ['latin']
})

const inter = Inter({
  subsets: ['latin']
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <main className={`${roboto.className}`}>
        <Header />
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  )
}
