Readme · MDCopy🎓 Face Recognition Attendance App

A sleek, browser-based attendance system that uses your device camera to capture and register student faces — no backend required.

Show Image

✨ Features

📸 Face Scanning — Captures face via webcam directly in the browser
📝 Student Registration — Register students with name + face photo
✅ Attendance Marking — One-click attendance with timestamp
📊 Live Dashboard — View all registered students and their present/absent status
💾 Local Storage — All data persists in browser storage (no server needed)
🌙 Dark UI — Modern dark theme with purple accent design


🗂️ Project Structure
face-recognition-attendance-app/
│
├── register.html       # Face registration page
├── register.css        # Styles for registration page
│
├── attendance.html     # Attendance marking page
├── attendance.css      # Styles for attendance page
│
├── dashboard.html      # Student attendance dashboard
├── dashboard.css       # Styles for dashboard
│
└── script.js           # Core logic (camera, storage, UI updates)

🔄 How It Works
1. Register Page
   └── Enter name → Click camera frame → Scan face → Register

2. Attendance Page
   └── Click "Mark Your Attendance" → System logs name + time

3. Dashboard Page
   └── View all students → Present (green) / Absent (red)

🧰 Tech Stack
TechnologyUsageHTML5Structure & Camera API (getUserMedia)CSS3Styling, gradients, dark themeVanilla JavaScriptLogic, DOM manipulationLocalStorage APIPersistent data storageFont Awesome 6Icons

📸 Screenshots
Register Page

Scan your face and enter your name to register.

Attendance Page

One click marks your attendance with a timestamp.

Dashboard

See all students with their attendance status at a glance.


⚙️ Browser Compatibility
BrowserSupportChrome✅ FullFirefox✅ FullEdge✅ FullSafari⚠️ Requires HTTPS for cameraMobile⚠️ Camera may vary by device

🔐 Privacy Note
All data (names, face images, attendance records) is stored locally in your browser using localStorage. No data is sent to any external server.

🛠️ Future Improvements

 Real face recognition using face-api.js
 Export attendance to CSV / Excel
 Admin login & authentication
 Cloud sync with Firebase
 Multi-class / multi-subject support
 Responsive mobile layout


👩‍💻 Author
Parul Sharma
📧 parulshah547@gmail.com
