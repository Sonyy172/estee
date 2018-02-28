var appVotingBeauty = '2041159069433896';
var appABTech = '152276092150806';
var appID = appVotingBeauty;

var linkLocal = 'http://estee.test:8888/estee/';
var linkABTech = 'http://voting.abtech.vn/';
var chooseLink = '';

var server = 'local';

if (server == 'local') {
    chooseLink = linkLocal;
} else {
    chooseLink = linkABTech;
}


function loading() {
    $('#loading').css('display', 'block');
    $('.step2-content').css('opacity', '0.2');
}

function onChangeEvent() {
    loading();
    var user_id = document.getElementById('user-id').value;
    var file_data = $('#fileToUpload').prop('files')[0];
    var type = file_data.type;
    // console.log(type);
    var match = ["image/png", "image/jpeg", "image/jpg"];
    if (type == match[0] || type == match[1] || type == match[2]) {
        var form_data = new FormData();
        form_data.append('file', file_data);
        form_data.append('user_id', user_id);
        console.log('localhost');
        $.ajax({
            url: chooseLink + 'upload.php',
            dataType: 'text',
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,
            type: 'post',
            success: function(res) {
                console.log('Response from upload.php');
                console.log(res);

                if (res == 'upload ok') {
                    window.location.href = chooseLink + 'index3.html#bai-du-thi';

                }
            }
        });
    } else {
        console.log('chi duoc upload file anh');
    }
    return false;
}

function silderZoom() {
    var minsize = 350 / $("#zoomImg").height();
    var mySlider = $("#zoom-slider").slider({
        value: 1,
        step: 0.01,
        min: minsize,
        max: 2,
        orientation: 'vertical',
        tooltip: 'hide'
    });
    var _WIDTH = $('#zoomImg').width();


    function changeImgScale() {
        var value = mySlider.slider('getValue');
        $('#zoomImg').css('width', _WIDTH * value);
        $("#zoomImg").css({
            top: '0px',
            left: '0px'
        });
        // $('#zoomImg').css('transform', 'scale(' + value + ')');
    }

    changeImgScale();
    mySlider.on('slide', changeImgScale);
    mySlider.on('slideStop', changeImgScale);
};

function disableScroll() {

}

var _DRAGGGING_STARTED = 0;
var _LAST_MOUSEMOVE_POSITION = {
    x: null,
    y: null,
};
var _DIV_OFFSET = $('#image-container').offset();
var _CONTAINER_WIDTH = $("#image-container").outerWidth();
var _CONTAINER_HEIGHT = $("#image-container").outerHeight();
var _IMAGE_WIDTH;
var _IMAGE_HEIGHT;
var _IMAGE_LOADED = 0;
var _ZOOM = 1;

function startDrag() {
    $('.notice-drag').css('display', 'none');
    _DRAGGGING_STARTED = 1;
    dragAction();
}

