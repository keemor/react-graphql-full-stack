import React from 'react';
import { Badge, Container, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

class mainNavigation extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <Container fluid color="dark">
                <Navbar color="dark" dark expand="md">
                    <NavbarBrand tag={Link} to="/">
                        Easy Event
                    </NavbarBrand>
                    <h4>
                        <Badge color="dark">{this.props.name}</Badge>
                    </h4>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink tag={Link} to="/events">
                                    Events
                                </NavLink>
                            </NavItem>

                            {!this.props.userId && (
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

                            {this.props.userId && (
                                <NavItem>
                                    <NavLink onClick={this.props.logout} tag={Link} to="/">
                                        Logout
                                    </NavLink>
                                </NavItem>
                            )}
                            <NavItem>
                                <NavLink tag={Link} to="/source">
                                    Source
                                </NavLink>
                            </NavItem>
                            {/* <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Options
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>Option 1</DropdownItem>
                                    <DropdownItem>Option 2</DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>Reset</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown> */}
                        </Nav>
                    </Collapse>
                </Navbar>
            </Container>
        );
    }
}

// import React from 'react';
// import { NavLink } from 'react-router-dom';
// const mainNavigation = () => (
//     <header>
//         EasyEvent
//         <nav>
//             <ul>
//                 <li>
//                     <NavLink to="/events">Events</NavLink>
//                 </li>
//                 <li>
//                     <NavLink to="/auth">Login</NavLink>
//                 </li>
//             </ul>
//         </nav>
//     </header>
// );

export default mainNavigation;
