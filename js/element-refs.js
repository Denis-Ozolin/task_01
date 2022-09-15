const refs = {
  noteList: document.querySelector('.notes-list'),
  createNoteBtn: document.querySelector('.button--create'),
  editNoteBtn: document.querySelector('.button--edit'),
  deleteNoteBtn: document.getElementsByClassName('.button--delete'),
  modalBackdrop: document.querySelector('.modal__backdrop'),
  closeModalBtn: document.querySelector('.modal__close-btn'),
  input: document.querySelector('.form__textarea'),
  select: document.querySelector('.form__select'),
  addNoteBtn: document.querySelector('.form__submit-btn'),
};

export default refs;
