import { FiShare2 } from 'react-icons/fi'
import { FaTrash } from 'react-icons/fa'
import { TaskResponseProps } from '@/pages/dashboard'
import Link from 'next/link'
import { doc, deleteDoc } from 'firebase/firestore'
import { db } from "@/services/firebaseConnection"

interface TaskProps {
    data: TaskResponseProps
}

export default function Task({ data }: TaskProps) {

    async function handleShare(id: string) {

        await navigator.clipboard.writeText(
            `${process.env.NEXT_PUBLIC_URL}/task/${data.id}`
        )

        alert('URL copiada!')
    }

    async function handleDelete(id: string) {

        let confirmDelete = confirm('Deseja deletar?')

        if(confirmDelete){

            const docRef = doc(db, 'tasks', id)
    
            await deleteDoc(docRef)
        }

    }

    return (

        <section className="flex max-h-fit w-[100%] rounded-lg border p-2 text-white">
            <div className="flex w-[95%] flex-col gap-3 p-2">
                {data.isPublic && <div className="flex items-center gap-6 ">
                    <h1 className='rounded-sm bg-blue-600 px-2 py-1 font-bold'>Público</h1>
                    <button>
                        <FiShare2
                            onClick={() => handleShare(data.id)}
                            size={22}
                            className='text-blue-500 transition-colors duration-300 hover:text-blue-400' />
                    </button>
                </div>}
                {
                    data.isPublic ?
                        <Link href={`/task/${data.id}`}>
                            <span className='transition-colors duration-300 hover:text-gray-200'>{data.task}</span>
                        </Link>
                        :
                        <span>{data.task}</span>
                }
            </div>
            <div className="flex w-[5%] items-center justify-center">
                <button onClick={() => handleDelete(data.id)}>
                    <FaTrash size={25} className='text-red-500 transition-colors duration-300 hover:text-red-400' />
                </button>
            </div>
        </section>


    )
}