import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
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
                        <div>
                            <Form>
                                <div>
                                    <label htmlFor="title">Title: </label>
                                    <Field type="text" name="title" placeholder="Event name" />
                                    <ErrorMessage name="title" component="div" />
                                </div>
                                <div>
                                    <label htmlFor="date">Date: </label>
                                    <Field type="date" name="date" />
                                    <ErrorMessage name="date" component="div" />
                                </div>
                                <div>
                                    <button type="submit" disabled={isSubmitting}>Submit</button>
                                </div>
                            </Form>
                            {loading && <p>Adding an event  - please wait...</p>}
                            {error && <p>Error :( Please try again</p>}
                        </div>
                    )}
                </Formik>
            )}
        </Mutation>
    </div>
);

export default AddEvent;
