import finalhandler from 'finalhandler'
import db from '../../models'
import Joi from 'joi'
import AdminRoutes from '../../routes/admin/helper'

// TODO refactor me add dry with General CRUD class
class ContentsController {
  static async index(req, res) {
    let done = finalhandler(req, res)

    try {
      db.content.findAll().then(contents => {
        res.render('admin/contents/index', { contents })
      }).catch(error => { done(error) })
    } catch (error) { done(error) }
  }

  static async new(req, res) {
    let contentCategories = ContentsController._getContentCategories()

    contentCategories.then(contentCategories => {
      res.render('admin/contents/new', { contentCategories })
    }).catch(error => { done(error) })
  }

  static async edit(req, res) {
    let done = finalhandler(req, res)
    const { id } = req.params

    if (!Number(id)) { return done() }

    try {
      let content = db.content.findByPk(id)
      let contentCategories = ContentsController._getContentCategories()

      Promise.all([
        content,
        contentCategories
      ]).then(responses => {
        res.render('admin/contents/edit', { content: responses[0].get(), contentCategories: responses[1] })
      }).catch(error => { done(error) })
    } catch (error) {
      done(error)
    }
  }

  static async create(req, res) {
    let done = finalhandler(req, res)
    const params = req.body

    try {
      db.content.create(params).then(content => {
        res.redirect(AdminRoutes.editContentPath(content.id))
      }).catch(error => {
        console.log('error: ', error);
        res.render('admin/contents/new', { params })
      })
    } catch(error) { done(error) }
  }

  static async update(req, res) {
    let done = finalhandler(req, res)
    const { id } = req.params
    const params = req.body

    try {
      db.content.findByPk(id).then(content => {
        content.update(params).then(content => {
          res.redirect(AdminRoutes.editContentPath(content.id))
        }).catch(error => {
          let backURL = req.header('Referer') || AdminRoutes.editContentPath(content.id)
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
      db.content.findByPk(id).then(content => {
        content.destroy({ force: true }).then(content => {
          res.redirect(AdminRoutes.contentsPath())
        }).catch(error => { done(error) })
      }).catch(error => { done(error) })
    } catch(error) { done(error) }
  }

  // TODO: be sure contentCategoryId was passed with params
  // required() breaks all
  static permittedParams() {
    return Joi.object().keys({
      title: Joi.string(),
      alias: Joi.string(),
      description: Joi.string(),
      contentCategoryId: Joi.string().alphanum()
    })
  }

  static _getContentCategories(fields = ['id', 'title']) {
    return db.contentCategory.findAll({ attributes:  fields})
  }
}

export default ContentsController
