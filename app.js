import createError from 'http-errors'
import express from 'express'
import path from 'path'
import logger from 'morgan'
import methodOverride from 'method-override'
import morganBody from 'morgan-body'
import initPassportConfig from './config/passport'

const app = express()
const session = require('express-session')
const flash = require('express-flash')
const dotenv = require('dotenv')

dotenv.config({ path: path.resolve(__dirname, `./config/.env.${app.get('env')}`) })

import adminRouter from './app/routes/admin/index'
import indexRouter from './app/routes/index'

import applyAdminVariables from './app/presenters/admin'
import applyLayoutVariables from './app/presenters/layout'

const passport = require('passport')
initPassportConfig(passport)

// view engine setup
app.set('views', path.join(__dirname, 'app/views'))
app.set('view engine', 'pug')

// should be above passport.initialize()
// https://github.com/jaredhanson/passport/issues/14#issuecomment-4863459
app.use(express.static(path.join(__dirname, 'public')))

app.use(logger('common'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(flash())

app.use(session({
  store: new (require('connect-pg-simple')(session))({
    conString: process.env.DATABASE_URL
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
// conString: 'pg://' + config.username + ':' + config.password + '@' + config.host + '/' + config.database

app.use(passport.initialize())
app.use(passport.session())

app.use(methodOverride((req, res) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    let method = req.body._method
    delete req.body._method
    return method
  }
}))

morganBody(app, { logResponseBody: false })

app.use('/', applyLayoutVariables, indexRouter)
app.use('/admin', applyAdminVariables, adminRouter)

// catch 404 and forward to error handler
app.use((req, res, next) =>
  next(createError(404))
)

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
