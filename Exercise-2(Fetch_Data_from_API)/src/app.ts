type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
};


class UserApp {
  public userListContainer: HTMLElement | null;
  public userDetailsContainer: HTMLElement | null;

  constructor() {
    this.userListContainer = document.getElementById('userList');
    this.userDetailsContainer = document.getElementById('userDetails');

    if (this.userListContainer && this.userDetailsContainer) {
      this.init();
    } else {
      console.error('Error: Unable to find HTML containers');
    }
  }

// Function to fetch the user information and 
// convert it into json objects promise array
// which contains the elements of the type  User
  public async fetchUsers(): Promise<User[]> {
    try {
      const response = await fetch('https://reqres.in/api/users');
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  public displayUserList(users: User[]): void {
    const userListHTML = users
      .map(
        user => `
          <div>
            <img src="${user.avatar}" alt="${user.first_name} ${user.last_name}" data-user-id="${user.id}">
            <p>${user.first_name}</p>
          </div>
        `
      )
      .join(' ');

    if (this.userListContainer) {
      this.userListContainer.innerHTML = userListHTML;
    }
  }

  public displayUserDetailsIndividually(user: User | undefined): void {
    if (user) {
      const userDetailsPage = 'userDetails.html';
      window.location.href = `${userDetailsPage}?userId=${user.id}`;
    }
  }

  public async init(): Promise<void> {
    try {
      const users = await this.fetchUsers();
      this.displayUserList(users);

      if (this.userListContainer) {
        this.userListContainer.addEventListener('click', (event) => {
          const clickedUserId = (event.target as HTMLElement).dataset.userId;
          if (clickedUserId) {
            const clickedUser = users.find(user => user.id === parseInt(clickedUserId, 10));
            this.displayUserDetailsIndividually(clickedUser);
          }
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
}

const userApp = new UserApp();
// The DOM code to manipulate the events on the webpage
document.addEventListener('DOMContentLoaded', () => {
  userApp;
});
