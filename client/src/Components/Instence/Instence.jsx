import axios from "axios";

const imageUpload=axios.create({
    baseURL:"https://api.cloudinary.com/v1_1/dyxrwxk32"
})

export default imageUpload