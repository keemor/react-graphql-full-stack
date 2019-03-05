import React, { Component } from 'react';
import { ApolloConsumer } from 'react-apollo';
import { Formik, Form, Field } from 'formik';
import { Button, Col, Container, Row } from 'reactstrap';
import { ReactstrapInput } from 'reactstrap-formik';
import { object, string, email } from 'yup';

import AuthContext from '../context/auth';

import gql from 'graphql-tag';
const loginQuery = gql`
    query login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            userId
            token
            tokenExpiration
        }
    }
`;

class Auth extends Component {
    static contextType = AuthContext;

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
                                            response.data.tokenExpiration
                                        );
                                    }
                                })
                                .catch(err => {
                                    console.error(err);
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

                                        <Col xs="12">
                                            <Button color="primary" type="submit" disabled={isSubmitting}>
                                                Login
                                            </Button>
                                        </Col>
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

export default Auth;
