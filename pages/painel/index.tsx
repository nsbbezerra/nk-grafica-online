import { Fragment } from "react";
import HeadApp from "../../components/Head";
import { configs } from "../../configs";
import { Fingerprint, House, SignIn } from "phosphor-react";
import Button from "../../components/layout/Buttom";
import Link from "next/link";

export default function Painel() {
  return (
    <Fragment>
      <HeadApp title={`${configs.companyName} - Login`} />
      <div className="w-screen h-screen bg-gradient-to-r from-sky-300 dark:from-zinc-800 to-sky-700 dark:to-sky-900 flex justify-center items-center p-5">
        <div className="bg-white dark:bg-zinc-800 rounded-md shadow-lg w-full max-w-xs p-3 flex flex-col gap-3 justify-center items-center">
          <Fingerprint className="text-sky-700 text-5xl dark:text-sky-300" />
          <input
            type={"text"}
            name="street"
            required
            className="border h-10 px-3 dark:border-zinc-700 dark:bg-zinc-900 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-700 dark:focus:ring-sky-300 w-full"
            placeholder="Usuário"
            autoFocus
          />
          <input
            type={"password"}
            name="street"
            required
            className="border h-10 px-3 dark:border-zinc-700 dark:bg-zinc-900 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-700 dark:focus:ring-sky-300 w-full"
            placeholder="Senha"
          />

          <Button isFullSize>
            <SignIn />
            Login
          </Button>

          <Link href={"/"} passHref>
            <Button isFullSize variant="outline" scheme="gray">
              <House />
              Ir para o Início
            </Button>
          </Link>
        </div>
      </div>
    </Fragment>
  );
}
