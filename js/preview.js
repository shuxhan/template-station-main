$(function () {
    $('.preview_link span.preview_link_span').click(function () {
        $(this).siblings().removeClass('cur');
        $(this).addClass('cur');
        var data_width = $(this).attr('data-width');
        $('.web_view_box_b').css('width', data_width);
    });
    var top_h;
    if ($('.preview-top-b').is(':hidden')) {
        top_h = 0;
    } else {
        top_h = $('.preview-top-b').outerHeight(true);
    }
    var iframeHeight = $(document).outerHeight(true) - top_h - 2;
    $("#iframe").height(iframeHeight);
});

function handle(_this, color, pre_domain) {
    $(_this).siblings().attr({ "class": "color-square" });
    $(_this).attr({ "class": "color-square selected" });
    var url = window.location.host;
    var urls = url.split('.');
    var domain = urls[urls.length - 2] + '.' + urls[urls.length - 1];
    var d = new Date();
    d.setTime(d.getTime() + (1 * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();

    console.log(pre_domain);
    document.cookie = 'color_' + pre_domain + '=' + color + ';' + expires + '; domain=' + domain + ';path=' + '/';
    location.reload();
}

var _hmt = _hmt || [];
(function () {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?fcf55f6a451f85c6dbd883bfe6bd9371";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();