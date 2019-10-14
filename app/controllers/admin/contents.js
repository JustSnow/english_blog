import finalhandler from 'finalhandler'
import db from '../../models'
import Joi from 'joi'
import AdminRoutes from '../../routes/admin/helper'

// TODO refactor me add dry with General CRUD class
class ContentsController {
  static async index(req, res) {
    let done = finalhandler(req, res)

    try {
      // TODO read about assosiations
      // SequelizeDatabaseError: column "ContentCategoryId" does not exist
      db.content.findAll().then(contents => {
        res.render('admin/contents/index', { contents: contents })
      }).catch(error => { done(error) })
    } catch (error) { done(error) }
  }

  static async new(req, res) {
    let contentCategories = db.contentCategory.findAll({ attributes: ['id', 'title'] })

    Promise.all([contentCategories]).then(responses => {
      res.render('admin/contents/new', { contentCategories: responses[0] })
    }).catch(error => { done(error) })
  }

  static async edit(req, res) {
    let done = finalhandler(req, res)
    const { id } = req.params

    if (!Number(id)) { return done() }

    try {
      let content = db.content.findByPk(id)
      let contentCategories = db.contentCategory.findAll({ attributes: ['id', 'title'] })

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
        res.render('admin/contents/new', { params: params })
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

  // convert string value for category id from string to integer if it possible
  static permittedParams() {
    return Joi.object().keys({
      title: Joi.string(),
      alias: Joi.string(),
      description: Joi.string()
    })
  }
}

export default ContentsController
