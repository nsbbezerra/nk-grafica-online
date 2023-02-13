import Image from "next/image";
import { Fragment } from "react";
import HeadApp from "../../../../components/Head";
import DashboardHeader from "../../../../components/layout/DashHeader";
import { configs } from "../../../../configs";

export default function DashboardImagens() {
  return (
    <Fragment>
      <HeadApp title={`${configs.companyName} - Imagens`} />
      <DashboardHeader />
    </Fragment>
  );
}
