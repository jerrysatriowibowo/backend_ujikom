const express = require('express');
const auth = require('./authRoute');
const user = require('./userRoute');
const coment = require('./comentRoute');
const categori = require('./categoriRoute');
const template = require('./templateRoute');
const router = express.Router()
const multer = require('multer');
const path = require('path');
const db = require("../database/models");
const User = db.User;

router.get(`/api/v1/`, (_req, res) => {
    res.json({
        "message": "Backend Project Podium"
    })
})

router.use(auth)
router.use(user)
router.use(coment)
router.use(categori)
router.use(template)

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

router.post('/image/:id', upload.single('image'), async (req, res) => {
    try {
        let id_user = req.params.id;

        const user = await User.findByPk(id_user);
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found!',
            });
        }

        if (req.file) {
            let newImage = req.file.filename;
            await user.update({ image: newImage });
        } else if (req.body.image) {
            await user.update({ image: req.body.image });
        } else {
            return res.status(400).json({
                success: false,
                message: 'No file or image filename provided.',
            });
        }

        res.send({
            success: true,
            message: 'Image updated successfully!',
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'An error occurred while updating the image.',
        });
    }
});

module.exports = router;