
interface ButtonProps{
    children: string
    onClickFunction: ()=>void
}

export default function Button({children, onClickFunction}: ButtonProps){

    return(
        <button onClick={onClickFunction} className="h-12 w-40 rounded-full border text-white transition-colors duration-300 hover:bg-white hover:text-black ">
            {children}
        </button>
    )
}