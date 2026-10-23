document.getElementById("contactForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const topic = document.getElementById("topic").value;
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    alert("Please fill in all required fields.");
    return;
  }

  const subject = encodeURIComponent("Hero Housing Fintech enquiry: " + topic);
  const body = encodeURIComponent(
    "Name: " + name + "\nEmail: " + email + "\nTopic: " + topic + "\n\nMessage:\n" + message
  );

  // Replace the empty recipient below with your real contact email address.
  window.location.href = "mailto:?subject=" + subject + "&body=" + body;
});