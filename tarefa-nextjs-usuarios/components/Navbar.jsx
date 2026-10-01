import Link from "next/link";

// Menu que aparece em todas as páginas.
// Usei o <Link> do Next no lugar do <a> porque assim a página
// troca sem recarregar o navegador.
function Navbar() {
  return (
    <nav className="navbar">
      <Link href="/">Home</Link>
      <Link href="/usuarios">Usuários</Link>
      <Link href="/sobre">Sobre</Link>
    </nav>
  );
}

export default Navbar;
