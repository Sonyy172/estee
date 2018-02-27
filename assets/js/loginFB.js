// [1] Load lên các thành phần cần thiết
window.fbAsyncInit = function () {
    FB.init({
        appId: '2041159069433896',
        cookie: true,
        xfbml: true,
        version: 'v2.11'
    });
    // Kiểm tra trạng thái hiện tại
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });

};

// [2] Xử lý trạng thái đăng nhập
function statusChangeCallback(response) {
    // Người dùng đã đăng nhập FB và đã đăng nhập vào ứng dụng
    if (response.status === 'connected') {
        ShowWelcome();
        //window.location.href = 'http://thathinh.texaschicken.vn/choose.html';
    }
    // Người dùng đã đăng nhập FB nhưng chưa đăng nhập ứng dụng
    else if (response.status === 'not_authorized') {
        ShowLoginButton();
    }
    // Người dùng chưa đăng nhập FB
    else {
        ShowLoginButton();
    }
}

// [3] Yêu cầu đăng nhập FB
function RequestLoginFB() {
    window.location =
        'http://graph.facebook.com/oauth/authorize?client_id=2041159069433896&scope=public_profile,email,user_likes&redirect_uri=http://localhost:8888/estee/';
}

// [4] Hiển thị nút đăng nhập
function ShowLoginButton() {
    // document.getElementById('btb').setAttribute('style', 'display:block');
    // document.getElementById('lbl').setAttribute('style', 'display:none');
    console.log('chua dang nhap');

}

// [5] Chào mừng người dùng đã đăng nhập
function ShowWelcome() {
    FB.api('/me', function (response) {
        var name = response.name;
        var username = response.username;
        var id = response.id;

        var token = FB.getAuthResponse().accessToken;
        var public_profile_link = "https://www.facebook.com/app_scoped_user_id/" + id;
        var picture = "http://graph.facebook.com/" + id + "/picture?type=large";


        document.getElementById('user-id').value = id;
        document.getElementById('name-user').innerHTML = name;
        document.getElementById('picture-user').src = picture;


    });
}

function logoutFB() {
    FB.logout(function (response) {
        // user is now logged out
        window.location.href = 'http://localhost:8888/esste/index.html';

    });
}


(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.11&appId=2041159069433896";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));