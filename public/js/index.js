"use strict"
/*
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
}*/

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

    let data = {
        name: name,
        lastname: lastname,
        email: email,
        password: password
    }

    let url = '/api/register'
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));
    xhr.onload = function() {
        if (xhr.status != 200) { //400 bad request
            alert(xhr.response)
        } else {
            let resp = JSON.parse(xhr.response);
            let token = resp.token;
            localStorage.token = token;
            localStorage.currentUserId = resp.id;
            localStorage.userProfileId = resp.id;
            window.location.href = "profile.html"
        }
    };

    //window.location.href = "profile.html";
}

let inpEmail = document.getElementById("inpEmail");
let inpPassword = document.getElementById("inpPassword");
let loginForm = document.getElementById("loginForm")
loginForm.onsubmit = login;



function login(e) {
    e.preventDefault();
    let email = inpEmail.value;
    let password = inpPassword.value;

    let data = {
        email: email,
        password: password
    }

    let url = '/api/login'
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));
    xhr.onload = function() {
        if (xhr.status != 200) { //400 bad request
            alert(xhr.response)
        } else {
            let resp = JSON.parse(xhr.response);
            let token = resp.token;
            localStorage.token = token;
            localStorage.currentUserId = resp.id;
            localStorage.userProfileId = resp.id;
            window.location.href = "profile.html"
        }
    };
}