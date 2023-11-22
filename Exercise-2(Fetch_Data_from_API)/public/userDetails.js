"use strict";
// // userDetails.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class UserDetailsApp {
    constructor() {
        this.userDetailsContainer = document.getElementById('userDetails');
        this.backButton = document.getElementById('backButton');
        if (this.userDetailsContainer && this.backButton) {
            this.init();
        }
        else {
            console.error('Error: Unable to find HTML containers');
        }
    }
    fetchUserDetails(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`https://reqres.in/api/users/${userId}`);
                const data = yield response.json();
                return data.data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    displayUserDetails(user) {
        const userDetailsHTML = `
      <div>
        <h3>Welcome, ${user.first_name} ${user.last_name}!</h3>
        <img src="${user.avatar}" alt="${user.first_name} ${user.last_name}">
        <p>ID: ${user.id}</p>
        <p>Name: ${user.first_name} ${user.last_name}</p>
        <p>Email: ${user.email}</p>
      </div>
    `;
        if (this.userDetailsContainer) {
            this.userDetailsContainer.innerHTML = userDetailsHTML;
        }
    }
    init() {
        const urlParams = new URLSearchParams(window.location.search);
        const userId = urlParams.get('userId');
        if (userId) {
            this.loadUserDetails(userId);
        }
        else {
            console.error('Error: userId not found in URL parameters');
        }
        if (this.backButton) {
            this.backButton.addEventListener('click', () => {
                window.location.href = 'index.html';
            });
        }
    }
    loadUserDetails(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userDetails = yield this.fetchUserDetails(userId);
                this.displayUserDetails(userDetails);
            }
            catch (error) {
                console.error('Error fetching user details:', error);
            }
        });
    }
}
document.addEventListener('DOMContentLoaded', () => {
    new UserDetailsApp();
});
