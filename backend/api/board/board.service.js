
const dbService = require('../../services/db.service')
// const logger = require('../../services/logger.service')
// const reviewService = require('../review/review.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    getByBoardName,
    remove,
    update,
    add,
    getByUserId,
}

async function query(filterBy = {}) {
    try {
        const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('board')
        const boards = await collection.find(criteria).toArray();
        const boardsAsObject = boards.reduce((result, current) => {
            result[current._id] = current;
            return result;
        }, {});

        return boardsAsObject;
    } catch (err) {
        console.log('err', err);
        logger.error('cannot find boards', err)
        throw err
    }
}

async function getById(boardId) {
    try {
        const collection = await dbService.getCollection('board')
        const board = await collection.findOne({ '_id': ObjectId(boardId) })
        return board
    } catch (err) {
        logger.error(`while finding board ${boardId}`, err)
        throw err
    }
}
async function getByUserId(userId) {
    try {
        const collection = await dbService.getCollection('board')
        const board = await collection.findOne({ 'creator._id': ObjectId(userId) })
        return board
    } catch (err) {
        logger.error(`while finding board ${userId}`, err)
        throw err
    }
}
async function getByBoardName(boardName) {
    try {
        const collection = await dbService.getCollection('board')
        const board = await collection.findOne({ boardName })
        return board
    } catch (err) {
        logger.error(`while finding board ${boardName}`, err)
        throw err
    }
}

async function remove(boardId) {
    try {
        const collection = await dbService.getCollection('board')
        await collection.deleteOne({ '_id': ObjectId(boardId) })
    } catch (err) {
        logger.error(`cannot remove board ${boardId}`, err)
        throw err
    }
}

async function update(board) {
    try {
        // peek only updatable fields!
        const boardToSave = {
            _id: ObjectId(board._id),
            title: board.title,
            backgroundUrl: board.backgroundUrl,
            lists: board.lists,
            // title: board.title,
            // cards: board.cards
        }
        const collection = await dbService.getCollection('board')
        await collection.updateOne({ '_id': boardToSave._id }, { $set: boardToSave })
        return boardToSave;
    } catch (err) {
        logger.error(`cannot update board ${board._id}`, err)
        throw err
    }
}

async function add(board) {
    const boardToSave = {
        title: board.title,
        backgroundUrl: null,
        lists: {},
    }
    const collection = await dbService.getCollection('board')
    await collection.insertOne(boardToSave)
    return boardToSave
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
