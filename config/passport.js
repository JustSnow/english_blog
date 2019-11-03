const path = require('path')
const bcrypt = require('bcrypt')

import { Strategy } from 'passport-local'
import db from '../app/models'

function authenticateUser(email, password, done) {
  try {
    // TODO use here safe response message, like user or password are incorrect
    db.user.findOne({ where: { email: email } }).then(user => {
      if (user == null) { return done(null, false, { message: 'Incorrect email or password' }) }

      bcrypt.compare(password, user.encryptedPassword).then(isEqual => {
        if (isEqual) {
          return done(null, user)
        } else {
          return done(null, false, { message: 'Wrong password' })
        }
      }).catch(done)
    }).catch(done)
  } catch(error) {
    return done(error)
  }
}

function initPassportConfig(passport) {
  passport.use(new Strategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser((user, done) => { done(null, user.id) })
  passport.deserializeUser((id, done) => {
    // TODO if it possible take stored user from session or response
    db.user.findByPk(id).then((error, user) => {
      console.log('id: ', id, user);
      if (error) { return done(error) }
      return done(null, user)
    })
  })
}

export default initPassportConfig
