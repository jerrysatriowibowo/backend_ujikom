const model = require("../database/models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

function login(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    model.User.findOne({
        where: {
            email: email,
        }
    }).then(function (data) {
        if (!data) {
            res.status(401).json({
                message: "Login Gagal: User tidak ada",
            });
            return;
        }

        let passwordHash = data.password;
        let isPasswordValid = bcrypt.compareSync(password, passwordHash);

        if (isPasswordValid) {
            res.json({
                message: "Berhasil Login",
                data,
                token: jwt.sign({ id: data.id, email: data.email }, process.env.JWT_SECRET_KEY, {
                    expiresIn: '1h'
                }),
            });
        } else {
            res.status(401).json({
                message: "Login Gagal: email atau password",
            });
        }
    }).catch(function (error) {
        res.status(500).json({
            message: "Login failed: An error occurred",
            error: error,
        });
    });
}

function register(req, res){
    const name = req.body.name;
    const image = req.body.image;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;

    model.User.findOne({
        where: {
            email: email,
        },
    }).then(function (result){
        if(result){
            res.json({
                message: "Email Sudah Telah Di Terdaftar, Gunakan email lain ",
            });
        } else {
            const hashedPassword = bcrypt.hashSync(password, 10);

            model.User.create({
                name: name,
                image: image,
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hashedPassword,
                role: role,
            }).then(function (newUser){
                res.json({
                    message: "Registrasi Berhasil",
                    name: newUser.name,
                    image: newUser.image,
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    email: newUser.email,
                    token: jwt.sign({id: newUser.id}, process.env.JWT_SECRET_KEY,{
                        expiresIn: '1h'
                    }),
                });
            }).catch(function (error){
                res.json({error: error}); 
            });
        }
    }).catch(function (error){
        res.json({error: error});  
    });
}

module.exports = {
    login,
    register
}