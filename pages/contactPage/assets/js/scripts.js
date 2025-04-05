const API_URL = "https://demo-api-skills.vercel.app/api/EduSeeker/users"; 

document.getElementById('contactForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();

  
  const password = sha3_256("defaultPassword123"); 

  const contactData = {
    name,
    email,
    password 
  };

  try {
    const response = await axios.post(API_URL, contactData);

    Swal.fire({
      icon: 'success',
      title: 'Contact Submitted!',
      text: 'We have received your contact information.',
    });

    document.getElementById("contactForm").reset();
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Submission Failed!',
      text: 'Unable to send your contact info, Email is Already Exist!',
    });
    console.error("Error submitting contact:", error.response ? error.response.data : error.message);
  }
});