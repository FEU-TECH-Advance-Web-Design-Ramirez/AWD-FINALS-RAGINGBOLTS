document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const API_URL = "https://demo-api-skills.vercel.app/api/EduSeeker/users/login/";

    try {
 
      const response = await axios.get(API_URL + email);
      const user = response.data;

      if (!user) {
        throw new Error("User not found!");
      }

     
      const inputHashedPassword = sha3_256(password);

      if (user.password !== inputHashedPassword) {
        throw new Error("Incorrect password!");
      }


      localStorage.setItem("userId", user.id);
      localStorage.setItem("userRole", user.role || "user");

    
      if (user.role && user.role.toLowerCase() === 'admin') {
        Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          text: 'Redirecting to Dashboard!',
        }).then(() => {
          window.location.href = '../../pages/userList/index.html';
        });
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          text: 'Redirecting to Home!',
        }).then(() => {
          window.location.href = '../../pages/userList/index.html';
        });
      }

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed!',
        text: error.message || 'An error occurred while logging in.',
      });
      console.error("Login error:", error.response ? error.response.data : error.message);
    }
  });