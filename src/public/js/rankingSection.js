
document.getElementById("searchUserRankBtn").addEventListener("click", searchUserRank );
document.getElementById("initUserRankBtn").addEventListener("click", initUserRealtimeRank)

const getUserRankAllBtn  = document.getElementById("getUserRankAllBtn");
getUserRankAllBtn.setAttribute("startPos","0")
getUserRankAllBtn.addEventListener("click", viewUserRankAll )

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

function createModalByUserRankAll( startPos, maxCount, rows ){
    const modalLayer = document.querySelector('.modal'); // 모달 윈도우
    modalLayer.replaceChildren();

    const txt = document.createElement("text");
    txt.innerText = "전체 유저 랭킹"
    modalLayer.appendChild( txt );

    let closeBtn = document.createElement("button");
    closeBtn.innerText = "Close";
    closeBtn.addEventListener( 'click', hideModal );
    modalLayer.appendChild( closeBtn );

    const table = document.createElement( "TABLE" ); 
    let tr = document.createElement( "TR" ); 

    let th = document.createElement( "TH" ); 
    th.innerHTML = "rank"; 
    th.classList.add( 'th' )
    tr.appendChild( th ); 

    th = document.createElement( "TH" ); 
    th.innerHTML = "name"; 
    th.classList.add( 'th' )
    tr.appendChild( th ); 

    th = document.createElement( "TH" ); 
    th.innerHTML = "score"; 
    th.classList.add( 'th' )
    tr.appendChild( th ); 

    table.appendChild( tr ); 

    for( let i = 0; i < rows.length; i++){
        tr = document.createElement( "TR" ); 

        let td = document.createElement( "TD" ); 
        td.innerHTML = startPos + i + 1; 
        td.classList.add( 'td' )
        tr.appendChild( td ); 

        td = document.createElement( "TD" ); 
        td.innerHTML = rows[i].value; 
        td.classList.add( 'td' )
        tr.appendChild( td ); 
    
        td = document.createElement( "TD" ); 
        td.innerHTML = rows[i].score; 
        td.classList.add( 'td' )
        tr.appendChild( td ); 

        table.appendChild( tr ); 
    }

    modalLayer.appendChild( table );

    const prevBtn = document.createElement("button");
    prevBtn.innerText = "Prev";
    modalLayer.appendChild( prevBtn );
    if( startPos > 0 ){
        let pos = startPos - rows.length;
        if( pos < 0 ){
            pos = 0;
        }
        prevBtn.setAttribute("startPos",String(pos) );
        prevBtn.addEventListener( 'click', viewUserRankAll );
    }


    const nextBtn = document.createElement("button");
    nextBtn.innerText = "Next";
    modalLayer.appendChild( nextBtn );

    if( maxCount > rows.length + startPos ){
        const pos = startPos + rows.length;
        nextBtn.setAttribute("startPos",String(pos) );
        nextBtn.addEventListener( 'click', viewUserRankAll );
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
        createModalByUserRankAll( startPos, res.zCard, res.zRange );
        showModal();
    })
    .catch(console.log)

}

function searchUserRank(){
    const element = document.getElementById("searchUserRankName");
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