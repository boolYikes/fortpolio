import axios from 'axios'
const baseUrl = 'http://localhost:5000/api/stack'

const getMaster = async () => {
    const res = await axios.get(`${baseUrl}/1`, { headers: { 'Cache-Control': 'no-cache' } })
    return res.data
}

export default {
    getMaster
}