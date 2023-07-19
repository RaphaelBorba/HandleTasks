import { GetServerSideProps } from "next";
import Head from "next/head";
import { db } from "@/services/firebaseConnection";
import { doc, collection, query, where, getDoc, getDocs } from "firebase/firestore";
import { CommentType, TaskData } from "@/protocols";
import FormComment from "@/components/FormComment/FormComment";
interface TaskPageProps {

    task: TaskData,
    comments: CommentType[]
}
export default function TaskPage({task, comments}:TaskPageProps) {

    console.log(comments)

    return (
        <>
            <Head>
                <title>Tarefas+ | Tarefa</title>
            </Head>
            <main className="flex flex-col items-center gap-6 pt-12">
            
                <nav className="flex w-[80%] flex-col gap-2 text-white">
                    <h1 className="text-3xl font-bold">Tarefa</h1>
                    <section className="h-fit min-h-[200px] w-[100%] rounded-lg border p-3 text-xl">{task.task}</section>
                </nav>
                <FormComment task={task} />
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
            comments: allComments
        }
    };
}