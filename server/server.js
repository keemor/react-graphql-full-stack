const express = require('express');
const bodyParser = require('body-parser');
const enforce = require('express-sslify');
const compression = require('compression');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const graphqlSchema = require('./graphql/schema/index');
const graphqlResolvers = require('./graphql/resolvers/index');

const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3000;

const app = express();
//Disable http on heroku
if (env === 'production') {
    app.use(enforce.HTTPS({ trustProtoHeader: true }));
}

app.use(compression());
app.use(bodyParser.json());
app.use('/', express.static(`${__dirname}/../dist`));

app.use(
    '/graphql',
    graphqlHttp({
        schema: graphqlSchema,
        rootValue: graphqlResolvers,
        graphiql: env === 'development'
    })
);

const mongodb = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/EventsApp';

//mongoose.Promise = global.Promise;
mongoose
    .connect(mongodb, { useNewUrlParser: true })
    .then(() => {
        app.listen(port);
        console.info('Server running on port', port);
    })
    .catch(err => {
        console.log('err: ', err);
    });
// const duration = env === 'development' ? 1000 : 0;
// const delayPromise = () => result => new Promise(resolve => setTimeout(() => resolve(result), duration));
