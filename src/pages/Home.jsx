import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Roomcard from '../components/Roomcard'
import { DatePicker, Space } from 'antd';
import moment from 'moment';
//import 'antd/dist/antd.css'

const { RangePicker } = DatePicker;

function Home() {
  //const [loading,setLoading]=useState([])

  //const [error,setError]=useState([])





  const [rooms, setRooms] = useState([])
  const [fromdate, setFromdate] = useState()
  const [todate, setTodate] = useState()
  const [duplicaterooms, setduplicaterooms] = useState([])
  useEffect(() => {
    async function getalldata() {
      try {
        const response = await axios.get('/api/rooms/getallrooms')
        console.log(response.data);
        setRooms(response.data)
        setduplicaterooms(response.data)
      } catch (err) {
        console.log(err);
      }
    }
    getalldata()
  }, [])

  function filterByDate(dates) {

    setFromdate((dates[0]).format('DD-MM-YYYY'))
    setTodate((dates[1]).format('DD-MM-YYYY'))


    var temprooms = []

    for (const room of duplicaterooms) {
      var availability = false
      if (room.currentbookings.length > 0) {
        for (const booking of room.currentbookings) {

          //check in between or equal to dates
          if (!moment(moment(dates[0]).format('DD-MM-YYYY')).isBetween(booking.fromdate, booking.todate)
            && !moment(moment(dates[1]).format('DD-MM-YYYY')).isBetween(booking.fromdate, booking.todate)) {
            if (
              moment(dates[0]).format('DD-MM-YYYY') !== booking.fromdate &&
              moment(dates[0]).format('DD-MM-YYYY') !== booking.todate &&
              moment(dates[1]).format('DD-MM-YYYY') !== booking.fromdate &&
              moment(dates[1]).format('DD-MM-YYYY') !== booking.todate
            ) {
              availability = true
            }
          }

        }
      }
      if (availability == true/*  || room.currentbookings.length == 0 */) {
        temprooms.push(room)
      }


    }
    setRooms(temprooms)
  }


  return (
    <>
      <div className='container'>
        <div className='row mt-5'>
          <div className="col-md-3">
            <RangePicker format='DD-MM-YYYY' onChange={filterByDate} />

          </div>
        </div>
        <div className='row justify-content-center mt-5'>

          {
            rooms.length > 0 ?
              rooms.map(room => {
                return <div className='col-md-9'>
                  <Roomcard room={room} fromdate={fromdate} todate={todate} />

                </div>

              }) :
              <p></p>
          }


        </div>
      </div>
    </>
  )
}

export default Home












