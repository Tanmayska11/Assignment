import React from 'react'
import './Home.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { NewIssue } from './NewIssue';
import { Issue } from './Issue';



const Api = 'https://api.github.com/search/issues?q={query}{current%20page}'


export const Home = () => {

   const [apiRecords,setApiRecords]=useState([]) 

   useEffect(()=>{
   const responce= axios.get('https://api.github.com/search/issues?q={query}{current%20page}')
   console.log(responce);
   responce.then((e)=>{
       console.log(e.data.items);
         setApiRecords(e.data.items)
   }).catch(err =>{console.log(err)})
   
   
   },[])

   console.log(apiRecords);




   const existingArray = JSON.parse(localStorage.getItem('items')) || [];

   // Filter out duplicate objects from the API array
   const uniqueApiObjects = apiRecords.filter(apiObject => {
     return !existingArray.some(existingObject => existingObject.id === apiObject.id);
   });

   // Concatenate the unique API objects with the existing array
   const updatedArray = existingArray.concat(uniqueApiObjects);

   // Update the local array in localStorage
   localStorage.setItem('items', JSON.stringify(updatedArray));



















//    const localStorageData = JSON.parse(localStorage.getItem('items'));



//Step 3: Retrieve Existing Data from Local Storage
//let existingData = JSON.parse(localStorage.getItem('items')) || [];

// // Step 4: Merge Data
// existingData = existingData.concat(apiRecords);


//    const mergedData = apiRecords.concat(
//     localStorageData.filter(itemFromLS =>
//       !apiRecords.some(itemFromAPI => itemFromAPI.id === itemFromLS.id)
//     )
//   );

    // // Step 5: Update Local Storage
    // localStorage.setItem('items', JSON.stringify(existingData));




    const listOfIssues = JSON.parse(localStorage.getItem('items'));
    console.log(listOfIssues);

    const [currentPage, setCurrentPage] = useState(1)
    const recordsPerPage = 10;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = listOfIssues.slice(firstIndex, lastIndex);
    const npage = Math.ceil(listOfIssues.length / recordsPerPage)

    // const records = apiRecords.slice(firstIndex, lastIndex);
    // const npage = Math.ceil(apiRecords.length / recordsPerPage)

    const numbers = [...Array(npage + 1).keys()].slice(1)


    return (
        <div className='mainCont'>
            <div className='header'>GitHub Issues</div>
            <div className='flex-containar'>
                <Link className='btn btn-primary' to='/newIssue'>New Issue</Link>
            </div>
            <div className='cont'>

                {
                    
                    records === null ? '' :
                  records && records.map((e) => {

                            //console.log(e.id)
                            return (
                                <>
                                    <div key={e.id} className="card text-center" style={{ height: '90px', marginBottom: '10px' }} >
                                        <div className="card-body " style={{ textAlign: 'left' }}>
                                           
                                            <Link href="#" className="custom-link" to={`/issue/description/${e.id}`} style={{ marginBottom: '-20px' }}>
                                                <i className="fa fa-dot-circle-o" style={{ fontSize: '25px', textAlign: 'left', marginRight: '10px' }}> </i>
                                                {/* {e.issue} */}
                                                {e.title}
                                            </Link>
                                        </div>
                                        <div className="text-body-secondary" style={{ textAlign: 'left', fontSize: '15px', paddingLeft: '12px' }}>
                                            #{e.id}
                                        </div>
                                    </div>
                                </>

                            )
                        })}
                <nav style={{marginTop:'100px'}}>
                    <ul className='pagination justify-content-center'>
                        <li className='page-item'>
                            <a href='#' className='page-link'
                                onClick={prePage}>
                                Prev
                            </a>
                        </li>
                        {
                            numbers.map((n, i) => (
                                <li className={`page - item ${currentPage === n ? 'active' : ''}`} key={i}>
                                    < a href='#' className='page-link'
                                        onClick={() => changeCPage(n)} > {n}</a>
                                </li>
                            ))
                        }
                        <li className='page-item'>
                            < a href='#' className='page-link'
                                onClick={nextPage}>
                                Next
                            </a >
                        </li >
                    </ul >
                </nav >
            </div>


        </div >
    )

    function prePage() {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    function changeCPage(id) {
        setCurrentPage(id)
    }



    function nextPage() {

        if (currentPage !== npage) {
            setCurrentPage(currentPage + 1)

        }

    }




}

