import React, { Component } from 'react';
import { ApolloConsumer } from 'react-apollo';
import { Formik, Form, Field } from 'formik';
import { Button, Col, Container, Row, NavLink } from 'reactstrap';
import { ReactstrapInput } from 'reactstrap-formik';
import { object, string } from 'yup';
import { Link } from 'react-router-dom';
import AuthContext from '../context/auth';
import loginQuery from '../gql/loginUser';

class Login extends Component {
    static contextType = AuthContext;
    render() {
        return (
            <ApolloConsumer>
                {client => (
                    <Formik
                        initialValues={{ name: '', password: '' }}
                        onSubmit={(values, { setSubmitting, resetForm }) => {
                            client
                                .query({
                                    query: loginQuery,
                                    variables: {
                                        name: values.name,
                                        password: values.password
                                    }
                                })
                                .then(response => {
                                    if (response.data.login.token) {
                                        this.context.login(response.data.login);
                                    }
                                })
                                .catch(err => {
                                    // console.log('err: ', err);
                                    // this.setState({ error: 'Login failed!' });
                                });
                            resetForm();
                            setSubmitting(false);
                        }}
                        validationSchema={object().shape({
                            name: string().required(),
                            password: string().required()
                        })}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <Container>
                                    <Row>
                                        <Col xs="12">
                                            <Field
                                                autoFocus
                                                type="text"
                                                name="name"
                                                placeholder="Name"
                                                component={ReactstrapInput}
                                            />
                                        </Col>
                                        <Col xs="12">
                                            <Field
                                                type="password"
                                                name="password"
                                                placeholder="Password"
                                                component={ReactstrapInput}
                                            />
                                        </Col>

                                        <Button color="primary" type="submit" disabled={isSubmitting}>
                                            Login
                                        </Button>
                                        <NavLink tag={Link} to="/signup">
                                            Signup
                                        </NavLink>
                                    </Row>
                                </Container>
                            </Form>
                        )}
                    </Formik>
                )}
            </ApolloConsumer>
        );
    }
}

export default Login;
