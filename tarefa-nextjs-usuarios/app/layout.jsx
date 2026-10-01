import Navbar from "../components/Navbar";
import "./globals.css";

export const metadata = {
  title: "Sistema de Usuários",
};

// Esse arquivo é o "molde" das páginas.
// Tudo que está aqui aparece em todas as rotas (por isso o Navbar fica aqui).
export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
        <Navbar />
        <main className="conteudo">{children}</main>
      </body>
    </html>
  );
}
