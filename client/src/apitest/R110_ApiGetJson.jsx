import React, {useEffect} from 'react'
function R110_ApiGetJson() {
    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/users');
            const body = await response.json();
            console.log('body.message : ' + body.message);
        };
        fetchData();
    });
    return (
        <h1>Call Node Api Get</h1>
    )
}
export default R110_ApiGetJson;