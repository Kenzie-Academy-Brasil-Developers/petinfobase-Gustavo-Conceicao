export function toast (title, message){ 
    const body = document.querySelector("body")

    const container = document.createElement("div")
    container.classList.add(".containerToast")

    const divHeaderToast = document.createElement("div")
    divHeaderToast.classList.add("headerToast")

    const img = document.createElement("img")
    img.alt = `Mensagem de ${title}`

    const h3 = document.createElement("h3")
    h3.innerText = title
    
    const span = document.createElement("span")
    span.classList.add("spanToast")
    span.innerText = message

    if (title == "Sua conta foi criada com sucesso!") {
        img.src = "../src/iconcheck.webp"
        h3.classList.add("toastSucessTitle")
        container.classList.add("successToast")
        message == "Agora você pode acessar os conteúdos utilizando seu usuário e senha na página de login"
    } else if (title == "Post deletado com sucesso!"){
        img.src = "../src/iconcheck.webp"
        h3.classList.add("toastSucessTitle")
        container.classList.add("successToast")
        message == "O post selecionado para exclusão foi deletado, a partir de agora não aparecerá no seu feed"
    }else{
        title == "Erro !"
        message == "Algo não deu errado"
        img.src = "../src/iconfail.png"
        h3.classList.add("toastFailTitle")
        container.classList.add("errToast")
    }

    divHeaderToast.append(img,h3)

    container.append(divHeaderToast,span)

    body.appendChild(container)
}

