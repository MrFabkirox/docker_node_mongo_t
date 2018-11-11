const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }))
//*
// Connect to MongoDB

/*
mongoose.connect(
      'mongodb://mongo:27017/docker-node-mongo-t',
      { useNewParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err))
*/

//*
mongoose.connect(
    'mongodb+srv://tigeradmin:'
      + process.env.MONGO_ATLAS_PW
      + '@tigernodesandreact-4kfsd.mongodb.net/', {
        dbName: 'tigernodesandreact',
        useNewUrlParser: true
    }
);
mongoose.Promise = global.Promise;
//*/

const Item = require('./models/Item')

app.get('/', (req, res) => {
    Item.find()
      .then(items => res.render('index', { items }))
      .catch(err => res.status(404).json({ msg: 'No item found'
      }))
})

app.post('/item/add', (req, res) => {
    const newItem = new Item({
        name: req.body.name
    })

    newItem.save().then(item => res.redirect('/'))
})
//*/
/*
app.get('/', (req, res) => {
   res.json({
       "msg": 'index'
   })
})
*/
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

const port = 3000;
app.set('port', process.env.PORT || port)

app.listen(app.get("port"), () => console.log(
    `Server on port ${port}`
));