import { FormEvent, useState } from "react"
import BlueButton from "../Button/BlueButton"
import { addDoc, collection } from "firebase/firestore"
import { db } from "@/services/firebaseConnection"
import { useSession } from "next-auth/react"

interface FormCommentProps {
    task: {
        taskId: string
    }
}
export default function FormComment({ task }: FormCommentProps) {

    const [comment, setComment] = useState('')
    const [isDisable, setIsDisable] = useState(false)
    const { data: session } = useSession()

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        setIsDisable(true)

        if (!session?.user?.email || !session?.user?.name) return
        try {
            const docRef = await addDoc(collection(db, "comments"), {
                comment,
                created: new Date(),
                user: session.user.email,
                name: session.user.name,
                taskId: task?.taskId
            })
            setComment('')
        } catch (error) {
            console.log(error)
        }
        setIsDisable(false)
    }
    return (

        <form onSubmit={handleSubmit} className="flex w-[80%] flex-col gap-2 text-white">
            <h1 className="text-3xl font-bold">Deixar comentário</h1>
            <textarea
                className="mb-2 h-fit min-h-[100px] w-[100%] rounded-lg border bg-black p-3 text-xl"
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Digite seu comentário" />
            {
                session?.user ?
                    <BlueButton text="Enviar comentário" isDisable={isDisable} />
                    :
                    <BlueButton text="Enviar comentário" isDisable={true} />
            }
        </form>
    )
}