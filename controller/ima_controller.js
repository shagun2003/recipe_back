import grid from 'gridfs-stream'
import mongoose from 'mongoose';
const url = 'https://recipe-back-six.vercel.app/';
let gfs,gridfsBucket;
const conn=mongoose.connection;
conn.once('open',()=>
{
    gridfsBucket=new mongoose.mongo.GridFSBucket(conn.db,{
        bucketName:'fs'
    })
    gfs=grid(conn.db,mongoose.mongo);
    gfs.collection('fs');
})
export const fileUpload = (request, response) => {
    if(!request.file) 
        return response.status(404).json({msg:"File not found"});
    
    const imageUrl = `${url}/file/${request.file.filename}`;

    response.status(200).json(imageUrl);    
}
export const getImage=async(req,res)=>
    {
         try{
            const file=    await gfs.files.findOne({filename:req.params.filename});
           const read= gridfsBucket.openDownloadStream(file._id);
           read.pipe(res);

         }
         catch(error)
         {
             return res.status(500).json({msg:error.message});
         }
    }
