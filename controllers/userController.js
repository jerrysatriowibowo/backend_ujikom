const db = require("../database/models");
const User = db.User;
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        const uniqueFilename = `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`;
        cb(null, uniqueFilename);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10000000
    },
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    }
});

exports.create = (req, res) => {
    const user = {
        name: req.body.name,
        image: req.body.image,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
        role: req.body.role ? req.body.role : false,
    };

    User.create(user).then((data) => {
        res.json({
            message: "Berhasil tambah user!",
            data: data,
        });
    }).catch((err) => {
        res.status(500).json({
            message: err.message || "Gagal menambah user!",
            data: null,
        });
    });
};

exports.findAll = (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    }).then((users) => {
        res.json({
            message: "Berhasil menampilkan user!",
            data: users,
        });
    }).catch((err) => {
        res.status(500).json({
            message: err.message || "Gagal menampilkan user!.",
            data: null,
        });
    });
};

exports.update = (req, res) => {
    const id = req.params.id;

    if (req.body.password) {
        req.body.password = bcrypt.hashSync(req.body.password);
    }

    const userData = {
        name: req.body.name,
        image: req.body.image,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role ? req.body.role : false,
    };

    User.update(userData, {
        where: { id },
    }).then((num) => {
        if (num == 1) {
            res.json({
                message: "Berhasil update user!",
                data: userData,
            });
        } else {
            res.json({
                message: `Tidak dapat update user id=${id}`,
                data: userData,
            });
        }
    }).catch((err) => {
        res.status(500).json({
            message: err.message || "Gagal update user!",
            data: null,
        });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    User.destroy({
        where: { id },
    }).then((num) => {
        if (num == 1) {
            res.json({
                message: "Berhasil hapus user!",
                data: req.body,
            });
        } else {
            res.json({
                message: `Tidak dapat hapus user id=${id}`,
                data: req.body,
            });
        }
    }).catch((err) => {
        res.status(500).json({
            message: err.message || "Gagal hapus user!",
            data: null,
        });
    });
};

exports.findOne = (req, res) => {
    User.findByPk(req.params.id, {
        attributes: { exclude: ['password'] }
    }).then((user) => {
        if (user) {
            res.json({
                message: "Berhasil menemukan user!",
                data: user,
            });
        } else {
            res.status(404).json({
                message: "User tidak ditemukan.",
                data: null,
            });
        }
    }).catch((err) => {
        res.status(500).json({
            message: err.message || "Gagal menampilkan user!",
            data: null,
        });
    });
};

exports.editUser = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const emailSession = decodedToken.email;

        let id_user = req.params.id;

        let updateFields = {};
        if (req.body.name && req.body.name.trim() !== '') {
            updateFields.name = req.body.name;
        }

        if (req.body.firstName && req.body.firstName.trim() !== '') {
            updateFields.firstName = req.body.firstName;
        }

        if (req.body.lastName && req.body.lastName.trim() !== '') {
            updateFields.lastName = req.body.lastName;
        }

        if (req.body.email && req.body.email.trim() !== '' && emailSession.toUpperCase() !== req.body.email.toUpperCase()) {
            const existingUser = await User.findOne({ where: { email: req.body.email } });
            if (existingUser) {
                return res.send({
                    success: false,
                    message: 'Email sudah terdaftar, silahkan menggunakan email lain!',
                });
            }
            updateFields.email = req.body.email;
        }

        console.log('updateFields:', updateFields);

        if (Object.keys(updateFields).length > 0) {
            const [updated] = await User.update(updateFields, {
                where: { id: id_user }
            });

            if (updated) {
                res.send({
                    success: true,
                    message: 'Berhasil mengedit data!'
                });
            } else {
                res.send({
                    success: false,
                    message: 'Gagal mengedit data!',
                });
            }
        } else {
            res.send({
                success: false,
                message: 'Tidak ada data yang diubah.',
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Token tidak valid atau tidak ditemukan.',
        });
    }
};

exports.editPassword = async (req, res) => {
    try {
        let id_user = req.params.id;
        let newPassword = bcrypt.hashSync(req.body.password, 10);

        const user = await User.findByPk(id_user);
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found!',
            });
        }

        await user.update({ password: newPassword });

        res.send({
            success: true,
            message: 'Password updated successfully!',
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'An error occurred while updating the password.',
        });
    }
};
