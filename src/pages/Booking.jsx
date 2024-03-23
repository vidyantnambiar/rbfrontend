import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'

function Booking() {
  const [room, setRoom] = useState()
  const { roomid,fromdate,todate} = useParams()
  
  const firstdate=moment(fromdate,'DD-MM-YYYY')
  const lastdate=moment(todate,'DD-MM-YYYY')
  const totaldays=moment.duration(lastdate.diff(firstdate)).asDays()+1;
  const totalamount=totaldays*room?.rentperday

  useEffect(() => {
    async function getalldata() {
      try {
        const response = await axios.post('/api/rooms/getroombyid', { roomid: roomid })
        console.log(response.data);
        setRoom(response.data)
      } catch (err) {
        console.log(err);
      }
    }
    getalldata()
  }, [])
  async function bookroom(){
    
    const bookingdetails={
      room,
      userid:JSON.parse(localStorage.getItem('currentuser'))._id,
      fromdate,
      todate,
      totalamount,
      totaldays
    }
    try{
const result=await axios.post('/api/bookings/bookroom',bookingdetails)
    }catch(err){
      console.log(err);
    }
  }
  return (

    <>

      <div className='container mt-5 bs'>

  


     <div className="row">
    <div className="col-md-5">
      <h3>{room?.name}</h3>
      <img className='d-block w-100 rounded' src={room?.imageurls[0]} alt="" />
    </div>
    <div className="col-md-7 ">
      <div style={{textAlign:"right"}}>
      <h4>Booking details</h4>
      <hr />
      <b>  <p>Name:</p>
        <p>From Date:{fromdate}</p>
        <p>To Date:{todate}</p>
        <p>Max Count:{room?.maxcount}</p></b></div>
      <div style={{textAlign:"right"}}>
        <h4>Amount</h4>
        <hr />
       <b> <p>Total Days:{totaldays}</p>
        <p>Rent per Day:{room?.rentperday}</p>
       <p>Total Amount:{totalamount}</p> </b>
      </div>
      <div style={{float:"right"}}>
        <button className='btn btn-primary mb-3' onClick={bookroom}>Pay Now</button>
      </div>
    </div>
  </div>


    




      
      </div>
    </>
  )
}

export default Booking