export default function Article(props) {
    

    return(
        <article>
        <h2>{props.titulo}</h2>
        <time >{props.data}</time>
        {props.conteudo.map((paragrafo,index) => (
            <p key={index}>
            {paragrafo}
            </p>
        ))}

        

        </article>

    
        
    )
   
}