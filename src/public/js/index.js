// thx for wonook

const modalLayer = document.querySelector('.modal'); // 모달 윈도우
const overlay = document.querySelector('.modal__overlay'); // 오버레이 레이어

function showModal()  {
  modalLayer.classList.remove('hidden');
  overlay.classList.remove('hidden');
}

function hideModal(){
  modalLayer.classList.add('hidden');
  overlay.classList.add('hidden');
}  

overlay.addEventListener('click', hideModal);

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape'){
      hideModal();
  }
})