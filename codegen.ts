module.exports = {
    overwrite: true,
    schema:'https://api.escuelajs.co/graphql',
    documents: [
      'src/app/graphql/**/*.graphql',
    ],
    generates: {
      'generated/graphql.tsx': {
        plugins: [
          'typescript',
          'typescript-operations',
          'typescript-react-apollo'
        ]
      }
    }
  };