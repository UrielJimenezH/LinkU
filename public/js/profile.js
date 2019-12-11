let b = document.getElementById("btnSaveBasicInfo")
b.onclick = () => { infoToSave(1) }
let a = document.getElementById("btnSaveAboutMe")
a.onclick = () => { infoToSave(2) }
let e = document.getElementById("btnSaveEducation")
e.onclick = () => { infoToSave(3) }
let s = document.getElementById("btnSaveSkill")
s.onclick = () => { infoToSave(4) }
let p = document.getElementById("btnSaveProject")
p.onclick = () => { infoToSave(5) }

let usernameNav = document.getElementById("navbarDropdown");


let infoType = 0

function infoToSave(index) {
    infoType = index
}

document.getElementById("btnConfirm").onclick = (e) => {
    e.preventDefault()
    switch (infoType) {
        case 1:
            saveBasicInfo()
            break;
        case 2:
            saveAboutMe()
            break;
        case 3:
            saveEducation()
            break;
        case 4:
            saveSkill()
            break;
        case 5:
            saveProject()
            break;
    }

    let modals = document.getElementsByClassName("modal")

    let closeButtons = document.getElementsByClassName("close")

    for (let button of closeButtons) {
        button.click()
    }

}

let btnShowConfirmModal = document.getElementById("btnShowConfirmModal");

let inp = document.getElementById("uploadPhoto")
inp.onclick = () => {
    inpUserPhoto.click();
}
let inpUserPhoto = document.getElementById("inpUserPhoto");
inpUserPhoto.onchange = function(e) {
    if (inpUserPhoto.files && inpUserPhoto.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('#userPhotoM')
                .attr('src', e.target.result);
        };

        reader.readAsDataURL(inpUserPhoto.files[0]);
    }
}
let inpFirstName = document.getElementById("inpFirstName")
let inpLastName = document.getElementById("inpLastName")
let inpEmail = document.getElementById("inpEmail")
let inpBirthday = document.getElementById("inpBirthday")
let inpCity = document.getElementById("inpCity")

let name = document.getElementById("userName")
let email = document.getElementById("userEmail")
let birthday = document.getElementById("userBirthday")
let city = document.getElementById("userCity")
let basicInfoForm = document.getElementById("basicInfoForm")
basicInfoForm.onsubmit = (e) => {
    e.preventDefault();
    btnShowConfirmModal.click();
}

function prepareBasicInfoModal() {
    var reader = new FileReader();
    if (userProfile.photo != undefined) {
        reader.onload = function(e) {
            $('#userPhotoM')
                .attr('src', e.target.result);
        };

        reader.readAsDataURL(inpUserPhoto.files[0]);
    } else {
        $('#userPhotoM')
            .attr('src', 'img/user.jpg');
    }
    inpFirstName.value = userProfile.name;
    inpLastName.value = userProfile.lastname;
    inpEmail.value = userProfile.email;

    if (userProfile.birthday != null) {
        inpBirthday.value = userProfile.birthday;
    }

    if (userProfile.city != null) {
        inpCity.value = userProfile.city
    } else {
        inpCity.value = "";
    }
}

function saveBasicInfo() {
    let aux = userProfile;
    userProfile.name = inpFirstName.value;
    userProfile.lastname = inpLastName.value;
    userProfile.birthday = inpBirthday.value;
    userProfile.city = inpCity.value;
    if (inpUserPhoto.files && inpUserPhoto.files[0]) {
        userProfile.photo = inpUserPhoto.files[0];
    }
    updateUser();

    return false
}

let aboutMe = document.getElementById("userAbout");
let inpAboutMe = document.getElementById("inpAboutMe");
let aboutMeForm = document.getElementById("aboutMeForm")
aboutMeForm.onsubmit = (e) => {
    e.preventDefault();
    btnShowConfirmModal.click();
}

function prepareAboutMeModal() {
    if (userProfile.about != null) {
        inpAboutMe.value = userProfile.about;
    } else {
        inpAboutMe.value = "";
    }
}

function saveAboutMe() {
    if (inpAboutMe.value) {
        userProfile.about = inpAboutMe.value;
    }

    updateUser();
}

