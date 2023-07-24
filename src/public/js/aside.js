function onClickedAsideMenu( value ){
    console.log( value );
    const section = ["rankingSection", "userSection", "storeSection", "guildSection" ];
    section.forEach(element=>{
        document.getElementById(element).style.display = "none";
    });

    document.getElementById(value).style.display = "";
}