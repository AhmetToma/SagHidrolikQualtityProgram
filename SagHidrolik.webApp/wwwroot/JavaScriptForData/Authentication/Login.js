
$('#btn-login-submit').click((e) => {
    e.preventDefault();
    let user = {
        email: $('#inp-login-email').val(),
        password: $('#inp-login-password').val()
    }

    if (user.email === '' || user.password === '') {
        Swal.fire({
            type: 'error',
            title: "you should enter all fields",
            timer: 3000
        });
    }
    else {
        $.ajax({
            type: "POST",
            contentType: "application/json;charset=utf-8",
            url: HttpUrls.login,
            data: JSON.stringify(user),
            success: (response) => {
                if (response.succeeded) {
                    window.open(`${BaseUrl}`, "_self")
                }
                else {
                    Swal.fire({
                        type: 'error',
                        title: "you have  no permission to access to system",
                        timer: 3000
                    });
                }
            }
        });
    }
});




$('#btn-logout').click((e) => {
    e.preventDefault();
    Swal.fire({
        title: `logout!`,
        text: `do you want to logout from system?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.value) {
            $.ajax({
                type: "POST",
                contentType: "application/json;charset=utf-8",
                url: HttpUrls.logout,
                success: (response) => {
                    window.open(`${BaseUrl}`, "_self")
                },
                error: (e) => {
                    console.log(e);
                    window.open(`${BaseUrl}`, "_self")
                }
            });
        }
    })
})