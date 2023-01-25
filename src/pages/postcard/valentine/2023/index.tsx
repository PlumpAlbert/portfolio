import type { NextPage } from "next"
import Image from "next/image"
import Head from "next/head"

const Page: NextPage = () => {
  return (
    <main className="px-4 py-8 flex-1 flex flex-col gap-6 items-center">
      <Head>
        <title>Happy Valentine&apos;s Day</title>
      </Head>
      <h1 className="m-0 text-2xl text-blue-400 self-center uppercase">
        Happy Valentine&apos;s Day
      </h1>

      <div className="w-full h-full flex flex-col gap-4">
        <div className="self-center w-1/2">
          <Image
            className="rounded-md"
            alt="valentine.jpg"
            src="/assets/valentine.jpg"
            width={999999}
            height={999999}
            quality="100"
          />

          <audio controls className="w-full">
            <source
              src="https://docs.google.com/uc?authuser=0&export=download&id=1diJp41iGukFb2zdF8u7RB6OJ5meIJwU5"
            />
          </audio>
        </div>
      </div>
    </main>
  )
}

export default Page
