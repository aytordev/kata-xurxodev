// jest.config.ts
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>'],
    testMatch: ['**/*.test.ts'],
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    collectCoverageFrom: ['src/**/*.ts', '!src/**/*.d.ts'],
    transform: {
        '^.+\\.ts?$': ['ts-jest', { /* ts-jest config goes here in Jest */ }]
    },
};
