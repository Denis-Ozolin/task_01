import refs from './element-refs.js';
import notes from '../db/notes.js';
import archivedNotes from '../db/archivedNotes.js';
import categories from './noteCategories.js';

let notesIsActive = true;

function deleteNote(id) {
  notesIsActive ? notes.splice(id, 1) : archivedNotes.splice(id, 1);
  resetData();
}

function onClickNoteControls(event) {
  if (event.target.nodeName !== 'BUTTON') return;
  const title = event.target.innerText;
  const id = event.currentTarget.id;

  switch (title) {
    case 'Edit':
      console.log('btn edit');
      break;
    case 'Archive':
      console.log('btn archive');
      break;
    case 'Delete':
      deleteNote(id);
      break;
    default:
      return;
  }
}

function getData(category) {
  const allNotes = [...notes, ...archivedNotes];
  const categoryArray = allNotes.filter(notes => notes.category === category);

  return {
    active: categoryArray.filter(category => category.active).length,
    archived: categoryArray.filter(category => !category.active).length,
  };
}

function openModal() {
  refs.modalBackdrop.classList.remove('modal__backdrop--hidden');
  renderSelectOptions(categories);
}

function closeModal() {
  refs.modalBackdrop.classList.add('modal__backdrop--hidden');
  resetForm();
}

function handleKeyDown(event) {
  if (event.code === 'Escape') {
    closeModal();
  }
}

function handleBackdropClick(event) {
  if (event.target === event.currentTarget) {
    closeModal();
  }
}

function getDates(content) {
  return content.split(' ').filter(item => item.split('/').length === 3);
}

function resetForm() {
  refs.input.value = '';
  refs.select.value = '';
}

function renderSelectOptions(options) {
  refs.select.innerHTML = createDefaultOptionTemplate();
  options.forEach(option => {
    refs.select.innerHTML += createSelectOptionsTemplate(option);
  });
}

function addNewNote(event) {
  event.preventDefault();

  if (!refs.input.value && !refs.select.value) {
    alert('Note is empty');
    return;
  }

  if (!refs.select.value) {
    alert('Select category');
    return;
  }

  if (!refs.input.value) {
    alert('Enter note text');
    return;
  }

  const currentDate = new Date().toDateString().split(' ').slice(1).join(' ');
  const newNote = {
    create: currentDate,
    category: refs.select.value,
    content: refs.input.value,
    active: true,
  };

  notes.push(newNote);

  closeModal();
  resetData();
}

function toggleArchiveBtnText() {
  notesIsActive
    ? (refs.toggleIsOpenArchiveBtn.innerText = 'Open Archive')
    : (refs.toggleIsOpenArchiveBtn.innerText = 'Close Archive');
}

function toggleNotesIsActive() {
  notesIsActive = !notesIsActive;
  selectNotes();
  toggleArchiveBtnText();
}

function selectNotes() {
  notesIsActive ? updateNotes(notes) : updateNotes(archivedNotes);
}

function resetData() {
  selectNotes();
  updateStatistics();
}

//TEMPLATES
function createListItemTemplate(note, index) {
  const item = document.createElement('li');

  item.className = 'notes-list__item';
  item.id = index;
  item.innerHTML = createNoteTemplate(note);
  item.addEventListener('click', onClickNoteControls);

  return item;
}

function createNoteTemplate(note) {
  const dates = getDates(note.content).join(', ');

  return ` 
      <ul class="note">
        <li class="note__content">${note.create}</li>
        <li class="note__content">${note.category}</li>
        <li class="note__content">${note.content}</li>
        <li class="note__content">${dates ? dates : ''}</li>
        <li class="note__content">
          <div class="controls">
            <button type="button" class="button button--edit">Edit</button>
            <button type="button" class="button button--archive">Archive</button>
            <button type="button" class="button button--delete">Delete</button>
          </div>
        </li>
      </ul>
      `;
}

function createStatCtagoryTemplate(category, data) {
  return `
    <li class="notes-list__item">
      <ul class="note">
        <li class="note__content">${category}</li>
        <li class="note__content">${data.active}</li>
        <li class="note__content">${data.archived}</li>
      </ul>
    </li>`;
}

function createDefaultOptionTemplate() {
  return `<option value="" selected disabled hidden>Choose category</option>`;
}

function createSelectOptionsTemplate(option) {
  return `<option value="${option}">${option}</option>`;
}
//TEMPLATES

//MARKUP
function updateNotes(list) {
  refs.noteList.innerHTML = '';
  if (list.length > 0) {
    list.forEach((note, index) => {
      const listItem = createListItemTemplate(note, index);
      refs.noteList.append(listItem);
    });
  }
}

function updateStatistics() {
  refs.categoryList.innerHTML = '';
  if (categories.length > 0) {
    categories.forEach(category => {
      const data = getData(category);
      refs.categoryList.innerHTML += createStatCtagoryTemplate(category, data);
    });
  }
}
//MARKUP

//LISTENERS
window.addEventListener('keydown', handleKeyDown);
refs.toggleIsOpenArchiveBtn.addEventListener('click', toggleNotesIsActive);
refs.modalBackdrop.addEventListener('click', handleBackdropClick);
refs.createNoteBtn.addEventListener('click', openModal);
refs.closeModalBtn.addEventListener('click', closeModal);
refs.addNoteBtn.addEventListener('click', addNewNote);
//LISTENERS

//DEFAULT CALLS
// selectNotes();
// updateStatistics();
resetData();
//DEFAULT CALLS
