let users = JSON.parse(localStorage.users);
let container = document.getElementById("usersContainer");

function showUsers() {
    console.log(users.length);
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
                                <p class="card-text"><small class="text-muted">${city}</small></p>
                                <a onclick="showDetails(${user.id})" class="details-btn"><button type="button" class="btn btn-primary"><i class="fas fa-search"></i></button></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    container.innerHTML = usersCont;
}

showUsers();

function showDetails(id) {
    localStorage.userProfileId = id;
    window.location.href = "profile.html";
}