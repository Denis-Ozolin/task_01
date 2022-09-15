import refs from './element-refs.js';
import notes from '../db/notes.js';

const openModal = () => {
  refs.modalBackdrop.classList.remove('modal__backdrop--hidden');
};

const closeModal = () => {
  refs.modalBackdrop.classList.add('modal__backdrop--hidden');
  resetForm();
};

const handleKeyDown = event => {
  if (event.code === 'Escape') {
    closeModal();
  }
};

const handleBackdropClick = event => {
  if (event.target === event.currentTarget) {
    closeModal();
  }
};

const getDates = content =>
  content.split(' ').filter(item => item.split('/').length === 3);

const resetForm = () => {
  refs.input.value = '';
  refs.select.value = '';
};

const createNoteTemplate = note => {
  const dates = getDates(note.content).join(', ');

  return ` 
    <li class="notes-list__item">
      <ul class="note">
        <li class="note__content">${note.create}</li>
        <li class="note__content">${note.category}</li>
        <li class="note__content">${note.content}</li>
        <li class="note__content">${dates ? dates : ''}</li>
        <li class="note__content">
          <div class="controls">
            <button class="button button--edit">Edit</button>
            <button class="button button--delete">Delete</button>
          </div>
        </li>
      </ul>
    </li>`;
};

const addNewNote = () => {
  event.preventDefault();

  if (!refs.select.value) {
    alert('Select category');
    return;
  }

  if (!refs.input.value) {
    alert('Input text');
    return;
  }

  const currentDate = new Date().toDateString().split(' ').slice(1).join(' ');
  const newNote = {
    create: currentDate,
    category: refs.select.value,
    content: refs.input.value,
  };

  notes.push(newNote);

  closeModal();
  updateNotes();
};

const updateNotes = () => {
  refs.noteList.innerHTML = '';
  if (notes.length > 0) {
    notes.forEach(note => {
      refs.noteList.innerHTML += createNoteTemplate(note);
    });
  }
};

const deleteNote = () => {
  console.log(event.target);
  console.log('current', event.currentTarget);
};

updateNotes();

console.log(refs.deleteNoteBtn);

window.addEventListener('keydown', handleKeyDown);
refs.modalBackdrop.addEventListener('click', handleBackdropClick);
refs.createNoteBtn.addEventListener('click', openModal);
refs.closeModalBtn.addEventListener('click', closeModal);
refs.addNoteBtn.addEventListener('click', addNewNote);
// refs.deleteNoteBtn.addEventListener('click', deleteNote);
