import { GetServerSideProps } from "next";
import Head from "next/head";
import { db } from "@/services/firebaseConnection";
import { doc, collection, query, where, getDoc, getDocs } from "firebase/firestore";
import { CommentType, TaskData } from "@/protocols";
import FormComment from "@/components/FormComment/FormComment";
import { useEffect, useState } from "react";
import Comment from "@/components/Comment/Comment";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
interface TaskPageProps {

    task: TaskData,
    allComments: CommentType[]
}
export default function TaskPage({task, allComments}:TaskPageProps) {

    const [comments, setComments] = useState<CommentType[]>(allComments ||[])
    const [refresh, setRefresh] = useState(false)
    const { data: session } = useSession()
    const router = useRouter();

    const refreshData = () => {
        router.replace(router.asPath);
    }
    useEffect(()=>{
        setComments(allComments)
    },[allComments])

    useEffect(()=>{
        refreshData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[refresh])

    return (
        <>
            <Head>
                <title>Tarefas+ | Tarefa</title>
            </Head>
            <main className="mx-auto flex w-[80%] flex-col items-center gap-6 pt-12">
            
                <nav className="flex w-[100%] flex-col gap-2 text-white">
                    <h1 className="text-3xl font-bold">Tarefa</h1>
                    <section className="h-fit min-h-[200px] w-[100%] rounded-lg border p-3 text-xl">{task.task}</section>
                </nav>

                <FormComment setRefresh={setRefresh} refresh={refresh} task={task} />

                <nav className="mb-3 flex w-[100%] flex-col gap-3 text-white">
                    <h1 className="text-3xl font-bold">Comentários</h1>
                    {
                        comments.length === 0 && <span>Não há comentários cadastrados!</span>
                    }
                    {
                        comments.map((e) => <Comment setRefresh={setRefresh} refresh={refresh} data={e} key={e.id} isUser={session?.user?.email===e.user}/>)
                    }
                </nav>
            </main>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({params}) =>{

    const id = params?.id as string
    const doccRef = doc(db, 'tasks', id)
    const q = query(collection(db,'comments'), where("taskId", "==", id))

    const snapshotComments = await getDocs(q)

    let allComments : CommentType[] = []
    snapshotComments.forEach((doc)=>{
        let time = doc.data()?.created?.seconds * 1000
        allComments.push({
            id:doc.id,
            comment: doc.data().comment,
            name: doc.data().name,
            taskId:doc.data().taskId,
            user:doc.data().user,
            created: new Date(time).toLocaleDateString()
        })
    })
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
    const task = {...snapshot.data(), 
        created: new Date(miliseconds).toLocaleDateString(),
        taskId: id
    }
    return{
        props:{
            task:task,
            allComments: allComments
        }
    };
}