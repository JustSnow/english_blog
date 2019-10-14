import finalhandler from 'finalhandler'
import db from '../../models'
import Joi from 'joi'
import AdminRoutes from '../../routes/admin/helper'

// TODO refactor me add dry with General CRUD class
class ContentCategoriesController {
  static async index(req, res) {
    let done = finalhandler(req, res)

    try {
      db.contentCategory.findAll().then(contentCategories => {
        res.render('admin/content_categories/index', { contentCategories: contentCategories })
      }).catch(error => { done(error) })
    } catch (error) { done(error) }
  }

  static async new(req, res) {
    res.render('admin/content_categories/new')
  }

  static async edit(req, res) {
    let done = finalhandler(req, res)
    const { id } = req.params

    if (!Number(id)) { return done() }

    try {
      db.contentCategory.findByPk(id).then(contentCategory => {
        res.render('admin/content_categories/edit', { contentCategory: contentCategory.get() })
      }).catch(error => { done(error) })
    } catch (error) {
      done(error)
    }
  }

  static async create(req, res) {
    let done = finalhandler(req, res)
    const params = req.body

    try {
      db.contentCategory.create(params).then(contentCategory => {
        res.redirect(AdminRoutes.editContentCategoryPath(contentCategory.id))
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
      db.contentCategory.findByPk(id).then(contentCategory => {
        contentCategory.update(params).then(contentCategory => {
          res.redirect(AdminRoutes.editContentCategoryPath(contentCategory.id))
        }).catch(error => {
          let backURL = req.header('Referer') || AdminRoutes.editContentCategoryPath(contentCategory.id)
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
      db.contentCategory.findByPk(id).then(contentCategory => {
        contentCategory.destroy({ force: true }).then(contentCategory => {
          res.redirect(AdminRoutes.contentCategoriesPath())
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
