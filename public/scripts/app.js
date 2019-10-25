const hamburgerMenu = document.querySelector('.js-hamburger')
const sideBar = document.querySelector('.js-sideBar')
const addCategoryIcon = document.querySelector('.js-addCategory')
const newCategoryModalEl = document.querySelector('.js-form-modal')
const closeIconEl = document.querySelector('.js-close-icon')
const newCategoryForm = document.querySelector('.js-form')
const newCategoryInputEl = document.querySelector('.js-new-category')
const selectEl = document.querySelector('.js-select')
 

hamburgerMenu.addEventListener('click', showSideMenu)
function showSideMenu(){
  sideBar.classList.toggle('toggle-side-bar')
}     

window.addEventListener('scroll', hideSidebarMenu)
function hideSidebarMenu(){
  if(window.pageYOffset === 0) { 
    sideBar.classList.remove('hide-side-bar')
  } else {
    sideBar.classList.add('hide-side-bar')
  } 
}
 
addCategoryIcon.addEventListener('click', showFormToAddNewCategory)
function showFormToAddNewCategory(){
  newCategoryModalEl.style.display="flex"
}

closeIconEl.addEventListener('click', hideModal)
function hideModal(){
  newCategoryModalEl.style.display="none"
}


newCategoryForm.addEventListener('submit', addNewCategory)
function addNewCategory(e){
  // e.preventDefault()
  let value = newCategoryInputEl.value
  let newOption = document.createElement('option')
  let newOptionValue = document.createTextNode(value)

  newOption.appendChild(newOptionValue)
  selectEl.appendChild(newOption)
}  


selectEl.addEventListener('change', ()=> {
  console.log(selectEl.value);
})