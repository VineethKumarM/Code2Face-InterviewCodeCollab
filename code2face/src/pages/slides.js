import React, {useState, useEffect} from 'react'
import { Carousel } from 'react-bootstrap';
import toast from 'react-hot-toast'
const serverLink = process.env.REACT_APP_BACKEND_URI
const Slides = () => {
    let local_Data = localStorage.getItem('slides')
    const [data, setData] = useState(local_Data!==undefined ? JSON.parse(local_Data) : [])

    useEffect(() => {
        async function fetchData() {
            try {
                const res= await fetch(`${serverLink}get_data`, {
                    method: "GET",
                    headers: {
                    "Content-Type": "application/json"
                    },
                });
                const newData = await res.json();
                setData(newData)
                localStorage.setItem('slides', JSON.stringify(newData))
            } catch(error) {
                console.log(error);
                toast.error("Error receiving data")
            }
        }
        fetchData();
        
    }, [])

    return (
        <div className=''>
            <div className='cen-container l-shadow lcentral mt-5 '>
                <Carousel>
                {   
                    data?.map((item, index) => (
                        
                        <Carousel.Item key={index} interval={500}>
                            <div key={index} className='f-height'>
                                <h2>{item.heading}</h2>
                                <h6>{item.body }</h6>
                            </div>
                        </Carousel.Item>

                ))}
                </Carousel>
            </div>
        </div>
    )
}

export default Slides