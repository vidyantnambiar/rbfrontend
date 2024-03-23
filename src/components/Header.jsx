import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';




function Header() {
    const user = JSON.parse(localStorage.getItem('currentuser'))
    function logout(){
        localStorage.removeItem("currentuser")
        window.location.href='/login'
    }

  
    return (
        <>
            <Navbar className='bg-primary'>
                <Container className='text-light '>

                    <Navbar.Brand href="#home" className='text-light'>  <h2><i class="fa-solid fa-hotel me-3 ms-5"></i>
                        Room Bookings</h2>
                    </Navbar.Brand>

                    {
                        user?
                           

                            <Dropdown>
                            <Dropdown.Toggle variant="light" id="dropdown-basic">
                            <i class="fa-solid fa-user"></i>  {user.data.name}
                            </Dropdown.Toggle>
                      
                            <Dropdown.Menu>
                              <Dropdown.Item href="#/mybookings">Bookings</Dropdown.Item>
                              <Dropdown.Item href="#/logout" onClick={logout}>Log out</Dropdown.Item>
                             
                            </Dropdown.Menu>
                          </Dropdown>
                            :
                            <> <Link to={'/register'} className='ms-auto'> <button className='btn btn-light' >Register</button>  </Link>
                                <Link to={'/login'}> <button className='btn btn-light ms-3'>Login</button>   </Link> </>
                    }
                    


                </Container>
            </Navbar>


       



        </>
    )
}

export default Header