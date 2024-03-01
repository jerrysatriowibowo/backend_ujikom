const db = require("../database/models");
const Categori = db.Categori;
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
        if (req.headers.authorization) {
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
                };

                await Categori.create(data);
                res.send({
                    success: true,
                    message: 'Berhasil menambahkan data!',
                    data: data
                });
            });
        } else {
            res.send({
                success: false,
                message: 'Login terlebih dahulu!'
            });
        }
    } catch (error) {
        console.info(error);
        res.send({
            success: false,
            message: error.stack,
        });
    }
};

exports.findAll = (req, res) => {
    Categori.findAll({
        attributes: { exclude: ['password'] }
    }).then((categories) => {
        res.json({
            success: true,
            message: "Berhasil menampilkan kategori!",
            data: categories,
        });
    }).catch((err) => {
        console.info(err);
        res.status(500).json({
            success: false,
            message: err.message || "Gagal menampilkan kategori!.",
            data: null,
        });
    });
};

exports.update = async (req, res) => {
    try {
        const id_categori = req.params.id;

        const categoriData = {
            title: req.body.title,
            image: req.file.filename,
        };

        await Categori.update(categoriData, {
            where: { id: id_categori },
        });

        res.json({
            success: true,
            message: 'Berhasil update kategori!',
            data: categoriData,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Gagal update kategori!",
            data: null,
        });
    }
};

exports.delete = async (req, res) => {
    try {
        const id_categori = req.params.id;

        await Categori.destroy({
            where: { id: id_categori },
        });

        res.json({
            success: true,
            message: 'Berhasil hapus kategori!',
            data: req.body,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Gagal hapus kategori!",
            data: null,
        });
    }
};

exports.findOne = (req, res) => {
    Categori.findByPk(req.params.id, {
        attributes: { exclude: ['password'] }
    }).then((categori) => {
        if (categori) {
            res.json({
                success: true,
                message: "Berhasil menemukan kategori!",
                data: categori,
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Kategori tidak ditemukan.",
                data: null,
            });
        }
    }).catch((err) => {
        res.status(500).json({
            success: false,
            message: err.message || "Gagal menampilkan kategori!",
            data: null,
        });
    });
};