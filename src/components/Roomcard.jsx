import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';


export function Roomcard({ room ,fromdate,todate}) {
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div className='row mt-3 bs p-2' >
        <div className='col-md-4 mt-2'>
          <img className='smallImg rounded' src={room.imageurls[0]} />
        </div>
        <div className='col-md-7'>
          <h3>{room.name}</h3>
          <h6> <p>Max Count:{room.maxcount}</p>
            <p>Phone Number:{room.phonenumber}</p>
            <p>Type:{room.type}</p></h6>
          <div style={{ float: "right" }}>
            <Link to={`/book/${room._id}/${fromdate}/${todate}`}>
              <button className='btn btn-primary me-2'>Book Now</button>
            </Link>
            <button className='btn btn-primary' onClick={handleShow }>View Details</button>
            <Modal show={show} onHide={handleClose} className='modal mt-5 p-5' >
        <Modal.Header closeButton>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Carousel>
      
      {room.imageurls.map(url=>{
       return <Carousel.Item>
        <img className='d-block w-100 rounded img-fluid' src={url} />
        </Carousel.Item>
      })}
    
      
      
    </Carousel>



        </Modal.Body>
      <p className='ms-3'><b>{room.description}</b></p>
        <Modal.Footer>
        
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>
          </div>
        </div>


      </div>
    </>
  )
}

export default Roomcard