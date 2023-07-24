
document.getElementById("searchRankUserBtn").addEventListener("click", searchUserRank );
document.getElementById("initUserRankBtn").addEventListener("click",initUserRealtimeRank)
document.getElementById("getUserRankAllBtn").addEventListener("click",viewUserRankAll )

function initUserRealtimeRank(){
    const url = '/rank/user/init';
    fetch( url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify( {
            key : "userRank"
        } )
    })
    .then((res) => res.json())
    .then( (res)=>{
        console.log( res );
    })
    .catch(console.log)
}

function viewUserRankAll(){

    const url = '/rank/user/all';
    fetch( url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify( {
            key : "userRank",
            startPos : 0,       
            endPos   : 10
        } )
    })
    .then((res) => res.json())
    .then( (res)=>{
        console.log( res );
    })
    .catch(console.log)

}

function searchUserRank(){
    const element = document.getElementById("searchRankUserName");
    console.log( element.value );

    const url =  + element.value;
    fetch( '/rank/user/search', {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify( {
            key : "userRank",
            name : element.value 
        } )
    })
    .then((res) => res.json())
    .then( (res)=>{
        console.log( res );
    })
    .catch(console.log)
}