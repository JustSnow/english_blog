import finalhandler from 'finalhandler'
import db from '../../models'
import Joi from 'joi'

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
    res.render('admin/contents/new')
  }

  static async show(req, res) {
    let done = finalhandler(req, res)
    const { id } = req.params

    if (!Number(id)) { return done() }

    try {
      db.content.findByPk(id).then(content => {
        res.render('admin/contents/show', { content: content.get() })
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
        res.redirect(`/admin/contents/${content.id}`)
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
          res.redirect(`/admin/contents/${content.id}`)
        }).catch(error => {
          let backURL = req.header('Referer') || `/admin/contents/${content.id}`
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
          res.redirect('/admin/contents')
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

export default ContentsController
