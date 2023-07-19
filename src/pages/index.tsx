import Image from 'next/image'
import HeroImg from '../../public/hero.png'
import ShowInfo from '../components/ShowInfo/ShowInfo'
import Head from 'next/head'

export default function Home() {
  return (
    <>
    <Head>
      <title>Tarefas+</title>
    </Head>
    <main className='flex flex-col items-center gap-14 px-5 pt-24'>
      <Image priority alt='Hero' src={HeroImg}/>  
      <h1 className='text-center text-3xl font-bold text-white'>Sistema feito para você organizar <br/> seus estudos e tarefas</h1>
      <div className='flex flex-wrap justify-center gap-6'>
        <ShowInfo>+ 7 mil posts</ShowInfo>
        <ShowInfo>+ 1 mil comentários</ShowInfo>
      </div>
    </main>
    </>
  )
}
