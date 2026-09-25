import { useState } from "react"

export default function App() {

  const [tarefas, setTarefas] = useState([])
  const [texto, setTexto] = useState("")

  function adicionarTarefa(event) {
    event.preventDefault()

    const novaTarefa = {
      id: Date.now(),
      text: texto
    }

    setTarefas([...tarefas, novaTarefa])

    setTexto("")
  }

  function removerTarefa(id) {

    const novaLista = tarefas.filter((tarefa) => tarefa.id !== id)

    setTarefas(novaLista)
  }

  return (
    <section id="container">

      <h1>Lista de estudos</h1>

      <form onSubmit={adicionarTarefa}>

        <input
          type="text"
          placeholder="adicione sua tarefa"
          value={texto}
          onChange={(event) => setTexto(event.target.value)}
        />

        <button type="submit">
          Adicionar
        </button>

      </form>

      <ul>

        {tarefas.map((tarefa) => (

          <li key={tarefa.id}>

            <span>{tarefa.text}</span>

            <button onClick={() => removerTarefa(tarefa.id)}>
              Remover
            </button>

          </li>

        ))}

      </ul>

    </section>
  )
}