let school = document.getElementById("userSchool");
let career = document.getElementById("userDegree");
let graduationDate = document.getElementById("userGrad");

let inpSchool = document.getElementById("inpSchool")
let inpCareer = document.getElementById("inpCareer")
let inpGraduationDate = document.getElementById("inpGraduationDate")
let educationForm = document.getElementById("educationForm")
educationForm.onsubmit = (e) => {
    e.preventDefault();
    btnShowConfirmModal.click();
}

function prepareEducationModal() {
    if (userProfile.school != null) {
        inpSchool.value = userProfile.school;
        inpCareer.value = userProfile.career;
        inpGraduationDate.value = userProfile.graduationDate;
    } else {
        inpSchool.value = "";
        inpCareer.value = "";
    }
}

function saveEducation() {
    userProfile.school = inpSchool.value;
    userProfile.career = inpCareer.value;
    userProfile.graduationDate = inpGraduationDate.value;

    updateUser();
}


let selectSkill = document.getElementById("selectSkill");
let newSkill = document.getElementById("inpCheckNewSkill");
let inpNewSkill = document.getElementById("inpNewSkill");

let skillsCont = document.getElementById("skills");
let skillsForm = document.getElementById("skillsForm")
skillsForm.onsubmit = (e) => {
    e.preventDefault();
    btnShowConfirmModal.click();
}

function prepareSkillsModal() {
    selectSkill.selectedIndex = 0;
    selectSkill.disabled = false;
    inpNewSkill.value = "";
    inpNewSkill.disabled = true;
    newSkill.checked = false;
}

function saveSkill() {
    let skill = "";
    if (newSkill.checked) {
        skill = inpNewSkill.value;
        if (skill == "") {
            return false;
        }
        let sk = {
            name: skill
        }
        skills.push(sk);

        saveSkillDB(skill);
    } else {
        skill = selectSkill.options[selectSkill.selectedIndex].text;
    }

    if (userProfile.skills == undefined) {
        userProfile.skills = [];
    }
    userProfile.skills.push(skill);

    updateUser();
}


let startYear = 2019;
let startMonth = 0;
let finishYear = 2019;
let finishMonth = 0;
let inpPorjectName = document.getElementById("inpProjectName");
let selectStartMonth = document.getElementById("selectStartMonth");
selectStartMonth.onchange = () => {
    startMonth = selectStartMonth.selectedIndex;
    if (startYear == finishYear && startMonth > finishMonth) {
        finishMonth = startMonth;
        selectFinishMonth.selectedIndex = finishMonth;
    }
}
let inpStartYear = document.getElementById("inpStartYear");
inpStartYear.onchange = () => {
    startYear = inpStartYear.value;
    if (startYear > finishYear) {
        finishYear = startYear;
        inpFinishYear.value = finishYear;
    }
}
let selectFinishMonth = document.getElementById("selectFinishMonth");
selectFinishMonth.onchange = () => {
    finishMonth = selectFinishMonth.selectedIndex;
    if (startYear == finishYear && startMonth > finishMonth) {
        startMonth = finishMonth;
        selectStartMonth.selectedIndex = startMonth;
    }
}
let inpFinishYear = document.getElementById("inpFinishYear");
inpFinishYear.onchange = () => {
    finishYear = inpFinishYear.value;
    if (startYear > finishYear) {
        startYear = finishYear;
        inpStartYear.value = startYear;
    }
}
let currentWork = document.getElementById("inpCheckCurrent");
let inpProjectDescription = document.getElementById("inpProjectDescription");

let projects = document.getElementById("projects");
let projectsForm = document.getElementById("projectsForm")
projectsForm.onsubmit = (e) => {
    e.preventDefault();
    btnShowConfirmModal.click();
}

function prepareProjectsModal() {
    inpPorjectName.value = "";
    selectStartMonth.selectedIndex = 0;
    inpStartYear.value = 2019;
    selectFinishMonth.selectedIndex = 0;
    selectFinishMonth.disabled = false;
    inpFinishYear.value = 2019;
    inpFinishYear.disabled = false;
    currentWork.checked = false;
    inpProjectDescription.value = "";

    edition = 0;
    editionIndex = -1;
}

