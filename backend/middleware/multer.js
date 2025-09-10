import multer from "multer";

const upload = multer({storage: multer.diskStorage({})}) //multer middleware for handling multipart/form-data, primarily used for uploading files.

export default upload;