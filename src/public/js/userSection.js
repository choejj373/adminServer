

document.getElementById("searchUserInfoBtn").addEventListener("click", getUserInfo );

document.getElementById("getUserItemInfoBtn").addEventListener("click", getUserItemInfo );
document.getElementById("getUserFriendInfoBtn").addEventListener("click", getUserFriendInfo );
document.getElementById("getUserGuildInfoBtn").addEventListener("click", getUserGuildInfo );
document.getElementById("getUserMailInfoBtn").addEventListener("click", getUserMailInfo );
document.getElementById("getUserQuestInfoBtn").addEventListener("click", getUserQuestInfo );
document.getElementById("getUserRestrictInfoBtn").addEventListener("click", getUserRestrictInfo );
document.getElementById("getUserAccountInfoBtn").addEventListener("click", getUserAccountInfo );

function getUserAccountInfo(){
    const element = document.getElementById("userInfoID");

    const url = '/user/' + element.value + '/account';

    fetch( url )
    .then((res) => res.json())
    .then( (res)=>{
        console.log( res.userAccountInfo );
    })
    .catch(console.log)        
}


function getUserRestrictInfo(){
    const element = document.getElementById("userInfoID");

    const url = '/user/' + element.value + '/restrict';

    fetch( url )
    .then((res) => res.json())
    .then( (res)=>{
        console.log( res.userRestrictInfo );
    })
    .catch(console.log)        
}

function getUserQuestInfo(){
    const element = document.getElementById("userInfoID");

    const url = '/user/' + element.value + '/quest';

    fetch( url )
    .then((res) => res.json())
    .then( (res)=>{
        console.log( res.userQuestInfo );
    })
    .catch(console.log)        
}

function getUserMailInfo(){
    const element = document.getElementById("userInfoID");

    const url = '/user/' + element.value + '/mail';

    fetch( url )
    .then((res) => res.json())
    .then( (res)=>{
        console.log( res.userMailInfo );
    })
    .catch(console.log)        
}

function getUserGuildInfo(){
    const element = document.getElementById("userInfoGuildId");

    const url = '/user/guild/' + element.value;

    fetch( url )
    .then((res) => res.json())
    .then( (res)=>{
        console.log( res.userGuildInfo );
    })
    .catch(console.log)        
}

function getUserFriendInfo(){
    const element = document.getElementById("userInfoID");

    const url = '/user/' + element.value + '/friend';

    fetch( url )
    .then((res) => res.json())
    .then( (res)=>{
        console.log( res.userFriendInfo );
    })
    .catch(console.log)        
}

function getUserItemInfo(){
    const element = document.getElementById("userInfoID");

    const url = '/user/' + element.value + '/item';

    fetch( url )
    .then((res) => res.json())
    .then( (res)=>{
        console.log( res.userItemInfo );
    })
    .catch(console.log)        
}

function getUserInfo(){

    const element = document.getElementById("searchUserInfoName");
    console.log( element.value );
    if( element.value ==="")
        return;

    const url = '/user/' + element.value;

    fetch( url )
    .then((res) => res.json())
    .then( (res)=>{
        console.log( res.userInfo );
        document.getElementById("userInfoName").value = res.userInfo.name;
        document.getElementById("userInfoID").value = res.userInfo.id;
        document.getElementById("userInfoMoney").value = res.userInfo.money;
        document.getElementById("userInfoDiamond").value = res.userInfo.diamond;
        document.getElementById("userInfoGuildId").value = res.userInfo.guild_id;

    })
    .catch(console.log)    
}