function saveProject() {
    let project = {
        name: inpPorjectName.value,
        startMonth: selectStartMonth.options[selectStartMonth.selectedIndex].text,
        startYear: inpStartYear.value,
        currentWork: currentWork.checked,
        description: inpProjectDescription.value
    };

    if (!currentWork.checked) {
        project.finishMonth = selectFinishMonth.options[selectFinishMonth.selectedIndex].text;
        project.finishYear = inpFinishYear.value;
    }

    if (userProfile.projects == undefined) {
        userProfile.projects = [];
    }

    if (edition == 1) {
        userProfile.projects.splice(editionIndex, 1, project);
        edition = 0;
        editionIndex = -1;
    } else {
        userProfile.projects.push(project);
    }

    updateUser();
}

function checkNewSkill() {
    selectSkill.disabled = newSkill.checked
    inpNewSkill.disabled = !newSkill.checked
}

function checkCurrentlyWorking() {
    selectFinishMonth.disabled = currentWork.checked
    inpFinishYear.disabled = currentWork.checked
}

let currentUserId = localStorage.currentUserId;
let userProfileId = localStorage.userProfileId;
let skills = undefined;

function getSkills() {
    let url = '/api/skills'
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.setRequestHeader('x-auth-user', localStorage.token);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
    xhr.onload = function() {
        if (xhr.status == 401) {
            window.location.href = "index.html";
            return false;
        } else if (xhr.status != 200) {
            alert(xhr.response)
            return false;
        } else {
            skills = JSON.parse(xhr.response);
            //getUser()
        }
    };
}
getSkills()


let userProfile = undefined;

function getUser() {
    let url = `/api/user?id=${userProfileId}`
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
            userProfile = JSON.parse(xhr.response);
            fillData()
        }
    };
}
getUser();


const SKILL = 0;
const PROJECT = 1;

function fillData() {
    if (userProfile != undefined) {
        var reader = new FileReader();
        /*if (userProfile.photo != undefined) {
            reader.onload = function(e) {
                $('#user-photo')
                    .attr('src', e.target.result);
            };

            reader.readAsDataURL(inpUserPhoto.files[0]);
        } else {
            $('#user-photo')
                .attr('src', 'img/user.jpg');
        }*/

        usernameNav.innerHTML = userProfile.name;
        name.innerHTML = userProfile.name + " " + userProfile.lastname
        email.innerHTML = userProfile.email
        if (userProfile.birthday != undefined) {
            birthday.innerHTML = userProfile.birthday
        } else {
            birthday.innerHTML = "When were you born?"
        }

        if (userProfile.city != undefined) {
            city.innerHTML = userProfile.city
        } else {
            city.innerHTML = "Where do you live?"
        }

        if (userProfile.about != undefined) {
            aboutMe.innerHTML = userProfile.about;
            aboutMe.classList.remove("d-none");
            document.getElementById("about").classList.add("d-none");
        }

        if (userProfile.school != undefined) {
            document.getElementById("education").classList.add("d-none");
            school.innerHTML = "School: " + userProfile.school;
            school.classList.remove("d-none");
            career.innerHTML = "Degree: " + userProfile.career;
            career.classList.remove("d-none");
            graduationDate.innerHTML = "Expected graduation date: " + userProfile.graduationDate;
            graduationDate.classList.remove("d-none");
        }

        if (userProfile.skills != undefined && userProfile.skills.length != 0) {
            let hskills = "";
            userProfile.skills.forEach((skill, index) => {
                hskills += `<div class="skill-card">
                <div>
                    <span class="card-text text-left">${skill}</span>
                </div>
                <div class="icons edition d-none">
                    <a href="#" data-toggle="modal" onclick="deleteElement(${SKILL}, ${index})" data-target="#deleteModal">
                        <i class="fas fa-trash"></i></a>
                </div>
            </div>`
            });
            skillsCont.innerHTML = "";
            skillsCont.innerHTML = hskills;
            enableEdition();
        } else {
            skillsCont.innerHTML = "Tell us about your skills";
        }

        if (userProfile.projects != undefined && userProfile.projects.length != 0) {
            let hprojects = "";

            userProfile.projects.forEach((project, index) => {
                let date = project.startMonth + " " + project.startYear + " - ";

                if (project.currentWork) {
                    date += "present";
                } else {
                    date += project.finishMonth + " " + project.finishYear
                }

                hprojects += `<div class="project-card text-left">
                <div class="top-icon edit-icon edition d-none">
                    <a href="#" data-toggle="modal" data-target="#projectModal" onclick="prepareEditProject(1, ${index})">
                        <i class="fas fa-pencil-alt"></i></a>
                </div>
                <div class="top-icon delete-icon edition d-none">
                    <a href="#" data-toggle="modal" data-target="#deleteModal" onclick="deleteElement(${PROJECT}, ${index})">
                        <i class="fas fa-trash"></i></a>
                </div>
                <p class="project-title">${project.name}</p>
                <p class="project-dates">${date}</p>
                <p class="project-description">${project.description}</p>
            </div>`
            });

            projects.innerHTML = "";
            projects.innerHTML = hprojects;
            enableEdition();
        } else {
            projects.innerHTML = "Tell us about your projects";
        }
    }


    if (skills != undefined || skillsCont.length != 0) {
        let skillsStr = "";
        skills.forEach((skill) => {
            skillsStr += `<option value="">${skill.name}</option>`
        })
        selectSkill.innerHTML = skillsStr;
    }
}



