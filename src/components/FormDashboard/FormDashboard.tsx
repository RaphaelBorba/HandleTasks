import { FormEvent, useState } from "react"

import { db } from "@/services/firebaseConnection"
import { addDoc, collection } from 'firebase/firestore'
import BlueButton from "../Button/BlueButton"

interface FormDashboardProps {
    userEmail: string
}


export default function FormDashboard({ userEmail }: FormDashboardProps) {

    const [task, setTask] = useState('')
    const [turnPublic, setTurnPublic] = useState(false)
    const [isDisable, setIsDisable] = useState(false)

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        setIsDisable(true)

        try {
            await addDoc(collection(db, "tasks"), {
                task,
                created: new Date(),
                user: userEmail,
                isPublic: turnPublic
            })

            setTask('')
            setTurnPublic(false)

        } catch (error) {
            console.log(error)
        }

        setIsDisable(false)
    }

    return (
        <>
            <h1 className="text-3xl font-bold">Qual sua tarefa?</h1>
            <form className="flex w-[100%] flex-col gap-4" onSubmit={handleSubmit}>
                <textarea
                    disabled={isDisable}
                    placeholder="Digite sua tarefa..."
                    required
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    className="h-44 w-[100%] rounded-lg p-2 text-xl text-black !outline-none" />
                <div className="flex gap-2">
                    <input
                        disabled={isDisable}
                        checked={turnPublic}
                        onChange={() => setTurnPublic(!turnPublic)}
                        type="checkbox"
                        className="h-6 w-6 cursor-pointer border bg-black  accent-white !outline-none" />
                    <span>Deixar tarefa publica</span>
                </div>
                <BlueButton text="Registrar" isDisable={isDisable} />
            </form>
        </>
    )
}