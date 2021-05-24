const express = require('express')
// const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { getList, getLists, deleteList, updateList, addList, getListByUser } = require('./list.controller')
// const { addReview, getReviews, deleteReview } = require('../review/review.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getLists)
router.get('/:id', getList)
router.get('/:id/profile', getListByUser)
// router.get('/:id/review', getReviews)
// router.post('/', requireAuth, requireAdmin, addList) // WITH AUTH
router.post('/', addList)
// router.post('/:id/review', requireAuth, addReview) // WITH AUTH
// router.post('/:id/review', addReview)
// router.put('/:id', requireAuth, requireAdmin, updateList) // WITH AUTH
router.put('/:id', updateList)
// router.delete('/:id', requireAuth, requireAdmin, deleteList) // WITH AUTH
router.delete('/:id', deleteList)

module.exports = router
