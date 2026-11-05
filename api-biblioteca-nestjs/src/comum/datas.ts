// Funções de data usadas pelos empréstimos.
// As datas andam pelo sistema como texto no formato AAAA-MM-DD, que é o
// mesmo formato que a coluna date do Postgres devolve.

export function dataDeHoje(): string {
  const agora = new Date();

  const ano = agora.getFullYear();
  // o getMonth começa no zero, por isso o + 1
  const mes = String(agora.getMonth() + 1).padStart(2, '0');
  const dia = String(agora.getDate()).padStart(2, '0');

  return `${ano}-${mes}-${dia}`;
}

export function somarDias(data: string, dias: number): string {
  // o 'T00:00:00Z' evita confusão com fuso horário na hora de somar
  const nova = new Date(`${data}T00:00:00Z`);
  nova.setUTCDate(nova.getUTCDate() + dias);

  return nova.toISOString().slice(0, 10);
}

export function diferencaEmDias(inicio: string, fim: string): number {
  const umDiaEmMilissegundos = 1000 * 60 * 60 * 24;

  const comeco = new Date(`${inicio}T00:00:00Z`).getTime();
  const final = new Date(`${fim}T00:00:00Z`).getTime();

  return Math.round((final - comeco) / umDiaEmMilissegundos);
}
