import type { InferGetServerSidePropsType, NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { trpc } from "../utils/trpc";
import { object, TypeOf } from "zod";
import { map } from "@trpc/server/observable";
import Image from "next/image";

const Home: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = (
  props
) => {
  const hello = trpc.example.hello.useQuery({ text: "from tRPC" });
  const andres = trpc.example.andres.useQuery();

  if (!props.providers) return null;

  return (
    <>
      <Head>
        <title>RAAD App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-violet-200 px-20">
        <div className="m-20 flex h-full w-full flex-1">
          <div className="flex flex-1 flex-col rounded-l-3xl bg-white p-5 pl-20">
            <h2 className="mt-20 text-5xl font-extrabold leading-normal text-gray-700 md:text-[5rem]">
              RAAD Map
            </h2>
            <div className="mb-5 font-bold text-gray-700 md:text-[2rem]">
              Sign In
            </div>
            <div className="mb-3 text-gray-700">
              With one of the following providers:
            </div>
            <div>
              <img
                className="my-4 w-40 cursor-pointer"
                src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/62594fddd654fc29fcc07359_cb48d2a8d4991281d7a6a95d2f58195e.svg"
                onClick={() => signIn(props.providers?.discord.id)}
              ></img>
              <img
                className="my-4 w-40 cursor-pointer"
                src="https://lh3.googleusercontent.com/d_S5gxu_S1P6NR1gXeMthZeBzkrQMHdI5uvXrpn3nfJuXpCjlqhLQKH_hbOxTHxFhp5WugVOEcl4WDrv9rmKBDOMExhKU5KmmLFQVg"
                onClick={() => signIn(props.providers?.google.id)}
              ></img>
            </div>
          </div>
          <div className="flex flex-1 rounded-r-3xl bg-cyan-700 p-5">
            <div className="m-10 flex flex-1 rounded-3xl bg-blue-300 flex-col items-center justify-center">
              <div className="font-bold text-white md:text-[1.5rem] mx-20">
                Welcome to the RAAD Map!
              </div>
              <div className="text-white mx-20 mt-5 font-bold">
                is a resource locator tool that provides a quick and easy overview of such resources in the provided area.
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery();

  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {sessionData && (
        <p className="text-2xl text-blue-500">
          Logged in as {sessionData?.user?.name}
        </p>
      )}
      {secretMessage && (
        <p className="text-2xl text-blue-500">{secretMessage}</p>
      )}
      <button
        className="rounded-md border border-black bg-violet-50 px-4 py-2 text-xl shadow-lg hover:bg-violet-100"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};

type TechnologyCardProps = {
  name: string;
  description: string;
  documentation: string;
};

const TechnologyCard = ({
  name,
  description,
  documentation,
}: TechnologyCardProps) => {
  return (
    <section className="flex flex-col justify-center rounded border-2 border-gray-500 p-6 shadow-xl duration-500 motion-safe:hover:scale-105">
      <h2 className="text-lg text-gray-700">{name}</h2>
      <p className="text-sm text-gray-600">{description}</p>
      <a
        className="m-auto mt-3 w-fit text-sm text-violet-500 underline decoration-dotted underline-offset-2"
        href={documentation}
        target="_blank"
        rel="noreferrer"
      >
        Documentation
      </a>
    </section>
  );
};