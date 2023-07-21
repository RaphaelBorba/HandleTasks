import { CommentType } from "@/protocols";
import { db } from "@/services/firebaseConnection";
import { deleteDoc, doc } from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";
import { FaTrash } from 'react-icons/fa'

interface CommentProps {

    data: CommentType,
    isUser: boolean,
    setRefresh:Dispatch<SetStateAction<boolean>>,
    refresh: boolean
}

export default function Comment({ data, isUser, setRefresh, refresh }: CommentProps) {

    async function deleteComment(id:string){

        if(!confirm('Deseja deletar o comentário?')) return 

        try {

            const docRef = doc(db,"comments", id)

            await deleteDoc(docRef)

            setRefresh(!refresh)
            
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <article className="flex w-[100%] flex-col gap-2 rounded-lg border p-3">
            <div className="flex items-center gap-3">
                <h4 className="w-fit text-lg font-bold">{data.name}</h4>
                {isUser && <FaTrash onClick={()=>deleteComment(data.id)} size={18} className="cursor-pointer text-red-500 transition-colors duration-300 hover:text-red-400" />}
            </div>
            <span>{data.comment}</span>
        </article>
    )
}