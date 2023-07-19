

interface BlueButtonProps {

    isDisable: boolean
    text:string
}

export default function BlueButton({ isDisable, text }: BlueButtonProps) {

    return (
        <button
            disabled={isDisable}
            type="submit"
            className={`h-12 w-[100%] rounded-md bg-blue-600 text-xl font-bold transition-colors duration-300 hover:bg-blue-500 ${isDisable && 'disabled:bg-blue-900'}`}>
            {text}
        </button>
    )
}