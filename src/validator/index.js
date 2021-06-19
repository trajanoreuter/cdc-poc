const Ajv = require('ajv')

const ajv = new Ajv({
  allErrors: true,
})

require('ajv-errors')(ajv, {
  singleError: false,
})

function validator () {
  return function execute ({ content, schema }) {
    const validate = ajv.compile(schema)
    const valid = validate(content)

    if (!valid) {
      const { errors } = validate

      return {
        valid: false,
        errors,
      }
    }

    return {
      valid: true,
      errors: {},
    }
  }
}

module.exports = validator
