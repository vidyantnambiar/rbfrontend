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
  const [fromdate,setFromdate]=useState()
  const [todate,setTodate]=useState()
  useEffect(() => {
    async function getalldata() {
      try {
        const response = await axios.get('/api/rooms/getallrooms')
        console.log(response.data);
        setRooms(response.data)
      } catch (err) {
        console.log(err);
      }
    }
    getalldata()
  }, [])

  function filterByDate(dates){

    setFromdate((dates[0]).format('DD-MM-YYYY'))
    setTodate((dates[1]).format('DD-MM-YYYY'))
        }

  return (
    <>
<div className='container'>
<div className='row mt-5'>
            <div className="col-md-3">
            <RangePicker format='DD-MM-YYYY' onChange={filterByDate}/>

            </div>
        </div>
      <div className='row justify-content-center mt-5'>
    
        {
          rooms.length > 0 ?
            rooms.map(room => {
              return <div className='col-md-9'>
                <Roomcard room={room} fromdate={fromdate} todate={todate}/>

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












