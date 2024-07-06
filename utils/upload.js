import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
const mongoURI = 'mongodb+srv://user:mansi%402003@cluster1.z2k0zaz.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster1';
const storage = new GridFsStorage({
    url:mongoURI,
    options: { useNewUrlParser: true },
    file: (request, file) => {
        const match = ["image/png", "image/jpg","image/jpeg"];

        if(match.indexOf(file.mimeType) === -1)
            return`${Date.now()}-blog-${file.originalname}`;

        return {
            bucketName: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`
        }
    }
});

export default multer({storage});
