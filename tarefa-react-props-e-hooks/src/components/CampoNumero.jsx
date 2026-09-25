// Input numérico com um texto em cima.
// Usei esse componente pros 3 campos (step, mínimo e máximo)
// pra não ficar copiando o mesmo input três vezes.
//
// props:
//   label   -> o texto que aparece em cima do input
//   valor   -> o número que está no input
//   aoMudar -> função que o componente pai passa pra atualizar o valor
function CampoNumero({ label, valor, aoMudar }) {
  return (
    <label className="campo">
      {label}
      <input
        type="number"
        value={valor}
        onChange={(e) => aoMudar(Number(e.target.value))}
      />
    </label>
  );
}

export default CampoNumero;
