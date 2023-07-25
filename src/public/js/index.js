// thx for wonook

const modalLayer = document.querySelectorAll('.modal'); // 모달 윈도우
const modalCloseButtonAll = document.querySelectorAll('.modal_close_btn'); // 모달 윈도우 Close Button All
const overlay = document.querySelector('.modal__overlay'); // 오버레이 레이어

function showModal( id )  {

  modalLayer.forEach(element => {
    if( element.getAttribute('id') === id )
      element.classList.remove('hidden');
  });

  overlay.classList.remove('hidden');
}

function hideModal(){
  modalLayer.forEach(element => {
    element.classList.add('hidden');
  });

  overlay.classList.add('hidden');
}  

overlay.addEventListener('click', hideModal);

modalCloseButtonAll.forEach(element => {
  element.addEventListener( 'click', hideModal )
});


document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape'){
      hideModal();
  }
})