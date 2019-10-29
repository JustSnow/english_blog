import db from '../models'
import contentCategoriesRouter from './layout/content_categories'

import { Router } from 'express'

const router = Router()

/* GET home page. */
router.get('/', (req, res, next) =>
  res.render('index', { title: 'Express' })
)
router.get('/about', (req, res, next) => {
  db.page.findOne({ where: { alias: 'about' } }).then(page => {

  }).catch(next)
})
router.get('/contacts', (req, res, next) => {
  db.page.findOne({ where: { alias: 'contacts' } }).then(page => {

  }).catch(next)
})
router.get('/privacy-and-policy', (req, res, next) => {
  db.page.findOne({ where: { alias: 'privacy-and-policy' } }).then(page => {

  }).catch(next)
})

router.use('/content-categories', contentCategoriesRouter)

export default router
