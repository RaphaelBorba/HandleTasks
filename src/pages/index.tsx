import { GetStaticProps } from 'next'
import Image from 'next/image'
import HeroImg from '../../public/hero.png'
import ShowInfo from '../components/ShowInfo/ShowInfo'
import Head from 'next/head'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/services/firebaseConnection'

interface HomeProps {

  posts: number,
  comments: number
}

export default function Home({comments,posts}:HomeProps) {
  return (
    <>
      <Head>
        <title>Tarefas+</title>
      </Head>
      <main className='flex flex-col items-center gap-14 px-5 pt-24'>
        <Image priority alt='Hero' src={HeroImg} />
        <h1 className='text-center text-3xl font-bold text-white'>Sistema feito para você organizar <br /> seus estudos e tarefas</h1>
        <div className='flex flex-wrap justify-center gap-6'>
          <ShowInfo>{`+ ${posts} post posts`}</ShowInfo>
          <ShowInfo>{`+ ${comments} comentários`}</ShowInfo>
        </div>
      </main>
    </>
  )
}


export const getStaticProps: GetStaticProps = async () => {

  const commentRef = collection(db, "comments")

  const commentSnapShot = await getDocs(commentRef)

  const postRef = collection(db, "tasks")

  const postSnapShot = await getDocs(postRef)

  return {
    props: {
      posts: postSnapShot.size || 0,
      comments: commentSnapShot.size || 0
    },
    revalidate: 60
  }
}