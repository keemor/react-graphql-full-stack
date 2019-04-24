import React from 'react';

import { Table, Container, Row, Col, Button } from 'reactstrap';
import Loader from 'react-loader-spinner';
import { MdDelete, MdAdd } from 'react-icons/md';

import { useQuery, useMutation } from 'react-apollo-hooks';
import getBookings from '~/gql/getBookings';
import cancelBooking from '~/gql/cancelBooking';

const BookingsList = () => {
    const { data, loading, error } = useQuery(getBookings);
    const cancelBookingMut = useMutation(cancelBooking);

    const handleCancelBooking = bookingId => {
        cancelBookingMut({
            variables: {
                bookingId: bookingId
            },
            refetchQueries: [{ query: getBookings }]
        });
    };

    if (loading)
        return (
            <Container style={{ textAlign: 'center' }}>
                <Loader type="ThreeDots" color="#007bff" height="100" width="100" />
            </Container>
        );
    if (error) return <Container style={{ textAlign: 'center' }}>Something went wrong</Container>;

    return (
        <Container fluid color="dark">
            <Row>
                <Col>
                    <Table color="dark" dark>
                        <thead>
                            <tr>
                                <th>Created</th>
                                <th>Title</th>
                                <th>Date</th>
                                <th>Creator</th>
                                <th>Cancel</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!data.bookings.length && (
                                <tr>
                                    <td colSpan="5">Empty list</td>
                                </tr>
                            )}
                            {data.bookings.map(({ _id, createdAt, user, event }) => {
                                return (
                                    <tr key={_id}>
                                        <td>{createdAt}</td>
                                        <td>{event.title}</td>
                                        <td>{event.date}</td>
                                        <td>{user.name}</td>
                                        <td>
                                            <Button color="primary" onClick={handleCancelBooking.bind(null, _id)}>
                                                Cancel
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default BookingsList;
