import { utilService } from './util.service.js';
import {httpService} from './http.service.js'
// import axios from 'axios';

let gFilterBy = { name: '', inStock: 'all', types: [], sortBy: 'name', pageDiff: 0 };
// const KEY = 'toysDB';
// const TOY_URL = process.env.NODE_ENV !== 'development' 
//             ? '/api/toy/' 
//             : '//localhost:3030/api/toy/';

export const toyService = {
    query,
    getById,
    remove,
    save,
    getEmptyToy,
    setFilter,
};

// _createToys();


function setFilter(filterBy) {
    gFilterBy = filterBy;
}

function query() {
    const filterStr = utilService.formatFilter(gFilterBy)
    return httpService.get(`toy/?${filterStr}`)
    // return axios
    //     .get(TOY_URL, { params: gFilterBy })
    //     .then(({ data }) => data)
    //     .catch((err) => err);
}

function getById(id) {
    return httpService.get(`toy/${id}`)

    // return axios
    //     .get(TOY_URL + id)
    //     .then(({ data }) => data)
    //     .then((toy) => toy)
    //     .catch((err) => err);
}

function remove(id) {
    return httpService.delete(`toy/${id}`)

    // return axios
    //     .delete(TOY_URL + id)
    //     .then(() => Promise.resolve('deleted'))
    //     .catch((err) => err);
}

function save(toy) {
    // if (toy._id)
    //     return axios
    //         .put(TOY_URL + toy._id, toy)
    //         .then(({data}) => {
    //             return data})
    //         .catch((err) => err);
    // return axios
    //     .post(TOY_URL, toy)
    //     .then(({data}) => data)
    //     .catch((err) => err);
        if (toy._id) return httpService.put(`toy/${toy._id}`, toy)
    return httpService.post('toy/', toy)
}

function getEmptyToy(name = '', price = 100, type, createdAt) {
    return {
        _id: '',
        name,
        price,
        type,
        createdAt,
        inStock: null,
        reviews:null
    };
}



// // Create Test Data:
// function _createToys() {
//     var toys = JSON.parse(localStorage.getItem(KEY));
//     if (!toys || !toys.length) {
//         toys = [
//             _createToy('Teddy bear', 'stuffed'),
//             _createToy('Lego', 'creative'),
//             _createToy('Talking Doll', 'funny'),
//             _createToy('Clown', 'funny'),
//         ];
//         localStorage.setItem(KEY, JSON.stringify(toys));
//     }
//     return toys;
// }

// function _createToy(name, type) {
//     const toy = getEmptyToy(name, utilService.getRandomInt(80, 300), type, utilService.getRandomInt(1583212296004, 1615214496004));
//     toy._id = utilService.makeId();
//     toy.inStock = Math.random() > 0.5;
//     return toy;
// }
