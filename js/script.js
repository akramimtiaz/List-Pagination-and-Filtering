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

//Adds the 'active' class to the page link selected so it is highlighted via CSS.
const updateActiveLink = (pageSelected) => {
    
   //obtain all LI elements within Pagination UL 
   const paginationList = paginationDiv.firstElementChild;
   const pages = paginationList.children; 

   for(let i=0; i<pages.length; i++){
      //obtain the A element within the LI element
      const page = pages[i].firstElementChild;
      //Add the 'active' class exclusively to the link that matches the selected page
      if(page.textContent === pageSelected){
         page.className = "active";
      }else{
         page.className = "";
      }
   }
}

//Creates a list of students that match a Search Query.
const searchStudents = (searchQuery) => {

   //array used to hold those entries which match the search query
   const matchingStudents = [];
   //update the current list to contain all student entries, as we want to match against the entire list space.
   currentList = listOfStudents;
  
   for(let i=0; i<currentList.length; i++){
  
      const studentName = currentList[i].firstElementChild.children[1].textContent;
      const studentEmail = currentList[i].firstElementChild.children[2].textContent
      
      //if student name/email matches search query display the student and add them to matching students array
      if(studentName.startsWith(searchQuery) || studentEmail.startsWith(searchQuery)){
           currentList[i].style.display = 'list-item';
           matchingStudents.push(currentList[i]);
      }else{
           currentList[i].style.display = 'none'; 
      }
   }

   //update the current list variable to the list of matching students
   currentList = matchingStudents;
   //if there are no students that match the search query, display the H3 stating 'No Results Found'.
   if(currentList.length === 0){
       noResults.style.display = 'inline-block';
   }else{
       noResults.style.display = 'none';
   }
   //create a pagination menu appropriate to the number of students matching the search query
   appendPageLinks(currentList);
   
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


//creation of the search elements with their various attributes
const searchDiv = document.createElement('div');
const searchInput = document.createElement('input');
const searchButton = document.createElement('button');

searchDiv.className = "student-search";
searchInput.placeholder = "Search for students...";
searchButton.textContent = "Search";

/*appends html elements, element on the left is appended to the element on the right.
i.e. searchButton ---APPENDED-TO--- searchDiv ---APPENDED-TO--- pageHeader*/
appendElements([searchInput, searchDiv]);
appendElements([searchButton, searchDiv, pageHeader]);

//creation of the H3 element used to indicate no match results.
const noResults = document.createElement('h3');
noResults.textContent = "No Results Found";
noResults.style.display = 'none';
pageDiv.insertBefore(noResults, pageHeader.nextElementSibling);



/*event listener for pagination menu. On click, 
show the page that was selected and set the selected link to the active status so it highlights.
*/
paginationDiv.addEventListener('click', (e) => {
   if(e.target.tagName === 'A'){
      const pageSelected = e.target.textContent; 
      e.preventDefault();
      showPage(parseInt(pageSelected), currentList);
      updateActiveLink(pageSelected);
   }
});

/*event listeners for search-input and search-button. Extract the current value 
in the searchInput field to determine the set of matching students.
*/
searchInput.addEventListener('keyup', (e) => {
   searchStudents(searchInput.value);
});

searchButton.addEventListener('click', (e) => {
   searchStudents(searchInput.value);
});