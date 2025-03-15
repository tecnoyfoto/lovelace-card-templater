const path = require('path');

module.exports = {
  // Punto de entrada
  entry: './src/main.js',

  // Modo: "production" (minimiza) o "development"
  mode: 'production',

  // No generar sourcemaps, ajusta a false
  devtool: false,

  // Resultado: "lovelace-card-templater.js" en la carpeta actual
  output: {
    filename: 'lovelace-card-templater.js',
    path: path.resolve(__dirname)
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        // Incluir "src" y la carpeta "node_modules/yaml" para transpilar
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules/yaml')
        ],
        use: {
          loader: 'babel-loader',
          options: {
            // Permite a Babel decidir script/module, pero convertiremos todo a CommonJS
            sourceType: 'unambiguous',
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: 'defaults',
                  // Para evitar que queden import/export en la salida final
                  modules: 'commonjs'
                }
              ]
            ],
            plugins: [
              [
                '@babel/plugin-transform-runtime',
                {
                  helpers: true,
                  regenerator: true
                }
              ]
            ]
          }
        }
      }
    ]
  }
};
