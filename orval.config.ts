module.exports = {
  cashflow: {
    output: {
      mode: 'tags',
      target: './src/gen/api/api.ts',
      schemas: './src/gen/models',
      client: 'fetch',
      override: {
        mutator: {
          path: './src/request/index.ts',
          name: 'customFetch',
        },
      },
    },
    input: {
      target: './openapi.json',
    },
  },
};