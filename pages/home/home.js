import {
    getInfo,
    editPost,
    createPost, 
    deletePost
} from "../../scripts/requests.js"

function logOut () {
    const tokenProfile = localStorage.getItem("tokenPet:") 
    const btnLogOut = document.getElementById("btnLogOut")
    btnLogOut.addEventListener("click", () => {
        window.location.replace("../login/login.html")
        localStorage.removeItem("tokenPet:")
    })
}
logOut()

const tokenProfile = localStorage.getItem("tokenPet:") 
console.log(tokenProfile)
if(!tokenProfile){
    window.location.replace("../../pages/login/login.html")
}

async function headerHome() {
    const getRequest = await getInfo()
    getRequest.forEach(elem => {
        const imgHeader = document.querySelector(".imgProfileHeader")
        imgHeader.src = elem.user.avatar
    })
}
headerHome()

async function homePage() {
    const getRequest = await getInfo()
    getRequest.forEach(elem => {
        const ul = document.querySelector(".ulHome")
        const liHome = document.createElement("li")
        const divHeaderList = document.createElement("div")
        const divProfile = document.createElement("div")
        const imgProfile = document.createElement("img")
        imgProfile.id = "idImgProfile"
        const name = document.createElement("h3")
        name.id = "idName"
        const pData = document.createElement("p")
        const divBtn = document.createElement("div")
        const btnEdit = document.createElement("button")
        const btnDelete = document.createElement("button")
        const h2Post = document.createElement("h2")
        h2Post.id = "idTitlePost"
        const post = document.createElement("p")
        post.id = "idPost"
        const acessPost = document.createElement("a")

        liHome.classList.add("liHome")
        divHeaderList.classList.add("divHeaderList")
        divProfile.classList.add("divProfile")
        imgProfile.classList.add("imgProfile")
        name.classList.add("titleMedium4")
        pData.classList.add("textData")
        divBtn.classList.add("divBtn")
        btnEdit.classList.add("btnEdit")
        btnDelete.classList.add("btnDelete")
        h2Post.classList.add("titleLarge2")
        post.classList.add("text1")
        acessPost.classList.add("buttonAcessPost")
        imgProfile.src = elem.user.avatar
        name.innerText = elem.user.username
        pData.innerText = elem.createdAt
        btnEdit.innerText = "Editar"
        btnEdit.addEventListener("click", async (e) => {
            e.preventDefault()
            editPostModal(elem)
        })
        btnDelete.innerText = "Excluir"
        btnDelete.addEventListener("click", async(e) =>{
            e.preventDefault()
            await deletePost(elem.id)
            location.reload()
        })
        h2Post.innerText = elem.title
        post.innerText = elem.content
        acessPost.innerText = "Acessar publicação"
        acessPost.addEventListener("click", async (e) => {
            e.preventDefault()
            modalOpenPost(elem)
        })

        divBtn.append(btnEdit, btnDelete)
        divProfile.append(imgProfile, name, pData)
        divHeaderList.append(divProfile, divBtn)
        liHome.append(divHeaderList, h2Post, post, acessPost)
        ul.append(liHome)
        return ul
    })

}
homePage()

function modalOpenPost(elem) {
    const sectionModal = document.createElement("section")
    const divHeaderModal = document.createElement("div")
    const divProfileModal = document.createElement("div")
    const imgProfileModal = document.createElement("img")
    const nameModal = document.createElement("h3")
    const pDataModal = document.createElement("p")
    const divBtnModal = document.createElement("div")
    const btnCloseModal = document.createElement("button")
    const h2PostModal = document.createElement("h2")
    const postModal = document.createElement("p")

    sectionModal.classList.add("sectionModal")
    divHeaderModal.classList.add("divHeaderList")
    divProfileModal.classList.add("divProfile")
    imgProfileModal.classList.add("imgProfile")
    nameModal.classList.add("titleMedium4")
    pDataModal.classList.add("textData")
    divBtnModal.classList.add("divBtn")
    btnCloseModal.classList.add("btnCloseModal")
    h2PostModal.classList.add("titleLarge2")
    postModal.classList.add("text1")

    imgProfileModal.src = elem.user.avatar
    nameModal.innerText = elem.title
    pDataModal.innerText = elem.createdAt
    btnCloseModal.innerText = "X"
    btnCloseModal.addEventListener("click", () => {
        sectionModal.remove()
    })
    h2PostModal.innerText = elem.title
    postModal.innerText = elem.content

    divBtnModal.append(btnCloseModal)
    divProfileModal.append(imgProfileModal, nameModal, pDataModal)
    divHeaderModal.append(divProfileModal, divBtnModal)
    sectionModal.append(divHeaderModal, h2PostModal, postModal)

    const body = document.querySelector("body")
    body.append(sectionModal)
    return body
}

