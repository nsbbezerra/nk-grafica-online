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
      <div className="w-screen h-screen bg-gradient-to-r from-primary-500 dark:from-primary-300 to-secondary-500 dark:to-secondary-800 flex justify-center items-center p-5">
        <div className="bg-white dark:bg-zinc-800 rounded-md shadow-lg w-full max-w-xs p-3 flex flex-col gap-3 justify-center items-center">
          <Fingerprint className="text-primary-500 text-5xl dark:text-primary-300" />
          <input
            type={"text"}
            name="street"
            required
            className="inputs"
            placeholder="Usuário"
            autoFocus
          />
          <input
            type={"password"}
            name="street"
            required
            className="inputs"
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
