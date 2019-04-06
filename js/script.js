/******************************************
Treehouse Techdegree: FSJS project 2 - List Filter and Pagination
******************************************/

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