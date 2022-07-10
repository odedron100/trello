const boardService = require('./board.service')
const logger = require('../../services/logger.service')

async function getBoard(req, res) {
    try {
        const board = await boardService.getById(req.params.id)
        res.send(board)
    } catch (err) {
        logger.error('Failed to get board', err)
        res.status(500).send({ err: 'Failed to get board' })
    }
}
async function getBoardByUser(req, res) {
    try {
        const board = await boardService.getByUserId(req.params.id)
        res.send(board)
    } catch (err) {
        logger.error('Failed to get board', err)
        res.status(500).send({ err: 'Failed to get board' })
    }
}

async function getBoards(req, res) {
    try {
        // const filterBy = req.query
        // let boards;
        // if (req.session.user) {
        //     boards = await boardService.query(filterBy, req.session.user._id);
        // } else {
        //     boards = await boardService.query(filterBy);
        // }
        const boards = await boardService.query()
        res.send(boards)
    } catch (err) {
        console.log(err);
        logger.error('Failed to get boards', err)
        res.status(500).send({ err: 'Failed to get boards' })
    }
}

async function deleteBoard(req, res) {
    try {
        await boardService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete board', err)
        res.status(500).send({ err: 'Failed to delete board' })
    }
}

async function addBoard(req, res) {
    try {
        const board = req.body;
        const savedBoard = await boardService.add(board)
        res.send(savedBoard)
    } catch (err) {
        logger.error('Failed to add board', err)
        res.status(500).send({ err: 'Failed to add board' })
    }
}

async function updateBoard(req, res) {
    try {
        const board = req.body
        const savedBoard = await boardService.update(board)
        console.log('savedBoard', savedBoard);
        res.send(savedBoard)
    } catch (err) {
        logger.error('Failed to update board', err)
        res.status(500).send({ err: 'Failed to update board' })
    }
}



module.exports = {
    getBoard,
    getBoards,
    addBoard,
    deleteBoard,
    updateBoard,
    getBoardByUser,
}
