import React , { useContext , useEffect, useState  } from 'react'
import { CaptionDataContext  } from '../context/CaptionContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const CaptionProtectWrapper = ({
    children
}) => {

  const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const {caption, setCaption} = useContext(CaptionDataContext);
    const [isLoading , setIsLoading] = useState(true);
     

    console.log(token);
  
    useEffect(() => {
        if(!token){
    navigate('/caption-login');
    }
    }, [token]);

    axios.get(`${import.meta.env.VITE_BASE_URL}/captions/profile`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }).then((response)=>{
        if(response.status === 200){
            const data = response.data;
            setCaption(data.caption);
            setIsLoading(false);
        }
    }).catch((err)=>{
        console.log(err);
        localStorage.removeItem('token');
        navigate('/caption-login');
    })

    if (isLoading) {
        return(
            <div>
                Loading...
            </div>
        )
    }
    
  return (
   <> {children}</>
  )
}

export default CaptionProtectWrapper