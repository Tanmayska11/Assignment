import React, { useState } from 'react'
import "./issue.css"
import { useHref, useParams } from 'react-router-dom';


// const getLocaComments=()=>{
//     let list =localStorage.getItem('issues')
//     console.log(list);
//     if(list){
//         return JSON.parse(localStorage.getItem('issues'))
//     }
//     else{
//         return[];
//     }
// }


export const Issue = () => {

    const [comment, setComment] = useState('');
    const { id } = useParams();



    console.log({ id });
    const listOfIssues = JSON.parse(localStorage.getItem('items'));
    console.log({ listOfIssues });

    const selectedIssue = listOfIssues.filter(issue => issue.id == id)
    console.log({ selectedIssue });
    if (!selectedIssue) {
        return <div>Issue not found</div>;
    }



    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleCommentSubmit = (event) => {
        event.preventDefault();

        if (comment.trim() === '') {
            alert('Comment cannot be blank');
            return; // Don't proceed with submission
        }

        const newComment = {
            text: comment,
            timestamp: new Date().toISOString()
        };

        selectedIssue.map((e) => {

            if (e.comments) {
                e.comments.push(newComment);
            } else {
                e.comments = [newComment];
            }
        })

        console.log(selectedIssue.comments);

        // Update the localStorage
        localStorage.setItem('items', JSON.stringify(listOfIssues));

        // Clear the comment input
        setComment('');

    };



    console.log({ selectedIssue })



    return (
        <div className='container2'>

            <div>
                <p style={{ textAlign: 'center' }} className="fs-2">Details</p>
            </div>
            {
                selectedIssue.map((e) => {
                    return (
                        <>
                            <div className='issu-con'>

                                <div className='issue'>
                                    <h2 className='text'>
                                        {e.title}
                                    </h2>
                                </div>
                                <div className='issue-desc'>
                                    <p className='text'>
                                        {
                                            e.body}
                                    </p>
                                </div>
                            </div>
                        </> 
                    )

                })
            }
            <hr />

            {
                selectedIssue[0].comments &&
                selectedIssue[0].comments.map((e) => {
                    console.log(e);
                    const commentTime = new Date(e.timestamp);
                    const currentTime = new Date();
                    const timeDifference = Math.round((currentTime - commentTime) / (1000 * 60 * 60)); // Time difference in hours

                    let timeAgoText;
                    if (timeDifference === 0) {
                        timeAgoText = 'just now';
                    } else if (timeDifference === 1) {
                        timeAgoText = '1 hour ago';
                    } else {
                        timeAgoText = `${timeDifference} hrs ago`;
                    }



                    console.log(e);
                    return (
                        <>
                            <div class="card" style={{ marginTop: '10px' }}>

                                <div class="card-body">

                                    <p class="card-text"><span>{`commented on ${timeAgoText}`}</span></p>
                                    <h5 class="card-title">{e.text}</h5>

                                </div>
                            </div>

                        </>
                    )
                })
            }



            <form onSubmit={handleCommentSubmit}>
                <div className="input-group-comment">
                    <textarea className="form-control text1"
                        name='issueComment'
                        placeholder='Leave a comment '
                        onChange={handleCommentChange}
                        style={{ height: '45px', marginTop: '30px' }}
                    ></textarea>


                </div>
                <div className="cont3">
                    <button className="btn btn-primary"
                        type='submit'
                        placeholder='Leave a comment'>
                        comment
                    </button>


                </div>

            </form>



        </div>
    )
}


// 



