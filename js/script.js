/******************************************
Treehouse Techdegree: FSJS project 2 - List Filter and Pagination
******************************************/


/*appends html elements from left to right. e.g. appendElements([h1, div, body])
h1 ---APPENDED-TO--- div ---APPENDED-TO--- body*/
const appendElements = (elements) => {
   for(let i=0; i<elements.length-1; i++){
      elements[i+1].appendChild(elements[i]);
   }
}

//Creates a pagination menu
const appendPageLinks = (studentList) => {

   //removes UL elem within Pagination Div if it exists - allows us to reconstruct the pagination menu as the user performs search.
    const pagination = document.querySelector('.pagination');
    if(pagination.hasChildNodes() === true){
       pagination.removeChild(pagination.firstElementChild);
    }
    
    //creation of new UL element - used to contain page links
    const paginationList = document.createElement('ul');
    //determines number of page links required for pagination menu.
    const pages = Math.ceil(studentList.length/10);
    
    //creates appropriate number of page links and appends them to the newly created UL element
    for(let i=1; i<=pages; i++){
       const pageItem = document.createElement('li');
       const a = document.createElement('a');
 
       a.textContent = i;
       a.href = "#";
       //assigns the class of active to the 1st page link
       i === 1 ? a.className="active" : a.className="";
 
       appendElements([a, pageItem, paginationList]);
    }

    //UL element attached to Pagination container div
    pagination.appendChild(paginationList);
    //requests the 1st page of the current list to be shown
    showPage(1, currentList);
 }

 /*Display students associated with the Page Number selected, achieved using the student's array index
 E.g. 24th Student => Array Index [23]. (23+1)/10 => 2.4, ROUND UP (2.4) => 3. 
 Therefore, 24th Student => 3rd page */
 const showPage = (selectedPage, studentList) => {
    
   for(let i=0; i<studentList.length; i++){
      //determine the student's associated page number
      const studentLocation = Math.ceil((i+1)/10);
      //only show those student's whose associated page number match the page link selected.
      if ( studentLocation === selectedPage ) {
            studentList[i].style.display = 'list-item';
      }else{
            studentList[i].style.display = 'none';
      }
   }
}
   
//key elements within the page
const pageDiv        = document.querySelector('.page');
const listOfStudents = document.querySelector('.student-list').children;
const pageHeader     = document.querySelector('.page-header');

/*This variable stores the current list of students, initialized to the entire list at first
however will change once search functionality is used.*/
let currentList = listOfStudents;

//creation of the pagination div and attachment to the containing page div
const paginationDiv = document.createElement('div');
paginationDiv.className = "pagination";
pageDiv.appendChild(paginationDiv);

//creation of pagination menu
appendPageLinks(currentList);


/*event listener for pagination menu. On click, 
show the page that was selected and set the selected link to the active status so it highlights.
*/
paginationDiv.addEventListener('click', (e) => {
   if(e.target.tagName === 'A'){
      const pageSelected = e.target.textContent; 
      e.preventDefault();
      showPage(parseInt(pageSelected), currentList);
   }
});