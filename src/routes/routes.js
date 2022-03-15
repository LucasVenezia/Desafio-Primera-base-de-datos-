const { products, messages } = require('../options/DB.js')
const { Router } = require('express')
const router = Router()

router.get('/', async (req, res) => {
  try {
    const items = await products.getAll()
    const chat = await messages.getAll()
    res.render('index', { items, chat })
  }
  catch (e) {
    console.error(e)
    res.sendStatus(500)
  }
})

router.post('/productos', async (req, res) => {
  try {
    await products.add(req.body)
    res.redirect('/')
  }
  catch (e) {
    console.error(e)
    res.sendStatus(500)
  }
})
router.post('/mensajes', async (req, res) => {
  try {
    await messages.add(req.body)
    res.redirect('/')
  }
  catch (e) {
    console.error(e)
    res.sendStatus(500)
  }
})

router.get('/productos', async (req, res) => {
  try {
    const items = await products.getAll()
    res.render('items', { items })
  }
  catch (e) {
    console.error(e)
    res.sendStatus(500)
  }
})

module.exports = router