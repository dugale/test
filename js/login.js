function logIn() {
    if (jQuery("#email").val() == 'dugale@dayaweb.com' && jQuery("#password").val() == 'testing') {
        window.localStorage.setItem("id", "1");            
        window.location.href = 'home.html';
    }
}
