import React, { useEffect } from 'react';

import { Table, Container, Row, Col, Button } from 'reactstrap';
import Loader from 'react-loader-spinner';

import { useQuery, useMutation } from 'react-apollo-hooks';
import getBookings from '~/gql/getBookings';
import cancelBooking from '~/gql/cancelBooking';

const BookingsList = () => {
    const { data, loading, error, refetch } = useQuery(getBookings);
    const cancelBookingMut = useMutation(cancelBooking);

    //TO DO: https://stackoverflow.com/questions/49906437/how-to-cancel-a-fetch-on-componentwillunmount
    useEffect(() => {
        refetch();
    }, []);

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
                                <th>Cancel</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!data.bookings.length && (
                                <tr>
                                    <td colSpan="5">Empty list</td>
                                </tr>
                            )}
                            {data.bookings.map(({ _id, createdAt, event }) => {
                                return (
                                    <tr key={_id}>
                                        <td>{createdAt}</td>
                                        <td>{event.title}</td>
                                        <td>{event.date}</td>
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
