import AdminRoutes from '../routes/admin/helper'

function applyAdminVariables(req, res, next) {
  res.locals.adminRoutes = AdminRoutes
  next()
}

export default applyAdminVariables
