document.getElementById("sendMailBtn").addEventListener("click", sendMail );
document.getElementById("getMailsSentFromAdminBtn").addEventListener("click", getMailsSentFromAdmin );

function sendMail(){
    const userName = document.getElementById("sendMailUserName").value;
    const title = document.getElementById("sendMailTitle").value;
    const content = document.getElementById("sendMailContent").value;
    const gold = document.getElementById("sendMailGold").value;
    const itemIndex_1 = document.getElementById("sendMailItem_1").value;
    const itemIndex_2= document.getElementById("sendMailItem_2").value;
    const itemIndex_3= document.getElementById("sendMailItem_3").value;

    const items = [{index:itemIndex_1},{index:itemIndex_2},{index:itemIndex_3}];

    if( title.length > 20 ){
        alert( "제목 길이 초과(20) : "+ title.length)
        return;
    }

    if( content.length > 255){
        alert("내용 길이 초과(255) : " + content.length )
    }

    console.log( items );
    fetch( "/mail", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify( {
            title : title,
            content : content,
            gold : gold,
            userName: userName,
            items:items
        } )
    })
    .then((res) => res.json())
    .then( (res)=>{
        console.log(res);
    })
    .catch(console.log)    
}
function getMailAttachedItem( event ){
    const mailId = event.target.getAttribute( "mailId" );
    
    const url = "/mail/" + mailId + "/items";

    fetch( url )
    .then((res) => res.json())
    .then( (res)=>{
        console.log(res);
    })
    .catch(console.log)   
}
function updateModalAdminMail( mailList ){

    const tbody = document.getElementById("tbodyAdminMail")
    tbody.replaceChildren();

    for( let i = 0; i < mailList.length; i++){
        let tr = document.createElement( "TR" ); 

        let td = document.createElement( "TD" ); 
        td.innerHTML = mailList[i].checked;
        td.classList.add( 'td' );
        tr.appendChild( td ); 

       
        td = document.createElement( "TD" ); 
        td.innerHTML = mailList[i].id;
        td.classList.add( 'td' );
        tr.appendChild( td ); 

        td = document.createElement( "TD" ); 
        td.innerHTML = mailList[i].title;
        td.classList.add( 'td' );
        tr.appendChild( td ); 

        td = document.createElement( "TD" ); 
        td.innerHTML = ".........";
        td.classList.add( 'td' )

        let newP1 = document.createElement("P");
        newP1.innerHTML = mailList[i].msg;
        newP1.classList.add( 'tootip' );
        td.appendChild( newP1 );

        td.addEventListener("mouseover", (event)=>{
            newP1.style.display = "block";
        }, false )

        td.addEventListener("mouseleave", ()=>{
            newP1.style.display = "none";
        }, false )

        tr.appendChild( td ); 


        td = document.createElement( "TD" ); 
        td.innerHTML = mailList[i].gold;
        td.classList.add( 'td' )
        tr.appendChild( td ); 



        td = document.createElement( "TD" ); 
        td.classList.add( 'td' )

        let newBtn = document.createElement("BUTTON");
        newBtn.innerText = "아이템"
        newBtn.setAttribute("mailId", mailList[i].id );
        newBtn.addEventListener("click", getMailAttachedItem );

        td.appendChild( newBtn );

        tr.appendChild( td ); 

        tbody.appendChild( tr ); 
    }

}
function getMailsSentFromAdmin(){
    fetch( "/mail/admin")
    .then((res) => res.json())
    .then( (res)=>{
        console.log(res);
        updateModalAdminMail( res.mailList )
        showModal("modalAdminMail");
    })
    .catch(console.log)    
}

function getMailAttachedItems(){
    const mailId = 0;
    const url = "/mail/" + mailId +"/admin"
    fetch( url)
    .then((res) => res.json())
    .then( (res)=>{
        console.log(res);
    })
    .catch(console.log)        
}