function dragAction() {
    $('.notice-drag').css('display', 'none');


    // Check whether image is cached or wait for the image to load
    // This is necessary before calculating width and height of the image
    if ($('#zoomImg').get(0).complete) {
        ImageLoaded();
    } else {
        $('#zoomImg').on('load', function() {
            ImageLoaded();
        });
    }

    // Image is loaded
    function ImageLoaded() {
        _ZOOM = $("#zoom-slider").slider('getValue');
        _IMAGE_WIDTH = $("#zoomImg").width() * _ZOOM;
        _IMAGE_HEIGHT = $("#zoomImg").height() * _ZOOM;
        _IMAGE_LOADED = 1;
    }

    $('#blank-frame').on('mousedown', function(event) {
        /* Image should be loaded before it can be dragged */


        if ((_IMAGE_LOADED == 1) && (_DRAGGGING_STARTED == 1)) {
            _ZOOM = $("#zoom-slider").slider('getValue');
            _IMAGE_WIDTH = $("#zoomImg").width() * _ZOOM;
            _IMAGE_HEIGHT = $("#zoomImg").height() * _ZOOM;
            _DRAGGGING_STARTED = 2;

            /* Save mouse position */
            _LAST_MOUSE_POSITION = {
                x: event.pageX - _DIV_OFFSET.left,
                y: event.pageY - _DIV_OFFSET.top
            };

        } else {
            return;
        }


    });

    $('#blank-frame').on('mouseup', function() {
        _DRAGGGING_STARTED = 0;
        $('.notice-drag').css('display', 'block');
    });

    $('#blank-frame').on('mousemove', function(event) {
        var current_mouse_position = {
            x: event.pageX - _DIV_OFFSET.left,
            y: event.pageY - _DIV_OFFSET.top
        };

        if (_DRAGGGING_STARTED == 2 && _LAST_MOUSE_POSITION.x != current_mouse_position.x && _LAST_MOUSE_POSITION.y != current_mouse_position.y) {

            var change_x = (current_mouse_position.x - _LAST_MOUSE_POSITION.x) * _ZOOM;
            var change_y = (current_mouse_position.y - _LAST_MOUSE_POSITION.y) * _ZOOM;

            /* Save mouse position */
            _LAST_MOUSE_POSITION = current_mouse_position;

            var img_top = parseInt($("#zoomImg").css('top'), 10);
            var img_left = parseInt($("#zoomImg").css('left'), 10);

            var img_top_new = img_top + change_y;
            var img_left_new = img_left + change_x;

            console.log(img_top_new);
            console.log(_CONTAINER_HEIGHT);
            console.log(_IMAGE_HEIGHT);

            /* Validate top and left do not fall outside the image, otherwise white space will be seen */
            if (img_top_new > 0)
                img_top_new = 0;
            if (img_top_new < _CONTAINER_HEIGHT - (_IMAGE_HEIGHT / _ZOOM))
                img_top_new = _CONTAINER_HEIGHT - (_IMAGE_HEIGHT / _ZOOM);

            if (img_left_new > 0)
                img_left_new = 0;
            if (img_left_new < _CONTAINER_WIDTH - (_IMAGE_WIDTH / _ZOOM))
                img_left_new = _CONTAINER_WIDTH - (_IMAGE_WIDTH / _ZOOM);

            console.log(img_top_new);
            $("#zoomImg").css({
                top: img_top_new + 'px',
                left: img_left_new + 'px'
            });
        } else {
            return;
        }
    });
}

function saveCanvas2ImageOnServer() {
    console.log('save canvas');

    html2canvas(document.getElementById('final')).then(function(canvas) {
        var image = canvas.toDataURL("image/png");
        var user_id = document.getElementById('user-id').innerHTML;
        console.log(user_id);
        var form_data = new FormData();
        form_data.append('imgBase64', image);
        form_data.append('user_id', user_id);
        $.ajax({
            url: chooseLink + 'save-canvas.php',
            dataType: 'text',
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,
            type: 'post',
            success: function(res) {
                console.log(res);
                if (res == 'save image ok') {
                    window.top.location.href = chooseLink + 'index4.html#bai-du-thi';
                }
            }
        });
    });

}


function changeImage(id) {
    var user_id = document.getElementById('user-id').innerHTML;
    if (id == 'original') {
        $("#zoomImg").attr("src", './photos/' + user_id + '/original.png');
    } else {
        var bendedImageSrc = $("#" + id).attr("src");
        $("#zoomImg").attr("src", bendedImageSrc);
    }
}

//
// function sharefbimage() {
//     var image = 'https://znews-photo-td.zadn.vn/w1024/Uploaded/znguhv/2017_06_12/zing_meo_larry_4.jpg';
//
//     FB.ui({
//             method: 'share_open_graph',
//             action_type: 'og.shares',
//             action_properties: JSON.stringify({
//                 object: {
//                     'og:url': 'https://saostar.vn/the-thao/bong-da/bui-tien-dung-sinh-nhat-tuoi-21-sau-loi-xin-loi-la-mua-giong-2288453.html',
//                     'og:title': 'Estée Lauder',
//                     'og:description': '#iLOVEANR #PowerOfNight',
//                     'og:image': image
//                 }
//             })
//         },
//         function (response) {
//             // Action after response
//         });
// }