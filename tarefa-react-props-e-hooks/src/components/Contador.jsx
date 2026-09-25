import { useState, useEffect } from "react";
import CampoNumero from "./CampoNumero";

function Contador() {
  // valor do contador (começa em 0)
  const [contador, setContador] = useState(0);

  // configurações que o usuário pode mexer
  const [step, setStep] = useState(1);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(10);

  // checa se as configurações estão certas
  const stepInvalido = step <= 0;
  const limitesInvalidos = min > max;
  const temErro = stepInvalido || limitesInvalidos;

  // Se o contador ficar fora do intervalo (por exemplo, quando o usuário
  // muda o mínimo ou o máximo) ele é ajustado sozinho aqui.
  useEffect(() => {
    // se min > max não dá pra ajustar, então espera o usuário arrumar
    if (limitesInvalidos) return;

    if (contador < min) {
      setContador(min);
    } else if (contador > max) {
      setContador(max);
    }
  }, [contador, min, max, limitesInvalidos]);

  function incrementar() {
    // soma o step mas não deixa passar do máximo
    setContador(Math.min(contador + step, max));
  }

  function decrementar() {
    // tira o step mas não deixa ficar abaixo do mínimo
    setContador(Math.max(contador - step, min));
  }

  function resetar() {
    // volta pra 0, ou pro mínimo se o mínimo for maior que 0
    // (o Math.min no final é pro caso do máximo ser negativo)
    setContador(Math.min(Math.max(0, min), max));
  }

  return (
    <div className="contador">
      <p className="valor">{contador}</p>

      {!limitesInvalidos && (
        <p className="intervalo">
          Intervalo: {min} até {max}
        </p>
      )}

      <div className="botoes">
        <button onClick={decrementar} disabled={temErro}>
          Decrementar
        </button>
        <button onClick={resetar} disabled={temErro}>
          Resetar
        </button>
        <button onClick={incrementar} disabled={temErro}>
          Incrementar
        </button>
      </div>

      {/* mensagens de erro */}
      {stepInvalido && <p className="erro">O step precisa ser maior que 0.</p>}
      {limitesInvalidos && (
        <p className="erro">O mínimo não pode ser maior que o máximo.</p>
      )}

      {/* campos de configuração */}
      <div className="configs">
        <CampoNumero label="Step" valor={step} aoMudar={setStep} />
        <CampoNumero label="Mínimo" valor={min} aoMudar={setMin} />
        <CampoNumero label="Máximo" valor={max} aoMudar={setMax} />
      </div>
    </div>
  );
}

export default Contador;
