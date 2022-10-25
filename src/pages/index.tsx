import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"

const IndexView: NextPage = () => {
  return (
    <main className="w-full pt-10 flex flex-col gap-8 items-center">
      <Head>
        <title>Plump Albert</title>
      </Head>
      <div className="w-[256px] min-h-[256px] overflow-hidden leading-[0] rounded-full border-8 border-white/80">
        <Image
          width={256}
          height={256}
          className=""
          src="/assets/avatar.jpg"
          alt="avatar"
        />
      </div>
      <header className="px-5 w-full flex flex-col gap-4 items-center">
        <h1 className="text-center text-white text-6xl font-header uppercase">
          Plump Albert
        </h1>
        <p className="text-center">
          Experienced JavaScript Developer <br />
          with 2 years in the industry. <br />
          Proficient with React
        </p>
      </header>
      <section className="px-5 w-full flex flex-col gap-4">
        <h2 className="text-2xl text-center text-white font-header uppercase">
          Contact me
        </h2>
        <div className="w-full flex gap-6">
          <a
            className="flex-1 flex flex-col gap-2 items-center"
            href="https://github.com/PlumpAlbert"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              width={32}
              height={32}
              src="/assets/github.svg"
              alt="GitHub"
            />
            <h6> GitHub </h6>
          </a>
          <a
            className="flex-1 flex flex-col gap-2 items-center"
            href="https://t.me/plump_albert"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              width={32}
              height={32}
              src="/assets/telegram.svg"
              alt="Telegram"
            />
            <h6> Telegram </h6>
          </a>
          <a
            className="flex-1 flex flex-col gap-2 items-center"
            href="mailto:plumpalbert@gmail.com?subject=Contact+Me"
            target="_blank"
            rel="noreferrer"
          >
            <Image width={32} height={32} src="/assets/mail.svg" alt="Mail" />
            <h6> Email </h6>
          </a>
        </div>
      </section>
    </main>
  )
}

export default IndexView
