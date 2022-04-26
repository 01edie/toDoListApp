'use strict';
// elements 
const listContainerEl = document.querySelector('.list-container');
const taskContainerEL = document.querySelector('.task-container');
const primaryButton = document.querySelector('.btn-create');
const primaryInput = document.querySelector('.new-list-text');
const secondaryButton = document.querySelector("#task-submit-btn");
const secondaryInput = document.querySelector('#task-input');
const errorMessageEl = document.querySelector('.error-message');
const tErrorMessageEl = document.querySelector('.t-error-message');

// variables
let primaryUpdateEl; //for identifying the updating element
let secondaryUpdateEl;
let idValue = 0; //for mapping todo lists to tasks
let taskId=0;

// functions
const primaryButtonEvent = (e) => {

  e.preventDefault();
  if (primaryButton.value === 'create') {

    if (primaryInput.value.trim() === '') {
      errorMessageEl.innerText = "!sorry list name can't be blank";
      errorMessageEl.style.color = 'red';
    }
    else {
      let listDiv = document.createElement('div');
      listDiv.className = 'tdl';
      idValue += 1;
      listDiv.setAttribute('id', `${idValue}`);
      

      listDiv.innerHTML = `<p class="list-item" onclick="activeList(event)">${primaryInput.value}</p><div class="p-buttons">
      <button class="p-edit" onclick="editList(event)"><i class="fa-solid fa-pen-to-square"></i></button>
      <button class="p-delete" onclick="deleteList(event)"><i class="fa-solid fa-delete-left"></i></button>
      </div>`;
      listContainerEl.appendChild(listDiv);
      primaryInput.value = null;
      errorMessageEl.innerText = '';

      // creating tasks' div
      let taskDiv = document.createElement('div');
      taskDiv.className = `t${idValue}`;

      taskContainerEL.appendChild(taskDiv);
      taskDiv.classList.add('tdl-task');
    }
  }
  else if (primaryButton.value === 'update') {
    primaryUpdateEl.innerText = primaryInput.value;
    primaryButton.value = 'create';
    primaryButton.innerText = 'create';
    primaryInput.value = null;


  }
}
const editList = (e) => {
  primaryInput.focus();
  primaryButton.value = 'update';
  primaryUpdateEl = e.target.parentElement.parentElement.parentElement.children[0];
  primaryInput.value = primaryUpdateEl.innerText;
  primaryButton.innerText = 'update'
}

const deleteList = (e) => {
  let primaryDeleteEl = e.target.parentElement.parentElement.parentElement;
  primaryDeleteEl.parentElement.removeChild(primaryDeleteEl);
  errorMessageEl.innerText = "Successfully Deleted!"
  errorMessageEl.style.color = 'green';
}

const activeList = (e) => {
  let activeListItem = document.querySelector('.active');

  if (activeListItem != null) {

    activeListItem.classList.remove('active');
  }
  e.target.classList.add('active');

  // displaying tasks of todo list
  taskId = e.target.parentElement.getAttribute('id');
  console.log(taskId);
  if (document.querySelector('.tdl-active') !== null) {
    let nowEl = document.querySelector('.tdl-active');
    nowEl.classList.remove('tdl-active');
    nowEl.classList.add('tdl-inactive');

    console.log('displaying none');
  }
  console.log(taskId);
  console.log(document.querySelector(`.t${taskId}`));
  document.querySelector(`.t${taskId}`).classList.add('tdl-active');
  // let tmp =`.t${taskId}`;
  // $('document').ready(function(){
  //   console.log('working', tmp);
  //   $(tmp).slideDown();
  // })
  if(document.querySelector(`.t${taskId}`).children.length === 0){
    document.querySelector('.empty-message').style.display = 'flex';
  }else{
    document.querySelector('.empty-message').style.display = 'none';
  }
  document.querySelector(`.t${taskId}`).classList.remove('tdl-inactive');
  console.log(document.querySelector(`.t${taskId}`));

}

// secondary activities/ tasks 

const secondaryButtonEvent = (e) => {
  e.preventDefault();
  if (secondaryButton.value === 'create') {

    if (secondaryInput.value.trim() === '') {
      tErrorMessageEl.innerText = "!sorry list name can't be blank";
      tErrorMessageEl.style.color = 'red';
    }
    else if (taskId == undefined) {
      tErrorMessageEl.innerText = "!sorry no list selected";
      tErrorMessageEl.style.color = 'red';
    }
    else {
      document.querySelector('.empty-message').style.display = 'none';
      let tListDiv = document.createElement('div');
      tListDiv.className = 'tdl';

      tListDiv.innerHTML = `<p class="list-item">${secondaryInput.value}</p><div class="p-buttons">
      <button class="p-edit" onclick="tEditList(event)"><i class="fa-solid fa-pen-to-square"></i></button>
      <button class="p-delete" onclick="tDeleteList(event)"><i class="fa-solid fa-delete-left"></i></button>
      </div>`;
      document.querySelector(`.t${taskId}`).appendChild(tListDiv);
      secondaryInput.value = null;
      tErrorMessageEl.innerText = '';

    }
  }
  else if (secondaryButton.value === 'update') {
    secondaryUpdateEl.innerText = secondaryInput.value;
    secondaryButton.value = 'create';
    secondaryButton.innerText = 'add';
    secondaryInput.value = null;


  }
}
const tEditList = (e) => {
  secondaryInput.focus();
  secondaryButton.value = 'update';
  secondaryUpdateEl = e.target.parentElement.parentElement.parentElement.children[0];
  secondaryInput.value = secondaryUpdateEl.innerText;
  secondaryButton.innerText = 'update'
}
const tDeleteList = (e) => {
  let secondaryDeleteEl = e.target.parentElement.parentElement.parentElement;
  secondaryDeleteEl.parentElement.removeChild(secondaryDeleteEl);
  tErrorMessageEl.innerText = "Successfully Deleted!"
  tErrorMessageEl.style.color = 'green';
}
//events 
console.log(document.querySelectorAll('.list-container'));
primaryButton.addEventListener('click', primaryButtonEvent);
secondaryButton.addEventListener('click', secondaryButtonEvent);



