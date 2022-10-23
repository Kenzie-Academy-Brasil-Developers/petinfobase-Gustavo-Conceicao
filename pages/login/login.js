import {login} from "../../scripts/requests.js"

async function loginPage () {
    const sectionSecundary = document.createElement("section")
    const h2Login = document.createElement("h2")
    const form = document.createElement("form")
    const labelEmail = document.createElement("label")
    const inputEmail = document.createElement("input")
    inputEmail.id = "inputEmail"
    const labelPassword = document.createElement("label")
    const inputPassword = document.createElement("input")
    inputPassword.id = "inputPassword"
    const spanPasswordError = document.createElement("span")
    const buttonAcess = document.createElement("button")
    const divRegister = document.createElement("div")
    const pQuestion = document.createElement("p")
    const spanBtn = document.createElement("span")
    const btnRegister = document.createElement("button")

    sectionSecundary.classList.add("sectionSecundary")
    h2Login.classList.add("titleMedium2")
    form.classList.add("formLogin")
    labelEmail.classList.add("titleMedium3")
    inputEmail.classList.add("inputPlaceholder")
    labelPassword.classList.add("titleMedium3")
    inputPassword.classList.add("inputPlaceholder")
    spanPasswordError.classList.add("errorPassword")
    buttonAcess.classList.add("btnPrimary")
    divRegister.classList.add("divRegister")
    pQuestion.classList.add("titleMedium4")
    spanBtn.classList.add("text2")
    btnRegister.classList.add("btnRegister")
    btnRegister.addEventListener("click", () => {
        window.location.replace("../register/register.html")
    })

    h2Login.innerText = "Login"

    const elements = [...form.elements]
	form.addEventListener("submit", async (e) => {
		e.preventDefault()
		const body = {}
        buttonAcess.disabled = true
		elements.forEach((elem) => {
			if (elem.tagName == "INPUT" && elem.value !== "") {
				buttonAcess.disabled = false
			}
		})

		await login(body)
	})	

    labelEmail.innerText = "Email"
    inputEmail.placeholder = "Digite aqui seu email"
    labelPassword.innerText = "Senha"
    inputPassword.placeholder = "Digite aqui sua senha"
    inputPassword.type = "password"
    spanPasswordError.innerText = "A senha está incorreta !"
    buttonAcess.innerText = "Acessar"
    pQuestion.innerText = "Ainda não possui a sua conta ?"
    spanBtn.innerText = "Clicando no botão abaixo, você pode se cadastrar rapidamente"
    btnRegister.innerText = "Cadastrar"

    divRegister.append(pQuestion,spanBtn)
    form.append(labelEmail,inputEmail,labelPassword,inputPassword,spanPasswordError,buttonAcess)
    sectionSecundary.append(h2Login,form,divRegister,btnRegister)

    const main = document.querySelector("main")
    main.append(sectionSecundary)
    return main
}

loginPage()

async function bodyLogin () {
    const emailLogin = document.querySelector("#inputEmail")
    const passwordLogin = document.querySelector("#inputPassword")
    const buttonAcess = document.querySelector(".btnPrimary")
    buttonAcess.addEventListener("click", (e) => {
        e.preventDefault()
        const bodyLogin = {
            email: emailLogin.value,
            password: passwordLogin.value
        }
        login(bodyLogin)
    })

}

bodyLogin()