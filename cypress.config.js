const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env : {
    NEXT_PUBLIC_WORDPRESS_URL: 'https://faustintl.wpengine.com/',
  },
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
