// import { utilService } from "./util.service";
import { httpService } from './http.service.js';
// import { storageService } from "./async-storage.service.js";

const KEY = 'listDB';

const LIST_URL = 'list/';

// const gList = []

export const listService = {
    query,
    getById,
    remove,
    save,
    getEmptyList,
    // getByUserId,
}

async function query(filterBy) {
    try {
        const lists = await httpService.get(LIST_URL, filterBy)
        localStorage.setItem(KEY, JSON.stringify(lists))
        return lists
    } catch (err) {
        console.log('Got err ', err)
    }
    // let lists = utilService.loadFromStorage(KEY)
    // if (!lists || !lists.length) {
    //     lists = gList; // gLists -> some data from json .
    //     utilService.saveToStorage(KEY, lists)
    // }
    // return storageService.query(KEY);
}

async function getById(id) {
    try {
        const list = await httpService.get(LIST_URL + id)
        return list
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
        const list = await httpService.delete(LIST_URL + id)
        return list
    }
    catch (err) {
        console.log('Got err ', err)
    }
    // return storageService.remove(KEY, id);

}

async function save(list) {
    try {
        if (list._id) {
            const updatedList = await httpService.put(LIST_URL + list._id, list)
            return updatedList
        } else {
            const savedList = await httpService.post(LIST_URL, list)
            return savedList;
        }
    } catch (err) {
        console.log(err)
    }
    // return list._id ? storageService.put(KEY, list) : storageService.post(KEY, list);
}

function getEmptyList() {
    return {
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



// Create Test lists Data:
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
