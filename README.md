# techdegree-project-2

This project aims to demonstrate a common web development technique known as "pagination" to enhance the usability of a web page.

In the context of this project, I have used JavaScript to display 10 names at a time, and add a navigation system -- a series of links at the bottom of the page -- to let users click through the other student entries, 10 at a time.

These improvements are based on the principle of "progressive enhancement." Wherein the page should still display the students' names without JavaScript turned on, but will deliver an improved end-user experience with JavaScript enabled.

The pagination program will work with a list of any number of students, not just with the supplied list of 54 students.

- Code has been separated into two files for redability:
   - script.js - contains the creation of the pagination menu, search menu and the addition of the respective event listeners.
   - functions.js - contains the functions used to achieve both the pagination and search functionality as well as some key
                    global variables. 
- On load, pagination menu is created and the first page is displayed.
- On search, results matching search query are returned and the first page is shown. In the event no matching students exist, a 'No Results Found' message is shown to the user. 

- An additional 100students.html file has been added to the project to demonstrate pagination functionality works even if the search returns more than 1 page of results. Use 'a' as an example. 
