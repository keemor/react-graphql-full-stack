import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Table, Container, Row, Col, NavLink, Navbar, Button } from 'reactstrap';
import Loader from 'react-loader-spinner';
import { MdDelete, MdAdd } from 'react-icons/md';
import { useQuery, useMutation } from 'react-apollo-hooks';

import DeleteEvent from '~/components/deleteEvent';
import AuthContext from '~/context/auth';

import getEvents from '~/gql/getEvents';
import deleteEvent from '~/gql/deleteEvent';
import bookEvent from '~/gql/bookEvent';

const EventsList = () => {
    const { data, loading, error } = useQuery(getEvents);
    const deleteEventMut = useMutation(deleteEvent);
    const bookEventMut = useMutation(bookEvent);

    const context = useContext(AuthContext);

    const handleDeleteEvent = eventId => {
        deleteEventMut({
            variables: {
                eventId: eventId
            },
            refetchQueries: [{ query: getEvents }]
        });
    };

    const handleBookEvent = eventId => {
        bookEventMut({
            variables: {
                eventId: eventId
            }
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
                    <Navbar color="dark" dark>
                        <NavLink tag={Link} to="/add_event">
                            <MdAdd />
                            Add Event
                        </NavLink>
                    </Navbar>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table color="dark" dark>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Price</th>
                                <th>Date</th>
                                <th>Creator</th>
                                {context.userId && (
                                    <React.Fragment>
                                        <th>Book</th>
                                        <th>Delete</th>
                                    </React.Fragment>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {!data.events.length && (
                                <tr>
                                    <td colSpan="4">Empty list</td>
                                </tr>
                            )}
                            {data.events.map(({ _id, title, price, date, creator }) => {
                                const allowDelete = context.userId === creator._id;
                                return (
                                    <tr key={_id}>
                                        <td>{title}</td>
                                        <td>{price}</td>
                                        <td>{date}</td>
                                        <td>{creator.name}</td>
                                        {context.userId && (
                                            <td>
                                                <Button color="primary" onClick={handleBookEvent.bind(null, _id)}>
                                                    Book
                                                </Button>
                                            </td>
                                        )}
                                        {context.userId && (
                                            <td>
                                                {allowDelete && (
                                                    <DeleteEvent
                                                        handleDeleteEvent={handleDeleteEvent.bind(null, _id)}
                                                        title={title}
                                                    />
                                                )}
                                            </td>
                                        )}
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

export default EventsList;
