import {register} from "../../scripts/requests.js"
// import {toast} from "../../scripts/toast.js"

function registerPage () {
    const sectionPrimary = document.createElement("section")
    const divRegister = document.createElement("div")
    const h2Register = document.createElement("h2")
    const buttonBackLogin = document.createElement("button")
    const form = document.createElement("form")
    const labelUser = document.createElement("label")
    const inputUser = document.createElement("input")
    inputUser.id = "user"
    const labelEmail = document.createElement("label")
    const inputEmail = document.createElement("input")
    inputEmail.id = "email"
    const labelImg = document.createElement("label")
    const inputImg = document.createElement("input")
    const labelPassword = document.createElement("label")
    const inputPassword = document.createElement("input")
    inputPassword.id = "password"
    const buttonRegister = document.createElement("button")
    const btnBackLogin = document.createElement("button")

    sectionPrimary.classList.add("sectionPrimary")
    divRegister.classList.add("divCadastro")
    h2Register.classList.add("titleMedium2")
    buttonBackLogin.classList.add("btnBackLogin")
    form.classList.add("formRegister")
    labelUser.classList.add("titleMedium3")
    inputUser.classList.add("inputPlaceholder")
    labelEmail.classList.add("titleMedium3")
    inputEmail.classList.add("inputPlaceholder")
    labelImg.classList.add("titleMedium3")
    inputImg.classList.add("inputPlaceholder")
    labelPassword.classList.add("titleMedium3")
    inputPassword.classList.add("inputPlaceholder")
    buttonRegister.classList.add("btnPrimary")
    btnBackLogin.classList.add("btnRegister")

    h2Register.innerText = "Cadastro"
    buttonBackLogin.innerText = "Voltar para o login"
    buttonBackLogin.addEventListener("click", () => {
        window.location.replace("/pages/login/login.html")
    })
    
    const element = [...form.elements]
    form.addEventListener("submit", async (e) => {
		e.preventDefault()

		const body = {}

		element.forEach((elem) => {
			if (elem.tagName == "INPUT" && elem.value !== "") {
				body[elem.id] = elem.value
			}
		})

		await register(body)
	})

    labelUser.innerText = "Usuário"
    inputUser.placeholder = "Digite aqui seu usuário"
    inputUser.id = "idUser"
    labelEmail.innerText = "Email"
    inputEmail.placeholder = "Digite aqui seu email"
    inputEmail.id = "idEmail"
    inputEmail.type = "email"
    labelImg.innerText = "Link da foto do perfil"
    inputImg.placeholder = "Link da foto"
    inputImg.id = "idImg"
    inputImg.type = "url"
    labelPassword.innerText = "Senha"
    inputPassword.placeholder = "Digite aqui sua senha"
    inputPassword.id = "idPassword"
    inputPassword.type = "password"
    buttonRegister.innerText = "Cadastrar"
    buttonRegister.id = "idBtnRegister"
    btnBackLogin.innerText = "Voltar para o login"
    btnBackLogin.addEventListener("click", () => {
        window.location.replace("/pages/login/login.html")
    })

    form.append(labelUser,inputUser,labelEmail,inputEmail,labelImg,inputImg,labelPassword,inputPassword,buttonRegister)
    divRegister.append(h2Register,buttonBackLogin)
    sectionPrimary.append(divRegister,form,btnBackLogin)

    const main = document.querySelector("main")
    main.append(sectionPrimary)
    return main
}

registerPage()

function valueInputRegister() {
    const inputUser = document.getElementById("idUser")
    const inputEmail = document.getElementById("idEmail")
    const inputImg = document.getElementById("idImg")
    const inputPassword = document.getElementById("idPassword")
    const btnRegister = document.getElementById("idBtnRegister")

    btnRegister.addEventListener("click", (e) => {
        e.preventDefault()
        const bodyRegister = {
            username: inputUser.value,
            email: inputEmail.value,
            password: inputPassword.value,
            avatar: inputImg.value
        }
        register(bodyRegister)
    })
}

valueInputRegister()