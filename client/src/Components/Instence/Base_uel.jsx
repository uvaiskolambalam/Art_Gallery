import axios from "axios";

const ServerUrl=axios.create({
    baseURL:"http://localhost:5000"
})

export default ServerUrl