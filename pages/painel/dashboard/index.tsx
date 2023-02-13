import { useTheme } from "next-themes";
import Image from "next/image";
import { Fragment } from "react";
import HeadApp from "../../../components/Head";
import DashboardHeader from "../../../components/layout/DashHeader";
import { configs } from "../../../configs";

export default function Dashboard() {
  const { theme } = useTheme();

  const handleImage = () => {
    if (theme === "light") {
      return (
        <Image
          src={"/img/logo.svg"}
          layout="responsive"
          alt="NK Gráfica Online logo"
          width={512}
          height={200}
          objectFit="cover"
        />
      );
    } else {
      return (
        <Image
          src={"/img/logo-transparent.svg"}
          layout="responsive"
          alt="NK Gráfica Online logo"
          width={512}
          height={200}
          objectFit="cover"
        />
      );
    }
  };

  return (
    <Fragment>
      <HeadApp title={`${configs.companyName} - Dashboard`} />
      <DashboardHeader />

      <div className="w-full flex justify-center items-center h-[80vh]">
        <div className="w-full max-w-md">{handleImage()}</div>
      </div>
    </Fragment>
  );
}
