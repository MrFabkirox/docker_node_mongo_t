const express = require('express');
const app = express();

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const morgan = require('morgan');
app.use(morgan('common'));

const Joi = require('joi');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.json({
    'msg': 'index'
  });
});

/*
mongoose.connect(
      'mongodb://mongo:27017/docker-node-mongo-t',
      { useNewParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err))
*/

mongoose.connect(
  'mongodb+srv://tigeradmin:'
      + process.env.MONGO_ATLAS_PW
      + '@tigernodesandreact-4kfsd.mongodb.net/', {
    dbName: 'tigernodesandreact',
    useNewUrlParser: true
  }
);
mongoose.Promise = global.Promise;

const Item = require('./models/Item');

app.get('/item', (req, res) => {
  Item.find()
    .then(items => res.render('item', { items }))
    .catch(err => res.status(404).json({ msg: 'No item found'
    }));
});

app.post('/item/add', (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });

  newItem.save().then(item => res.redirect('/'));
});

const courses = [
  { id: 1, name: 'course1' },
  { id: 2, name: 'course2' }
];

app.get('/api/courses', (req, res) => {
  res.send(courses);
});

app.post('/api/courses', (req, res) => {

  //*/ 1. validate w object destructuring feature in modern js
  const { error } = validateCourse(req.body); //*/

  //*/ 2. if invalid return 400 bad request w destructuring
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  // 3. update courses
  const course = {
    id : courses.length + 1,
    name : req.body.name
  };
  courses.push(course);

  // 4. display result
  res.send(course);

  // validate, generic function
  function validateCourse(course) {

    const schema = {
      name: Joi.string().min(3).required()
    };
    const validationResult = Joi.validate(course, schema);

    console.log(validationResult);
    return validationResult;

  }
});

const posts = [
  { id: 1, title: 'post1' },
  { id: 2, title: 'post2' }
];

app.get('/posts', (req, res) => {
//  res.send(posts);
  res.render('post', { posts });
});

app.post('/posts', (req, res) => {

  //*/ 1. validate w object destructuring feature in modern js
  const { error } = validatePost(req.body); //*/

  //*/ 2. if invalid return 400 bad request w destructuring
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  // 3. add post
  const addedPost = {
    id : posts.length + 1,
    name : req.body.title
  };
  posts.push(addedPost);

  // 4. display result
  res.render('post', { posts });

  // validate, generic function, see in apiauthentication for helpers struct
  function validatePost(post) {

    const schema = {
      title: Joi.string().min(3).required()
    };
    const validationPostResult = Joi.validate(post, schema);

    console.log(validationPostResult);
    return validationPostResult;

  }
});


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
app.set('port', process.env.PORT || port);

app.listen(app.get('port'), () => console.log(
  `Server on port ${port}`
));