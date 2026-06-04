const baseURL = "https://api.freeapi.app/api/v1/users";

function showMessage(msg) {
  document.getElementById("message").innerText = msg;
}

async function register() {
  const username = document.getElementById("reg-username").value;
  const email = document.getElementById("reg-email").value;
  const password = document.getElementById("reg-password").value;

  try {
    const res = await fetch(`${baseURL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include", // ✅ ADD THIS
      body: JSON.stringify({
        username,
        email,
        password,
        role: "ADMIN"
      })
    });

    const data = await res.json();
    showMessage("✅ Registered successfully!");
  } catch (err) {
    showMessage("❌ Registration failed");
  }
}

// ✅ Login
async function login() {
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  try {
    const res = await fetch(`${baseURL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (!res.ok) {
      showMessage("❌ " + data.message);
      return;
    }

    showMessage("✅ Logged in!");
  } catch (err) {
    showMessage("❌ Login failed");
  }
}

// ✅ Get Current User
async function getUser() {
  try {
    const res = await fetch(`${baseURL}/current-user`, {
      method: "GET",
      credentials: "include"
    });

    const data = await res.json();

    document.getElementById("user-info").innerText =
      JSON.stringify(data.data, null, 2);
  } catch (err) {
    showMessage("❌ Not logged in");
  }
}

// ✅ Logout
async function logout() {
  try {
    await fetch(`${baseURL}/logout`, {
      method: "POST",
      credentials: "include"
    });

    showMessage("🚪 Logged out");
    document.getElementById("user-info").innerText = "Not logged in";
  } catch (err) {
    showMessage("❌ Logout failed");
  }
}