import AdminRoutes from '../routes/admin/helper'

function applyAdminVariables(req, res, next) {
  res.locals.adminRoutes = AdminRoutes
  res.locals.currentUser = req.user

  next()
}

export default applyAdminVariables
