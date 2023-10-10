# IT2810 Project 3

The code implemented by the team is both in the frontend and backend folder of the project.

## Start the server

The package contains npm. To run the application, start in the root file, "IT2810-PROJECT-3" and `cd backend` into backend folder. Then in the terminal run `npm install` (short: npm i) to install the packages and then `npm run dev` to start the React-app from the backend side. 
Create a second terminal to run the frontend side. In the second terminal, start in the root file, "IT2810-PROJECT-3", again and type in `cd frontend` into frontend folder. Then run `npm install` (short: npm i) to install the packages here and then `npm start` to display the React-app.


## Run tests

Jest is included in the react-script, it is easy to make and run tests with it. To run the jest test for this project, type in `npm run test-jest` in the termminal when in the frontend folder. For end-to-end testing run `npm run test-cypress` in the frontend-folder. 

# Documentation for Project 3

The documentation is written by the three team members of group 45. The code written in this project can be found in the backend- and frontend-folder. The task description has given the group a clear framework and opportunities during the process for this application. This has increased the efficiency of the group during discussions in meetings and when programming together.

## Requirements for functionality

The functunality requierments for the website was to be a prototype of a searchable catalog with a frontend where the user is able to formulate a search and be presented with a search result, and a backend that we have installed and set up ourselves.

### Search bar

The search bar is created as a compontent to be used in multiple pages on the application. The search bar is a simple input field which either searches in the database for type = 'Movies' if on the Movies-page, or type = 'TV Show' if on the Series-page. This is achieved by rendering the  SearchBar component in MoviesPage.tsx and SeriesPage.tsx. The useState in the component updates the value written in the input field constantly, so that it is dynamic. When the user starts to type (checks in the code if the lenght of the value is more than 0) the value is sent to DisplayData. In this file, the netflix query displayes all the movies/series, and the input imported from Search bar is sent through as dataProps to be used and matched with the dataset on title of the movie/serie and displayed in form of a Card (styled by MUI). In server we use regex to find the movies/series which include the input written in the searchfield. It is not case sensitive, and the user can search on something in the middle of the title. We thought that this was very user friendly, and made it easier for the user to find desired entertaiment. 

### Pageination

There are many different pagination strategies a server can use. In our project we used offset and limit parameters to paginate data with MongoDB. It is one of the most widely used techniques for pagination around the globe, and therefore semmed like a reasonable choice. With offset-based pagination, a list field accepts an offset argument that indicates where in the list the server should start when returning items for a particular query. The limit argument indicates the maximum number of items to return per page. The default values we chose for limit and offset is 10 and 0. Furthermore, this pagination strategy works well for immutable lists, or for lists where each item's index never changes. This is because moving or removing items can shift offsets. This causes items to be skipped or duplicated if changes occur between paginated queries. Since we did not add or delete already existing files, only added values for ratings and reviews, this worked fine for us. 

When using this method, new data is loaded and displayed when changing the page. The page will therefore refresh because more data has to be collected from the database, since it only collects a certain number of items at a time (the limit-value). However, if you go back to a page you have previously visited, the page does not need to refresh since the these items has already been collected and stored. We are aware of this occurance, but it does not take away from the user experince, and we therefore do not view this as a problem.

The design of our pagination is based on Material UI's Sorting & selecting Table pagination. We chose this method because it is user friendly and easy to understand. In addition, it makes it possible for the user to choose their preferred number of items per page. They can choose between 5, 10 (default), 25 and all. We thought this was a better way of implementing pagination than an infifite scroll, because it is easy to see where they are and how many more items there are. With an infinite scroll it can also be confusing for the user when trying to find an item they have seen previuosly. With table pagination, it is easy to see that the specified item is between item 11-20, 521-530 etc. 

To correctly display how many items there are in total, we had to make a custom type called PaginatedNetflix that returns the paginated data and the total count of the data. Beacuse without this, then the pagination would always think the total count was 10, beacuse that is the limit-value. So we use count when deciding how many items corresponds to the filter-options, so that the pagination shows the correct amount.

### About Page

When clicking the 'Learn More'-links on the movie- and show-cards, the user is routed to a page where they can get more info about the movie or show. A query to the apollo server returns all avilable info about the specific movie/show in the database. They can get info about title, description, release year, duration, director, country, cast and which categories it is listed in. If there is no info about one of these things in the database, the user gets feedback about this. They can also see other peoples reviews and ratings from 1 to 5 of the title, and submit their own reviews and ratings. The user should not be able to submit an empty review or rating of 0, so each of the submit buttons will appear only when the input is not empty or 0. When the user clicks submit, the input will be written to our database with a graphQL mutation. The user gets feedback stating that the rating/review has been submitted with an alert before the page is reloaded, so that their submission will appear for them. If a rating was submitted, the new average score will be recalculated and count of ratings it is based on will be updated. If a review was submitted, it will be displayed in the reviews-list, and the count of reviews will be updated. The user can not delete any former reviews and ratings, and can submit as many of each as they like for every movie. The corresponding image will be displayed if the movie/serie has an image url. But if it does not, then no image will appear. You can read more on this under section 'Database'.

