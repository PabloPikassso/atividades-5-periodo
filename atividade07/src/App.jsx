import Article from "./components/Article";
import Cabecalho from "./components/Cabecalho";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import Sidebar from "./components/Sidebar";

export default function App(){




  const titulo = "GTA VI será o JOGO do ano?"
  const data = "05 de agosto de 2026"
  const conteudo = [
    `O Grand Theft Auto VI desponta como o favorito absoluto ao título de Jogo do Ano. A Rockstar Games investiu mais
  de uma década e um orçamento recorde para entregar um salto geracional na indústria.
  A promessa é redefinir o conceito de mundo aberto em Vice City e no estado de Leonida,
  elevando os padrões de fidelidade gráfica, física e iluminação nos consoles da atual geração.`,

  `A grande inovação está na inteligência artificial e na reatividade do mapa. Os NPCs operam em rotinas
  complexas e orgânicas, transformando a cidade em um ecossistema vivo. Além disso,
  a dinâmica narrativa com a dupla Lucia e Jason introduz novas mecânicas de gameplay,
  exigindo alternância tática em tempo real durante assaltos, perseguições e exploração.`,

  `Mais do que um jogo, o título é um fenômeno da cultura pop que paralisa o mercado de entretenimento.
  Historicamente, a franquia dita as tendências que a indústria segue pelos anos seguintes. Combinando profundidade técnica,
  narrativa envolvente e um impacto cultural sem precedentes,
  GTA VI chega para estabelecer o novo parâmetro a ser batido pelas premiações.`
  ]



  return(
    <main>

      <Cabecalho />
      <Navigation />
      <Article 
        titulo={titulo}
        data={data}
        conteudo={conteudo}
        />
      <Sidebar />
      <Footer />
      
    </main>
  )
}