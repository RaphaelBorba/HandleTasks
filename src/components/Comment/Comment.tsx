import { CommentType } from "@/protocols";
import { FaTrash } from 'react-icons/fa'

interface CommentProps {

    data: CommentType,
    isUser: boolean
}

export default function Comment({ data, isUser }: CommentProps) {

    return (
        <article className="flex w-[100%] flex-col gap-2 rounded-lg border p-3">
            <div className="flex items-center gap-3">
                <h4 className="w-fit text-lg font-bold">{data.name}</h4>
                {isUser && <FaTrash size={18} className="cursor-pointer text-red-500 transition-colors duration-300 hover:text-red-400" />}
            </div>
            <span>{data.comment}</span>
        </article>
    )
}