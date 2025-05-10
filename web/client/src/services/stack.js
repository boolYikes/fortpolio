import axios from 'axios'
// Must be a relative path!!
const baseUrl = '/api/stack'

const getMaster = async () => {
    const res = await axios.get(`${baseUrl}/1`, { headers: { 'Cache-Control': 'no-cache' } })
    return res.data
}

export default {
    getMaster
}