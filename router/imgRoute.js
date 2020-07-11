const express = require("express");
const mongoose = require('mongoose');
const UserImage = mongoose.model("Multer");
const router = express.Router();
const {upload , uploadMultiple} = require('../diskStorage')


// uploading single picture
router.post("/upload", (req, res) => {
    upload(req, res, function (err) {
        if(err) return res.status(400).json({error:err.message})
            if (!req.file) {
                res.json({msg: "error : no file selected"})
            } else {
                var imagefile=req.file.filename;
                var imageDetails=new UserImage({
                    imgname:imagefile
                });
                imageDetails.save((err,data)=>{
                        if(err) throw err;
                        res.json({
                            msg: "File Uploaded Successfully...",
                            filepath: `uploads/${req.file.filename}`
                        });

                });
                
            }
        });
});



// uploading multiple images together
//.arrays(fieldname[, max_count]) -upload.array("myImage",4)
//  // any() - upload.any("myImage") 
router.post("/upload/multiple", (req, res) => {
    uploadMultiple(req, res, function (err) {
        if(err) return res.status(400).json({error:err.message})

            if (!req.files) {
                res.json({error : "no file selected"})
            } else {
               console.log(req.files)
                // res.send([req.files[i].filename])
                var imagefile =[]
                for(var i=0 ; i<req.files.length ; i++){
                    var val = req.files[i].filename
                    imagefile.push(val)   
                // }
                // res.send(imagefile)
                var imageDetails=new UserImage({
                    imgname:imagefile[i]
                }); 
            
            imageDetails.save((err,data)=>{
                if(err) throw err;
        });
        }
        res.json({
            msg: "Files Uploaded Successfully..."
        });
}
    });
});



module.exports=router;

