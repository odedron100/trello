// import { utilService } from "./util.service";
import { httpService } from './http.service.js';
import { utilService } from '../services/util.service';
// const backgroundImgs = require('../../data/boardBackground.json');
// import { storageService } from "./async-storage.service.js";

const KEY = 'boardDB';

const BOARD_URL = 'board/';

// const gboard = []

export const boardService = {
    query,
    getById,
    remove,
    save,
    getEmptyList,
    // getByUserId,
}

async function query(filterBy) {
    try {
        const boards = await httpService.get(BOARD_URL, filterBy)
        localStorage.setItem(KEY, JSON.stringify(boards))
        return boards
    } catch (err) {
        console.log('Got err ', err)
    }
    // let boards = utilService.loadFromStorage(KEY)
    // if (!boards || !boards.length) {
    //     boards = gBoard; // gBoards -> some data from json .
    //     utilService.saveToStorage(KEY, boards)
    // }
    // return storageService.query(KEY);
}

async function getById(id) {
    try {
        const board = await httpService.get(BOARD_URL + id)
        return board
    } catch (err) {
        console.log('Got err ', err)
    }
    // return storageService.get(KEY, id);
}

// function getByUserId(id) {
//   try {
//     const gig = await httpService.get(`${GIG_URL + id}/profile`)
//     return gig
//   } catch (err) {
//     console.log('Got err ', err)
//   }
// }

async function remove(id) {
    try {
        const board = await httpService.delete(BOARD_URL + id)
        return board
    }
    catch (err) {
        console.log('Got err ', err)
    }
    // return storageService.remove(KEY, id);

}

async function save(board) {
    try {
        if (board._id) {
            const updatedBoard = await httpService.put(BOARD_URL + board._id, board)
            return updatedBoard
        } else {
            const savedBoard = await httpService.post(BOARD_URL, board)
            return savedBoard;
        }
    } catch (err) {
        console.log(err)
    }
    // return board._id ? storageService.put(KEY, board) : storageService.post(KEY, board);
}

function getEmptyList() {
    return {
        id: utilService.makeId(),
        title: '',
        cards: {}
        // tags: [],
        // imgUrls: [''],
        // price: 0,
        // deliveryTime: null,
        // rating: 4,
        // creator: {
        //   fullname: '',
        //   imgUrl: '',
        //   level: 3,
        //   location: "Israel",
        //   memberSince: null,
        //   avgResponseTime: `${utilService.getRandomInt(1, 6)} Hours`,
        //   lastDelivery: `About ${utilService.getRandomInt(1, 6)} Hours`,
        // },
        // reviews: []
    }
}



// Create Test boards Data:
// function _createToys() {
//   var toys = JSON.parse(localStorage.getItem(KEY))
//   if (!toys || !toys.length) {
//     const TOY_URL = 'http://www.filltext.com/?rows=20&_id=%7bindex%7d&name=%7blorem|2%7d&price=%7bnumber|100%7d&type=%5b%22Educational%22,%22Funny%22,%22Adult%22%5d&createdAt=%7bdate|1970,2000%7d&inStock=%7bbool%7d&pretty=true'
//     return axios.get(TOY_URL)
//       .then(res => {
//         toys = res.data
//         localStorage.setItem(KEY, JSON.stringify(toys))
//       })
//   }
//   return toys;
// }