function editPostModal(elem) {
    const sectionEditModal = document.createElement("section")
    const divContainer = document.createElement("div")
    const divHeaderEditModal = document.createElement("div")
    const h2Edit = document.createElement("h2")
    const buttoncloseModalEdit = document.createElement("button")
    const formEditModal = document.createElement("form")
    const labelTitle = document.createElement("label")
    const inputTitle = document.createElement("input")
    inputTitle.name = "title"
    const labelPost = document.createElement("label")
    const textareaPost = document.createElement("textarea")
    textareaPost.name = "content"
    const divbtnEditModal = document.createElement("div")
    const buttonCancel = document.createElement("button")
    const buttonSave = document.createElement("button")

    sectionEditModal.classList.add("sectionBackground")
    divContainer.classList.add("sectionEditModal")
    divHeaderEditModal.classList.add("headerModal")
    h2Edit.classList.add("titleMedium2")
    buttoncloseModalEdit.classList.add("btnCloseModal")
    formEditModal.classList.add("formEditModal")
    labelTitle.classList.add("titleMedium3")
    inputTitle.classList.add("inputTitle")
    labelPost.classList.add("titleMedium3")
    textareaPost.classList.add("texteareaPost")
    divbtnEditModal.classList.add("divBtn")
    buttonCancel.classList.add("btnCancel")
    buttonSave.classList.add("btnSave")

    h2Edit.innerText = "Edição"
    buttoncloseModalEdit.innerText = "X"
    buttoncloseModalEdit.addEventListener("click", () => {
        sectionEditModal.remove()
    })

    labelTitle.innerText = "Título do post"
    inputTitle.value = elem.title
    labelPost.innerText = "Conteúdo do post"
    textareaPost.value = elem.content
    buttonCancel.innerText = "Cancel"
    buttonCancel.addEventListener("click", () => {
        sectionEditModal.remove()
    })
    buttonSave.innerText = "Salvar alterações"
    buttonSave.id = "btnSave"
    buttonSave.addEventListener("click", async (e) => {
        e.preventDefault()
        const bodyEditPost = {
            title: inputTitle.value,
            content: textareaPost.value
        }
        await editPost(elem.id,bodyEditPost)
        sectionEditModal.remove()
        location.reload()
    })

    divbtnEditModal.append(buttonCancel, buttonSave)
    formEditModal.append(labelTitle, inputTitle, labelPost, textareaPost)
    divHeaderEditModal.append(h2Edit, buttoncloseModalEdit)
    divContainer.append(divHeaderEditModal, formEditModal, divbtnEditModal)
    sectionEditModal.append(divContainer)

    const body = document.querySelector("body")
    body.append(sectionEditModal)
    return body
}


function newPostModal(elem) {
    const sectionNewPostModal = document.createElement("section")
    const divContainer = document.createElement("div")
    const divHeaderNewPostModal = document.createElement("div")
    const h2Create = document.createElement("h2")
    const buttoncloseModalNewPost = document.createElement("button")
    const formNewPostModal = document.createElement("form")
    const labelTitle = document.createElement("label")
    const inputTitle = document.createElement("input")
    inputTitle.name = "title"
    inputTitle.id = "idTitle"
    const labelPost = document.createElement("label")
    const textareaPost = document.createElement("textarea")
    textareaPost.name = "content"
    textareaPost.id = "idTextearea"
    const divbtnNewPostModal = document.createElement("div")
    const buttonCancel = document.createElement("button")
    const buttonPublish = document.createElement("button")
    buttonPublish.id = "idBtnPublishPost"

    sectionNewPostModal.classList.add("sectionBackground")
    divContainer.classList.add("sectionEditModal")
    divHeaderNewPostModal.classList.add("headerModal")
    h2Create.classList.add("titleMedium2")
    buttoncloseModalNewPost.classList.add("btnCloseModal")
    formNewPostModal.classList.add("formEditModal")
    labelTitle.classList.add("titleMedium3")
    inputTitle.classList.add("inputTitle")
    labelPost.classList.add("titleMedium3")
    textareaPost.classList.add("texteareaPost")
    divbtnNewPostModal.classList.add("divBtn")
    buttonCancel.classList.add("btnCancel")
    buttonPublish.classList.add("btnSave")

    h2Create.innerText = "Criando novo post"
    buttoncloseModalNewPost.innerText = "X"
    buttoncloseModalNewPost.addEventListener("click", () => {
        sectionNewPostModal.remove()
    })

    formNewPostModal.addEventListener("submit", async (e) => {
        e.preventDefault()
        const inputValue = [...e.target]
        let value = {}
        inputValue.forEach(elem => {
            value[elem.name] = elem.value
        })
        await createPost(elem.id,value)
    })
    labelTitle.innerText = "Título do post"
    labelPost.innerText = "Conteúdo do post"
    buttonCancel.innerText = "Cancel"
    buttonCancel.addEventListener("click", () => {
        sectionNewPostModal.remove()
    })
    buttonPublish.innerText = "Publicar"
    buttonPublish.addEventListener("click", async (e) => {
        e.preventDefault()
        const bodyCreateNewPost = {
            title: inputTitle.value,
            content: textareaPost.value
        }
        await createPost(bodyCreateNewPost)
        sectionNewPostModal.remove()
        location.reload()
    })

    divbtnNewPostModal.append(buttonCancel, buttonPublish)
    formNewPostModal.append(labelTitle, inputTitle, labelPost, textareaPost)
    divHeaderNewPostModal.append(h2Create, buttoncloseModalNewPost)
    divContainer.append(divHeaderNewPostModal, formNewPostModal, divbtnNewPostModal)
    sectionNewPostModal.append(divContainer)

    return sectionNewPostModal
}

const btnNewPost = document.querySelector(".btnNewPost")
btnNewPost.addEventListener("click", () => {
    const body = document.querySelector("body")
    body.append(newPostModal())
    
})


