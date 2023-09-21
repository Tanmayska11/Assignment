import React, { useEffect, useState } from 'react'
import './NewIssue.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const getLocalitems=()=>{
    let list =localStorage.getItem('items')
   // console.log(list);
    if(list){
        return JSON.parse(localStorage.getItem('items'))
    }
    else{
        return[];
    }
}

export const NewIssue = () => {



    const [issues, setIssues] = useState({

        // issueTitle: '',
        // issueDescription: '',
  
    })

    const navigate = useNavigate()
    
    const [records, setRecords] = useState(getLocalitems())
    //const [latestIssue, setLatestIssue] = useState(); 
    
    
    function handleInputChange(e) {
        const name = e.target.name;
        const value = e.target.value
        console.log(name,value);

        setIssues({ ...issues, [name]: value }) //name is just like a index of arr
            //name is the key which is already given from input tag and value is taken from input
    };

   
    
    const handleSubmit = (e) => {
        
        e.preventDefault()
        const newRecord = {
            ...issues,
            id: new Date().getTime().toString(),
           
        }
        setRecords([...records, newRecord])
       // setLatestIssue(newRecord);
        localStorage.setItem('items', JSON.stringify([...records,newRecord]));
        alert('form submited')
        navigate(`/`)
    }

      



    return (
        <div className='container1'>
            <form onSubmit={handleSubmit}>

                <p className="fs-2">New Issue</p>
                <div className="input-group">
                    <input type="text"
                        name='title'
                        onChange={handleInputChange}
                        className="form-control"
                        placeholder="Title"
                        required />
                </div>
                <div className="input-group">

                    <textarea className="form-control text1"
                        name='body'
                        onChange={handleInputChange}
                        required
                        placeholder='Leave Comment '></textarea>
                </div>


                <div className="cont2">
                    <button  className="btn btn-primary"
                        type='submit'

                        placeholder='Leave a comment'

                    >Submit new issue</button>

                </div>
            </form>

            {/* <div> {records.map((ele)=>{
                return(
                    <>
                    <span> {ele.title} </span>
                    <span> {ele.body} </span>


                    </>
                )
            })}  </div> */}
        </div>
    )
}
