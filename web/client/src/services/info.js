import axios from 'axios'
const baseUrl = '/api/info'

const getMaster = async () => {
    const res = await axios.get(`${baseUrl}/1`, { headers: { 'Cache-Control': 'no-cache' } })
    return res.data
}

export default {
    getMaster
}