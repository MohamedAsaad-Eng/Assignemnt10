var signupName = document.getElementById('signupName')
var signupEmail = document.getElementById('signupEmail')
var signupPassword = document.getElementById('signupPassword')
var signinEmail = document.getElementById('signinEmail')
var signinPassword = document.getElementById('signinPassword')


var pathparts = location.pathname.split('/');
var baseURL = ''
for (var i = 0; i < pathparts.length - 1; i++) {
    baseURL += '/' + pathparts[i]
}
console.log(baseURL);

var username = localStorage.getItem('sessionUsername')
if (username) {
    document.getElementById('username').innerHTML = "Welcome " + username
}

var signUpArray = []
if (localStorage.getItem('users') == null) {
    signUpArray = []
} else {
    signUpArray = JSON.parse(localStorage.getItem('users'))
}

function isEmpty() {

    if (signupName.value == "" || signupEmail.value == "" || signupPassword.value == "") {
        return false
    } else {
        return true
    }
}


function isEmailExist() {
    for (var i = 0; i < signUpArray.length; i++) {
        if (signUpArray[i].email.toLowerCase() == signupEmail.value.toLowerCase()) {
            return false; 
        }
    }
    return true;
}
function signUp() {
    if (isEmpty() == false) {
        document.getElementById('exist').innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
        return false
    }
    var signUp = {
        name: signupName.value,
        email: signupEmail.value,
        password: signupPassword.value,
    }
    if (signUpArray.length == 0) {
        signUpArray.push(signUp)
        localStorage.setItem('users', JSON.stringify(signUpArray))
        document.getElementById('exist').innerHTML = '<span class="text-success m-3">Success</span>'
        return true
    }
    if (isEmailExist() == false) {
        document.getElementById('exist').innerHTML = '<span class="text-danger m-3">email already exists</span>'

    } else {
        signUpArray.push(signUp)
        localStorage.setItem('users', JSON.stringify(signUpArray))
        document.getElementById('exist').innerHTML = '<span class="text-success m-3">Success</span>'

        signupName.value = '';
signupEmail.value = '';
signupPassword.value = '';

    }


}


function isLoginEmpty() {

    if (signinPassword.value == "" || signinEmail.value == "") {
        return false
    } else {
        return true
    }
}

function login() {
    if (isLoginEmpty() == false) {
        document.getElementById('incorrect').innerHTML = '<span class="text-danger m-3">All inputs is required</span>';
        return false;
    }

    var password = signinPassword.value;
    var email = signinEmail.value;
    var found = false;

    for (var i = 0; i < signUpArray.length; i++) {
        if (signUpArray[i].email.toLowerCase() == email.toLowerCase() && signUpArray[i].password == password) {
            localStorage.setItem('sessionUsername', signUpArray[i].name);
            found = true;
            break;
        }
    }

    if (found) {
        if (baseURL == '/') {
            location.replace('https://' + location.hostname + '/home.html');
        } else {
            location.replace(baseURL + '/home.html');
        }
    } else {
        document.getElementById('incorrect').innerHTML = '<span class="p-2 text-danger">incorrect email or password</span>';
    }
}


function logout() {
    localStorage.removeItem('sessionUsername')
}










//     var users = JSON.parse(localStorage.getItem("users")) || [];

//   function signUp() {
//     var signupMessage = document.getElementById("signupMessage");
//     var user = {
//         name: signupName.value,
//         email: signupEmail.value,
//         password: signupPassword.value
//     };

//     var isExist = users.some(u => u.email === user.email);
//     if (isExist) {
//         signupMessage.textContent = "هذا البريد مسجل بالفعل.";
//         signupMessage.classList.replace("text-success", "text-danger");
//         return;
//     }

//     users.push(user);
//     localStorage.setItem("users", JSON.stringify(users));
//     signupMessage.textContent = "تم إنشاء الحساب بنجاح.";
//     signupMessage.classList.replace("text-danger", "text-success");
//     clearSignupInputs();
// }

//    function login() {
//     var loginMessage = document.getElementById("loginMessage");
//     var email = signinEmail.value.trim();
//     var password = signinPassword.value;

//     var matchedUser = users.find(u => u.email === email && u.password === password);

//     if (matchedUser) {
//         loginMessage.textContent = "تم تسجيل الدخول بنجاح، مرحباً " + matchedUser.name;
//         loginMessage.classList.replace("text-danger", "text-success");
//         // window.location.href = "dashboard.html";
//     } else {
//         loginMessage.textContent = "البريد الإلكتروني أو كلمة المرور غير صحيحة.";
//         loginMessage.classList.replace("text-success", "text-danger");
//     }
// }



// function login() {
//     if (isLoginEmpty() == false) {
//         document.getElementById('incorrect').innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
//         return false
//     }
//     var password = signinPassword.value
//     var email = signinEmail.value
//     for (var i = 0; i < signUpArray.length; i++) {
//         if (signUpArray[i].email.toLowerCase() == email.toLowerCase() && signUpArray[i].password.toLowerCase() == password.toLowerCase()) {
//             localStorage.setItem('sessionUsername', signUpArray[i].name)
//             if (baseURL == '/') {
//                 location.replace('https://' + location.hostname + '/home.html')

//             } else {
//                 location.replace(baseURL + '/home.html')

//             }
//         } else {
//             document.getElementById('incorrect').innerHTML = '<span class="p-2 text-danger">incorrect email or password</span>'
//         }
//     }

// }