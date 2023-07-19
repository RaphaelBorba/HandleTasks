import { GetServerSideProps } from "next";
import Head from "next/head";
import { db } from "@/services/firebaseConnection";
import { doc, collection, query, where, getDoc, addDoc } from "firebase/firestore";
import { TaskData } from "@/protocols";
import { FormEvent, useEffect, useState } from "react";
import BlueButton from "@/components/Button/BlueButton";
import { useSession } from "next-auth/react";

interface TaskPageProps {

    data: TaskData
}

export default function TaskPage({data}:TaskPageProps) {

    const [comment, setComment] = useState('')
    const {data:session} = useSession()
    const [isDisable, setIsDisable] = useState(false)

    async function handleSubmit(e:FormEvent){
        e.preventDefault()
        setIsDisable(true)

        if(!session?.user?.email || !session?.user?.name) return

        try {

            const docRef = await addDoc(collection(db,"comments"), {
                comment,
                created: new Date(),
                user: session.user.email,
                name: session.user.name,
                taskId: data?.taskId
            })

            setComment('')
            
        } catch (error) {
            console.log(error)
        }

        setIsDisable(false)
        
    }

    return (
        <>
            <Head>
                <title>Tarefas+ | Tarefa</title>
            </Head>
            <main className="flex flex-col items-center gap-6 pt-12">
            
                <nav className="flex w-[80%] flex-col gap-2 text-white">
                    <h1 className="text-3xl font-bold">Tarefa</h1>
                    <section className="h-fit min-h-[200px] w-[100%] rounded-lg border p-3 text-xl">{data.task}</section>
                </nav>
                <form onSubmit={handleSubmit} className="flex w-[80%] flex-col gap-2 text-white">
                    <h1 className="text-3xl font-bold">Deixar comentário</h1>
                    <textarea 
                    className="mb-2 h-fit min-h-[100px] w-[100%] rounded-lg border bg-black p-3 text-xl" 
                    required
                    value={comment}
                    onChange={(e)=>setComment(e.target.value)}
                    placeholder="Digite seu comentário"/>
                    {
                        session?.user ?
                        <BlueButton text="Enviar comentário" isDisable={isDisable} />
                        :
                        <BlueButton text="Enviar comentário" isDisable={true} />
                    }
                </form>
            </main>
            
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({params}) =>{

    const id = params?.id as string

    const doccRef = doc(db, 'tasks', id)

    const snapshot = await getDoc(doccRef)

    if(snapshot.data() === undefined || !snapshot.data()?.isPublic){
        return{
            redirect:{
                destination:'/',
                permanent: false
            }
        }
    }
    const miliseconds = snapshot.data()?.created?.seconds * 1000;

    const data = {...snapshot.data(), 
        created: new Date(miliseconds).toLocaleDateString(),
        taskId: id
    }

    return{
        props:{
            data,
        }
    };
}