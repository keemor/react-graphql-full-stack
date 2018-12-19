import React from 'react';

import { Table, Container } from 'reactstrap';

import { Query } from 'react-apollo';
import eventsQuery from './eventsQuery';

const EventsList = () => {
    return (
        <Query
            query={eventsQuery}
        >
            {({ data, loading, error }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Something went wrong</p>;
                return (
                    <Container style={{ paddingTop: '5px' }}>
                        <Table>
                            <thead>
                                <tr>
                                    <th>
                                        Title
                            </th>
                                    <th>
                                        Price
                            </th>
                                    <th>
                                        Date
                            </th>
                                </tr>
                            </thead>
                            <tbody>
                                {!data.events.length && <tr><td colSpan="3">Empty list</td></tr>}
                                {data.events.map(({ _id, title, price, date }) => {
                                    return (
                                        <tr key={_id}>
                                            <td >{title}</td>
                                            <td >{price}</td>
                                            <td >{date}</td>
                                        </tr>
                                    );
                                }
                                )}</tbody>
                        </Table>
                    </Container>
                );
            }}
        </Query>
    );
};

export default EventsList;