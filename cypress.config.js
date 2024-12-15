const { defineConfig } = require('cypress')
const cucumber = require("cypress-cucumber-preprocessor").default;

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.pagbrasil.com/fb831484f9611648f05411b3746466b6",
    specPattern: "**/*.feature",
    setupNodeEvents(on, config) {
      on("file:preprocessor", cucumber())
    },
  },
})