import Image from "next/image";
import Link from "next/link";
import { House } from "phosphor-react";
import { Fragment } from "react";
import HeadApp from "../components/Head";
import Button from "../components/layout/Buttom";

export default function NotFound() {
  return (
    <Fragment>
      <HeadApp title="NK Gráfica Online | Impressões digitais e Offset" />
      <div className="h-screen w-screen flex items-center justify-center flex-col gap-10 overflow-hidden p-5">
        <div className="w-full max-w-xs md:max-w-sm">
          <Image
            src={"/img/404.svg"}
            alt="NK Gráfica online cartão de visita"
            width={860}
            height={571}
            layout="responsive"
            objectFit="cover"
          />
        </div>

        <span className="text-xl">Página não encontrada!</span>
        <Link href={"/"}>
          <Button>
            <House />
            Voltar ao início
          </Button>
        </Link>
      </div>
    </Fragment>
  );
}
