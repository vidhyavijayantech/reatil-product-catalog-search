export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom', 
    moduleNameMapper: {
      '\\.(css|scss|less)$': 'identity-obj-proxy' 
    },
    transformIgnorePatterns: [
      '/node_modules/'
    ]
  };
  