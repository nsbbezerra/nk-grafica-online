import { Check, Hourglass, X } from "phosphor-react";
import { Fragment } from "react";

interface Props {
  step: string;
}

export default function Steps({ step }: Props) {
  function handleStep(): number {
    switch (step) {
      case "payment":
        return 0;
      case "design":
        return 1;
      case "production":
        return 2;
      case "shipping":
        return 3;
      case "finished":
        return 4;
      case "canceled":
        return 5;
      default:
        return 0;
    }
  }

  return (
    <Fragment>
      {handleStep() === 0 && (
        <div className="steps-container">
          <div className="steps">
            <span className="step step-inactive">
              <Hourglass />
            </span>
            <div className="step-content">
              <span className="step-title">Pagamento</span>
            </div>
          </div>

          <div className="steps">
            <span className="step step-inactive">2</span>
            <div className="step-content">
              <span className="step-title">Aprovação de Arte</span>
            </div>
          </div>

          <div className="steps">
            <span className="step step-inactive">3</span>
            <div className="step-content">
              <span className="step-title">Produção</span>
            </div>
          </div>

          <div className="steps">
            <span className="step step-inactive">4</span>
            <div className="step-content">
              <span className="step-title">Envio do pedido</span>
            </div>
          </div>
        </div>
      )}
      {handleStep() === 1 && (
        <div className="steps-container">
          <div className="steps">
            <span className="step step-active">
              <Check />
            </span>
            <div className="step-content">
              <span className="step-title">Pagamento</span>
            </div>
          </div>

          <div className="steps">
            <span className="step step-inactive">
              <Hourglass />
            </span>
            <div className="step-content">
              <span className="step-title">Aprovação de Arte</span>
            </div>
          </div>

          <div className="steps">
            <span className="step step-inactive">3</span>
            <div className="step-content">
              <span className="step-title">Produção</span>
            </div>
          </div>

          <div className="steps">
            <span className="step step-inactive">4</span>
            <div className="step-content">
              <span className="step-title">Envio do pedido</span>
            </div>
          </div>
        </div>
      )}
      {handleStep() === 2 && (
        <div className="steps-container">
          <div className="steps">
            <span className="step step-active">
              <Check />
            </span>
            <div className="step-content">
              <span className="step-title">Pagamento</span>
            </div>
          </div>

          <div className="steps">
            <span className="step step-active">
              <Check />
            </span>
            <div className="step-content">
              <span className="step-title">Aprovação de Arte</span>
            </div>
          </div>

          <div className="steps">
            <span className="step step-inactive">
              <Hourglass />
            </span>
            <div className="step-content">
              <span className="step-title">Produção</span>
            </div>
          </div>

          <div className="steps">
            <span className="step step-inactive">4</span>
            <div className="step-content">
              <span className="step-title">Envio do pedido</span>
            </div>
          </div>
        </div>
      )}
      {handleStep() === 3 && (
        <div className="steps-container">
          <div className="steps">
            <span className="step step-active">
              <Check />
            </span>
            <div className="step-content">
              <span className="step-title">Pagamento</span>
            </div>
          </div>

          <div className="steps">
            <span className="step step-active">
              <Check />
            </span>
            <div className="step-content">
              <span className="step-title">Aprovação de Arte</span>
            </div>
          </div>

          <div className="steps">
            <span className="step step-active">
              <Check />
            </span>
            <div className="step-content">
              <span className="step-title">Produção</span>
            </div>
          </div>

          <div className="steps">
            <span className="step step-inactive">
              <Hourglass />
            </span>
            <div className="step-content">
              <span className="step-title">Envio do pedido</span>
            </div>
          </div>
        </div>
      )}
      {handleStep() === 4 && (
        <div className="steps-container">
          <div className="steps">
            <span className="step step-active">
              <Check />
            </span>
            <div className="step-content">
              <span className="step-title">Pagamento</span>
            </div>
          </div>

          <div className="steps">
            <span className="step step-active">
              <Check />
            </span>
            <div className="step-content">
              <span className="step-title">Aprovação de Arte</span>
            </div>
          </div>

          <div className="steps">
            <span className="step step-active">
              <Check />
            </span>
            <div className="step-content">
              <span className="step-title">Produção</span>
            </div>
          </div>

          <div className="steps">
            <span className="step step-active">
              <Check />
            </span>
            <div className="step-content">
              <span className="step-title">Envio do pedido</span>
            </div>
          </div>
        </div>
      )}
      {handleStep() === 5 && (
        <div className="steps-container">
          <div className="steps">
            <span className="step step-inactive">
              <X />
            </span>
            <div className="step-content">
              <span className="step-title">Pagamento</span>
            </div>
          </div>

          <div className="steps">
            <span className="step step-inactive">
              <X />
            </span>
            <div className="step-content">
              <span className="step-title">Aprovação de Arte</span>
            </div>
          </div>

          <div className="steps">
            <span className="step step-inactive">
              <X />
            </span>
            <div className="step-content">
              <span className="step-title">Produção</span>
            </div>
          </div>

          <div className="steps">
            <span className="step step-inactive">
              <X />
            </span>
            <div className="step-content">
              <span className="step-title">Envio do pedido</span>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
