interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}
// Function to fetch the user information and 
// convert it into json objects promise array
// which contains the elements of the type interface User
async function fetchUsers(): Promise<User[]> {
  try {
    const response = await fetch('https://reqres.in/api/users');
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

// The DOM code to manipulate the events on the webpage
document.addEventListener('DOMContentLoaded', async () => {
  const userListContainer = document.getElementById('userList');
  const userDetailsContainer = document.getElementById('userDetails');

  if (userListContainer && userDetailsContainer) {
    try {
      const users = await fetchUsers();
      displayUserList(users, userListContainer);

      userListContainer.addEventListener('click', (event) => {
        const clickedUserId = (event.target as HTMLElement).dataset.userId;
        if (clickedUserId) {
          const clickedUser = users.find(user => user.id === parseInt(clickedUserId, 10));
          displayUserDetailsIndividually(clickedUser, userDetailsContainer);
        }
      });
    } catch (error) {
      console.error('Error:', error);
    }
  }
});

function displayUserList(users: User[], container: HTMLElement) {
  const userListHTML = users.map(user => `
    <div>
      <img src="${user.avatar}" alt="${user.first_name} ${user.last_name}" data-user-id="${user.id}">
      <p>${user.first_name}</p>
    </div>
  `).join(' ');
  container.innerHTML = userListHTML;
}

function displayUserDetailsIndividually(user: User | undefined, container: HTMLElement) {
  if (user) {
    const userDetailsPage = 'userDetails.html';
    window.location.href = `${userDetailsPage}?userId=${user.id}`;
  }
}
