// Handle form submission
document.getElementById('reviewForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent the default form submission
  
    const name = document.getElementById('name').value;
    const school = document.getElementById('school').value;
    const rating = document.getElementById('rating').value;
    const comment = document.getElementById('comment').value;
    const recommendation = document.getElementById('recommendation').value;
  
    if (!name || !school || !rating || !comment) {
      alert('Please fill in all required fields!');
      return;
    }
  
    // Prepare the data object for submission
    const data = {
      platformId: school, // Assuming `platformId` is the name of the school/platform
      userId: name,       // Assuming `userId` is the name for now, you should replace it accordingly
      rating: parseInt(rating),
      comment: comment,
    };
  
    try {
      // Send the POST request to the API
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
  
      // Handle the response
      if (response.status === 201) {
        alert('Review submitted successfully!');
        // Optionally, you can reset the form
        document.getElementById('reviewForm').reset();
      } else {
        alert(`Error: ${result.error || 'Failed to submit review'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An unexpected error occurred.');
    }
  });
  