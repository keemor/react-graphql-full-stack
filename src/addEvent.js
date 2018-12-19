import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, Col, Container, Row } from 'reactstrap';
import { ReactstrapInput } from 'reactstrap-formik';
import { object, string, date, number, positive, integer } from 'yup';

import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import eventsQuery from './eventsQuery';

const createEvent = gql`
    mutation createEvent($event: EventInput) {
            createEvent(eventInput: $event) {
            _id
            price
            title
        }
      
    }
 `;

const AddEvent = () => (
    <div>
        <Mutation
            mutation={createEvent}
            refetchQueries={[
                {
                    query: eventsQuery
                }
            ]}
            awaitRefetchQueries={true}
        >
            {(createEvent, { loading, error }) => (
                <Formik
                    initialValues={{ title: '', date: '2018-12-12', price: '' }}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        createEvent({
                            variables: {
                                event: {
                                    title: values.title,
                                    description: 'description',
                                    price: +values.price,
                                    date: values.date
                                }
                            }
                        });
                        resetForm();
                        setSubmitting(false);
                    }}
                    validationSchema={object().shape({
                        title: string().required(),
                        price: number().positive().integer().required(),
                        date: date().required()
                    })}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Container style={{ paddingTop: '5px' }}>
                                {loading && <p>Adding an event  - please wait...</p>}
                                {error && <p>Error :( Please try again</p>}
                                <Row>
                                    <Col xs="12">
                                        <Field type="text" name="title" placeholder="Event name" component={ReactstrapInput} />
                                    </Col>
                                    <Col xs="12">
                                        <Field type="text" name="price" placeholder="Price" component={ReactstrapInput} />
                                    </Col>
                                    <Col xs="12">
                                        <Field type="date" name="date" component={ReactstrapInput} />
                                    </Col>
                                    <Col xs="12">
                                        <Button color="primary" type="submit" disabled={isSubmitting}>Create</Button>
                                    </Col>
                                </Row>
                            </Container>
                        </Form>
                    )}
                </Formik>
            )}
        </Mutation>
    </div>
);

export default AddEvent;
