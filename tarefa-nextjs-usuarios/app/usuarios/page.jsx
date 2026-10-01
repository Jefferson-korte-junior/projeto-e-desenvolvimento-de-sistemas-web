"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usuariosMock } from "../../dados/usuarios";

// Lista de usuários (rota /usuarios)
export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // useEffect 1: carrega os dados quando a página abre.
  // O array vazio [] no final faz ele rodar só uma vez.
  useEffect(() => {
    // coloquei um setTimeout de meio segundo só pra simular
    // que os dados estão vindo de algum lugar
    const tempo = setTimeout(() => {
      setUsuarios(usuariosMock);
      setCarregando(false);
    }, 500);

    // cleanup: isso aqui roda quando eu saio da página
    return () => {
      clearTimeout(tempo);
      console.log("saiu da pagina de usuarios");
    };
  }, []);

  if (carregando) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h1>Usuários</h1>
      <p>Clique em um usuário pra ver os detalhes.</p>

      <ul className="lista">
        {usuarios.map((usuario) => (
          <li key={usuario.id}>
            <Link href={`/usuarios/${usuario.id}`}>
              {usuario.nome} - {usuario.email}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
