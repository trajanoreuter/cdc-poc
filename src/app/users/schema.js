function usersSchema ({ validator }) {
  const dataSchema = {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        maxLength: 256,
      },
      email: {
        type: 'string',
        maxLength: 256,
      },
    },
    required: [
      'name',
      'email',
    ],
    additionalProperties: false,
  }

  function validate ({ data, schema }) {
    const { valid, errors } = validator({
      content: data,
      schema,
    })

    if (valid) {
      return data
    }

    throw new Error(`Invalid parameters: ${errors}`)
  }

  function serializeFromPostgres (data) {
    return {
      object: 'users',
      id: data.id,
      name: data.name,
      email: data.email,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    }
  }

  function serializeToPostgres (data) {
    validate({
      data,
      schema: dataSchema,
    })

    return {
      name: data.name,
      email: data.email,
    }
  }

  return {
    serializeFromPostgres,
    serializeToPostgres,
    validate,
  }
}

module.exports = usersSchema
