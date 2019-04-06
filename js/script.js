/******************************************
Treehouse Techdegree: FSJS project 2 - List Filter and Pagination
******************************************/

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

appendElements([searchInput, searchDiv]);
appendElements([searchButton, searchDiv, pageHeader]);

//creation of the H3 element used to indicate no match results.
const noResults = document.createElement('h3');
noResults.textContent = "No Results Found";
noResults.style.display = 'none';
pageDiv.insertBefore(noResults, pageHeader.nextElementSibling);


/*event listener for pagination menu. On click, 
show the page that was selected and set the selected link to the active status.*/
paginationDiv.addEventListener('click', (e) => {
   if(e.target.tagName === 'A'){
      const pageSelected = e.target.textContent; 
      e.preventDefault();
      showPage(parseInt(pageSelected), currentList);
      updateActiveLink(pageSelected);
   }
});

/*event listeners for search-input and search-button. Extract the current value 
in the searchInput field and display the set of matching students.*/
searchInput.addEventListener('keyup', (e) => {
   searchStudents(searchInput.value);
});

searchButton.addEventListener('click', (e) => {
   searchStudents(searchInput.value);
});
