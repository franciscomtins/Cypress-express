const { defineConfig } = require("cypress");
const webpack = require('@cypress/webpack-preprocessor');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Configura o webpack como preprocessor
      const options = {
        webpackOptions: require('./webpack.config.js'), // Inclua o caminho correto para o webpack.config.js
        watchOptions: {},
      };

      on('file:preprocessor', webpack(options));

      // Outros event listeners podem ser adicionados aqui, se houver.
    },
  },
});
