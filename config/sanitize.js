const sanitizeHtml = require('sanitize-html')

module.exports = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat([
    'img'
  ]),
  allowedAttributes: sanitizeHtml.defaults.allowedAttributes,
  selfClosing: sanitizeHtml.defaults.selfClosing,
  allowedSchemes: sanitizeHtml.defaults.allowedSchemes,
  allowedSchemesByTag: sanitizeHtml.defaults.allowedSchemesByTag,
  allowedSchemesAppliedToAttributes: sanitizeHtml.defaults.allowedSchemesAppliedToAttributes,
  allowProtocolRelative: sanitizeHtml.defaults.allowProtocolRelative
}
