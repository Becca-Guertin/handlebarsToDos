const express = require('express');
const exphbs = require('express-handlebars');
//const User = require('./models/User');
const routes = require('./routes');
const sequelize = require('./config');

const hbs = exphbs.create({});


const app = express();

const PORT = process.env.PORT || 3001;

//tells node we're using handlebars as our templating engine
//configures handlebars as the view engine
app.engine('handlebars', hbs.engine);

app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(routes);

sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))

})

