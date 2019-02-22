import React from 'react';

import { Table, Container } from 'reactstrap';
import Loader from 'react-loader-spinner';
import { MdDelete } from 'react-icons/md';

import { Query } from 'react-apollo';
import eventsQuery from './eventsQuery';

// const deleteEvent = gql`
//   mutation deleteEvent($eventId: String!) {
//     deleteEvent(eventId: $eventId) {
//       _id
//       price
//       title
//     }
//   }
// `;

const EventsList = () => {
    return (
        <Query query={eventsQuery}>
            {({ data, loading, error }) => {
                if (loading)
                    return (
                        <Container style={{ textAlign: 'center' }}>
                            <Loader type="ThreeDots" color="#007bff" height="100" width="100" />
                        </Container>
                    );
                if (error) return <Container style={{ textAlign: 'center' }}>Something went wrong</Container>;
                return (
                    <Container style={{ paddingTop: '5px' }}>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Price</th>
                                    <th>Date</th>
                                    <th>Creator</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!data.events.length && (
                                    <tr>
                                        <td colSpan="4">Empty list</td>
                                    </tr>
                                )}
                                {data.events.map(({ _id, title, price, date, creator }) => {
                                    return (
                                        <tr key={_id}>
                                            <td>{title}</td>
                                            <td>{price}</td>
                                            <td>{date}</td>
                                            <td>{creator.email}</td>
                                            <td>
                                                <MdDelete id={_id} />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </Container>
                );
            }}
        </Query>
    );
};

export default EventsList;
