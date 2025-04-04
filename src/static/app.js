document.addEventListener("DOMContentLoaded", () => {
  const activitiesList = document.getElementById("activities-list");
  const activitySelect = document.getElementById("activity");
  const signupForm = document.getElementById("signup-form");
  const messageDiv = document.getElementById("message");  // ...existing code...
  
  // Populate activities list
  Object.entries(activities).forEach(([name, details]) => {
    const activityCard = document.createElement("div");
    activityCard.className = "activity-card";
  
    const spotsLeft = details.max_participants - details.participants.length;
  
    // Create a list of participants
    const participantsList = details.participants.length
      ? `<ul>${details.participants.map(participant => `<li>${participant}</li>`).join("")}</ul>`
      : "<p>No participants yet.</p>";
  
    activityCard.innerHTML = `
      <h4>${name}</h4>
      <p>${details.description}</p>
      <p><strong>Schedule:</strong> ${details.schedule}</p>
      <p><strong>Availability:</strong> ${spotsLeft} spots left</p>
      <div class="participants-section">
        <h5>Participants:</h5>
        ${participantsList}
      </div>
    `;
  
    activitiesList.appendChild(activityCard);
  
    // Add option to select dropdown
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    activitySelect.appendChild(option);
  });
  
  // ...existing code...

  // Function to fetch activities from API
  async function fetchActivities() {
    try {
      const response = await fetch("/activities");
      const activities = await response.json();

      // Clear loading message
      activitiesList.innerHTML = "";

      // Populate activities list
      Object.entries(activities).forEach(([name, details]) => {
        const activityCard = document.createElement("div");
        activityCard.className = "activity-card";

        const spotsLeft = details.max_participants - details.participants.length;        /* ...existing code... */
        
        .participants-section {
          margin-top: 15px;
          padding: 10px;
          background-color: #eef7ff;
          border: 1px solid #cce4ff;
          border-radius: 5px;
        }
        
        .participants-section h5 {
          margin-bottom: 10px;
          color: #0056b3;
        }
        
        .participants-section ul {
          list-style-type: disc;
          margin-left: 20px;
        }
        
        .participants-section li {
          margin-bottom: 5px;
          color: #333;
        }
        
        /* ...existing code... */

        /* ...existing code... */
        
        .participants-section {
          margin-top: 15px;
          padding: 10px;
          background-color: #eef7ff;
          border: 1px solid #cce4ff;
          border-radius: 5px;
        }
        
        .participants-section h5 {
          margin-bottom: 10px;
          color: #0056b3;
        }
        
        .participants-section ul {
          list-style-type: disc;
          margin-left: 20px;
        }
        
        .participants-section li {
          margin-bottom: 5px;
          color: #333;
        }
        
        /* ...existing code... */        /* ...existing code... */
        
        .participants-section {
          margin-top: 15px;
          padding: 10px;
          background-color: #eef7ff;
          border: 1px solid #cce4ff;
          border-radius: 5px;
        }
        
        .participants-section h5 {
          margin-bottom: 10px;
          color: #0056b3;
        }
        
        .participants-section ul {
          list-style-type: disc;
          margin-left: 20px;
        }
        
        .participants-section li {
          margin-bottom: 5px;
          color: #333;
        }
        
        /* ...existing code... */        /* ...existing code... */
        
        .participants-section {
          margin-top: 15px;
          padding: 10px;
          background-color: #eef7ff;
          border: 1px solid #cce4ff;
          border-radius: 5px;
        }
        
        .participants-section h5 {
          margin-bottom: 10px;
          color: #0056b3;
        }
        
        .participants-section ul {
          list-style-type: disc;
          margin-left: 20px;
        }
        
        .participants-section li {
          margin-bottom: 5px;
          color: #333;
        }
        
        /* ...existing code... */        // Create a list of participants
        const participantsList = details.participants.length
          ? `<ul>${details.participants.map(participant => `<li>${participant}</li>`).join("")}</ul>`
          : "<p>No participants yet.</p>";

        activityCard.innerHTML = `
          <h4>${name}</h4>
          <p>${details.description}</p>
          <p><strong>Schedule:</strong> ${details.schedule}</p>
          <p><strong>Availability:</strong> ${spotsLeft} spots left</p>
          <div class="participants-section">
            <h5>Participants:</h5>
            ${participantsList}
          </div>
        `;

        activitiesList.appendChild(activityCard);

        // Add option to select dropdown
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        activitySelect.appendChild(option);
      });
    } catch (error) {
      activitiesList.innerHTML = "<p>Failed to load activities. Please try again later.</p>";
      console.error("Error fetching activities:", error);
    }
  }

  // Handle form submission
  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const activity = document.getElementById("activity").value;

    try {
      const response = await fetch(
        `/activities/${encodeURIComponent(activity)}/signup?email=${encodeURIComponent(email)}`,
        {
          method: "POST",
        }
      );

      const result = await response.json();

      if (response.ok) {
        messageDiv.textContent = result.message;
        messageDiv.className = "success";
        signupForm.reset();
      } else {
        messageDiv.textContent = result.detail || "An error occurred";
        messageDiv.className = "error";
      }

      messageDiv.classList.remove("hidden");

      // Hide message after 5 seconds
      setTimeout(() => {
        messageDiv.classList.add("hidden");
      }, 5000);
    } catch (error) {
      messageDiv.textContent = "Failed to sign up. Please try again.";
      messageDiv.className = "error";
      messageDiv.classList.remove("hidden");
      console.error("Error signing up:", error);
    }
  });

  // Initialize app
  fetchActivities();
});
