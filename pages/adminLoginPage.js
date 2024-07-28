
export default async function adminLoginPage() {

    const adminLoginPageHTML = `
      <div class="admin-login-container">
        <h1>Admin Login</h1>
        <form id="adminLoginForm">
          <label for="username">Username:</label>
          <input type="text" id="username" name="username" required>
          <label for="password">Password:</label>
          <input type="password" id="password" name="password" required>
          <button type="submit" id="loginBtn">Login</button>
        </form>
      </div>
    `;
  
    $('main').html(adminLoginPageHTML);
  
    $('#adminLoginForm').on('submit', async function (event) {
      event.preventDefault(); 
  
      // Get username and password from form inputs
      const username = $('#username').val();
      const password = $('#password').val();
  
      // Perform login with provided credentials
      const loggedIn = await login(username, password);
  
      // Redirect to admin page if login successful, otherwise show error message
      if (loggedIn) {
        window.location.href = '#admin'; 
      } else {
        alert('Invalid username or password. Please try again.'); // Show error message
      }
    });
  
    // Function to perform login authentication
    async function login(username, password) {
      // Define the hardcoded credentials
      const storedCredentials = {
        username: 'admin',
        password: '123456'
      };
  
      await new Promise(resolve => setTimeout(resolve, 500));
  
      if (username === storedCredentials.username && password === storedCredentials.password) {
        return true; 
      } else {
        return false; 
      }
    }
  }
  