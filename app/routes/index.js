import db from '../models'
import createError from 'http-errors'
import contentCategoriesRouter from './layout/content_categories'
import ImagesScaler from '../services/images_scaler'

import { Router } from 'express'

const router = Router()

function getPageByAlias(alias) {
  return db.page.findOne({ where: { alias: alias } })
}

function renderStaticPage(res, page) {
  if (page === null) { throw new createError.NotFound() }

  res.render('pages/show', { page })
}

router.get('/', (req, res, next) =>
  res.render('pages/home')
)

router.get('/about', (req, res, next) => {
  getPageByAlias('about').then(page => {
    renderStaticPage(res, page)
  }).catch(next)
})

router.get('/contacts', (req, res, next) => {
  getPageByAlias('contacts').then(page => {
    renderStaticPage(res, page)
  }).catch(next)
})

router.get('/policy-and-privacy', (req, res, next) => {
  getPageByAlias('policy-and-privacy').then(page => {
    renderStaticPage(res, page)
  }).catch(next)
})

router.get('/scale/images', (req, res, next) => {
  let decodedOptions = Buffer.from(req.query.options, 'base64').toString('ascii')
  const imageOptions = JSON.parse(decodedOptions)

  res.type(`image/${imageOptions.format || 'jpeg'}`)
  ImagesScaler.resize(imageOptions).pipe(res)
})

router.use('/content-categories', contentCategoriesRouter)

export default router
