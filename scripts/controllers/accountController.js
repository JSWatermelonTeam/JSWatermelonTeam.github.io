let accountController = (() => {

    function getRegisterPage(ctx) {
        ctx.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs'
        }).then(function()  {
            this.partial('./templates/register.hbs');
        })
    }

    function getLoginPage(ctx) {
        ctx.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs'
        }).then(function()  {
            this.partial('./templates/login.hbs');
        })
    }

    function getLoggedIn(ctx) {
        let username=ctx.params.username;
        let password=ctx.params.password;
        authenticator.login(username,password)
            .then(function (userInfo) {
                authenticator.saveSession(userInfo);
                authenticator.showInfo('Successfully logged in.');
                ctx.redirect("#/home");

            }).catch(authenticator.handleError);
    }

    function getRegistered(ctx) {
        let name = ctx.params.Name;
        let username = ctx.params.Username;
        let email = ctx.params.Email;
        let phoneNumber = ctx.params.PhoneNumber;
        let password = ctx.params.Password;
        let repeatedPass = ctx.params.ConfirmPassword;

        if (password !== repeatedPass) {
            authenticator.showError("Passwords don't match!");
            return;
        }

        authenticator.register(name, username, email, phoneNumber, password)
            .then(function (userInfo) {
                authenticator.saveSession(userInfo);
                authenticator.showInfo('Successfully registered.');
                ctx.redirect("#/home");
            }).catch(authenticator.handleError);
        }
    
    function logout(ctx) {
        authenticator.logout()
            .then(function () {
                authenticator.clearSession();
                ctx.redirect("#/home");
                authenticator.showInfo('Successfully logged out.');
            }).catch(authenticator.handleError);
    }

    return {
        getRegisterPage,
        getLoginPage,
        getLoggedIn,
        getRegistered,
        logout
    }
})();


