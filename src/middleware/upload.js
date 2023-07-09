
//configure multer
const multer  = require('multer')

//specify where multer to store uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './public/uploads');

    }, 
    filename: function(req, file, cb){
        cb(null, new Date(). toISOString() + file.originalname)

    },
})

const fileFilter = (req, file, cb) => {
//reject a file 
if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/ang') {
    cb(null, true);

} else {
cb(null,false);
}
} 

const upload = multer({
    storage:storage, 
    limits: {
        fileSize: 1024 * 1024 * 5 //only accepts files up to 5MB
    },
    fileFilter: fileFilter

});

module.exports = upload