import FormDashboard from "@/components/FormDashboard/FormDashboard"
import Task from "@/components/Task/Task"
import { GetServerSideProps } from "next"
import { getSession, useSession } from "next-auth/react"

import { db } from "@/services/firebaseConnection"
import {
    collection,
    query,
    orderBy,
    where,
    onSnapshot
} from 'firebase/firestore'
import { useEffect, useState } from "react"
import Head from "next/head"

interface DashboardProps {
    user: {
        email: string
    }
}
export interface TaskResponseProps {

    id: string,
    created: string,
    isPublic: boolean,
    task: string,
    user: string
}

export default function Dashboard({ user }: DashboardProps) {

    const [tasks, setTasks] = useState<TaskResponseProps[]>([])

    useEffect(() => {
        async function loadTasks() {

            const responseTasks = collection(db, 'tasks')
            const q = query(responseTasks, orderBy('created', 'desc'), where('user', "==", user?.email))

            onSnapshot(q, (snapShot) => {

                let list = [] as TaskResponseProps[]

                snapShot.forEach((elem) => {
                    list.push({
                        id: elem.id,
                        created: elem.data().created,
                        isPublic: elem.data().isPublic,
                        task: elem.data().task,
                        user: elem.data().user
                    })
                })
                setTasks(list)
            })
        }

        loadTasks()
    }, [user?.email])

    return (
        <>
        <Head>
            <title>Tarefas+ | Dashboard</title>
        </Head>
        <main className="mx-auto flex w-[80%] max-w-screen-xl flex-col items-start gap-4 pb-10 text-white">
            <FormDashboard userEmail={user.email} />
            <h1 className="mt-8 w-[100%] text-center text-3xl font-bold">Minhas Tarefas</h1>
            <div className="flex w-[100%] flex-col gap-10">
                {
                    tasks.length !== 0 ?
                        tasks.map((e: TaskResponseProps, i: number) => <Task data={e} key={e.id} />)
                        :
                        <h1 className="mt-12 w-[100%] text-center text-xl text-gray-500">Você não possue tarefas cadastradas!</h1>
                }
            </div>
        </main>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {

    const session = await getSession({ req })

    if (!session) {

        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            user: {
                email: session?.user?.email
            }
        }
    }
}