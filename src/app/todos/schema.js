function todosSchema ({ validator }) {
  const dataSchema = {
    type: 'object',
    properties: {
      todo: {
        type: 'string',
        maxLength: 256,
      },
      userId: {
        type: 'number',
        minimum: 1,
      },
    },
    required: [
      'todo',
      'userId',
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
      object: 'todos',
      id: data.id,
      todo: data.todo,
      userId: data.user_id,
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
      todo: data.todo,
      user_id: data.userId,
    }
  }

  return {
    serializeFromPostgres,
    serializeToPostgres,
    validate,
  }
}

module.exports = todosSchema
