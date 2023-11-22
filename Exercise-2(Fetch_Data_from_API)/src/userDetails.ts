// // userDetails.ts

type UserDetail =  {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
};

class UserDetailsApp {
  public userDetailsContainer: HTMLElement | null;
  public backButton: HTMLElement | null;

  constructor() {
    this.userDetailsContainer = document.getElementById('userDetails');
    this.backButton = document.getElementById('backButton');

    if (this.userDetailsContainer && this.backButton) {
      this.init();
    } else {
      console.error('Error: Unable to find HTML containers');
    }
  }

  public async fetchUserDetails(userId: string): Promise<UserDetail> {
    try {
      const response = await fetch(`https://reqres.in/api/users/${userId}`);
      const data = await response.json();
      return data.data;
    } catch (error) {
      throw error;
    }
  }

  public displayUserDetails(user: UserDetail): void {
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

  public init(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');

    if (userId) {
      this.loadUserDetails(userId);
    } else {
      console.error('Error: userId not found in URL parameters');
    }

    if (this.backButton) {
      this.backButton.addEventListener('click', () => {
        window.location.href = 'index.html';
      });
    }
  }

  public async loadUserDetails(userId: string): Promise<void> {
    try {
      const userDetails = await this.fetchUserDetails(userId);
      this.displayUserDetails(userDetails);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new UserDetailsApp();
});
