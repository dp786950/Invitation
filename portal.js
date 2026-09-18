/* =========================
   STUDENT PORTAL — CLIENT SIDE
   Handles the login form (login.html) and the results view
   (dashboard.html). Both talk to the JSON API in server.js.
========================= */

/* =========================
   LOGIN PAGE
========================= */

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    const loginError = document.getElementById("loginError");
    const loginBtn = document.getElementById("loginBtn");

    loginForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const studentId = document.getElementById("studentId").value.trim();
        const password = document.getElementById("password").value;

        loginError.classList.remove("visible");
        loginBtn.disabled = true;
        loginBtn.textContent = "Logging in...";

        try {

            const response = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ studentId, password })
            });

            const data = await response.json();

            if (data.success) {
                window.location.href = "dashboard.html";
            } else {
                loginError.textContent = data.message || "Login failed. Please try again.";
                loginError.classList.add("visible");
            }

        } catch (err) {
            loginError.textContent = "Could not reach the server. Please try again.";
            loginError.classList.add("visible");
        } finally {
            loginBtn.disabled = false;
            loginBtn.innerHTML = 'Log In <i class="fa-solid fa-arrow-right"></i>';
        }

    });

}

/* =========================
   DASHBOARD PAGE
========================= */

const welcomeBlock = document.getElementById("welcomeBlock");
const resultsBody = document.getElementById("resultsBody");
const logoutBtn = document.getElementById("logoutBtn");

if (welcomeBlock && resultsBody) {

    async function loadDashboard() {

        // Confirm the student is actually logged in.
        const meResponse = await fetch("/api/me");

        if (meResponse.status === 401) {
            window.location.href = "login.html";
            return;
        }

        const meData = await meResponse.json();
        const student = meData.student;

        welcomeBlock.querySelector("h1").textContent = `Welcome back, ${student.name.split(" ")[0]}`;
        welcomeBlock.querySelector("p").textContent =
            `Student ID: ${student.studentId}${student.class ? " • Class: " + student.class : ""}`;

        // Now load results.
        const resultsResponse = await fetch("/api/results");
        const resultsData = await resultsResponse.json();

        if (!resultsData.success) {
            resultsBody.innerHTML = `<p class="dash-state">${resultsData.message || "No results available yet."}</p>`;
            return;
        }

        const { term, subjects } = resultsData.results;

        const rows = subjects.map(row => `
            <tr>
                <td>${row.subject}</td>
                <td>${row.score}</td>
                <td><span class="grade-pill">${row.grade}</span></td>
                <td>${row.remark}</td>
            </tr>
        `).join("");

        resultsBody.innerHTML = `
            <span class="term-label">${term.toUpperCase()}</span>
            <h3>Your Results</h3>
            <table class="results-table">
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Score</th>
                        <th>Grade</th>
                        <th>Remark</th>
                    </tr>
                </thead>
                <tbody>
                    ${rows}
                </tbody>
            </table>
        `;
    }

    loadDashboard().catch(() => {
        resultsBody.innerHTML = `<p class="dash-state">Something went wrong loading your results. Please refresh the page.</p>`;
    });

    logoutBtn.addEventListener("click", async () => {
        await fetch("/api/logout", { method: "POST" });
        window.location.href = "login.html";
    });

}