### Sort and Filter

The user is able to search for movies/series (se section about search bar above), filter the data, and sort by different parameters. 
A user can sort on 'Oldest' and 'Newest' movies/series, and is able to filter on many different categories. Sort and filter are variables the result query is dependent on. The GraphQL query supports these variables. In the backend the resolver handles the variables, updating the find-argument to filter on desired movies/series and the sort will order the results. If a user does not set the variables, there will be no filtering on categories, and all the movies/series will be displayed. When a category is selected, all movies that contains this category will be displayed. In our dataset, some of the categories in the listed_in array had a whitespace in front. So they would not show when filtering on a specific category. So in the server we had to take this into account. Furthermore, when searching in the search bar when filtering, only the items with the correct category and title will be displayed. Pagnation will be updated automatically when filtering/searching for the data.

The default for sorting is show-id, and when choosing either 'Oldest', 'Newest' or 'Title' this will be added to the sort. We had to always sort on show-id to avoid the database from displaying the same movie more than once. This was because the release_year attribute is not uniqe and would cause problems. But when sorting on show_id as well as release_year, either in ascending or descending order, it worked well. 

Since there are some movies/series with special characters like #, () and numbers, they will appear first when sorting for 'Title'. This is because the sort in graphql follows the ASCII-order when sorting which will always place these first. Although this is not a problem, we are aware that it might look strange when the first movies/series that appear are named '#cats_the_mewve' '#69' etc. But these are existing movies.  

The sort and filter buttons are styles using Material UI's Select button. We have implemented a component called SelectLabels in the 'FilterButton'-file which is used for both the sort button and filter button. When using this component, we pass in props for the different options the user can choose, as well as the name of the button ('Sort by' or 'Filter').

### Reviews and Ratings

The reviews and ratings of a title is obtained from the database with querys and written to the database with mutations. These can be found in the 'graphql' folder. The mutations take in the show id and the input. The definitions of the mutations can be found in the backend folder, in the typeDefs file. In the server.ts file, you can see that the mutation uses the show id to select which object in the collection to update. It updates by pushing the rating/review value to the array of already existing reviews/ratings.
Ratings and reviews are queried with findMovieById, and displayed by mapping the returned array.

### Web accessibility

Web accessibility is used for making the web more accessible to people with a wide variety of disabilities. WCAG is broken down into 4 principles. The application has to be perceivable, operable, understandable and robust. 

Perceivable means that the user must be able to perceive the application in some way, using one or more of their senses. Operable meaning the user can control the UI elements, the buttons can be clicked, voice command and so on. By using alt for images and aria-label for important non-descripted elements in frontend, the user can by just tabbing on the keyboard, go through the application while a voice command reads for them. As an extra precaution, we made sure not to use colors most people are color-blind to next to each other, since is will be difficult for them to tell them apart. Colors used for the elements on the web are specially chosen for creating the best contrast, making it easier to read and understand the content provided. It is also important with the consept of understandable where the content has to be understandable for the user interacting with it. Finally keeping it robust by having the application functional on most used platforms and available now and in the furture (maintenance). 

Having responsive design influences the web accessibility part of the project, where good interactions, spacing between elements on the page, readable text and text size, all matters on improvments upon this. 

### Sustainable webdeveloping

There are multiple intervention for creating a sustainable webapplication. Is is difficult in it self to directly measure the carbon emissions, but there are factors which affect is. Factors such as data traffic, how green the energy is and what this energy is being used for and controling it are all important in decreasing the carbon emissions. Less data traffic and energy use can give an improved userexperience.

When it comes to data traffic, reducing the path going from one page to another transports less data and creates a smoother user interaction and use. On our page, there is a HomePage link, MoviesPage link and a SeriesPage link. Each of them take you to their page, but all of them uses the same components to render. That means that the same query is used to get the data and it is not nesseccary to ask for it again and again. In the backend, the query is for fetching the dataset from the database and is so on reused for search, filters and for the different pages.

