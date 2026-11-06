import { useEffect, useState } from 'react'

const API = '/api/produtos'

async function lerErro(resp) {
  try {
    const dados = await resp.json()
    return dados.erro || 'Erro na requisição.'
  } catch {
    return 'Erro na requisição.'
  }
}

export default function App() {
  const [produtos, setProdutos] = useState([])
  const [nome, setNome] = useState('')
  const [preco, setPreco] = useState('')
  const [mensagem, setMensagem] = useState(null) // { tipo: 'sucesso' | 'erro', texto }
  const [carregando, setCarregando] = useState(true)

  async function carregarProdutos() {
    try {
      const resp = await fetch(API)
      if (!resp.ok) throw new Error(await lerErro(resp))
      setProdutos(await resp.json())
    } catch (e) {
      setMensagem({ tipo: 'erro', texto: `Falha ao carregar produtos: ${e.message}` })
    } finally {
      setCarregando(false)
    }
  }

  useEffect(() => {
    carregarProdutos()
  }, [])

  async function cadastrar(e) {
    e.preventDefault()
    try {
      const resp = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, preco: Number(preco) }),
      })
      if (!resp.ok) throw new Error(await lerErro(resp))
      setNome('')
      setPreco('')
      setMensagem({ tipo: 'sucesso', texto: 'Produto cadastrado com sucesso!' })
      await carregarProdutos()
    } catch (e) {
      setMensagem({ tipo: 'erro', texto: `Erro ao cadastrar: ${e.message}` })
    }
  }

  async function excluir(id) {
    try {
      const resp = await fetch(`${API}/${id}`, { method: 'DELETE' })
      if (!resp.ok) throw new Error(await lerErro(resp))
      setMensagem({ tipo: 'sucesso', texto: 'Produto excluído com sucesso!' })
      await carregarProdutos()
    } catch (e) {
      setMensagem({ tipo: 'erro', texto: `Erro ao excluir: ${e.message}` })
    }
  }

  return (
    <main className="container">
      <h1>Produtos</h1>

      {mensagem && <p className={`mensagem ${mensagem.tipo}`}>{mensagem.texto}</p>}

      <form onSubmit={cadastrar} className="formulario">
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="number"
          step="0.01"
          min="0"
          placeholder="Preço"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
        />
        <button type="submit">Cadastrar</button>
      </form>

      {carregando ? (
        <p>Carregando...</p>
      ) : produtos.length === 0 ? (
        <p>Nenhum produto cadastrado.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Preço</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.nome}</td>
                <td>R$ {p.preco.toFixed(2).replace('.', ',')}</td>
                <td>
                  <button className="excluir" onClick={() => excluir(p.id)}>
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  )
}
