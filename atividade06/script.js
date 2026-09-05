const tarefas = document.querySelector("#tasktodo")
const botaoAdd = document.querySelector("#botao")
const lista = document.getElementById("lista")

botaoAdd.addEventListener("click", ()=>{

    const texto = tarefas.value
    console.log("clicou no botao")
    const item = document.createElement("li")
    const span = document.createElement("span")
    const excluir = document.createElement("button");
    excluir.addEventListener("click",()=>{
        lista.removeChild(item)
    })

    span.textContent = texto
    excluir.textContent = "Excluir"

    item.appendChild(span)
    item.appendChild(excluir)

    


    lista.appendChild(item)
    tarefas.value = " "

})

