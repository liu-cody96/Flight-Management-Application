import { Nav, NavItem, NavLink, NavSection } from '../components/Nav';

// This is an opinionated NavBar
export const AppNav = () => {

    return (
        <Nav backgroundColor={'#221D1D'} color={'white'}>
            <NavSection jc="flex-start">
                <NavItem>
                    <NavLink to="/">View Current Flights</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/new">Add New Flight</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/update">Update Existing Flight</NavLink>
                </NavItem>
            </NavSection>
            <NavSection jc="flex-end">
                {/* If the username is truthy, render the hello message, otherwise don't render anything */}
                <NavItem>
                    Sign In
                </NavItem>
                <NavItem>Sign Up</NavItem>
            </NavSection>
        </Nav>
    );
}
