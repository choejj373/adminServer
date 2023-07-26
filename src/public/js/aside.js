
document.querySelectorAll('input[name="left_menu"]').forEach((elem) => {
    elem.addEventListener("click", onClickedAsideMenu );
  });

function onClickedAsideMenu(){

    const menu = ["#rankingMenu", "#userMenu", "#mailMenu","#storeMenu", "#guildMenu" ];
    const section = ["rankingSection", "userSection", "mailSection", "storeSection", "guildSection" ];

    for( let i =0; i < menu.length; ++i ){
        if( document.querySelector( menu[i]).checked ){
            document.getElementById(section[i]).style.display = "";
        }else{
            document.getElementById(section[i]).style.display = "none";
        }
        
    }
    
   
}