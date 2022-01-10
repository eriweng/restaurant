// require packages used in the project
const express = require('express')
const app = express()
const port = 3000

// require express-handlebars here
const exphbs = require('express-handlebars')
// require data.json
const restaurantList = require('./restaurant.json')
// setting template engone
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')


// setting static files
app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(movie => movie.id.toString() === req.params.restaurant_id)
  res.render('show_page', { restaurant: restaurant })
})
app.get('/search', (req, res) => {
  const keyword = req.query.keyword // req.params.keyword  這樣的好處就可以看到 search 的邏輯就知道他會有一個參數 keyword。這樣就不用再仔細看下面有什麼參數囉。
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurants: restaurants, keyword: keyword })
})
// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
