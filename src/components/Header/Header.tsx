import Link from "next/link";
import Button from "../Button/Button";
import TitleHeader from "./TitleHeader";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Header() {

    const { data: session, status } = useSession()

    return (

        <header className="flex h-28 w-screen items-center justify-center">
            <div className="flex w-[80%] max-w-screen-xl items-center justify-between gap-7">
                <div className="flex items-center justify-center gap-4">
                    <Link href='/'>
                        <TitleHeader />
                    </Link>
                    {
                        session &&
                        (
                            <Link href='/dashboard'>
                                <button className="h-8 w-32 rounded-lg bg-white transition-colors duration-300 hover:bg-slate-200">Acessar Painel</button>
                            </Link>
                        )
                    }

                </div>

                {status === "loading" ? (
                    <></>
                ) : session ? (
                    <Button onClickFunction={() => signOut()} >{`Olá ${session?.user?.name as string}`}</Button>
                ) :
                    (
                        <Button onClickFunction={() => signIn("google")} >Acessar</Button>
                    )
                }
            </div>
        </header>
    )
}