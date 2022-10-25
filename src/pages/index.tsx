import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"

const IndexView: NextPage = () => {
  return (
    <main className="w-full pt-12 flex flex-col gap-12 items-center">
      <Head>
        <title>Plump Albert</title>
      </Head>
      <div className="w-fit overflow-hidden leading-[0] rounded-full border-8 border-white/80">
        <Image
          width={256}
          height={256}
          className=""
          src="/assets/avatar.jpg"
          alt="avatar"
        />
      </div>
      <header className="px-5 flex flex-col gap-4 items-center">
        <h1 className="text-center text-white text-6xl font-header uppercase">
          Plump Albert
        </h1>
        <p className="text-center">
          Experienced JavaScript Developer <br />
          with 2 years in the industry. <br />
          Proficient with React
        </p>
      </header>
      <section className="flex flex-col gap-4">
        <h2 className="text-2xl text-center text-white font-header uppercase">
          Contact me
        </h2>
      </section>
    </main>
  )
}

export default IndexView
