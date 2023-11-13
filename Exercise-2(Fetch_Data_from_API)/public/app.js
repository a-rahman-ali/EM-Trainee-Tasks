"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Function to fetch the user information and 
// convert it into json objects promise array
// which contains the elements of the type interface User
function fetchUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('https://reqres.in/api/users');
            const data = yield response.json();
            return data.data;
        }
        catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    });
}
// The DOM code to manipulate the events on the webpage
document.addEventListener('DOMContentLoaded', () => __awaiter(void 0, void 0, void 0, function* () {
    const userListContainer = document.getElementById('userList');
    const userDetailsContainer = document.getElementById('userDetails');
    if (userListContainer && userDetailsContainer) {
        try {
            const users = yield fetchUsers();
            displayUserList(users, userListContainer);
            userListContainer.addEventListener('click', (event) => {
                const clickedUserId = event.target.dataset.userId;
                if (clickedUserId) {
                    const clickedUser = users.find(user => user.id === parseInt(clickedUserId, 10));
                    displayUserDetailsIndividually(clickedUser, userDetailsContainer);
                }
            });
        }
        catch (error) {
            console.error('Error:', error);
        }
    }
}));
function displayUserList(users, container) {
    const userListHTML = users.map(user => `
    <div>
      <img src="${user.avatar}" alt="${user.first_name} ${user.last_name}" data-user-id="${user.id}">
      <p>${user.first_name}</p>
    </div>
  `).join(' ');
    container.innerHTML = userListHTML;
}
function displayUserDetailsIndividually(user, container) {
    if (user) {
        const userDetailsPage = 'userDetails.html';
        window.location.href = `${userDetailsPage}?userId=${user.id}`;
    }
}
