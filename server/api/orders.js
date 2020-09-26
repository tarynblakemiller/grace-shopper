const router = require('express').Router()
const {User, Spoon, Order, SPOON_ORDER} = require('../db/models')

router.get('/cart', async (req, res, next) => {
  let currentCart
  try {
    await Order.findOrCreate({
      where: {
        userId: req.user.id,
        status: false
      }
    })
    currentCart = await Order.findOne({
      where: {
        userId: req.user.id,
        status: false
      },
      include: Spoon
    })
    res.json(currentCart)
  } catch (err) {
    next(err)
  }
})

// THIS WORKS GREAT:
router.get('/history', async (req, res, next) => {
  try {
    let historyResponse = await Order.findAll({
      where: {
        userId: req.user.id,
        status: true
      },
      include: Spoon
    })
    res.json(historyResponse)
  } catch (err) {
    next(err)
  }
})

// THIS DOESN'T WORK YET:
router.delete('/:itemId', async (req, res, next) => {
  console.log('@ router.delete THIS IS req.params: ', req.params)
  try {
    let currentCart = await Order.findOne({
      where: {
        userId: req.user.id,
        status: false
      }
    })

    //what if we findbyPk, on Spoon, remove Order, but
    // prob same exact challenges.
    currentCart.removeSpoon({
      where: {
        spoonId: req.params.itemId
      }
    })
    const updatedCart = await Order.findOne({
      where: {
        userId: req.user.id,
        status: false
      },
      include: Spoon
    })
    res.json(updatedCart)
  } catch (err) {
    next(err)
  }
})

module.exports = router
