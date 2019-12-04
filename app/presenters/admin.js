import AdminRoutes from '../routes/admin/helper'
import imageSrcBuilder from '../services/image_src_builder'

function applyAdminVariables(req, res, next) {
  res.locals.adminRoutes = AdminRoutes
  res.locals.currentUser = req.user
  res.locals.imageSrcBuilder = imageSrcBuilder

  next()
}

export default applyAdminVariables
