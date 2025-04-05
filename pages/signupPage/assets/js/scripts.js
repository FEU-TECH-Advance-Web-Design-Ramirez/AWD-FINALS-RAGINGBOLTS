const API_URL = "https://demo-api-skills.vercel.app/api/EduSeeker/users";

document.getElementById('registerForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;


  const hashedPassword = sha3_256(password);

  const userData = {
    name,
    email,
    password: hashedPassword
  };

  try {
    const response = await axios.post(API_URL, userData);

    Swal.fire({
      icon: 'success',
      title: 'Registration Successful!',
      text: 'You will now be Redirected to Login.',
    }).then(() => {
      window.location.href = '../loginPage/index.html';
    });

    document.getElementById("registerForm").reset();
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Registration Failed',
      text: 'Email already exist, Use another email!',
    });
    console.error("Error:", error);
  }
});