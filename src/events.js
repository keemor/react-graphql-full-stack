import React from 'react';
import { Query } from 'react-apollo';

import eventsQuery from './eventsQuery';

const EventsList = () => {
    return (
        <Query
            query={eventsQuery}
        >
            {({ data, loading, error }) => {
                console.log('data: ', data);

                if (loading) return <p>Loading...</p>;
                if (error) return <p>Something went wrong</p>;

                return (
                    <table>
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
                            {data.events.length ? '' : (<tr><td colSpan="3">Empty list</td></tr>)}
                            {data.events.map(({ _id, title, price, date }) => {
                                return (
                                    <tr key={_id}>
                                        <td >{title}</td>
                                        <td >{price}</td>
                                        <td >{date}</td>
                                    </tr>
                                );
                            }
                            )}
                        </tbody>
                    </table>
                );
            }}
        </Query>
    );
};

export default EventsList;