function enableEdition() {
    if (currentUserId == userProfileId) {
        let elements = document.getElementsByClassName("edition");

        for (let i = 0; i < elements.length; i++) {
            elements[i].classList.remove("d-none");
        }
    }
}
enableEdition()


let elementTypeDelete = SKILL;
let deleteIndex = 0;

function deleteElement(elementType, index) {
    elementTypeDelete = elementType;
    deleteIndex = index;
}

let confirmDelete = document.getElementById("confirmDelete")
confirmDelete.onclick = deleteConf

function deleteConf(e) {
    e.preventDefault();

    if (elementTypeDelete == SKILL) {
        userProfile.skills.splice(deleteIndex, 1);
        updateUser();
    } else if (elementTypeDelete == PROJECT) {
        userProfile.projects.splice(deleteIndex, 1);
        updateUser();
    }


    let closeButtons = document.getElementsByClassName("close")

    for (let button of closeButtons) {
        button.click()
    }
}

let edition = 0;
let editionIndex = -1;
let months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
];

function prepareEditProject(edit, index) {
    edition = edit;
    editionIndex = index;
    if (edit == 1) {
        let project = userProfile.projects[index];

        inpPorjectName.value = project.name;
        selectStartMonth.selectedIndex = months.indexOf(project.startMonth);
        inpStartYear.value = project.startYear;
        selectFinishMonth.selectedIndex = months.indexOf(project.finishMonth);
        inpFinishYear.value = project.finishYear;
        selectFinishMonth.disabled = project.currentWork;
        inpFinishYear.disabled = project.currentWork;
        currentWork.checked = project.currentWork;
        inpProjectDescription.value = project.description;
    }
}

function updateUser() {
    let url = `/api/user?id=${userProfileId}`
    let xhr = new XMLHttpRequest();
    xhr.open('PUT', url);
    xhr.setRequestHeader('x-auth-user', localStorage.token);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(userProfile));
    xhr.onload = function() {
        if (xhr.status == 401) {
            window.location.href = "index.html";
            return false;
        } else if (xhr.status != 200) {
            alert(xhr.response)
            return false;
        } else {
            getUser();
        }
    };
}

function saveSkillDB(skill) {
    let data = {
        name: skill
    }
    let url = `/api/skills`
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('x-auth-user', localStorage.token);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));
    xhr.onload = function() {
        if (xhr.status == 401) {
            window.location.href = "index.html";
            return false;
        } else if (xhr.status != 200) {
            alert(xhr.response)
            return false;
        } else {
            getUser();
        }
    };
}