We looked into using an api for fetching the corrosponding pictures for the movies/series, but as an argument against this, fetching over 8000 pictures (out dataset) causes huge data traffic and energi use, so be reusing the same picture for movies and the same picture for series, we decrease energy use. By energy here, this can come from various color schemes used in the movie/serie poster/picture, where some colors use more energy than others. Thats why we chose our application to be dark-mode and all the posters for the movies and series have dark background aswell. Dark mode is also quite pleasing for the eyes, where bright and white lights can keep one awake. The battery life of the electronic also decreases when the screen is constantly bright.

Use of videos use alot of energy and therefore the team chose not to implement it. Hence the use of parallax on HomePage. It is the closes you can get to the same motions as a video displays.

By using third-party components, sush as Material UI, components, design and fonts use less energy because it is implemented in the element, and reused by us.

Today, electronical waste is a huge contributer to climate change and waste, and it is our job and duty to be aware of this matter and not to push it. How software is created today increases the consumption of hardware.

### Responsive design and styling

When it come to responsive design, the team has used either 900px, 1000px or 1200px(because of parallax and the large content cards on Homepage) as breakpoint for tablet version and 700px-500px as breakpoint for mobile version of the application. Media-queries with breakpoints at 900px, 1000px, 1200px and 700px-500px were used to implement the layout for the tablet and the mobile version. The team choose 2 breakpoints so that there will be a smoother transition from the different screen sizes. Viewport was also used to give the components with a background a smoother scaling when the screen shrunk. Max-height with "vh" were used to let the height increase or decrease smoothly responding with the screen changes.

In the breakpoints, the font size is also taken in reconsideration when the screen shrinks. This is available in the CSS files of the components. To give the application a more interactive touch and useroriented experience, the links on the Navbar, the filters border, pageination, "Learn more" links on the card and the stars for rating all hovers to Netflixs red color. The team has used Netflixs color scheme throughout the application. 

The Nextflix logo in the right side of the Navbar hovers to Netflixs red aswell as the rest of the links in the Navbar. This gives the user a playful and interactive session with the application. The Nextflix logo has smaller width on the mobile and tablet version to give a right feeling of proportions compared to the other elements on the side.

The parallax function gives the Homepage a fun and interactive experience with the user. When a user clickes on a link on the Navbar, it stays red, and it is a strategic chose made by the group, so that the user knows which page they are currently on.

The movie/serie cards are displayed with relevant information and all have the movies and series had the same posters. This chose was made, because the dataset that were picked, did not have posters attached to each entertainment. An option here was to use Googles API to get posters for movies and series and match them to our titles, but this was not an requirement and we were advised it would take unnecessary time away from the project. We would rather improve upon the already content on the pages and requirements for this prosjekt.

As discussed in the section about sustainable webdeveloping, the team went for a darkmode design for all the pages and let text, links, cards, search bar, filters, review, rating and pageination pop with either white or a strong Netflix red or blue color.

## Requirements for technology

Our application is divided into three main parts; a mongodb database with mongoose, an Apollo Express backend, and a react typescript frontend. 

### GraphQL

Graphql is used as the Query language. Together with mongoose and Apollo, we can retrieve the exact data we want by defining it ourselves. This is done through a mongoose schema, as you can see in file 'models.ts' in the backend folder, and a query schema in 'server.ts'. The schemas acts as a contract between the client and server, guaranteeing that the data requirements are always met. The "Query" type lists all of the available queries that clients can execute, along with the return type for each. In this case, the "netflix" query returns an array of zero or more netflix-movies/series. We used a GraphQL Resolver function to specify how to process a specific GraphQL operation and turn it into data. Mongoose is used to model and resolve data that is sent as queries to the database. Furthermore, we used Apollo client and Apollo server to run the GraphQL server and to retrieve and send queries to the GraphQL server.

### Database

In our peoject, we chose to use MongoDB, which is a document database. Document databases uses a JSON-like format to store objects, making it intuitive to use. We chose MongoDB because we wanted a noSQL database, aswell as it provides us with tons of documentation and libraries. Working with MongoDB, there are multiple choices. Either speaking to the database directly or using libraries such as mongoose on top. 

To communicate with MongoDB, we chose mongoose as it adds an abstraction. Schemas help structure data, and models can be easier to work with than pure data. Mongoose also provides a simpler interface for writing queries against MongoDB. To implement searching for movies/series, we have used the find function with MongoDB queries for searching and filtering. This is then sorted and the correct movies and numbers are selected from the pagination parameters. This can be found in the 'server.ts'-file in the backend-folder.

We also installed the MongoDB database on a virtual machine (NTNU server) with data of all Netflix movies/series. We have chosen data from the dataset available on kaggle called 'Netflix Movies and TV Shows', and adapted the data to our database. The database did not have image url's. However, we really wanted to show what the website would like like with images, so we have used an API and manually written the corresponding url in as an attribute in the database. Since this is very time-consuming, we only did it for some of the movies/series. But if we had more time, we would find an easier solution to do this.  

