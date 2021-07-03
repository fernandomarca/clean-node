module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['**/src/**/*.js', '!**/src/main/**'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'node',
  preset: '@shelf/jest-mongodb'
}
