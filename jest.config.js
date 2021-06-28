module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['**/src/**/*.js'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'node',
  preset: '@shelf/jest-mongodb'
}
