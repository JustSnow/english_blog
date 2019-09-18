import createError from 'http-errors'
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import methodOverride from 'method-override'
import morganBody from 'morgan-body'

import adminRouter from './app/routes/admin/index'
import indexRouter from './app/routes/index'

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'app/views'))
app.set('view engine', 'pug')

app.use(logger('common'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(methodOverride((req, res) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    let method = req.body._method
    delete req.body._method
    return method
  }
}))

morganBody(app, { logResponseBody: false })

app.use('/', indexRouter)
app.use('/admin', adminRouter)

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
