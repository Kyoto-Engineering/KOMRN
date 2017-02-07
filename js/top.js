

	//////////////////////////////////////////////////
	//デバック
	//////////////////////////////////////////////////
	var traceHeight = 200;
	function trace(num){
		a = $('#traceArea').attr('id')
		if(typeof a === "undefined"){
			var writeText = '<div id="traceArea"></div><style type="text/css">#traceArea{position:fixed;_position:absolute;z-index:1000;margin:0 5% 0 5%;background:#eee;border:1px solid #000;width:90%;height:'+traceHeight+'px;top:0px;left:0;overflow:scroll;padding:10px;text-align:left;}</style>'
			$('body').append(writeText);
			tracePosition(traceHeight);
			traceevent();
		}
		$('#traceArea').prepend('<div>'+num+'</div>');
	}
	function tracePosition(traceHeight){
		if (typeof document.body.style.maxHeight != "undefined") windowposition = $(window).height()-traceHeight-40; else windowposition = $(window).scrollTop()+$(window).height()-traceHeight-40;
		$('#traceArea').css('top',windowposition);
	}
	function traceevent(){
		$(window).scroll(function() {tracePosition(traceHeight);});
		$(window).resize(function(){tracePosition(traceHeight);});
		$(document).ready(function(){tracePosition(traceHeight);});
	}
	//////////////////////////////////////////////////

/*-------------------------------------
Global Networkナビ
-------------------------------------*/
$(function(){

	$(".mainImageNavi ul ul").append('<li class="closeBtn"><img src="/resources/images/icon_01.gif" width="3" height="9" alt="" class="iconA01">Back</li>');

	$(".mainImageNavi .closeBtn").click(function(){
		$(".mainImageNavi li").removeClass("current");
		$(this).parent().stop().animate({"left":"0"},"500","swing", function(){})
	});

	$(".mainImageNavi li a.mainImageTitle").click(function(){
		if($(this).parent().hasClass("current")){
			$(this).parent().removeClass("current");
		}else{
			$(".mainImageNavi li").removeClass("current");
			$(this).parent().addClass("current");
		}
		if($(this).parent().hasClass("current")){
			$(".mainImageNavi ul ul").stop().animate({"left":"0"},"500","swing", function(){})
			$(this).next().stop().animate({"left":parseInt($(this).next().width()*-1)},"500","swing", function(){})
		}else{
			$(this).next().stop().animate({"left":"0"},"500","swing", function(){})
		}
		return false;
	});

});


/*-------------------------------------
イメージローテーション
-------------------------------------*/
$(function(){

	//////////////////////////////////////////////////
	//初期設定
	//////////////////////////////////////////////////

	//要素が格納される場所
	var $elementArea = $(".imageRotation");
	var $elementBox = $(".imageRotation .imageRotationMain");

	//サークルボタン
	var $circleNav = $(".imageRotationNavi");

	//////////////////////////////////////////////////

	//現在表示されている要素番号
	var $nowNum = 0;

	//次に表示される要素番号
	var $nextNum = 1;

	//要素
	var $element = new Array();


	//////////////////////////////////////////////////
	//初期化
	//////////////////////////////////////////////////

	//要素を配列化
	$elementBox.children().each(function(i){
		$element[i] = $(this).html();
	});

	//要素を削除
	$elementBox.html("");

	//アルファ要素を作成し画像を配置
	$elementBox.append('<div class="imageRotationTop">'+$element[$nowNum]+'</div>');
	$elementBox.append('<div class="imageRotationBottom">'+$element[$nextNum]+'</div>');

	//要素が格納される場所を表示
	$('.imageRotation').css({'cssText': 'display:block !important;'})

	//○ナビをカレント
	$circleNav.find("li").eq(0).addClass("current");

	//ナビを表示
	$circleNav.css("display","block");


	//////////////////////////////////////////////////
	//スクロール
	//////////////////////////////////////////////////

	//アニメーションロック
	var $animated = true;

	function animateFn(number){
		if($animated == true){
			$animated = false;
			unBindEvent();
			$nowNum = number

			//下のアルファ要素に要素を配置
			$('.imageRotationBottom').html($element[number]);

			//○ナビを変更
			$circleNav.find("li").removeClass("current");
			$circleNav.find("li").eq(number).addClass("current");

			//文字を変更
			$circleNav.find("p").text($('.imageRotationBottom').find("img").attr("alt"));

			$('.imageRotationTop').stop().fadeTo(500,0,function(){

				//上のアルファ要素にも要素を配置してアルファ100%に戻す
				$(this).html($element[number]);
				$(this).fadeTo(0,100);

				//現在表示されている要素番号を変更
				$nowNum = number;

				bindEvent();
				$animated = true;

			})

		}
	}


	//////////////////////////////////////////////////
	//アニメーション静止中の動作設定
	//////////////////////////////////////////////////
	$circleNav.find("li").hover(function (){
		$(this).css("opacity",0.7);
	},function (){
		$(this).css("opacity",1);
	});

	function bindEvent(wheel){

		//○ボタンのイベント設定
		$circleNav.find("li").click(function(){
			if($nowNum != $(this).index()) animateFn(numberCH($(this).index()))
		});

		//タイマーセット
		setTime()

	}


	//////////////////////////////////////////////////
	//アニメーション動作中の動作設定
	//////////////////////////////////////////////////
	function unBindEvent(){

		//○ボタン非クリック
		$circleNav.find("li").unbind('click');

		//タイマー解除
		clearTime()

	}

	//////////////////////////////////////////////////
	//タイマー
	//////////////////////////////////////////////////
	function setTime(){
		bbb = setTimeout(function(){
			if(!($objX < $mouseX && $mouseX < $objX+$objWidth && $objY < $mouseY && $mouseY < $objY+$objHeight)){
				animateFn(numberCH($nowNum+1))
			}else{
				setTime();
			}
		},7000);
	}
	function clearTime(){
		clearTimeout(bbb)
	}

	//////////////////////////////////////////////////
	//マウス座標取得
	//////////////////////////////////////////////////
	var $mouseX=0;
	var $mouseY=0;
	var $objX=$($elementArea).offset().left;
	var $objY=$($elementArea).offset().top;
	var $objWidth=682;
	var $objHeight=231;

	$("html").mousemove(function(e){
		$objX=$($elementArea).offset().left;
		$objY=$($elementArea).offset().top;
		$mouseX=e.pageX;
		$mouseY=e.pageY;
	})


	//////////////////////////////////////////////////
	//番号調整 要素一覧の数を超えたら0に、マイナスになるなら要素一覧の最後を渡す
	//////////////////////////////////////////////////
	function numberCH(Num){
		if(0 <= Num && Num < $element.length){ //0～要素数の間
			return Num;
		}else{
			if(Num < 0) return $element.length+Num
			if($element.length <= Num) return Num-$element.length;
		}
	}

	bindEvent();

});



