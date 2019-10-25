var inp = document.getElementById("uploadPhoto");
var inpUserPhoto = document.getElementById("inpUserPhoto")

inp.onclick = () => {
    inpUserPhoto.click()
}

inpUserPhoto.onchange = function(event) {
    var file = inpUserPhoto.files[0];
}

var b = document.getElementById("btnSaveBasicInfo")
b.onclick = () => { infoToSave(1) }
var a = document.getElementById("btnSaveAboutMe")
a.onclick = () => { infoToSave(2) }
var e = document.getElementById("btnSaveEducation")
e.onclick = () => { infoToSave(3) }
var s = document.getElementById("btnSaveSkill")
s.onclick = () => { infoToSave(4) }
var p = document.getElementById("btnSaveProject")
p.onclick = () => { infoToSave(5) }


var infoType = 0

function infoToSave(index) {
    infoType = index
}

document.getElementById("btnConfirm").onclick = (e) => {
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

    e.preventDefault()
    let closeButtons = document.getElementsByClassName("close")

    for (let button of closeButtons) {
        button.click()
    }

}




function saveBasicInfo() {
    var inpFirstName = document.getElementById("inpFirstName")
    var inpLastName = document.getElementById("inpLastName")
    var inpEmail = document.getElementById("inpEmail")
    var inpBirthday = document.getElementById("inpBirthday")
    var inpCity = document.getElementById("inpCity")

    var name = document.getElementById("userName")
    var email = document.getElementById("userEmail")
    var birthday = document.getElementById("userBirthday")
    var city = document.getElementById("userCity")

    name.innerHTML = inpFirstName.value + " " + inpLastName.value
    email.innerHTML = inpEmail.value
    birthday.innerHTML = inpBirthday.value
    city.innerHTML = inpCity.value

    return false
}

function saveAboutMe() {
    var inpAboutMe = document.getElementById("inpAboutMe")

    var aboutMe = document.getElementById("userAbout")

    aboutMe.innerHTML = inpAboutMe.value
}

function saveEducation() {

}

function saveSkill() {

}

function saveProject() {

}

window.onload = () => {
    console.log("refresh");
}

function checkNewSkill() {
    document.getElementById("selectSkill").disabled = document.getElementById("inpCheckNewSkill").checked
    document.getElementById("inpNewSkill").disabled = !document.getElementById("inpCheckNewSkill").checked

}

function checkCurrentlyWorking() {
    document.getElementById("inpfinishDateMonth").disabled = document.getElementById("inpCheckCurrent").checked
    document.getElementById("inpfinishDateYear").disabled = document.getElementById("inpCheckCurrent").checked
}

function hey() {
    alert("asd")
    var m = new Modal('#confirmModal', {
        backdrop: true
    });
    m.show();
}