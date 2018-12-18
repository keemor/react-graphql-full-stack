import React, { Component } from 'react';
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

export default class AddEvent extends Component {
    state = {
        title: 'Event next',
        date: '2018-07-22'
    };

    updateTitle = ({ target: { value } }) => {
        this.setState({ title: value });
    };

    updateDate = ({ target: { value } }) => {
        this.setState({ date: value });
    };


    resetFields = () => {
        this.setState({ title: '' });
    };

    render() {
        return (
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
                    <form
                        onSubmit={evt => {
                            evt.preventDefault();
                            createEvent({
                                variables: {
                                    event: {
                                        title: this.state.title,
                                        description: 'test22222222222222',
                                        price: 123,
                                        date: this.state.date
                                    }
                                }
                            });
                            this.resetFields();
                        }}
                    >
                        <label>
                            <span>Title</span>
                            <input
                                type="text"
                                value={this.state.title}
                                onChange={this.updateTitle}
                            />
                        </label>

                        <label>
                            <span>Date</span>
                            <input
                                type="date"
                                value={this.state.date}
                                onChange={this.updateDate}
                            />
                        </label>


                        <div>
                            <button>Add Event</button>
                        </div>
                        {loading && <p>Adding an event  - please wait...</p>}
                        {error && <p>Error :( Please try again</p>}
                    </form>
                )}
            </Mutation>
        );
    }
}