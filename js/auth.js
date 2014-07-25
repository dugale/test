function isLoggedIn() {
    var id = window.localStorage.getItem("id");
    if (id) {
        window.location.href = 'home.html';
    } else {
        window.location.href = 'login.html';
    }
}
