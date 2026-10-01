"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { usuariosMock } from "../../../dados/usuarios";

// Detalhes do usuário (rota /usuarios/[id])
export default function DetalhesUsuario() {
  // o useParams pega o que veio na URL, ex: /usuarios/2 -> params.id = "2"
  const params = useParams();
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  // useEffect 2: esse reage a mudança.
  // Como eu coloquei params.id no array de dependências, toda vez que
  // o id da URL muda ele roda de novo e busca o usuário certo.
  useEffect(() => {
    // o id vem como texto da URL, por isso o Number()
    const id = Number(params.id);
    const encontrado = usuariosMock.find((u) => u.id === id);

    setUsuario(encontrado);
    setCarregando(false);

    console.log("carregou o usuario de id " + id);

    // cleanup de novo, pra mostrar quando troca de usuário ou sai da página
    return () => {
      console.log("saiu do usuario de id " + id);
    };
  }, [params.id]);

  if (carregando) {
    return <p>Carregando...</p>;
  }

  // se digitar um id que não existe na URL (ex: /usuarios/99)
  if (!usuario) {
    return (
      <div>
        <h1>Usuário não encontrado</h1>
        <Link href="/usuarios" className="botao">
          Voltar para a lista
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1>{usuario.nome}</h1>

      <div className="cartao">
        <p>
          <strong>ID:</strong> {usuario.id}
        </p>
        <p>
          <strong>Nome:</strong> {usuario.nome}
        </p>
        <p>
          <strong>E-mail:</strong> {usuario.email}
        </p>
      </div>

      {/* esses links servem pra testar o useEffect que reage ao id:
          clicando aqui a URL muda e os dados trocam sem recarregar a página */}
      <p className="outros">
        Ver outro usuário:{" "}
        {usuariosMock.map((u) => (
          <Link key={u.id} href={`/usuarios/${u.id}`}>
            {u.id}
          </Link>
        ))}
      </p>

      <Link href="/usuarios" className="botao">
        Voltar para a lista
      </Link>
    </div>
  );
}
