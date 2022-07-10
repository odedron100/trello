const express = require('express')
// const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { getBoard, getBoards, deleteBoard, updateBoard, addBoard, getBoardByUser } = require('./Board.controller')
// const { addReview, getReviews, deleteReview } = require('../review/review.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getBoards)
router.get('/:id', getBoard)
router.get('/:id/profile', getBoardByUser)
// router.get('/:id/review', getReviews)
// router.post('/', requireAuth, requireAdmin, addBoard) // WITH AUTH
router.post('/', addBoard)
// router.post('/:id/review', requireAuth, addReview) // WITH AUTH
// router.post('/:id/review', addReview)
// router.put('/:id', requireAuth, requireAdmin, updateBoard) // WITH AUTH
router.put('/:id', updateBoard)
// router.delete('/:id', requireAuth, requireAdmin, deleteBoard) // WITH AUTH
router.delete('/:id', deleteBoard)

module.exports = router
