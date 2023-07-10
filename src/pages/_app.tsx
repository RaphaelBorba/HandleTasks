import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Roboto, Inter } from 'next/font/google'

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700'],
  subsets: ['latin']
})

const inter = Inter({
  subsets:['latin']
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${roboto.className}`}>
      <Component {...pageProps} />
    </main>
  )
}
