document.getElementById('ratingForm').addEventListener('submit', async function(event) {
  event.preventDefault();

 
  const rating = document.getElementById('rating').value;
  const comment = document.getElementById('comment').value;
  
  
  const userId = localStorage.getItem('userId');
  const platformId = localStorage.getItem('platformId');

  if (!userId || !platformId) {
      Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'User ID or Platform ID not found.',
      });
      return;
  }


  
  const payload = {
      platform_id: platformId,
      platformId: platformId,  
      userId: userId,
      user_id: userId,        
      rating: parseInt(rating),
      comment: comment,
      recommendation: document.getElementById('recommendation')?.value || "" 
  };

  console.log("Payload being sent:", payload);

  const apiUrl = `https://demo-api-skills.vercel.app/api/EduSeeker/reviews`;

  try {
    
      const response = await axios.post(apiUrl, JSON.stringify(payload), {
          headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json',
          }
      });

    Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Your rating has been submitted successfully!',
    });

  
    const storedReviews = JSON.parse(localStorage.getItem("submittedReviews") || "[]");
    storedReviews.push(payload);
    localStorage.setItem("submittedReviews", JSON.stringify(storedReviews));

    document.getElementById('ratingForm').reset();

  } catch (error) {
     
      const errorMessage = error.response?.data?.error || error.message || 'Unknown error';
      const errorDetails = error.response?.data || {};
      
      Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: `There was an issue while submitting your rating: ${errorMessage}`,
      });
      
      console.error("Error details:", errorDetails);
      console.error("Full error object:", error);
  }
});