import { NavLink as ReactLink, useNavigate} from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
  } from 'reactstrap';
import { doLogout, getCurrentUserDetail, isLoggedIn } from '../auth';
import userContext from '../context/userContext';
  
const CustomNavbar=()=> {
    const userContextData=useContext(userContext)
    let navigate=useNavigate()
    const [isOpen, setIsOpen] = useState(false);
  
    const toggle = () => setIsOpen(!isOpen);
    const [login,setLogin]=useState(false)
    const [user,setuser]=useState(undefined)

    useEffect(()=>{
        setLogin(isLoggedIn())
        setuser(getCurrentUserDetail())

    },[login])

    const logout=()=>{
        doLogout(() => {
            // Logout
            setLogin(false);
            userContextData.setUser({
                data: null,
                login: false
            });
            navigate("/")
        })
    }
  
    return (
        <div>


    
            <Navbar color="light"  expand="md" fixed='' className='px-5' >
                {/* <NavbarBrand tag={ReactLink} to="/about" ><img id='image' src='icon1.png' alt='Logo'></img></NavbarBrand> */}
                <NavbarBrand href="/about">
      <img
        alt="logo"
        src="icon1.png"
        style={{
            // margin:0,
          height: 50,
          width:180
        }}
      />
    </NavbarBrand>

                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="me-auto" navbar>
                        
                    <NavItem>
                            <NavLink tag={ReactLink} to="/">NewFeed</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={ReactLink} to="/about">About</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={ReactLink} to="/services">Services</NavLink>
                        </NavItem>
                        
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>More</DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem tag={ReactLink} to="/services">Contact Us</DropdownItem>
                                <DropdownItem>Facebook</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>Youtube</DropdownItem>
                                <DropdownItem>Instagram</DropdownItem>
                                <DropdownItem>Linkedin</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>

                    <Nav navbar>
                        
                        {
                            login && (
                                <>
                                 <NavItem>
                            <NavLink tag={ReactLink} to={`/user/profile-info/${user.id}`}>Profile Info</NavLink>
                        </NavItem>
                                <NavItem>
                            
                            <NavLink onClick={logout}>Logout</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={ReactLink} to="/user/dashboard">{user.email}</NavLink>
                        </NavItem>
                        </>
                            )
                        }
                        {
                        !login &&(
                            <>
                         <NavItem>
                            <NavLink tag={ReactLink} to="/login">Login</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={ReactLink} to="/signup">SignUp</NavLink>
                        </NavItem> 
    </>
)

                        }
                        </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default CustomNavbar;
