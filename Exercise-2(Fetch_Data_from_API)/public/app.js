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
class UserApp {
    constructor() {
        this.userListContainer = document.getElementById('userList');
        this.userDetailsContainer = document.getElementById('userDetails');
        if (this.userListContainer && this.userDetailsContainer) {
            this.init();
        }
        else {
            console.error('Error: Unable to find HTML containers');
        }
    }
    // Function to fetch the user information and 
    // convert it into json objects promise array
    // which contains the elements of the type  User
    fetchUsers() {
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
    displayUserList(users) {
        const userListHTML = users
            .map(user => `
          <div>
            <img src="${user.avatar}" alt="${user.first_name} ${user.last_name}" data-user-id="${user.id}">
            <p>${user.first_name}</p>
          </div>
        `)
            .join(' ');
        if (this.userListContainer) {
            this.userListContainer.innerHTML = userListHTML;
        }
    }
    displayUserDetailsIndividually(user) {
        if (user) {
            const userDetailsPage = 'userDetails.html';
            window.location.href = `${userDetailsPage}?userId=${user.id}`;
        }
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.fetchUsers();
                this.displayUserList(users);
                if (this.userListContainer) {
                    this.userListContainer.addEventListener('click', (event) => {
                        const clickedUserId = event.target.dataset.userId;
                        if (clickedUserId) {
                            const clickedUser = users.find(user => user.id === parseInt(clickedUserId, 10));
                            this.displayUserDetailsIndividually(clickedUser);
                        }
                    });
                }
            }
            catch (error) {
                console.error('Error:', error);
            }
        });
    }
}
const userApp = new UserApp();
// The DOM code to manipulate the events on the webpage
document.addEventListener('DOMContentLoaded', () => {
    userApp;
});
