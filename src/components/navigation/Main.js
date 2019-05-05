import React, { useState } from 'react';
import { Badge, Container, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

const mainNavigation = props => {
    const { name, userId } = props;
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <Container fluid color="dark">
            <Navbar color="dark" dark expand="md">
                <NavbarBrand tag={Link} to="/">
                    Easy Event
                </NavbarBrand>
                <h4>
                    <Badge color="dark">{name}</Badge>
                </h4>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink tag={Link} to="/events" onClick={toggle}>
                                Events
                            </NavLink>
                        </NavItem>

                        {!userId && (
                            <>
                                <NavItem>
                                    <NavLink tag={Link} to="/login" onClick={toggle}>
                                        Login
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} to="/signup" onClick={toggle}>
                                        Signup
                                    </NavLink>
                                </NavItem>
                            </>
                        )}

                        {userId && (
                            <>
                                <NavItem>
                                    <NavLink tag={Link} to="/bookings" onClick={toggle}>
                                        My Bookings
                                    </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink tag={Link} to="/logout" onClick={toggle}>
                                        Logout
                                    </NavLink>
                                </NavItem>
                            </>
                        )}
                        <NavItem>
                            <NavLink tag={Link} to="/source" onClick={toggle}>
                                Source
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </Container>
    );
};
export default mainNavigation;
