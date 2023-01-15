import React  , { useState, useEffect } from 'react'
import {useParams} from 'react-router-dom';
import axios from "axios";
import Loader from '../components/Loader';
import moment from 'moment';
import { Modal, Carousel, Button} from "react-bootstrap";
import {Link} from "react-router-dom";





function Bookingsscrren({match}) {
  const user = JSON.parse(localStorage.getItem("currentuser"));
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState()
    const [room, setroom] = useState()
    const [payment , setpayment] = useState()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    

    let { id } = useParams();
    let {fromdate} = useParams();
    let {todate} = useParams();


    
    const fromdate1 = moment(fromdate, 'DD-MM-YYYY')
    const todate1 = moment(todate, 'DD-MM-YYYY')
    const totaldays=moment.duration(todate1.diff(fromdate1)).asDays()+1

    

    const [totalAmount ,settotalAmount] = useState()
    
    
    
      useEffect(() => {
        const fetchData = async () => {
          try {
            setloading(true)
            const data = (await axios.post('/api/rooms/getroombyid',  {roomid : id})).data
            settotalAmount(data.rentperday * totaldays)
            setroom(data)
            setloading(false)
            console.log(data);
          } catch (error) {
            seterror(true)
            console.log(error);
            setloading(false)
          }
        };
        fetchData();
      }, []);


    useEffect(() => {
      const fetchData = async () => {
       const bookingDetails ={

        room ,
        userid : JSON.parse(localStorage.getItem('currentuser'))._id,
        fromdate1,
        todate1,
        totalAmount,
        totaldays


      }

       try {
        const data= await axios.post('/api/bookings/bookroom' , bookingDetails).data
        setpayment(data)
       } catch (error) {
        
       }

     };

     fetchData();
    }, []);

  return (
    <div className='m-5'>
      {loading ? (<h1><Loader/></h1>) : error ? (<h1>error....</h1>) : (<div>


       <div className="row justify-content-center mt-5 bs">
        
           <div className="col-md-6">
            <h1>{room.name}</h1>
            <img src={room.imageurls[0]} className='bigimg' />
           </div>
           <div className="col-md-6">
           <div style={{textAlign: 'right'}}>
           <h1>
                Booking Details
            </h1>
            <hr/>

            <b><p>Name : {user.name}</p>
            <p>From Date : {fromdate}</p>
            <p>To Date : {todate}</p>
            <p>Max Count : {room.maxcount}</p>
            </b>
            
           </div>

           <div style={{textAlign: 'right'}}>

           <h1>Amount</h1>
           <hr/>
           <b>
           <p>Total Days : {totaldays}</p>
           <p>Rent Per Day : {room.rentperday}</p>
           <p>Total Amount : {totalAmount}</p>
           </b>
           </div>

           <div style={{float: 'right'}}>
           <button className="btn btn-primary" onClick={handleShow}>book now</button>
           </div> 
           </div>
           
           <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Carousel>
      
      
      {room.imageurls.map(url=>{
        return <Carousel.Item>
        <img
          className="d-block w-100 bigimg"
          src={url}
          
        /> </Carousel.Item>



      })}

        
     
    </Carousel>

         <p> <h1>Here is your Total:</h1>{totalAmount}</p>
         <p><h1>total number of days you are staying</h1>{totaldays}</p>
         <p>We are waiting for you, thankyou for booking</p>



        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>


           


       </div>


      </div>)}
    </div>
  )
}

export default Bookingsscrren
