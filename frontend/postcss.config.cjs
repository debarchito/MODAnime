const prod = process.env.NODE_ENV === 'production';

module.exports = {
  plugins: [
    require('tailwindcss/nesting'),
    require('tailwindcss'),
    prod &&
      require('cssnano')({
        preset: 'default'
      })
  ]
}
