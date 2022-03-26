/* eslint-disable unicorn/prefer-module */
module.exports = {
    coverageReporters: ['lcov', 'text', 'cobertura'],
    preset: 'ts-jest',
    reporters: [
        'default',
        [
            'jest-junit',
            {
                outputDirectory: 'report',
                outputName: 'jest-junit.xml'
            }
        ]
    ],
    testEnvironment: 'node',
    testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)']
};
