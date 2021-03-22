

(function ($) {
    $.fn.pager = function (options) {
        var opts = $.extend({}, $.fn.pager.defaults, options);
        return this.each(function () {
            $(this).empty().append(renderpager(parseInt(options.pagenumber), parseInt(options.pagecount), options.buttonClickCallback));
            $('.pages li').mouseover(function () { document.body.style.cursor = "pointer"; }).mouseout(function () { document.body.style.cursor = "auto"; });
        });
    };

    function renderpager(pagenumber, pagecount, buttonClickCallback) {
        var $pager = $('<ul class="pages"></ul>');
        $pager.append(renderButton('首页', pagenumber, pagecount, buttonClickCallback)).append(renderButton('上一页', pagenumber, pagecount, buttonClickCallback));

        var startPoint = 1;
        var endPoint = 9;

        if (pagenumber > 4) {
            startPoint = pagenumber - 4;
            endPoint = pagenumber + 4;
        }

        if (endPoint > pagecount) {
            startPoint = pagecount - 8;
            endPoint = pagecount;
        }

        if (startPoint < 1) {
            startPoint = 1;
        }

        for (var page = startPoint; page <= endPoint; page++) {

            var currentButton = $('<li class="page-number">' + (page) + '</li>');

            page == pagenumber ? currentButton.addClass('pgCurrent') : currentButton.click(function () { buttonClickCallback(this.firstChild.data); });
            currentButton.appendTo($pager);
        }

        $pager.append(renderButton('下一页', pagenumber, pagecount, buttonClickCallback)).append(renderButton('尾页', pagenumber, pagecount, buttonClickCallback));
        return $pager;
    }
    function renderButton(buttonLabel, pagenumber, pagecount, buttonClickCallback) {
        var $Button = $('<li class="pgNext">' + buttonLabel + '</li>');
        var destPage = 1;

        switch (buttonLabel) {
            case "首页":
                destPage = 1;
                break;
            case "上一页":
                destPage = pagenumber - 1;
                break;
            case "下一页":
                destPage = pagenumber + 1;
                break;
            case "尾页":
                destPage = pagecount;
                break;
        }

        if (buttonLabel == "first" || buttonLabel == "prev") {
            pagenumber <= 1 ? $Button.addClass('pgEmpty') : $Button.click(function () { buttonClickCallback(destPage); });
        }
        else {
            pagenumber >= pagecount ? $Button.addClass('pgEmpty') : $Button.click(function () { buttonClickCallback(destPage); });
        }

        return $Button;
    }

    $.fn.pager.defaults = {
        pagenumber: 1,
        pagecount: 1
    };

})(jQuery);


$(document).ready(function () {
    $("#pager").pager({ pagenumber: 1, pagecount: 5, buttonClickCallback: PageClick });
});

PageClick = function (pageclickednumber) {
    $("#pager").pager({ pagenumber: pageclickednumber, pagecount: 5, buttonClickCallback: PageClick });
    $("#result").html("Clicked Page " + pageclickednumber);
}

$("#test").click(function () {
    $('html,body').animate({ 'scrollTop': '0' }, 500)
})

var str = '';
$.ajax({
    url: './js/data.json',
    type: 'get',
    dataType: 'json',
    async: false,
    success: function (data) {
        console.log('数据请求成功')
        $.each(data.message, function (i, item) {
            console.log(item)
            p = "<li class='wrap-item'>"
                    + "<div class='pic-wrap'>"
                        + "<div class='pic'>"
                            + "<div class='pic-son-wrap'>"
                                + "<div class='pic-son'>"
                                    + "<a target='_blank' href='" + item.link + "'>"
                                        + "<img src='" + item.pic + "' alt='缩略图'>"
                                    + "</a>"
                                + "</div>"
                            + "</div>"
                            + "<div class='pic-main'>"
                                + "<div class='pic-title'>"
                                    + "<span>" + "编号：" + "</span>" 
                                    + "<span>" + item.title + "</span>"
                                + "</div>"
                                + "<div class='pic-guide'>" + item.guide + "</div>"
                                + "<div class='pic-link' id='picLink'>"
                                    + "<a target='_blank' href='" + item.link + "'>" + "预览" + "</a>"
                                + "</div>"
                            + "</div>"
                        + "</div>"
                    + "</div>"
                + "</li>"
            str += p;
        })

        $("#list").html(str);
    },
    error: function () {
        console.log('数据请求失败')
    }
})

var advisoryleft = document.getElementById('advisoryleft');
var advisorycenter = document.getElementById('advisorycenter');
var advisoryright = document.getElementById('advisoryright');
var wrap = document.getElementById('wrap');

window.onload = function () {
    function getTop(element) {
        var realTop = element.offsetTop;
        var parent = element.offsetParent;
        while (parent !== null) {
            realTop += parent.offsetTop;
            parent = parent.offsetParent;
        }
        return realTop;
    }
    var footer = document.getElementById("footer");
    var distanceFromFooterToTop = getTop(footer);
    console.log(distanceFromFooterToTop)

    addEventListener('scroll', function () {
        var scrollTop = document.documentElement.scrollTop;
        if (scrollTop > distanceFromFooterToTop - 600) {
            advisoryleft.style.animationName = 'advisoryleft';
            advisoryleft.style.animationDuration = '1s';

            advisoryright.style.animationName = 'advisoryright';
            advisoryright.style.animationDuration = '1s';

            advisorycenter.style.animationName = 'advisorycenter';
            advisorycenter.style.animationDuration = '1s';
        }
    })
}



var slidetel = document.getElementsByClassName('slide-tel')[0];
var slidetelspan = document.getElementsByClassName('slide-tel-span')[0];
var slideqq = document.getElementsByClassName('slide-qq')[0];
var slideqqspan = document.getElementsByClassName('slide-qq-span')[0];

slidetel.onmouseover = function() {
    slidetelspan.style.backgroundColor = '#ff6700';
}
slidetel.onmouseout = function() {
    slidetelspan.style.backgroundColor = '#333';
}

slideqq.onmouseover = function() {
    slideqqspan.style.backgroundColor = '#ff6700';
}
slideqq.onmouseout = function() {
    slideqqspan.style.backgroundColor = '#333';
}