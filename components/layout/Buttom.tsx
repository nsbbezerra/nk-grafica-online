import { ReactNode, useRef } from "react";
import { CircleNotch } from "phosphor-react";

interface Props {
  buttonSize?: "xs" | "sm" | "md" | "lg";
  scheme?: "success" | "info" | "warning" | "error";
  isFullSize?: boolean;
  icon?: ReactNode;
  isLoading?: boolean;
  isDisabled?: boolean;
  textLoading?: string;
  variant?: "solid" | "outline";
}

type ButtonProps = JSX.IntrinsicElements["button"] & Props;

export default function Button({
  buttonSize = "md",
  children,
  isFullSize = false,
  isLoading = false,
  isDisabled = false,
  scheme = "info",
  variant = "solid",
  textLoading = "Aguarde...",
  ...rest
}: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const xsClass = `buttom-xs ${
    isDisabled || isLoading ? "buttom-disabled" : ""
  } ${
    scheme === "info" && variant === "solid"
      ? "buttom-blue"
      : "" || (scheme === "info" && variant === "outline")
      ? "buttom-blue-outline"
      : "" || (scheme === "success" && variant === "solid")
      ? "buttom-green"
      : "" || (scheme === "success" && variant === "outline")
      ? "buttom-green-outline"
      : "" || (scheme === "warning" && variant === "solid")
      ? "buttom-yellow"
      : "" || (scheme === "warning" && variant === "outline")
      ? "buttom-yellow-outline"
      : "" || (scheme === "error" && variant === "solid")
      ? "buttom-red"
      : "" || (scheme === "error" && variant === "outline")
      ? "buttom-red-outline"
      : ""
  } ${isFullSize ? "buttom-full" : "buttom-fit"}`;
  const smClass = `buttom-sm ${
    isDisabled || isLoading ? "buttom-disabled" : ""
  } ${
    scheme === "info" && variant === "solid"
      ? "buttom-blue"
      : "" || (scheme === "info" && variant === "outline")
      ? "buttom-blue-outline"
      : "" || (scheme === "success" && variant === "solid")
      ? "buttom-green"
      : "" || (scheme === "success" && variant === "outline")
      ? "buttom-green-outline"
      : "" || (scheme === "warning" && variant === "solid")
      ? "buttom-yellow"
      : "" || (scheme === "warning" && variant === "outline")
      ? "buttom-yellow-outline"
      : "" || (scheme === "error" && variant === "solid")
      ? "buttom-red"
      : "" || (scheme === "error" && variant === "outline")
      ? "buttom-red-outline"
      : ""
  } ${isFullSize ? "buttom-full" : "buttom-fit"}`;
  const mdClass = `buttom-md ${
    isDisabled || isLoading ? "buttom-disabled" : ""
  } ${
    scheme === "info" && variant === "solid"
      ? "buttom-blue"
      : "" || (scheme === "info" && variant === "outline")
      ? "buttom-blue-outline"
      : "" || (scheme === "success" && variant === "solid")
      ? "buttom-green"
      : "" || (scheme === "success" && variant === "outline")
      ? "buttom-green-outline"
      : "" || (scheme === "warning" && variant === "solid")
      ? "buttom-yellow"
      : "" || (scheme === "warning" && variant === "outline")
      ? "buttom-yellow-outline"
      : "" || (scheme === "error" && variant === "solid")
      ? "buttom-red"
      : "" || (scheme === "error" && variant === "outline")
      ? "buttom-red-outline"
      : ""
  } ${isFullSize ? "buttom-full" : "buttom-fit"}`;
  const lgClass = `buttom-lg ${
    isDisabled || isLoading ? "buttom-disabled" : ""
  } ${
    scheme === "info" && variant === "solid"
      ? "buttom-blue"
      : "" || (scheme === "info" && variant === "outline")
      ? "buttom-blue-outline"
      : "" || (scheme === "success" && variant === "solid")
      ? "buttom-green"
      : "" || (scheme === "success" && variant === "outline")
      ? "buttom-green-outline"
      : "" || (scheme === "warning" && variant === "solid")
      ? "buttom-yellow"
      : "" || (scheme === "warning" && variant === "outline")
      ? "buttom-yellow-outline"
      : "" || (scheme === "error" && variant === "solid")
      ? "buttom-red"
      : "" || (scheme === "error" && variant === "outline")
      ? "buttom-red-outline"
      : ""
  } ${isFullSize ? "buttom-full" : "buttom-fit"}`;

  return (
    <button
      ref={buttonRef}
      className={
        (buttonSize === "xs" && xsClass) ||
        (buttonSize === "sm" && smClass) ||
        (buttonSize === "md" && mdClass) ||
        (buttonSize === "lg" && lgClass) ||
        mdClass
      }
      {...rest}
      disabled={isDisabled === true || isLoading === true ? true : false}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <CircleNotch className="animate-spin" />

          <span>{textLoading}</span>
        </div>
      ) : (
        <>{children}</>
      )}
    </button>
  );
}
