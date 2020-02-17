// let data = [];

// fetch('https://jsonplaceholder.typicode.com/posts').then(function(response) {
//     return response.json();
//   }).then(function(json) {
//     let posts = json;
//   }).catch(function(err) {
//   });

// fetch("https://jsonplaceholder.typicode.com/posts")
//   .then(response => {
//     return response.json();
//   })
//   .then(myjson => {
//     // setting myjson to global variable
//     data = myjson;
//   })
//   .catch(error => {
//   });

// function createPostList() {
//   let postList = document.getElementById("post-list");

//   for (let i = 0; i < data.length; i++) {
//     let postItem = document.createElement("li");

//     postItem.innerHTML = data[i].title;

//     postList.appendChild(postItem);
//   }
// }

// createPostList();

document.getElementById('getText').addEventListener('click', getText);

function fetchUserData(){
  return fetch('https://api.propublica.org/congress/v1/116/house/members.json',{
    method: "GET",
    headers: {
      "X-API-Key": "rpNCuXoYOkPWov7EdSX7RpORSbKWNcVBHELvbvpQ"
    }
  })
    .then((response) => response.json())
}
