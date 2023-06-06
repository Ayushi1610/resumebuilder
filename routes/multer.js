var multer=require('multer')
var serverpath = multer.diskStorage(
    {
        destination:(req,file,path)=>{
            path(null,'public/images')
        },
        filename:(req,file,path)=>{
            //path(null,req.body.fname+file.originalname.substring(file.originalname.indexOf('.')))
            path(null,file.originalname)
        }
    }
)
var upload=multer({storage:serverpath})
module.exports=upload