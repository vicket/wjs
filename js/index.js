/**
 * Created by camie on 2016/11/26.
 */

$(function () {

    caroucel();
    product();
    news();
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })

});

function caroucel(){
    function getData(callback){
        $.ajax({
            type:"get",
            url:"js/index.json",
            success: function (result) {
                callback(result);
            }
        });
    }

    //��ǣ�����Ϊ�ƶ���
    var isMobile = true;
    var width = $(window).width();
    var banner = function () {
        getData(function(result){
            if(width > 768){
                isMobile = false;
            }else{
                isMobile = true;
            }
            var html = template("img",{"items":result,"isMobile":isMobile});
            $(".carousel-inner").html(html);

            var indicatorhtml = template("indicator",{"items":result});
            $(".carousel-indicators").html(indicatorhtml);
        });
    }


    banner();
    //�����ƶ��л���pc�˵�ʱ���������󣬻�ȡ��pc����Ӧ��ʾ��ͼƬ
    $(window).on("resize", function () {
        if(isMobile==true && width >=768 || isMobile==false && width <768 ){
            banner();
        }
    });

    //�ƶ��˴�������
    var starX = 0;
    var moveX = 0;
    var distanceX = 0;
    var imgBox = document.querySelector(".carousel-inner");
    imgBox.addEventListener("touchstart", function (e) {
        starX = e.touches[0].clientX;
    });
    imgBox.addEventListener("touchmove", function (e) {
        moveX = e.touches[0].clientX;
        distanceX = moveX-starX;
    });
    imgBox.addEventListener("touchend", function (e) {
        if(Math.abs(distanceX) >100){
            if(distanceX >0){
                $('.carousel').carousel('prev');
            }else if(distanceX <0){
                $('.carousel').carousel('next');
            }
        }
    });

}


function product(){
    var totleWidth = 0;
    var lis = $(".wjs-nav-tabs").children();
    for (var i = 0; i < lis.length; i++) {

        //lis[i],��Ϊ�����Ű�lis[i]ת������dom�������Ի�ȡ��ȵ�ʱ����Ҫ������ת����jquery����
        //dom��jquery�໥ת���ķ�����dom->jquery����$���ţ�jquery->dom:ͨ����obj[����]����obj.get(����)�ķ�ʽ
        totleWidth += $(lis[i]).width();
    }
    $(".wjs-nav-tabs").css("width",totleWidth);

    vicket.iScroll({
       swipeDom:document.querySelector(".wjs-product-box"),
       swipeType:"x",
       swipeDistance:100
    });
    
}

function news(){
    $(window).on("resize", function () {
        var news = $(".news");
        var lis = $(".news-contain").find("li");
        var links = $(".news-contain").find("a");
        for (var i = 0; i < links.length; i++) {
            var liHeight = $(lis[i]).height();
            if(liHeight >50){
                $(lis[i]).css({
                    "height":50,
                    "overflow":"hidden"
                });
            }
        }
    })

}