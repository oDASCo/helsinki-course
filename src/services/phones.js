import axios from 'axios'
const baseUrl = 'http://localhost:3001/phones';

const getAll = () => {
    return axios.get(baseUrl)
};

const create = newObject => {
    return axios.post(baseUrl, newObject)
};

const deletePerson = id => {
    console.log(id);
    return axios.delete(`${baseUrl}/${id}`)
};

const update = (newPerson, id) => {
    return axios.put(`${baseUrl}/${id}`, newPerson)
};

export default {
    getAll,
    create,
    deletePerson,
    update
}
