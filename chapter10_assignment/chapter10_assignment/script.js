

function updateClock() {
    const clockEl = document.getElementById("liveClock");
    if (!clockEl) return;

    const now = new Date();
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const months = ["January","February","March","April","May","June",
                    "July","August","September","October","November","December"];

    const day = days[now.getDay()];
    const month = months[now.getMonth()];
    const date = now.getDate();
    const year = now.getFullYear();

    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    clockEl.textContent = `${day}, ${month} ${date}, ${year} • ${hours}:${minutes}:${seconds} ${ampm}`;
}


setInterval(function () {
    updateClock();
}, 1000);



function buildCourseTable() {
    const tbody = document.getElementById("courseTableBody");
    if (!tbody) return;

    const courses = [
        { name: "Web Design",          code: "IT 1430",   credits: 3, semester: "Spring 2026" },
        { name: "Composition",         code: "ENGL 1102", credits: 3, semester: "Spring 2026" },
        { name: "College Algebra",     code: "MATH 1111", credits: 3, semester: "Spring 2026" },
        { name: "American Government", code: "POLS 1101", credits: 3, semester: "Spring 2026" }
        
    ];

    tbody.innerHTML = "";

    courses.forEach(function (course) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${course.name}</td>
            <td>${course.code}</td>
            <td>${course.credits}</td>
            <td>${course.semester}</td>
        `;
        tbody.appendChild(row);
    });
}


function buildWorkTable() {
    const tbody = document.getElementById("workTableBody");
    if (!tbody) return;

    const jobs = [
        { role: "IT Support Intern",       company: "Vaden Automotive Group",     years: "2024",        skills: "Troubleshooting, Networking" },
        { role: "Computer Repair (Self)",  company: "Self-Employed",       years: "2022 – 2024", skills: "Hardware, Customer Service"  },
        { role: "Student Tech Volunteer",  company: "Jenkins High School", years: "2020 – 2021", skills: "Tech Setup, Problem Solving" }
    ];

    tbody.innerHTML = "";

    jobs.forEach(function (job, index) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${job.role}</td>
            <td>${job.company}</td>
            <td>${job.years}</td>
            <td>${job.skills}</td>
        `;
        tbody.appendChild(row);
    });
}



function isValidEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

function isValidPhone(phone) {
    const digits = phone.replace(/\D/g, "");
    return digits.length >= 10;
}

function validateForm(form) {
    const errors = [];

    const firstName = form.first_name.value.trim();
    const lastName  = form.last_name.value.trim();
    const email     = form.email.value.trim();
    const phone     = form.phone.value.trim();
    const reason    = form.reason.value;
    const subject   = form.subject.value.trim();
    const message   = form.message.value.trim();
    const consent   = form.consent.checked;

    if (firstName.length < 2) errors.push("First name must be at least 2 characters.");
    if (lastName.length  < 2) errors.push("Last name must be at least 2 characters.");
    if (!isValidEmail(email)) errors.push("Please enter a valid email address.");
    if (phone.length > 0 && !isValidPhone(phone)) {
        errors.push("Phone number must contain at least 10 digits.");
    }
    if (!reason)               errors.push("Please select a reason for contact.");
    if (subject.length < 3)    errors.push("Subject must be at least 3 characters.");
    if (message.length < 10)   errors.push("Message must be at least 10 characters.");
    if (!consent)              errors.push("You must agree to the consent statement.");

    return errors;
}

function showPopup(title, bodyHTML, type) {
    const overlay = document.getElementById("popupOverlay");
    const popupTitle = document.getElementById("popupTitle");
    const popupBody  = document.getElementById("popupBody");
    const popupBox   = document.getElementById("popupBox");

    if (!overlay) return;

    popupTitle.textContent = title;
    popupBody.innerHTML = bodyHTML;

    popupBox.classList.remove("popup-success", "popup-error");
    if (type === "success") popupBox.classList.add("popup-success");
    if (type === "error")   popupBox.classList.add("popup-error");

    overlay.style.display = "flex";
}

function closePopup() {
    const overlay = document.getElementById("popupOverlay");
    if (overlay) overlay.style.display = "none";
}

function initContactForm() {
    const form = document.querySelector(".contact-form");
    if (!form) return;

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const errors = validateForm(form);

        if (errors.length > 0) {
            let listHTML = "<ul style='text-align:left; margin:8px 0 0 18px;'>";
            errors.forEach(function (err) {
                listHTML += `<li>${err}</li>`;
            });
            listHTML += "</ul>";

            showPopup("⚠️ Please fix the following:", listHTML, "error");
            return;
        }

        const firstName = form.first_name.value.trim();
        const lastName  = form.last_name.value.trim();
        const email     = form.email.value.trim();
        const reason    = form.reason.options[form.reason.selectedIndex].text;
        const subject   = form.subject.value.trim();

        const successHTML = `
            <p style="margin:0 0 10px;">Thank you, <strong>${firstName} ${lastName}</strong>!
            Your message has been received successfully. ✅</p>
            <div style="text-align:left; background:rgba(15,52,96,0.06);
                        padding:10px 14px; border-radius:8px; font-size:0.92em;">
                <strong>Email:</strong> ${email}<br>
                <strong>Reason:</strong> ${reason}<br>
                <strong>Subject:</strong> ${subject}
            </div>
            <p style="margin:12px 0 0; font-size:0.92em; color:#444;">
                I will reply as soon as possible. 📬
            </p>
        `;

        showPopup("🎉 Message Sent!", successHTML, "success");
        form.reset();
    });

    const closeBtn = document.getElementById("popupClose");
    if (closeBtn) {
        closeBtn.addEventListener("click", function () {
            closePopup();
        });
    }

    const overlay = document.getElementById("popupOverlay");
    if (overlay) {
        overlay.addEventListener("click", function (e) {
            if (e.target === overlay) closePopup();
        });
    }
}



document.addEventListener("DOMContentLoaded", function () {
    updateClock();      // start the live clock right away (no 1-second wait)
    buildCourseTable(); // build education table (if on that page)
    buildWorkTable();   // build work table (if on that page)
    initContactForm();  // wire up the contact form (if on that page)
});
