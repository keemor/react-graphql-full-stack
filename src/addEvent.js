import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Col, Container, Row } from 'reactstrap';
import { ReactstrapInput } from 'reactstrap-formik';
import { object, string, date } from 'yup';

import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import eventsQuery from './eventsQuery';



const createEvent = gql`
    mutation createEvent($event: EventInput) {
            createEvent(eventInput: $event) {
            _id
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
                    initialValues={{ title: '', date: '2018-12-12' }}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        createEvent({
                            variables: {
                                event: {
                                    title: values.title,
                                    description: 'test22222222222222',
                                    price: 123,
                                    date: values.date
                                }
                            }
                        });
                        resetForm();
                        setSubmitting(false);
                    }}
                    validationSchema={object().shape({
                        title: string().required('Required'),
                        date: date().required('Required')
                    })}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Container style={{ paddingTop: '5px' }}>
                                <Row>
                                    <Col xs="12">
                                        <Field type="text" name="title" placeholder="Event name" component={ReactstrapInput} />
                                        <ErrorMessage name="title" component="div" />
                                    </Col>
                                    <Col xs="12">
                                        <Field type="date" name="date" component={ReactstrapInput} />
                                        <ErrorMessage name="date" component="div" />
                                    </Col>
                                    <Col xs="12">
                                        <Button color="primary" type="submit" disabled={isSubmitting}>Submit</Button>
                                    </Col>
                                </Row>
                            </Container>
                            {loading && <p>Adding an event  - please wait...</p>}
                            {error && <p>Error :( Please try again</p>}
                        </Form>
                    )}
                </Formik>
            )}
        </Mutation>
    </div>
);

export default AddEvent;
