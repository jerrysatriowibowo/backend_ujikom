const db = require("../database/models");
const Template = db.Template;
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

exports.create = async (req, res) => {
    try {
        upload.single('image')(req, res, async function (err) {
            if (err) {
                console.error(err);
                res.send({
                    success: false,
                    message: 'Gagal mengupload gambar!',
                });
                return;
            }

            let data = {
                title: req.body.title,
                image: req.file.filename,
                des: req.body.des,
                id_user: req.user.id,
                id_categori: req.body.id_categori,
                source: req.body.source,
            }

            await Template.create(data);
            res.send({
                success: true,
                message: 'Berhasil menambahkan data!',
                data: data
            });
        });
    } catch (error) {
        console.info(error);
        res.send({
            success: false,
            message: error.stack,
        });
    }
};

exports.findAll = (req, res) => {
    Template.findAll({
        attributes: { exclude: ['password'] }
    }).then((templates) => {
        res.json({
            message: "Berhasil menampilkan template!",
            data: templates,
        });
    }).catch((err) => {
        console.info(err);
        res.status(500).json({
            message: err.message || "Gagal menampilkan template!.",
            data: null,
        });
    });
};

exports.update = async (req, res) => {
    try {
        upload.single('image')(req, res, async function (err) {
            if (err) {
                console.error(err);
                res.send({
                    success: false,
                    message: 'Gagal mengupload gambar!',
                });
                return;
            }
            let id_template = req.params.id;

            let data = {
                title: req.body.title,
                image: req.file.filename,
                des: req.body.des,
                id_categori: req.body.id_categori,
                source: req.body.source,
            }

            await Template.update(data, { where: { id: id_template } });
            res.send({
                success: true,
                message: 'Berhasil edit data Template!'
            });
        });
    } catch (error) {
        console.info(error);
        res.send({
            success: false,
            message: 'Terjadi kesalahan',
            error: error.stack
        });
    }
};

exports.delete = async (req, res) => {
    try {
        let id_template = req.params.id;
        let user_id = req.user.id;

        const template = await Template.findOne({ where: { id: id_template } });

        if (!template || template.id_user !== user_id) {
            res.status(403).json({
                success: false,
                message: 'Anda tidak memiliki izin untuk menghapus template ini.'
            });
            return;
        }

        await Template.destroy({ where: { id: id_template } });
        res.send({
            success: true,
            message: 'Berhasil hapus data template'
        });
    } catch (error) {
        console.info(error);
        res.send({
            success: false,
            message: 'Terjadi kesalahan',
            error: error.stack
        });
    }
};

exports.findOne = (req, res) => {
    Template.findByPk(req.params.id, {
        attributes: { exclude: ['password'] }
    }).then((template) => {
        if (template) {
            res.json({
                message: "Berhasil menemukan template!",
                data: template,
            });
        } else {
            res.status(404).json({
                message: "Template tidak ditemukan.",
                data: null,
            });
        }
    }).catch((err) => {
        console.info(err);
        res.status(500).json({
            message: err.message || "Gagal menampilkan template!",
            data: null,
        });
    });
};

exports.totalTemplate = async (req, res) => {
    try {
        const data = await Template.count();

        res.send({
            success: true,
            message: 'Berhasil mengambil total template!',
            data: { total_template: data }
        });
    } catch (error) {
        console.info(error);
        res.send({
            success: false,
            message: error.stack
        });
    }
};

exports.findByCategori = (req, res) => {
    Template.findAll({
        where: { id_categori: req.params.id },
        attributes: { exclude: ['password'] }
    }).then((templates) => {
        if (templates.length > 0) {
            res.json({
                message: "Berhasil menemukan template!",
                data: templates,
            });
        } else {
            res.status(404).json({
                message: "Template tidak ditemukan untuk kategori ini.",
                data: null,
            });
        }
    }).catch((err) => {
        console.error(err);
        res.status(500).json({
            message: err.message || "Gagal menampilkan template!",
            data: null,
        });
    });
};