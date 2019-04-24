import React, { useState } from 'react';
import { Badge, Container, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

const mainNavigation = props => {
    const { name, logout, userId } = props;
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
                            <NavLink tag={Link} to="/events">
                                Events
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/bookings">
                                Bookings
                            </NavLink>
                        </NavItem>

                        {!userId && (
                            <React.Fragment>
                                <NavItem>
                                    <NavLink tag={Link} to="/login">
                                        Login
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} to="/signup">
                                        Signup
                                    </NavLink>
                                </NavItem>
                            </React.Fragment>
                        )}

                        {userId && (
                            <NavItem>
                                <NavLink onClick={logout} tag={Link} to="/">
                                    Logout
                                </NavLink>
                            </NavItem>
                        )}
                        <NavItem>
                            <NavLink tag={Link} to="/source">
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
