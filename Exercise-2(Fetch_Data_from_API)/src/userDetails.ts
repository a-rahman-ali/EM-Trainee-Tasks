// userDetails.ts

interface UserDetail {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

document.addEventListener('DOMContentLoaded', async () => {
  const userDetailsContainer = document.getElementById('userDetails');
  const backButton = document.getElementById('backButton'); // Assuming you have a button with the id 'backButton'

  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get('userId');

  if (userDetailsContainer && backButton && userId) {
    try {
      const userDetails = await fetchUserDetails(userId);
      displayUserDetails(userDetails, userDetailsContainer);

      // Add click event listener to the back button
      backButton.addEventListener('click', () => {
        window.location.href = 'index.html';
      });
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  }
});

async function fetchUserDetails(userId: string): Promise<UserDetail> {
  try {
    const response = await fetch(`https://reqres.in/api/users/${userId}`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    throw error;
  }
}

function displayUserDetails(user: UserDetail, container: HTMLElement) {
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
