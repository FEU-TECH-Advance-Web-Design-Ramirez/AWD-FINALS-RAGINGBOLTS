const PLATFORM_API = "https://demo-api-skills.vercel.app/api/EduSeeker/platforms";
const REVIEW_API = "https://demo-api-skills.vercel.app/api/EduSeeker/reviews";
const VALIDATE_API = "https://demo-api-skills.vercel.app/api/EduSeeker/admin/reviews";


function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toISOString().split("T")[0];
}


function showDetails(data) {
  const htmlContent = `
    <div style="text-align: left; line-height: 1.6; font-size: 16px;">
      <p><strong>Name:</strong> ${data.name || '—'}</p>
      <p><strong>Category:</strong> ${data.category || '—'}</p>
      <p><strong>Description:</strong> ${data.description || '—'}</p>
      <p><strong>Submitted On:</strong> ${formatDate(data.createdAt)}</p>
    </div>`;
  Swal.fire({
    title: 'Submission Details',
    html: htmlContent,
    confirmButtonText: 'Close',
    customClass: { popup: 'custom-width' }
  });
}


async function approveSubmission(entry, rowElement, type) {
  const endpoint = `${VALIDATE_API}/${entry.id}/validate`;

  try {
    await axios.post(endpoint);
    updateStatus(rowElement, 'Approved', 'text-green-600');
    Swal.fire('Approved!', `${type} has been approved.`, 'success');
  } catch (err) {
    let storedReviews = JSON.parse(localStorage.getItem("submittedReviews") || "[]");

    storedReviews = storedReviews.map(r => {
      const same = r.platform_id === entry.platform_id &&
                   r.user_id === entry.user_id &&
                   r.comment === entry.comment;
      return same ? { ...r, validated: true, declined: false } : r;
    });

    localStorage.setItem("submittedReviews", JSON.stringify(storedReviews));

    updateStatus(rowElement, 'Approved', 'text-green-600');
    Swal.fire('Approved!', `${type} approved!`, 'success');
  }
}


async function declineSubmission(row, entry, type) {
  Swal.fire({
    title: `Decline this ${type}?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, Decline',
  }).then(async (result) => {
    if (result.isConfirmed) {
      updateStatus(row, 'Declined', 'text-red-600');
      Swal.fire('Declined!', `${type} has been declined.`, 'success');

  
      try {
        await axios.post(`${VALIDATE_API}/${entry.id}/decline`);
      } catch (err) {
        console.error('Error declining submission:', err);
      }

      let storedReviews = JSON.parse(localStorage.getItem("submittedReviews") || "[]");

      storedReviews = storedReviews.map(r => {
        const same = r.platform_id === entry.platform_id &&
                     r.user_id === entry.user_id &&
                     r.comment === entry.comment;
        return same ? { ...r, declined: true, validated: false } : r;
      });

      localStorage.setItem("submittedReviews", JSON.stringify(storedReviews));
    }
  });
}


function updateStatus(row, text, colorClass) {
  const cell = row.querySelector('.status-cell');
  cell.textContent = text;
  cell.className = `status-cell ${colorClass} px-2 py-2 border border-white text-center`;
}


function buildRow(entry, type) {
  let status = 'Pending';
  let statusClass = 'text-yellow-600';

  if (entry.validated) {
    status = 'Approved';
    statusClass = 'text-green-600';
  } else if (entry.declined) {
    status = 'Declined';
    statusClass = 'text-red-600';
  }

  return `
    <tr>
      <td class="px-2 py-2 border border-white text-center">${entry.name || '—'}</td>
      <td class="px-2 py-2 border border-white text-center">${type}</td>
      <td class="px-2 py-2 border border-white text-center">${formatDate(entry.createdAt)}</td>
      <td class="px-2 py-2 border border-white text-center status-cell ${statusClass}">${status}</td>
      <td class="px-2 py-2 border border-white text-center">
        <button onclick='showDetails(${JSON.stringify(entry)})' style="background-color:#1877F2;color:white;padding:4px 12px;border-radius:4px;">View</button>
        <button onclick='approveSubmission(${JSON.stringify(entry)}, this.closest("tr"), "${type}")' style="background-color:#28a745;color:white;padding:4px 12px;border-radius:4px;margin-left:6px;">Approve</button>
        <button onclick='declineSubmission(this.closest("tr"), ${JSON.stringify(entry)}, "${type}")' style="background-color:#FF5733;color:white;padding:4px 12px;border-radius:4px;margin-left:6px;">Decline</button>
      </td>
    </tr>`;
}


function populateTable() {
  const tbody = document.querySelector("tbody");


  axios.get(PLATFORM_API).then(res => {
    res.data.forEach(entry => {
      tbody.insertAdjacentHTML("beforeend", buildRow(entry, "Platform"));
    });
  }).catch(err => {
    console.error("Error fetching platforms:", err);
  });

 
  axios.get(REVIEW_API, {
    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
  }).then(res => {
    res.data.forEach(entry => {
      tbody.insertAdjacentHTML("beforeend", buildRow(entry, "Review"));
    });
  }).catch(err => {

    const localReviews = JSON.parse(localStorage.getItem("submittedReviews") || "[]");

    localReviews.forEach(entry => {
      entry.name = entry.comment || 'User Review';
      entry.createdAt = entry.createdAt || new Date().toISOString();
      entry.validated = entry.validated === true;
      entry.declined = entry.declined === true;

      tbody.insertAdjacentHTML("beforeend", buildRow(entry, "Review"));
    });
  });
}

populateTable();