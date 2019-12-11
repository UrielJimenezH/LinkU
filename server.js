"use strict"
const express = require("express");
const randomize = require('randomatic');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();
const port = process.env.PORT || 3000


let MONGODB_URI = "mongodb+srv://uriel1:ejo6JmQLx224kBj3@cluster0-cdvck.mongodb.net/LinkU"
let mongoDB = 'mongodb://localhost:27017/LinkU';
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
let db = mongoose.connection;

let projectSchema = mongoose.Schema({
    name: String,
    startMonth: String,
    startYear: Number,
    finishMonth: String,
    finishYear: Number,
    currentWork: Boolean,
    description: String
})
let userSchema = mongoose.Schema({
    name: String,
    lastname: String,
    email: String,
    birthday: String,
    password: String,
    token: String,
    city: String,
    about: String,
    school: String,
    career: String,
    graduationDate: String,
    skills: [String],
    projects: [projectSchema]
})
let User = mongoose.model('User', userSchema, 'User');

let skillSchema = mongoose.Schema({
    name: String
})
let Skill = mongoose.model('Skill', skillSchema, 'Skill');



function authenticate(req, res, next) {
    let token = req.headers['x-auth-user'];
    if (token == undefined) {
        res.status(401).send("Unauthenticated user");
        return;
    }

    jwt.verify(token, 'auth1234', (err, decoded) => {
        if (err) {
            if (err.name == "TokenExpiredError") {
                res.status(401).send("Unauthenticated user");
            } else {
                console.log(err);
            }
        } else {
            let id = decoded.id;
            req.body.id = id;
            next();
        }
    });
}


app.use(express.static(__dirname + "/public"));

app.use(express.json());
app.get('/', (req, res) => {
    res.render('index.html');
});

app.listen(port);

app.route('/api/users')
    .get(authenticate, (req, res) => {

    });

app.route('/api/login')
    .post((req, resp) => {
        let body = req.body;

        let email = body.email;
        let password = body.password;

        let somethingMissing = [];
        if (email == undefined) somethingMissing.push("email");
        if (password == undefined) somethingMissing.push("password");

        let missingResponse = somethingMissing.join(', ');
        if (missingResponse != "") {
            missingResponse = "Missing " + missingResponse;
            res.status(400).send(missingResponse);
        } else {
            User.find({ email: email }, (err, doc) => {
                if (doc.length != 0) {
                    let user = doc[0];
                    bcrypt.compare(password, user.password, (err, res) => {
                        if (res) {
                            let token = jwt.sign({
                                    id: `${user._id}`
                                },
                                'auth1234', { expiresIn: 60 * 5 });
                            resp.status(200).send(`{"token": "${token}", "id": "${user._id}"}`);
                        } else {
                            resp.status(403).send("wrong username/password");
                        }

                    });
                } else {
                    resp.status(403).send("wrong username/password");
                }
            })
        }
    });

app.route('/api/register')
    .post((req, res) => {
        let body = req.body;
        let user = {
            name: body.name,
            lastname: body.lastname,
            email: body.email,
            password: body.password
        }

        let somethingMissing = [];
        if (user.name == undefined) somethingMissing.push("name");
        if (user.lastname == undefined) somethingMissing.push("lastname");
        if (user.email == undefined) somethingMissing.push("email");
        if (user.password == undefined) somethingMissing.push("password");

        let missingResponse = somethingMissing.join(', ');
        if (missingResponse != "") {
            missingResponse = "Missing " + missingResponse;
            res.status(400).send(missingResponse);
        } else {
            let userToSave = User(user);

            bcrypt.hash(user.password, 8, (err, hash) => {
                userToSave.password = hash;
                userToSave.save()
                    .then((doc) => {
                        let token = jwt.sign({
                                id: `${user._id}`
                            },
                            'auth1234', { expiresIn: 60 * 5 });
                        res.status(200).send(`{"token": "${token}", "id": "${doc._id}"}`);
                    });
            });
        }
    });

app.route('/api/allusers')
    .get(authenticate, (req, res) => {
        User.find({}, (err, doc) => {
            if (doc.length != 0) {
                res.status(200).send(doc);
            } else {
                res.status(404).send();
            }
        });
    });

app.route('/api/user')
    .get(authenticate, (req, res) => {
        let id = req.query.id;
        User.findById(id, (err, doc) => {
            if (doc.length != 0) {
                res.status(200).send(doc);
            } else {
                res.status(404).send();
            }
        });
    })
    .put(authenticate, (req, res) => {
        let body = req.body;
        let id = req.query.id;

        let user = body;
        User.findByIdAndUpdate(id, { $set: user }, { new: true })
            .then((doc) => {
                res.status(200).send(doc);
            })
            .catch((error) => {
                res.status(404).send("Something went wrong")
            });
    });

//app.use('/api/skills/', authenticate);

app.route('/api/skills')
    .get(authenticate, (req, res) => {
        Skill.find((err, doc) => {
            if (doc.length != 0) {
                res.status(200).send(doc)
            } else {
                res.status(404).send("Something went wrong")
            }
        });
    })
    .post(authenticate, (req, res) => {
        let skillToSave = Skill(req.body);
        skillToSave.save()
            .then((doc) => {
                res.status(200).send();
            });
    });