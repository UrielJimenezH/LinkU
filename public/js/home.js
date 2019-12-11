let users = [];
let container = document.getElementById("usersContainer");

function showUsers() {
    let usersCont = "";
    for (let i = 0; i < users.length; i++) {
        let user = users[i];
        let numProjects = 0;
        if (user.projects != undefined) {
            numProjects = user.projects.length;
        }
        let career = "Carrera desconocida";
        if (user.career != undefined) {
            career = user.career;
        }
        let city = "Ciudad desconocida";
        if (user.city != undefined) {
            city = user.city;
        }
        usersCont += `
            <div class="col-12 card-cont mb-3">
                <div class="card">
                    <div class="row no-gutters">
                        <div class="col-sm-4">
                            <img src="img/user.jpg" class="card-img" alt="...">
                        </div>
                        <div class="col-sm-8">
                            <div class="card-body">
                                <h5 class="card-title">${user.name + " " + user.lastname}</h5>
                                <p class="card-text">${career}</p>
                                <p class="card-text">${numProjects} projects</p>
                                <p class="card-text"><small class="text-muted">Vive en ${city}</small></p>
                                <a onclick="showDetails(${i})" class="details-btn"><button type="button" class="btn btn-primary"><i class="fas fa-search"></i></button></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    container.innerHTML = usersCont;
}


function showDetails(index) {
    localStorage.userProfileId = users[index]._id;
    window.location.href = "profile.html";
}

function getUsers() {
    let url = "/api/allusers"
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.setRequestHeader('x-auth-user', localStorage.token);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
    xhr.onload = function() {
        if (xhr.status == 401) {
            window.location.href = "index.html";
        } else if (xhr.status != 200) {
            alert(xhr.response)
        } else {
            let aux = JSON.parse(xhr.response);
            if (Array.isArray(aux)) {
                users = aux
            } else {
                users = [];
                users.push(aux);
            }
            showUsers()
        }
    };
}

getUsers();