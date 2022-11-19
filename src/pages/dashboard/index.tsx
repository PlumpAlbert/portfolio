import type { NextPage } from "next"
import Head from "next/head"
import { signIn, useSession } from "next-auth/react"
import { useEffect } from "react"
import { useRouter } from "next/router"

const Home: NextPage = () => {
  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard/month")
    }
  }, [status, router])

  return (
    <main className="max-w-md  m-auto px-8 py-16 flex flex-col flex-1 gap-8">
      <Head>
        <title>RescueTime Dashboard</title>
      </Head>

      <h1 className="text-6xl font-black leading-tight text-center">
        Welcome to <br />
        <a
          className="text-blue-600 font-medium hover:underline"
          href="https://rescuetime.com"
        >
          Rescue<span className="font-black">Time</span>
        </a>
        <br />
        Dashboard
      </h1>

      <button
        className="text-xl button w-full"
        onClick={() => {
          signIn()
        }}
      >
        Sign In
      </button>
    </main>
  )
}

export default Home