### State Managment

For managing state management, we used Apollo Client's local state management. Apollo Client is a state management library that uses GraphQL to interact with a remote server. We chose to use this because Apollo Client enables you to manage local state alongside remotely fetched state, making it possible to interact with all of your application's state with a single API. We used Apollo Client's reactive variables. It enables you to read and write local data anywhere in your application, without needing to use a GraphQL operation to do so. It is a very effective state management beacuse whenever the value of a reactive variable changes, Apollo Client automatically detects that change. Every active query with a field that depends on the changed variable automatically updates.

The reactive variables were implemented using the useReactiveVar React hook. The variables were made using makeVar, and modified/read by calling the function returned by makeVar. We used this to make reactive variables for the filter button and sort button in the 'FilterButton.tsx'-file, called 'sortStorageVar' and 'filterStorageVar'. When a different option is selected in the drop down menu, the variables automatically updates. These reactive variables are read when fetching the data from the Netflix-query in 'DisplayData.tsx'. That way the function knows how to sort/filter the data according to the users wish, by reading reactive variables defined in another file. 

### Use of Components and libraries

React with TypeScript is used in the frontend, which has been set up with create-react-app. We have placed all react components in the components folder and further grouped the components in subfolders according to which categories they belong to. There are 5 components in total.

We have primarily only used the ordinary mechanisms in React such as props and state with an appropriate component structure, with the exception of third-party components. We have decomposed the components as best as possible so that they are as simple and readable as possible. Functions and other code that are not self-explanatory are also commented.

Most of the third-party components we have used are sourced from https://material-ui.com/. This is because Material UI is very well documented and the components had a comprehensive design. They are both user friendly and visually pleasing. We have used Material UI's Cards and Table Pagination.

We have also made use of the third-party component 'react-router-dom'. This allows us to easily structure the page and forward / display the correct part of the application. In App.tsx, the HashRouter component is used as a provider, and stores history so that the user can use the browser's back button. With Switch and Route, it is specified which content should be displayed for various paths, which are then referred to by Link components in the navbar. The navbar is not subordinate to the Switch component and is displayed at all times.

## Requirements for testing

For testing, we used unit testing with jest, and automatic end-2-end testing with cypress.

### Unit testing

In this project, we used Jest for unit testing. We used snapshot tests on all the 5 components (SearchBar, Navbar, FilterButton, DisplayData, Pagination) to check that these elements are rendered as intended. Snapshot tests are a very useful tool whenever you want to make sure your UI does not change unexpectedly. Changes to the components will therefore cause the tests to fail, and the snapshots must then be updated to ensure that the tests give the correct results. A typical snapshot test case renders a UI component, takes a snapshot, then compares it to a reference snapshot file stored alongside the test. The test will fail if the two snapshots do not match: either the change is unexpected, or the reference snapshot needs to be updated to the new version of the UI component.

We have used best practices for testing React components that use Apollo Client. Every test for a React component that uses Apollo Client must make Apollo Client available on React's context. In application code, we achieved this by wrapping our component tree with the ApolloProvider component. In our tests, we used the MockedProvider component instead. The MockedProvider component enables us to define mock responses for individual queries that are executed in the test. This means that the test doesn't need to communicate with a GraphQL server, which removes an external dependency and therefore improves the test's reliability. We used this in two components 'DisplayData' and 'SearchBar', since both use Apollo Client.

### Automatic end-to-end testing

We have used Cypress for end-to-end-testing. This is a widely used and well documented framework with an intuitive way of displaying how the tests are executed, and with comprehensive error handling. This is very beneficial, as end-to-end-tests are meant to ensure your application behave as expected and the flow of data is maintainded when replicating end-user behaviour. The cypress tests can be found in the 'cypress' folder. 
The homepage is tested by checking that the navigation bar works as expexted, which is that the user will be routed to the right page, and that the links on the movie/show cards lead to the right page with the right data, as well as that all the text that is supposed to appear actually exists on the page.
The about-page is tested by checking that all the info on a show and a series is correct and existing. Also, the input stars for submitting a rating are clicked, to check that they are all clickable, and some text is typed into the text field to check that text can be typed. After clicking/typing, the test checks if the submit buttons appear for rating/review.
The movie and series pages are the most thoroughly tested, as they contain filter, pageination and search functionality. Here, we have tried to replicate a scenario of a sequence of actions that a real user might execute. With this approach, we managed to find some weaknesses in our code, and fix it. Here, combinations of searches, filters and pageination, are tried and tested.
