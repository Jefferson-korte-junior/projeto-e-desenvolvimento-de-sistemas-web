import Link from "next/link";

// Página inicial (rota /)
export default function Home() {
  return (
    <div>
      <h1>Sistema de Usuários</h1>
      <p>
        Projetinho feito em Next.js pra praticar useState, useEffect e as rotas.
      </p>
      <Link href="/usuarios" className="botao">
        Ver lista de usuários
      </Link>
    </div>
  );
}
