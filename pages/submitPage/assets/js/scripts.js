document.getElementById("submissionForm").addEventListener("submit", async function (event) {
    event.preventDefault();

  
    Swal.fire({
        title: 'Submitting...',
        didOpen: () => Swal.showLoading(),
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false
    });

    const name = document.getElementById("name").value.trim();
    const schoolName = document.getElementById("schoolName").value.trim();
    const category = document.getElementById("category").value.trim();
    const url = document.getElementById("url").value.trim();
    const description = document.getElementById("description").value.trim();

    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId) {
        Swal.close();
        Swal.fire({
            icon: "error",
            title: "Authentication Error",
            text: "User not logged in. Please log in first.",
        });
        return;
    }

    if (url && !url.match(/^https?:\/\/[^\s$.?#].[^\s]*$/i)) {
        Swal.close();
        Swal.fire({
            icon: "warning",
            title: "Invalid URL",
            text: "Please enter a valid URL starting with http:// or https://",
        });
        return;
    }

    const payload = {
        name,
        description,
        category,
        url,
        submittedBy: userId,
        schoolName
    };

    try {
        const headers = {
            'Content-Type': 'application/json'
        };
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await axios.post("https://demo-api-skills.vercel.app/api/EduSeeker/platforms", payload, {
            headers,
            timeout: 10000
        });

        const platformId = response.data._id || response.data.id;
        if (platformId) {
            localStorage.setItem("platformId", platformId);
            console.log("Platform ID saved to localStorage:", platformId);
        }

        Swal.close();
        Swal.fire({
            icon: "success",
            title: "Submission Successful!",
            text: "Your platform was submitted successfully.",
        });

        document.getElementById("submissionForm").reset();

    } catch (error) {
        Swal.close();
        console.error("Submission error details:", {
            message: error.message,
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data,
            userId
        });

        let errorMessage = "An error occurred while submitting your platform.";
        if (error.response?.data?.error) {
            errorMessage += " Details: " + error.response.data.error;
        }

        Swal.fire({
            icon: "error",
            title: "Submission Failed",
            text: errorMessage,
        });
    }
});