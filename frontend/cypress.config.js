import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: "kpzhxj",
  e2e: {
    setupNodeEvents(on, config) {
      // Add any node events here if needed
    },
    supportFile: 'cypress/support/index.js',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}'
  },
  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
    specPattern: 'cypress/components/**/*.cy.{js,jsx,ts,tsx}'
  },
});
