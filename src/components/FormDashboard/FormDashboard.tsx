import { FormEvent, useState } from "react"


export default function FormDashboard() {

    const [task, setTask] = useState('')
    const [turnPublic, setTurnPublic] = useState(false)

    function handleSubmit(e:FormEvent){
        e.preventDefault()
        console.log(task,turnPublic)
    }

    return (
        <>
            <h1 className="text-3xl font-bold">Qual sua tarefa?</h1>
            <form className="flex w-[100%] flex-col gap-4" onSubmit={handleSubmit}>
                <textarea
                    placeholder="Digite sua tarefa..."
                    required
                    onChange={(e) => setTask(e.target.value)}
                    className="h-44 w-[100%] rounded-lg p-2 text-xl text-black !outline-none" />
                <div className="flex gap-2">
                    <input
                        checked={turnPublic}
                        onChange={() => setTurnPublic(!turnPublic)}
                        type="checkbox"
                        className="h-6 w-6 cursor-pointer border bg-black  accent-white !outline-none" />
                    <span>Deixar tarefa publica</span>
                </div>
                <button
                    type="submit"
                    className="h-12 w-[100%] rounded-md bg-blue-600 text-xl font-bold transition-colors duration-300 hover:bg-blue-700">
                    Registrar
                </button>
            </form>
        </>
    )
}