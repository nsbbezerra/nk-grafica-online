import Image from "next/image";
import {
  Book,
  DeviceMobileCamera,
  DiscordLogo,
  Envelope,
  FacebookLogo,
  InstagramLogo,
  Link,
  LinkedinLogo,
  Phone,
  Question,
  Storefront,
  TelegramLogo,
  WhatsappLogo,
} from "phosphor-react";

interface Props {
  space: boolean;
}

export default function Footer({ space }: Props) {
  return (
    <footer
      className={`bg-gray-900 dark:bg-zinc-900 py-10 ${
        space ? "mt-10" : "mt-0"
      }`}
    >
      <div className="container mx-auto max-w-6xl px-10 xl:px-0 grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-b-zinc-700">
        <div>
          <div className="flex items-center gap-3 text-xl font-extrabold text-sky-300">
            <Phone />

            <span>CANAIS DE ATENDIMENTO</span>
          </div>

          <div className="flex flex-col gap-2 mt-5">
            <a className="flex items-center gap-3 text-white hover:underline cursor-pointer">
              <WhatsappLogo />
              (63) 99971-1716
            </a>
            <a className="flex items-center gap-3 text-white hover:underline cursor-pointer">
              <Envelope />
              contato.nk.info@gmail.com
            </a>
            <a className="flex items-center gap-3 text-white hover:underline cursor-pointer">
              <TelegramLogo />
              (63) 99971-1716
            </a>
            <a className="flex items-center gap-3 text-white hover:underline cursor-pointer">
              <DiscordLogo />
              nkinformática
            </a>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3 text-xl font-extrabold text-sky-300">
            <Link />

            <span>LINKS ÚTEIS</span>
          </div>

          <div className="flex flex-col gap-2 mt-5">
            <a className="flex items-center gap-3 text-white hover:underline cursor-pointer">
              <Question />
              Como comprar?
            </a>
            <a className="flex items-center gap-3 text-white hover:underline cursor-pointer">
              <Storefront />A Empresa
            </a>
            <a className="flex items-center gap-3 text-white hover:underline cursor-pointer">
              <Book />
              Termos de uso
            </a>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-3 text-xl font-extrabold text-sky-300">
            <DeviceMobileCamera />

            <span>SOCIAL</span>
          </div>

          <div className="flex gap-4 mt-5">
            <a className="flex items-center gap-3 text-white hover:underline cursor-pointer text-4xl">
              <FacebookLogo />
            </a>
            <a className="flex items-center gap-3 text-white hover:underline cursor-pointer text-4xl">
              <InstagramLogo />
            </a>
            <a className="flex items-center gap-3 text-white hover:underline cursor-pointer text-4xl">
              <LinkedinLogo />
            </a>
          </div>

          <div className="w-1/2 mt-5">
            <Image
              src={"/img/ssl.png"}
              alt="NK Gráfica online banner"
              layout="responsive"
              width={946}
              height={250}
              objectFit="cover"
            />
          </div>
        </div>
      </div>
      <div className="container mx-auto max-w-6xl px-10 xl:px-0 grid grid-cols-1 lg:grid-cols-3 gap-10 pt-10">
        <div>
          <div className="flex items-center gap-3 mt-3">
            <div className="w-36">
              <Image
                src={"/img/stripe.svg"}
                alt="NK Gráfica online banner"
                layout="responsive"
                width={946}
                height={221}
                objectFit="cover"
              />
            </div>
            <div className="w-20">
              <Image
                src={"/img/melhorenvio.svg"}
                alt="NK Gráfica online banner"
                layout="responsive"
                width={700}
                height={301}
                objectFit="cover"
              />
            </div>
          </div>
        </div>
        <div className="col-span-2 text-white text-sm">
          <span className="block">
            NK Informática e Gráfica - CNPJ: 40.526.622/0001-72 - Rua 34 Qd 15
            Lt 14 Nº 173, Loteamento Canavieiras, CEP: 77.710-000, Pedro Afonso
            - TO
          </span>

          <span>Copyright © 2022 - Todos os direitos reservados</span>
        </div>
      </div>
    </footer>
  );
}
