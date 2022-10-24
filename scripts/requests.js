import {toast} from "./toast.js";

const baseUrl = "http://localhost:3333";


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
        localStorage.setItem("tokenPet:", JSON.stringify(res.token))
        window.location.replace("../home/home.html")
      }else{
        toast("Erro!", "Algo deu errado")
      }
      return request
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
          document.location.href = "/pages/login/login.html";
        }, 3000);

      } else {
        toast("Erro!", "Algo deu errado");
      }
      return request
  })
 } catch (err) {
    toast("Erro!", "Algo deu errado");
  }
}

async function getInfo () {
  const tokenProfile = JSON.parse(localStorage.getItem("tokenPet:"))
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

async function editPost (id,body) {
  const tokenProfile = JSON.parse(localStorage.getItem("tokenPet:"))
  try {
    const request = await fetch(`${baseUrl}/posts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenProfile}`,
      },
      body: JSON.stringify(body)
    })
    .then(res => res.json()
    .then(res => res))
    
    return request
  } catch (err) {
    console.log(err);
  }
}

async function createPost (body) {
  const tokenProfile = JSON.parse(localStorage.getItem("tokenPet:")) 
  try {
    const request = await fetch(`${baseUrl}/posts/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenProfile}`,
      },
      body: JSON.stringify(body),
    })
    .then(res => res.json())
    .then(res => res)
    return request
  } catch (err) {
    console.log(err);
  }
}

async function deletePost (id) {
  try {
    const request = await fetch(`${baseUrl}/posts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(res => res.json())
    .then(res => {
      if(res){
        toast("Sua conta foi deletada com sucesso!", "Agora você pode acessar os conteúdos utilizando seu usuário e senha na página de login");

        setTimeout(() => {
          document.location.href = "/pages/home/home.html";
        }, 3000);
      }
    })
      return request

  } catch (err) {
    toast("Erro!", "Algo deu errado");
  }
}

export {login, register, getInfo,editPost, createPost, deletePost};