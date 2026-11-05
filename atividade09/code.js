const lista = document.getElementById('lista')
const button = document.getElementById('botao')

async function buscarprodutos() {
try {
const response = await fetch('https://dummyjson.com/products?limit=12&skip=12&select=title,price,thumbnail');
if (!response.ok) {
throw new Error(`Erro HTTP: ${response.status}`);
}
const dados = await response.json();
if (dados.erro) {
throw new Error("Produto nao encontrado");
}

lista.innerHTML = '';

dados.products.forEach(function(produto) {
    const itemLista = document.createElement("li")

    const thumbnail = document.createElement("img")
    thumbnail.src = produto.thumbnail
    thumbnail.classList.add("imagem")


    const spanTitulo = document.createElement("span");
    spanTitulo.textContent = produto.title
    spanTitulo.classList.add("nome-produto")
    
    const quebraLinha = document.createElement("br");

    const spanPreco = document.createElement("span");
    spanPreco.textContent = produto.price
    spanPreco.classList.add("preco-produto")

    console.log(produto.thumbnail)

    itemLista.appendChild(thumbnail);
    itemLista.appendChild(spanTitulo);
    itemLista.appendChild(quebraLinha);
    itemLista.appendChild(spanPreco);
    lista.appendChild(itemLista)
})

return dados;

} catch (erro) {
console.error(erro.message);
} finally {
console.log("Busca finalizada");
}

}

button.addEventListener('click', buscarprodutos);


