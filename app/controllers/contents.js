import finalhandler from 'finalhandler'
import db from '../models'
import Joi from 'joi'

// TODO refactor me add dry with General CRUD class
class ContentsController {
  static async index(req, res) {
    let done = finalhandler(req, res)

    try {
      // TODO read about assosiations
      // SequelizeDatabaseError: column "ContentCategoryId" does not exist
      db.Content.findAll().then(contents => {
        res.render('contents/index', { contents: contents })
      }).catch(error => { done(error) })
    } catch (error) { done(error) }
  }

  static async new(req, res) {
    res.render('contents/new')
  }

  static async show(req, res) {
    let done = finalhandler(req, res)
    const { id } = req.params

    if (!Number(id)) { return done() }

    try {
      db.Content.findByPk(id).then(content => {
        res.render('contents/show', { content: content.get() })
      }).catch(error => { done(error) })
    } catch (error) {
      done(error)
    }
  }

  static async create(req, res) {
    let done = finalhandler(req, res)
    const params = req.body

    try {
      db.Content.create(params).then(content => {
        res.redirect(`/contents/${content.id}`)
      }).catch(error => {
        console.log('error: ', error);
        res.render('contents/new', { params: params })
      })
    } catch(error) { done(error) }
  }

  static async update(req, res) {
    let done = finalhandler(req, res)
    const { id } = req.params
    const params = req.body

    try {
      db.Content.findByPk(id).then(content => {
        content.update(params).then(content => {
          res.redirect(`/contents/${content.id}`)
        }).catch(error => {
          let backURL = req.header('Referer') || `/contents/${content.id}`
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
      db.Content.findByPk(id).then(content => {
        content.destroy({ force: true }).then(content => {
          res.redirect('/contents')
        }).catch(error => { done(error) })
      }).catch(error => { done(error) })
    } catch(error) { done(error) }
  }

  static permittedParams() {
    return Joi.object().keys({
      title: Joi.string(),
      alias: Joi.string(),
      description: Joi.string(),
      contentCategoryId: Joi.number().integer()
    })
  }
}

export default ContentsController
