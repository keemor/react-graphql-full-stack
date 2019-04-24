import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, Col, Container, Row } from 'reactstrap';
import { ReactstrapInput } from 'reactstrap-formik';
import { Redirect } from 'react-router-dom';
import { object, string, date, number } from 'yup';

import { useMutation } from 'react-apollo-hooks';
import getEvents from '~/gql/getEvents';
import createEvent from '~/gql/createEvent';

const AddEvent = () => {
    const createEventMut = useMutation(getEvents);
    const [toEvents, setToEvents] = useState(false);

    if (toEvents) {
        return <Redirect to="/events" />;
    }

    let initTitle, initPrice;

    if (process.env.NODE_ENV === 'development') {
        initTitle = Math.random()
            .toString(36)
            .substring(2);

        initPrice = '99';
    }

    return (
        <Formik
            initialValues={{ title: initTitle, date: new Date().toISOString().slice(0, 10), price: initPrice }}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                createEventMut({
                    variables: {
                        event: {
                            title: values.title,
                            description: 'description',
                            price: +values.price,
                            date: values.date
                        }
                    },
                    refetchQueries: [{ query: eventsQuery }]
                })
                    .then(response => {
                        resetForm();
                        setSubmitting(false);
                        setToEvents(true);
                    })
                    .catch(err => {
                        // console.log('err: ', err);
                        // this.setState({ error: 'Login failed!' });
                    });
            }}
            validationSchema={object().shape({
                title: string().required(),
                price: number()
                    .positive()
                    .integer()
                    .required(),
                date: date().required()
            })}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Container>
                        {/* {loading && <p>Adding an event - please wait...</p>}``
                        {error && <p>Error :( Please try again</p>} */}
                        <Row>
                            <Col xs="12">
                                <Field
                                    autoFocus
                                    type="text"
                                    name="title"
                                    placeholder="Event name"
                                    component={ReactstrapInput}
                                />
                            </Col>
                            <Col xs="12">
                                <Field type="text" name="price" placeholder="Price" component={ReactstrapInput} />
                            </Col>
                            <Col xs="12">
                                <Field type="date" name="date" component={ReactstrapInput} />
                            </Col>
                            <Col xs="12">
                                <Button color="primary" type="submit" disabled={isSubmitting}>
                                    Create
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </Form>
            )}
        </Formik>
    );
};

export default AddEvent;
