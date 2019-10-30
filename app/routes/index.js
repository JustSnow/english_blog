import db from '../models'
import contentCategoriesRouter from './layout/content_categories'

import { Router } from 'express'

const router = Router()

function getPageByAlias(alias) {
  return db.page.findOne({ where: { alias: alias } })
}

/* GET home page. */
router.get('/', (req, res, next) =>
  res.render('index', { title: 'Express' })
)
router.get('/about', (req, res, next) => {
  getPageByAlias('about').then(page => {

  }).catch(next)
})
router.get('/contacts', (req, res, next) => {
  getPageByAlias('contacts').then(page => {

  }).catch(next)
})
router.get('/privacy-and-policy', (req, res, next) => {
  getPageByAlias('privacy-and-policy').then(page => {

  }).catch(next)
})

router.use('/content-categories', contentCategoriesRouter)

export default router
