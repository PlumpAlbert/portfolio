import {useEffect} from "react";
import type {NextPage} from "next";
import Image from "next/image";
import Head from "next/head";
import styles from "./styles.module.css";

const Page: NextPage = () => {
  useEffect(() => {
    document.body.classList.add(styles.body);
    return () => document.body.classList.remove(styles.body);
  });
  return (
    <main className="m-auto px-4 py-8 flex-1 flex flex-col gap-6 items-center">
      <Head>
        <title>Happy Valentine&apos;s Day</title>
      </Head>
      <h1
        className="m-0 text-center text-4xl text-[#F6C1C1] self-center uppercase"
        style={{fontFamily: "Kaushan Script"}}
      >
        Happy
        <br /> Valentine&apos;s Day
      </h1>

      <div className="w-full h-full flex flex-col gap-5">
        <div className="self-center w-3/4">
          <Image
            className="rounded-md"
            alt="valentine.png"
            src="/assets/valentine.png"
            width={999999}
            height={999999}
            quality="100"
          />
        </div>
        <audio controls className="w-full">
          <source src="https://docs.google.com/uc?authuser=0&export=download&id=1P_6rhoM0AYxPfytNBAV9IdowbQIdyZ_u" />
        </audio>
      </div>
    </main>
  );
};

export default Page;
