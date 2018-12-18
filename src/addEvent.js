import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

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
// TO DO npm install yup --save
//https://jaredpalmer.com/formik/docs/overview
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
                    initialValues={{ title: '', date: '2018-07-22' }}
                    validate={values => {
                        let errors = {};
                        if (!values.title) {
                            errors.title = 'Required';
                        }
                        if (!values.date) {
                            errors.date = 'Required';
                        }
                        return errors;
                    }}
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
                >
                    {({ isSubmitting }) => (
                        <div>
                            <Form>
                                <div>
                                    <label for="title">Title: </label>
                                    <Field type="text" name="title" placeholder="Event name" />
                                    <ErrorMessage name="title" component="div" />
                                </div>
                                <div>
                                    <label for="date">Date: </label>
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
