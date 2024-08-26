import React, {useEffect} from 'react'
import axios from 'axios'

function R111_ApiPostJson() {
    useEffect(() => {
        axios.post('/api/users',{
        }).then( response => {
            console.log('response.data.message : ' + response.data.message);
        })
    });
    return (
        <h1>Call Node Api Post</h1>
    )
}
export default R111_ApiPostJson;