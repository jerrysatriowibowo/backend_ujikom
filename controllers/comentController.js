const db = require("../database/models");
const Coment = db.Coment;

exports.create = (req, res) => {
    const coments = {
        name: req.body.name,
        userId: req.user.id,
    };

    Coment.create(coments).then((data) => {
        res.json({
            message: "Berhasil tambah coments!",
            data: data,
        });
    }).catch((err) => {
        res.status(500).json({
            message: err.message || "Gagal menambah coments!",
            data: null,
        });
    });
};

exports.findAll = (req, res) => {
    Coment.findAll({
        attributes: { exclude: ['password'] }
    }).then((coments) => {
        res.json({
            message: "Berhasil menampilkan coment!",
            data: coments,
        });
    }).catch((err) => {
        res.status(500).json({
            message: err.message || "Gagal menampilkan coment!.",
            data: null,
        });
    });
};

exports.update = (req, res) => {
    const id = req.params.id;

    if (req.user && req.user.id) {

        const comentData = {
            name: req.body.name,
        };

        Coment.update(comentData, {
            where: { id, userId: req.user.id },
        }).then((num) => {
            if (num == 1) {
                res.json({
                    message: "Berhasil update coment!",
                    data: comentData,
                });
            } else {
                res.json({
                    message: `Tidak dapat update coment id=${id}`,
                    data: comentData,
                });
            }
        }).catch((err) => {
            res.status(500).json({
                message: err.message || "Gagal update coment!",
                data: null,
            });
        });
    } else {
        res.status(401).json({
            message: "Unauthorized. Silahkan login terlebih dahulu.",
        });
    }
};

exports.delete = (req, res) => {
    const id = req.params.id;

    if (req.user && req.user.id) {

        Coment.destroy({
            where: { id, userId: req.user.id },
        }).then((num) => {
            if (num == 1) {
                res.json({
                    message: "Berhasil hapus coment!",
                    data: req.body,
                });
            } else {
                res.json({
                    message: `Tidak dapat hapus coment id=${id}`,
                    data: req.body,
                });
            }
        }).catch((err) => {
            res.status(500).json({
                message: err.message || "Gagal hapus coment!",
                data: null,
            });
        });
    } else {
        res.status(401).json({
            message: "Unauthorized. Silahkan login terlebih dahulu.",
        });
    }
};

exports.findOne = (req, res) => {
    Coment.findByPk(req.params.id, {
        attributes: { exclude: ['password'] }
    }).then((coment) => {
        if (coment) {
            res.json({
                message: "Berhasil menemukan coment!",
                data: coment,
            });
        } else {
            res.status(404).json({
                message: "Coment tidak ditemukan.",
                data: null,
            });
        }
    }).catch((err) => {
        res.status(500).json({
            message: err.message || "Gagal menampilkan coment!",
            data: null,
        });
    });
};
