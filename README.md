# React GraphQL Full Stack

> React Formik GraphQL Express MongoDB Full Stack on [react-graphql-keemor.herokuapp.com](https://react-graphql-keemor.herokuapp.com/)

## Based on

[GraphQL with React and Apollo Client by Nik Graf](https://egghead.io/lessons/react-course-introduction-graphql-with-react-and-apollo-client)

[Build a Complete App with GraphQL, Node.js, MongoDB and React.js by Academind](https://www.youtube.com/watch?v=7giZGFDGnkc&list=PL55RiY5tL51rG1x02Yyj93iypUuHYXcB_)

[Formik by Jared Palmer](https://jaredpalmer.com/formik/docs/overview)

## Change log

### 2019

-   24.04 - Server: dataloader added to eliminate database roundtrips
-   23.04 - Client: My bookings page
-   19.04 - Client: Delete event mutation
-   18.04 - Client: Introducing react-apollo-hooks
-   17.04 - Client: Introducing hooks

*   07.03 - End to End Tests added with faker, jest, jest-cli & puppeteer
*   06.03 - Protected routes for adding event
*   05.03 - User signup, login, logout using bcrypt & jsonwebtoken

### 2018

-   19.12 - Client: Yup validation, bootstrap, reactstrap & reactstrap-formik
-   18.12 - Client: React, apollo-boost, react-apollo, Formik
-   17.12 - Server: Express, Graphql, mongoose

## Run locally

```sh
git clone https://github.com/keemor/react-graphql-full-stack
cd react-graphql-full-stack
npm install
```

Run development sever

```sh
npm run dev
```

Server running on port 3000

Run development webpack

```sh
npm run build:dev
```

Install local MongoDB

Run local MongoDB at mongodb://127.0.0.1:27017/

```
cd "C:\Program Files\MongoDB\Server\4.0\bin"
mongod.exe --dbpath \Users\username\Workspace\mongo-data
```
