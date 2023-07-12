import FormDashboard from "@/components/FormDashboard/FormDashboard"
import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"


export default function Dashboard() {

    return (

        <main className="mx-auto flex w-[80%] max-w-screen-xl flex-col items-start gap-4 text-white">
            <FormDashboard/>
        </main>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {

    const session = await getSession({ req })

    if (!session) {

        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {}
    }
}