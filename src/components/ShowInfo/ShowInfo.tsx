
interface ShowInfoProps{

    children: string
}

export default function ShowInfo({children}:ShowInfoProps){

    return(

        <span className="flex h-12 w-52 items-center justify-center rounded-xl bg-white text-lg font-bold text-black transition-colors duration-300 hover:bg-slate-200">{children}</span>
    )
}