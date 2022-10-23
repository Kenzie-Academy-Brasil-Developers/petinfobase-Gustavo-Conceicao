import {toast} from "./toast.js";

const baseUrl = "http://localhost:3333";
const tokenProfile = localStorage.getItem("tokenPet:")

async function login(body) {
  try {
    const request = await fetch(`${baseUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
    .then(res => res.json())
    .then(res => {
      if(res.token){
        localStorage.setItem("tokenPet:", res.token)
        window.location.replace("../home/home.html")
      }else{
        toast("Erro!", "Algo deu errado")
      }
    })

  } catch (err) {
    toast("Erro!", "Algo deu errado");
  }
}

async function register(body) {
  try {
    const request = await fetch(`${baseUrl}/users/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
    .then(res => res.json())
    .then(res => {
      if (res) {
        toast("Sua conta foi criada com sucesso!", "Agora você pode acessar os conteúdos utilizando seu usuário e senha na página de login");

        setTimeout(() => {
          document.location.href = "../login/login.html";
        }, 3000);

      } else {
        toast("Erro!", "Algo deu errado");
      }
      console.log(res)
  })
 } catch (err) {
  console.log(err)
    toast("Erro!", "Algo deu errado");
  }
}

async function getInfo () {
  try {
    const request = await fetch(`${baseUrl}/posts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenProfile}`,
      },
    })
    .then(res => res.json())
    .then(res => res)
    return request

  } catch (err) {
    console.log(err);
  }
}

async function editPost (id) {
  try {
    const request = await fetch(`${baseUrl}/posts/ee9141ab-43fb-403d-ba53-520b0b2eb31a/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
      body: JSON.stringify()
    })
    return request
  } catch (err) {
    console.log(err);
  }
}

async function createPost (body) {
  try {
    const request = await fetch(`${baseUrl}/posts/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
      body: JSON.stringify(body),
    })
    .then(res => res.json())
    .then(res => res)

  } catch (err) {
    console.log(err);
  }
}

export {login, register, getInfo,editPost, createPost};