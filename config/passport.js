const path = require('path')
const bcrypt = require('bcrypt')

import { Strategy } from 'passport-local'
import db from '../app/models'

function authenticateUser(email, password, done) {
  let incorrectAuthDataResponse = 'Incorrect email or password'

  try {
    db.user.findOne({ where: { email: email } }).then(user => {
      if (user == null) { return done(null, false, { message: incorrectAuthDataResponse }) }

      bcrypt.compare(password, user.encryptedPassword).then(isEqual => {
        if (isEqual) {
          return done(null, user)
        } else {
          return done(null, false, { message: incorrectAuthDataResponse })
        }
      }).catch(done)
    }).catch(done)
  } catch(error) {
    return done(error)
  }
}

function deserializeUser(incomingMessage, id, done) {
  db.user.findByPk(id).then(user => {
    return done(null, user)
  }).catch(error => {
    return done(error)
  })
}

function initPassportConfig(passport) {
  passport.use(new Strategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser((user, done) => { done(null, user.id) })
  passport.deserializeUser(deserializeUser)
}

export default initPassportConfig
