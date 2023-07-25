
document.getElementById("searchUserRankBtn").addEventListener("click", searchUserRank );
document.getElementById("initUserRankBtn").addEventListener("click", initUserRealtimeRank)
document.getElementById('deleteUserRankBtn').addEventListener("click", deleteUserRank);

document.getElementById('updateUserRankScoreBtn').addEventListener('click', updateUserRankScore );

const getUserRankAllBtn  = document.getElementById("getUserRankAllBtn");
getUserRankAllBtn.setAttribute("startPos","0")
getUserRankAllBtn.addEventListener("click", viewUserRankAll )

function updateUserRankScore(){
    const nameElement   = document.getElementById('userRankName')
    const scoreElement  = document.getElementById('newUserRankScore')

    const userName = nameElement.value;
    const newScore = Number( scoreElement.value );

    console.log( userName );
    console.log( newScore );

    if( newScore === 0 )
        return;

    const url = '/rank/user';

    fetch( url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify( {
            key : "userRank",
            score : newScore,
            name : userName
        } )
    })
    .then((res) => res.json())
    .then( (res)=>{
        scoreElement.value = "";
        hideModal();
    })
    .catch(console.log)
}

function deleteUserRank(event){
    const userName = event.target.getAttribute("userName")
    const url = '/rank/user';

    fetch( url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify( {
            key : "userRank",
            name : userName
        } )
    })
    .then((res) => res.json())
    .then( (res)=>{
        event.target.setAttribute("userName","")
        hideModal();
    })
    .catch(console.log)
}
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

function updateModalByUserRankAll( startPos, maxCount, rows ){
    const userRankTable = document.getElementById( "userRankTable" ); 
    userRankTable.replaceChildren();

    for( let i = 0; i < rows.length; i++){
        tr = document.createElement( "TR" ); 

        let td = document.createElement( "TD" ); 
        td.innerHTML = startPos + i + 1; 
        td.classList.add( 'td' )
        td.setAttribute('width', '20%');
        tr.appendChild( td ); 

        td = document.createElement( "TD" ); 
        td.innerHTML = rows[i].value; 
        td.setAttribute('width', '60%');
        td.classList.add( 'td' )
        tr.appendChild( td ); 
    
        td = document.createElement( "TD" ); 
        td.innerHTML = rows[i].score; 
        td.setAttribute('width', '20%');
        td.classList.add( 'td' )
        tr.appendChild( td ); 

        userRankTable.appendChild( tr ); 
    }

    const prevBtn = document.getElementById("prevBtn");
    if( startPos > 0 ){
        let pos = startPos - rows.length;
        if( pos < 0 ){
            pos = 0;
        }
        prevBtn.removeAttribute('disabled');
        prevBtn.setAttribute("startPos",String(pos) );
        prevBtn.addEventListener( 'click', viewUserRankAll );
    }else{
        prevBtn.setAttribute('disabled',true);
    }



    const nextBtn = document.getElementById("nextBtn");    
    if( maxCount > rows.length + startPos ){
        const pos = startPos + rows.length;
        nextBtn.removeAttribute('disabled');
        nextBtn.setAttribute("startPos",String(pos) );
        nextBtn.addEventListener( 'click', viewUserRankAll );
    }else{
        nextBtn.setAttribute('disabled',true);
    }


}

function viewUserRankAll( event ){
    const startPos = Number( event.target.getAttribute("startPos") );

    const url = '/rank/user/all';
    fetch( url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify( {
            key : "userRank",
            startPos : startPos,       
            endPos   : startPos + 9
        } )
    })
    .then((res) => res.json())
    .then( (res)=>{
        console.log( res.zRange );
        updateModalByUserRankAll( startPos, res.zCard, res.zRange );
        showModal('modalUserRankAll');
    })
    .catch(console.log)

}


function updateModalByUserRank( name, rank, score ){
  
    let txt = document.getElementById("userRankName");
    txt.value = name;

    txt = document.getElementById("userRankRank");
    txt.value = rank;

    txt = document.getElementById("userRankScore");
    txt.value = score;

    document.getElementById('deleteUserRankBtn').setAttribute('userName', name );
}

function searchUserRank(){
    const element = document.getElementById("searchUserRankName");
    console.log( element.value );
    if( element.value === "")
        return;


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
        if( res.zRank ){
            updateModalByUserRank( element.value, res.zRank, res.zScore );
            showModal('modalUserRank');
        }else{
            alert("Not Found User : " + element.value );
        }

    })
    .catch(console.log)
}