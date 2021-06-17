
const dbService = require('../../services/db.service')
// const logger = require('../../services/logger.service')
// const reviewService = require('../review/review.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    getByListName,
    remove,
    update,
    add,
    getByUserId,
}

async function query(filterBy = {}) {
    try {
        const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('list')
        const lists = await collection.find(criteria).toArray();
        const listsAsObject = lists.reduce((result, current) => {
            result[current._id] = current;
            return result;
        }, {});

        return listsAsObject;
    } catch (err) {
        console.log('err', err);
        logger.error('cannot find lists', err)
        throw err
    }
}

async function getById(listId) {
    try {
        const collection = await dbService.getCollection('list')
        const list = await collection.findOne({ '_id': ObjectId(listId) })
        return list
    } catch (err) {
        logger.error(`while finding list ${listId}`, err)
        throw err
    }
}
async function getByUserId(userId) {
    try {
        const collection = await dbService.getCollection('list')
        const list = await collection.findOne({ 'creator._id': ObjectId(userId) })
        return list
    } catch (err) {
        logger.error(`while finding list ${userId}`, err)
        throw err
    }
}
async function getByListName(listName) {
    try {
        const collection = await dbService.getCollection('list')
        const list = await collection.findOne({ listName })
        return list
    } catch (err) {
        logger.error(`while finding list ${listName}`, err)
        throw err
    }
}

async function remove(listId) {
    try {
        const collection = await dbService.getCollection('list')
        await collection.deleteOne({ '_id': ObjectId(listId) })
    } catch (err) {
        logger.error(`cannot remove list ${listId}`, err)
        throw err
    }
}

async function update(list) {
    try {
        // peek only updatable fields!
        const listToSave = {
            _id: ObjectId(list._id),
            title: list.title,
            cards: list.cards
        }
        const collection = await dbService.getCollection('list')
        await collection.updateOne({ '_id': listToSave._id }, { $set: listToSave })
        return listToSave;
    } catch (err) {
        logger.error(`cannot update list ${list._id}`, err)
        throw err
    }
}

async function add(list) {
    const listToSave = {
        title: list.title,
        cards: list.cards || {}
    }
    const collection = await dbService.getCollection('list')
    await collection.insertOne(listToSave)
    return listToSave
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.name) {
        var nameCriteria = filterBy.name.toLowerCase()
        criteria.tags = nameCriteria
    }
    if (filterBy.price) {
        const price = JSON.parse(filterBy.price)
        criteria.price = {};
        if (price.minPrice) {
            var minPriceCriteria = price.minPrice;
            criteria.price = { $gte: minPriceCriteria }
        }
        if (price.maxPrice) {
            var maxPriceCriteria = price.maxPrice;
            criteria.price = { ...criteria.price, $lte: maxPriceCriteria }
        }
    }
    if (filterBy.rating) {
        var ratingCriteria = +filterBy.rating
        // criteria.rating = { $eq: ratingCriteria }
    }
    if (filterBy.level) {
        var levelCriteria = +filterBy.level
        // criteria["creator.level"] = { $eq: levelCriteria }
    }
    criteria.$or = [
        {
            tags: nameCriteria
        },
        {
            rating: ratingCriteria
        },
        {
            level: levelCriteria
        }
    ]
    // console.log('criteria', criteria);
    return criteria
}
