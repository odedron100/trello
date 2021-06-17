const listService = require('./list.service')
const logger = require('../../services/logger.service')

async function getList(req, res) {
    try {
        const list = await listService.getById(req.params.id)
        res.send(list)
    } catch (err) {
        logger.error('Failed to get list', err)
        res.status(500).send({ err: 'Failed to get list' })
    }
}
async function getListByUser(req, res) {
    try {
        const list = await listService.getByUserId(req.params.id)
        res.send(list)
    } catch (err) {
        logger.error('Failed to get list', err)
        res.status(500).send({ err: 'Failed to get list' })
    }
}

async function getLists(req, res) {
    try {
        // const filterBy = req.query
        // let lists;
        // if (req.session.user) {
        //     lists = await listService.query(filterBy, req.session.user._id);
        // } else {
        //     lists = await listService.query(filterBy);
        // }
        const lists = await listService.query()
        res.send(lists)
    } catch (err) {
        console.log(err);
        logger.error('Failed to get lists', err)
        res.status(500).send({ err: 'Failed to get lists' })
    }
}

async function deleteList(req, res) {
    try {
        await listService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete list', err)
        res.status(500).send({ err: 'Failed to delete list' })
    }
}

async function addList(req, res) {
    try {
        const list = req.body;
        const savedList = await listService.add(list)
        res.send(savedList)
    } catch (err) {
        logger.error('Failed to add list', err)
        res.status(500).send({ err: 'Failed to add list' })
    }
}

async function updateList(req, res) {
    try {
        const list = req.body
        const savedList = await listService.update(list)
        res.send(savedList)
    } catch (err) {
        logger.error('Failed to update list', err)
        res.status(500).send({ err: 'Failed to update list' })
    }
}



module.exports = {
    getList,
    getLists,
    addList,
    deleteList,
    updateList,
    getListByUser,
}
