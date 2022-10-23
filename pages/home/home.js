import {getInfo,editPost, createPost} from "../../scripts/requests.js"

async function headerHome () {
    const getRequest = await getInfo()
    getRequest.forEach(elem =>{
        const imgHeader = document.querySelector(".imgProfileHeader")
        imgHeader.src = elem.user.avatar
    })
}
headerHome()

async function homePage () {
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
        btnEdit.addEventListener("click", () => {
            const body = document.querySelector("body")
            body.append(editPostModal())
        })
        btnDelete.innerText = "Excluir"
        h2Post.innerText = elem.title
        post.innerText = elem.content
        acessPost.innerText = "Acessar publicação"
        acessPost.addEventListener("click", () => {
            const body = document.querySelector("body")
            body.append(modalOpenPost())
        })
    
        divBtn.append(btnEdit,btnDelete)
        divProfile.append(imgProfile,name,pData)
        divHeaderList.append(divProfile,divBtn)
        liHome.append(divHeaderList,h2Post,post,acessPost)
        ul.append(liHome)
        return ul
    })

}
homePage()

async function modalOpenPost () {
    const getRequest = await getInfo()
    getRequest.forEach(elem => {
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
            divProfileModal.append(imgProfileModal,nameModal,pDataModal)
            divHeaderModal.append(divProfileModal,divBtnModal)
            sectionModal.append(divHeaderModal,h2PostModal,postModal)
        
            
            return sectionModal
        })
}

modalOpenPost()

async function editPostModal() {
    const patchRequest = await editPost()
    patchRequest.forEach(elem =>{
        const sectionEditModal = document.createElement("section")
        const divHeaderEditModal = document.createElement("div")
        const h2Edit = document.createElement("h2")
        const buttoncloseModalEdit = document.createElement("button")
        const formEditModal = document.createElement("form")
        const labelTitle = document.createElement("label")
        const inputTitle = document.createElement("input")
        const labelPost = document.createElement("label")
        const textareaPost = document.createElement("textarea")
        const divbtnEditModal = document.createElement("div")
        const buttonCancel = document.createElement("button")
        const buttonSave = document.createElement("button")
    
        sectionEditModal.classList.add("sectionEditModal")
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
        inputTitle.innerText = elem.title
        labelPost.innerText = "Conteúdo do post"
        textareaPost.innerText = elem.content
        buttonCancel.innerText = "Cancel"
        buttonCancel.addEventListener("click", ()=>{
            sectionEditModal.remove()
        })
        buttonSave.innerText = "Salvar alterações"
        buttonSave.id = "btnSave"
    
        divbtnEditModal.append(buttonCancel,buttonSave)
        formEditModal.append(labelTitle,inputTitle,labelPost,textareaPost)
        divHeaderEditModal.append(h2Edit,buttoncloseModalEdit)
        sectionEditModal.append(divHeaderEditModal,formEditModal,divbtnEditModal)
    
        return sectionEditModal

    })
}
editPostModal()


function newPostModal() {
    const sectionNewPostModal = document.createElement("section")
    const divHeaderNewPostModal = document.createElement("div")
    const h2Create = document.createElement("h2")
    const buttoncloseModalNewPost = document.createElement("button")
    const formNewPostModal = document.createElement("form")
    const labelTitle = document.createElement("label")
    const inputTitle = document.createElement("input")
    inputTitle.id = "idTitle"
    const labelPost = document.createElement("label")
    const textareaPost = document.createElement("textarea")
    textareaPost.id = "idTextearea"
    const divbtnNewPostModal = document.createElement("div")
    const buttonCancel = document.createElement("button")
    const buttonPublish = document.createElement("button")
    buttonPublish.id = "idBtnPublishPost"

    sectionNewPostModal.classList.add("sectionEditModal")
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
    labelTitle.innerText = "Título do post"
    labelPost.innerText = "Conteúdo do post"
    buttonCancel.innerText = "Cancel"
    buttonCancel.addEventListener("click", ()=>{
        sectionNewPostModal.remove()
    })
    buttonPublish.innerText = "Publicar"
    // buttonSave.addEventListener("click", () => {

    // })

    divbtnNewPostModal.append(buttonCancel,buttonPublish)
    formNewPostModal.append(labelTitle,inputTitle,labelPost,textareaPost)
    divHeaderNewPostModal.append(h2Create,buttoncloseModalNewPost)
    sectionNewPostModal.append(divHeaderNewPostModal,formNewPostModal,divbtnNewPostModal)

    return sectionNewPostModal
}

const btnNewPost = document.querySelector(".btnNewPost")
    btnNewPost.addEventListener("click", () => {
        const body = document.querySelector("body")
        body.append(newPostModal())
    })



// function bodyEditPost () {
//     const inputTitle = querySelector(".inputTitle")
//     const textearea = document.querySelector(".texteareaPost")
//     const btnSave = document.getElementById("btnSave")

//     btnSave.addEventListener("click", (e) => {
//         e.preventDefault()
//         const bodyEditPost = {
//             id: "ee9141ab-43fb-403d-ba53-520b0b2eb31a",
// 	        title: "Castração Solidária de gatos",
// 	        content: "Estou promovendo um evento com parceria de algumas petShops e clinicas veterinárias da região de Porto Alegre e faremos a castração gratuita dos 100 primeiros gatos e gatas que estiverem no parque da redenção no dia 10/10/2022",
// 	        user: {
// 		        id: "190f5cad-a7b5-4f78-ab3f-30d2d947b14b",
// 		        username: "Bertoldo",
// 		        email: "rafael@kenzie.com.br",
// 		        avatar: "https://i.pinimg.com/originals/27/87/5d/27875d70cf52a0a643aeda13bbb7b0cd.jpg"
//         }
//     })
// }


function bodyCreatePost () {
    const titleValue = document.getElementById("idTitle")
    const texteareaValue = document.getElementById("idTextearea")
    const btnCreatePost = document.getElementById("idBtnPublishPost")

    btnCreatePost.addEventListener("click", (e) => {
        e.preventDefault()
        const bodyCreatePost = {
            title: titleValue.value,
            content: texteareaValue.value
        }
        createPost(bodyCreatePost)
    })
}
// bodyCreatePost()



