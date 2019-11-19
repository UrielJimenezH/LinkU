"use strict"
let users = [];

if (localStorage.users != undefined) {
    users = JSON.parse(localStorage.users);
    console.log("no");
} else {
    users = [{
        id: "0",
        name: "Carlos",
        lastname: "Perez",
        email: "some@some.com",
        password: "1234"
    }];
    console.log("si");
}

/*let btnRegister = document.getElementById("btnRegister");
btnRegister.onclick = registerUser;*/
let registerForm = document.getElementById("registerForm")
registerForm.onsubmit = registerUser
let inpName = document.getElementById("inpFirstName");
let inpLastname = document.getElementById("inpLastname");
let inpEmailR = document.getElementById("inpEmailR");
let inpPasswordR = document.getElementById("inpPasswordR");


function registerUser(e) {
    e.preventDefault();
    let name = inpName.value;
    let lastname = inpLastname.value;
    let email = inpEmailR.value;
    let password = inpPasswordR.value;

    let id = 0;
    if (users.length > 0) {
        id = Number(users[users.length - 1].id) + 1;
    }
    console.log(users);
    let user = JSON.parse(`{
        "id": "${id}",
        "name": "${name}",
        "lastname": "${lastname}",
        "email": "${email}",
        "password": "${password}"
    }`);

    users.push(user);

    localStorage.users = JSON.stringify(users);
    localStorage.currentUserId = user.id;
    localStorage.userProfileId = user.id;
    window.location.href = "profile.html";
}

let inpEmail = document.getElementById("inpEmail");
let inpPassword = document.getElementById("inpPassword");
let loginForm = document.getElementById("loginForm")
loginForm.onsubmit = login;

function login(e) {
    e.preventDefault();
    let email = inpEmail.value;
    let password = inpPassword.value;

    let user = users.find(user => user.email == email)

    if (user != undefined) {
        if (user.password == password) {
            localStorage.currentUserId = user.id
            localStorage.userProfileId = user.id;
            localStorage.users = JSON.stringify(users);
            window.location.href = "profile.html"
        }
    } else {
        alert("Email o contraseña incorrectos")
    }

    console.log("login " + user);
}