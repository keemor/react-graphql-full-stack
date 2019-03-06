import React, { Component } from 'react';
import { ApolloConsumer } from 'react-apollo';
import { Formik, Form, Field } from 'formik';
import { Button, Col, Container, Row, NavLink } from 'reactstrap';
import { ReactstrapInput } from 'reactstrap-formik';
import { object, string, email } from 'yup';
import { Link } from 'react-router-dom';
import AuthContext from '../context/auth';
import loginQuery from '../gql/loginUser';

class Login extends Component {
    static contextType = AuthContext;
    // state = {
    //     error: null
    // };
    render() {
        return (
            <ApolloConsumer>
                {client => (
                    <Formik
                        initialValues={{ email: 'test@test.com', password: 'tester' }}
                        onSubmit={(values, { setSubmitting, resetForm }) => {
                            client
                                .query({
                                    query: loginQuery,
                                    variables: {
                                        email: values.email,
                                        password: values.password
                                    }
                                })
                                .then(response => {
                                    if (response.data.login.token) {
                                        this.context.login(
                                            response.data.login,
                                            response.data.userId,
                                            response.data.tokenExpiration,
                                            response.data.email
                                        );
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
                            email: string()
                                .email()
                                .required(),
                            password: string().required()
                        })}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <Container>
                                    <Row>
                                        <Col xs="12">
                                            <Field type="text" name="email" component={ReactstrapInput} />
                                        </Col>
                                        <Col xs="12">
                                            <Field type="text" name="password" component={ReactstrapInput} />
                                        </Col>

                                        <Button color="primary" type="submit" disabled={isSubmitting}>
                                            Login
                                        </Button>
                                        <NavLink tag={Link} to="/signup">
                                            Sign Up
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
