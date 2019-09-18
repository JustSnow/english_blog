import finalhandler from 'finalhandler'
import db from '../../models'
import Joi from 'joi'

// TODO refactor me add dry with General CRUD class
class ContentCategoriesController {
  static async index(req, res) {
    let done = finalhandler(req, res)

    try {
      db.ContentCategory.findAll().then(contentCategories => {
        res.render('admin/content_categories/index', { contentCategories: contentCategories })
      }).catch(error => { done(error) })
    } catch (error) { done(error) }
  }

  static async new(req, res) {
    res.render('admin/content_categories/new')
  }

  static async show(req, res) {
    let done = finalhandler(req, res)
    const { id } = req.params

    if (!Number(id)) { return done() }

    try {
      db.ContentCategory.findByPk(id).then(contentCategory => {
        res.render('admin/content_categories/show', { contentCategory: contentCategory.get() })
      }).catch(error => { done(error) })
    } catch (error) {
      done(error)
    }
  }

  static async create(req, res) {
    let done = finalhandler(req, res)
    const params = req.body

    try {
      db.ContentCategory.create(params).then(contentCategory => {
        res.redirect(`/admin/content-categories/${contentCategory.id}`)
      }).catch(error => {
        console.log('error: ', error);
        res.render('admin/content_categories/new', { params: params })
      })
    } catch(error) { done(error) }
  }

  static async update(req, res) {
    let done = finalhandler(req, res)
    const { id } = req.params
    const params = req.body

    try {
      db.ContentCategory.findByPk(id).then(contentCategory => {
        contentCategory.update(params).then(contentCategory => {
          res.redirect(`/admin/content-categories/${contentCategory.id}`)
        }).catch(error => {
          let backURL = req.header('Referer') || `/admin/content-categories/${contentCategory.id}`
          console.log('error: ', error);
          res.redirect(backURL)
        })
      })
    } catch(error) { done(error) }
  }

  static async delete(req, res) {
    let done = finalhandler(req, res)
    const { id } = req.params

    try {
      db.ContentCategory.findByPk(id).then(contentCategory => {
        contentCategory.destroy({ force: true }).then(contentCategory => {
          res.redirect('/admin/content-categories')
        }).catch(error => { done(error) })
      }).catch(error => { done(error) })
    } catch(error) { done(error) }
  }

  static permittedParams() {
    return Joi.object().keys({
      title: Joi.string(),
      alias: Joi.string(),
      description: Joi.string()
    })
  }
}

export default ContentCategoriesController
