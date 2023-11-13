"use strict";
// userDetails.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.addEventListener('DOMContentLoaded', () => __awaiter(void 0, void 0, void 0, function* () {
    const userDetailsContainer = document.getElementById('userDetails');
    const backButton = document.getElementById('backButton'); // Assuming you have a button with the id 'backButton'
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');
    if (userDetailsContainer && backButton && userId) {
        try {
            const userDetails = yield fetchUserDetails(userId);
            displayUserDetails(userDetails, userDetailsContainer);
            // Add click event listener to the back button
            backButton.addEventListener('click', () => {
                window.location.href = 'index.html';
            });
        }
        catch (error) {
            console.error('Error fetching user details:', error);
        }
    }
}));
function fetchUserDetails(userId) {
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
function displayUserDetails(user, container) {
    // Create HTML content for displaying user details
    const userDetailsHTML = `
    <div>
      <h3>Welcome, ${user.first_name} ${user.last_name}!</h3>
      <img src="${user.avatar}" alt="${user.first_name} ${user.last_name}">
      <p>ID: ${user.id}</p>
      <p>Name: ${user.first_name} ${user.last_name}</p>
      <p>Email: ${user.email}</p>
    </div>
  `;
    // Update the container's inner HTML with the user details
    container.innerHTML = userDetailsHTML;
}
