let scanBtn = document.querySelector(".scan");
let inputBtn = document.querySelector("input");
let registerBtn = document.querySelector(".register-btn");
let markBtn = document.querySelector(".mark-btn");

let statusField = document.getElementById("status");
let timeField = document.getElementById("time");
let userField = document.getElementById("username");

// ================= REGISTER =================
if(registerBtn){
    registerBtn.addEventListener("click", () => {

        let name = inputBtn.value.trim();

        if(name === ""){
            alert("Please Enter Your Name");
            return;
        }

        // 🔥 check image
        let image = localStorage.getItem("faceImage_" + name);
        if(!image){
            alert("Please scan your face first!");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];

        if(!users.includes(name)){
            users.push(name);
            localStorage.setItem("users", JSON.stringify(users));
        }

        localStorage.setItem("currentUser", name);

        if(userField){
            userField.innerText = name;
        }

        alert("Registered Successfully!");
    });
}


// ================= ATTENDANCE =================
if(markBtn){
    markBtn.addEventListener("click", () => {

        let name = localStorage.getItem("currentUser");

        if(!name){
            alert("Please register first!");
            return;
        }

        let students = JSON.parse(localStorage.getItem("students")) || [];

        let alreadyMarked = students.find(s => s.name === name);
        if(alreadyMarked){
            alert("Attendance already marked!");
            return;
        }

        let now = new Date();
        let time = now.toLocaleTimeString();

        let imageData = localStorage.getItem("faceImage_" + name);

        students.push({
            name: name,
            time: time,
            status: "Present",
            image: imageData
        });

        localStorage.setItem("students", JSON.stringify(students));

        if(statusField) statusField.innerText = "Present";
        if(timeField) timeField.innerText = time;
        if(userField) userField.innerText = name;
    });
}


// ================= DASHBOARD =================
let studentList = document.querySelector(".present-card");

if(studentList){

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let students = JSON.parse(localStorage.getItem("students")) || [];

    studentList.innerHTML = "";

    let finalList = users.map(user => {
        let found = students.find(s => s.name === user);

        if(found) return found;

        return {
            name: user,
            time: "-",
            status: "Absent",
            image: null
        };
    });

    finalList.forEach(student => {

        let div = document.createElement("div");
        div.classList.add("present");

        div.innerHTML = `
            <img src="${student.image ? student.image : 'default.png'}">

            <div class="details">
                <h3>${student.name}</h3>
                <p>${student.time}</p>
            </div>

            <div class="status">
                <span style="color:${student.status === "Present" ? "#22c55e" : "red"}">
                    ${student.status}
                </span>
            </div>
        `;

        studentList.appendChild(div);
    });

    // ✅ COUNT FIX
    let presentCount = students.length;
    let absentCount = users.length - presentCount;

    console.log("Present:", presentCount);
    console.log("Absent:", absentCount);
}


// ================= CAMERA =================
let video = document.getElementById("video");
let canvas = document.getElementById("canvas");
let capturedImg = document.getElementById("capturedImg");
let cameraBox = document.getElementById("cameraBox");

let stream = null;
let isCameraOn = false;

if(cameraBox){
    cameraBox.addEventListener("click", async () => {

        if(!isCameraOn){
            try{
                stream = await navigator.mediaDevices.getUserMedia({ video: true });
                video.srcObject = stream;

                video.style.display = "block";
                capturedImg.style.display = "none";

                isCameraOn = true;
            }
            catch(err){
                alert("Camera permission denied");
            }
        }
    });
}


// ================= SCAN =================
if(scanBtn){
    scanBtn.addEventListener("click", () => {

        let name = inputBtn.value.trim();

        if(name === ""){
            alert("Enter name first!");
            return;
        }

        if(!isCameraOn){
            alert("Click on frame to start camera");
            return;
        }

        let ctx = canvas.getContext("2d");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        ctx.drawImage(video, 0, 0);

        let imageData = canvas.toDataURL("image/png");

        capturedImg.src = imageData;

        // 🔥 STOP CAMERA
        stream.getTracks().forEach(track => track.stop());

        video.style.display = "none";
        capturedImg.style.display = "block";

        // 🔥 SAVE IMAGE PROPERLY
        localStorage.setItem("faceImage_" + name, imageData);

        isCameraOn = false;
    });
}