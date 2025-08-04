import axios from "axios"

const api=axios.create({
    baseURL:"https://interface-monitoring-dashboard.onrender.com/api"
})

export default api