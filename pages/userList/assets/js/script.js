async function fetchUsers() {
    const API_URL = "https://demo-api-skills.vercel.app/api/EduSeeker/users";

    try {
     
      const response = await axios.get(API_URL);
      const users = response.data;

      
      if (!users || users.length === 0) {
        document.getElementById('userList').innerHTML = '<tr><td colspan="2" class="text-center">No users found</td></tr>';
        return;
      }

      
      document.getElementById('userList').innerHTML = '';

     
      users.forEach(user => {
        const createdDate = new Date(user.createdAt || user.created_at || Date.now());
        const formattedDate = `${createdDate.getDate().toString().padStart(2, '0')}/${(createdDate.getMonth() + 1).toString().padStart(2, '0')}/${createdDate.getFullYear()}`;

        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${user.email}</td>
          <td>${formattedDate}</td>
        `;
        document.getElementById('userList').appendChild(row);
      });

      
      if (!$.fn.DataTable.isDataTable('#userTable')) {
        $('#userTable').DataTable({
          paging: true,
          searching: true,
          ordering: true,
          order: [[1, 'desc']],
          pageLength: 5,
        });
      }

    } catch (error) {
      console.error("Error fetching users:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to load user data!',
      });
    }
  }


  window.onload = fetchUsers;