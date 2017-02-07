//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// Country Websites - Quick links to OMRON IA products in your country
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

var countryWebsites = function(){

/* 初回動作 ----------------------------------*/
	this.countryWebsiteLinks = function() {
		var nowurl = location.href;
		var nowdomain = nowurl.match(/^https?:\/\/[^\/]+/);
		var query = "?component=oexLink&action=getLinks&referrer="+nowurl;
		var jsonStr = "/teeda.ajax";
		var idStrArr = nowurl.match(/\/products\/$|\/products\/index.html|\/products\/category\/|\/products\/family\/|\/products\/item\//i);
		if(!idStrArr) {
			jsonStr = "/country_website.json";
			query = "";
		}
		var jsonsrc = nowdomain+jsonStr+query; //json読み込みパス
		var data = this.readJson(jsonsrc, "json", "get", ""); //データ格納
		if(data.suc){//json取得成功
			var dataJson = data.suc; 
			this.countryWebsiteMake(dataJson); //html表示
		}else{//取得失敗
			alert(data.err);
		}
	} //<!-- columnInit -->


/* json読み込み ----------------------------------*/
	this.readJson = function(file, type, method, query, loading) {
    var rec = {};
    $.ajax({
        url: file,
        type: method,
        data: query,
        dataType: type,
        timeout: 15000,
        cache: false,
        async: false,
        beforeSend: function() {
            if (loading) $(loading).show();
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            rec.err = XMLHttpRequest.status + " " + textStatus + " " + errorThrown + " : ファイルの読み込みに失敗しました";
        },
        success: function(data) {
            rec.suc = data;
        }
    });
    return rec;
	} //<!-- readJson -->


/* リスト作成 ----------------------------------*/
	this.countryWebsiteMake = function(dataJson) {
		var writedata = ""; //ソース変数
		var dslength = dataJson.length; //地域数
		var structFirst = ""; //構造スタート
		var structEnd = ""; //構造エンド

		writedata += '<div id="region-list"><p class="regionHeading"><a href="javascript:void(0);"><img width="16" height="16" alt="close" src="/shared/img/icon_close.gif"></a><em>Quick links to OMRON Country Websites.</em></p>';

//20130319 kawashima G-Site向けProductLink対応(OMRON IA GlobalにURLをセットするように変更)		
//		writedata += '<p class="regionHeading withLine"><a id="" href="http://www.ia.omron.com/" target="_blank"><img height="9" width="3" src="/shared/img/icon_right_b.gif" alt="" class="iconA01">OMRON IA Global<img height="11" width="14" src="/shared/img/icon_07.gif" class="external-win" alt=""></a></p>';
		writedata += '<p class="regionHeading withLine"><a target="_blank" href="'+dataJson[6].country[0].url+'"><img height="9" width="3" src="/shared/img/icon_right_b.gif" alt="" class="iconA01">OMRON IA Global<img height="11" width="14" src="/shared/img/icon_07.gif" class="external-win" alt=""></a></p>';
				

//20130319 kawashima G-Site向けProductLink対応(Regionに追加したG-Siteは表示しないのでカウントを-1する)				
		for(i=0;dslength-1>i;i++){
			var region = dataJson[i].region;
			
			//regionによって構造変更
			switch(region) {
				case "Europe":
					structFirst = '<ul class="first-child"><li class="first-child"><dl>';
					structEnd = '</ul></dd></dl></li></ul>';
					break;
				case "Africa":
					structFirst = '<ul><li class="first-child"><dl><dt><a name="Middle East" id="region02" class="none-link">Middle East</a></dt><dd><p>Please contact our European headquarters.</p></dd></dl></li><li class="first-child"><dl>';
					structEnd = '</ul></dd></dl></li></ul>';
					break;
				case "Greater China":
					structFirst = '<ul><li class="first-child"><dl>';
          structEnd = '</ul></dd></dl></li>';          
          break;
				case "Asia-Pacific":
					structFirst = '<li class="first-child"><dl>';
          structEnd = '</ul></dd></dl></li></ul>';          
          break;
				case "Japan / Korea":
					structFirst = '<ul><li class="first-child"><dl>';
          structEnd = '</ul></dd></dl></li>';          
          break;
				case "Americas":
					structFirst = '<li class="first-child"><dl>';
          structEnd = '</ul></dd></dl></li></ul>';          
          break;
				default:break;
			}
			
			//文字列
			writedata += structFirst;

			//europeだったらリンクつける
			if(region=="europe") {
				writedata += '<dt><a target="_blank" href="'+dataJson[i].country[0].url+'" id="region0'+i+'"><img width="3" height="9" class="iconA01" alt="" src="/shared/img/icon_right_b.gif">Europe<img width="14" height="11" alt="" class="external-win" src="/shared/img/icon_07.gif"></a></dt>';
				j=1;
			} else {
				writedata += '<dt><a class="none-link" id="region0'+i+'" name="'+region+'">'+region.capitalizeFirstLetter()+'</a></dt>';
				j=0;
			}
			writedata += '<dd><ul>';
			for(j;dataJson[i].country.length>j;j++) { //countryの数liを作成
				writedata += '<li><a target="_blank" href="'+dataJson[i].country[j].url+'"><img width="3" height="9" class="iconA01" alt="" src="/shared/img/icon_right_b.gif">'+dataJson[i].country[j].name+'<img width="14" height="11" alt="" class="external-win" src="/shared/img/icon_07.gif"></a></li>';
			}
			writedata += structEnd;
			
		}; //end for
		writedata += '</div>';

		$("body").append(writedata); //ソースを貼り付け
		
		this.makeModal();

	} //<!-- countryWebsiteMake -->

/* キャピタル化 ----------------------------------*/
	String.prototype.capitalizeFirstLetter = function(){
	 return this.charAt(0).toUpperCase() + this.slice(1);
	};


/* モーダルウィンドウ作成 ----------------------------------*/
	this.makeModal = function() {
	
		//変数
		var objSB = $("#region-list");
		var objSO = $("#country-websites");

		//ウィンドウ内の位置関係取得・設定
		objSB.fadeIn(); //先に表示（サイズ取得のため）
		objSO.fadeTo(200,0.5);
		
		var winHeight = $(window).height(); //表示されているサイズ
		var docHeight = $(document).height(); //ドキュメント全体のサイズ
		var realHeight = 0; //センター位置
		var scrolled = $(window).scrollTop(); //スクロール量
		var offsetNum = 10; //上下端からのオフセット値
		var objSBheight = objSB.height();

		if(scrolled==0 && objSBheight>winHeight) { //上端
			realHeight = offsetNum;
		} else if(docHeight==(scrolled+winHeight) && objSBheight>winHeight) { //下端
			realHeight = (docHeight - objSBheight) - offsetNum;
		} else { //デフォルト
			realHeight = ((winHeight - objSBheight) / 2)+scrolled;
		}

		var left = Math.floor(($(window).width() - objSB.width()) / 2); //左座標
	  var top  = Math.floor(realHeight); //上座標
		
		objSB.css({"left":left,"top":top});//表示後に位置セット
		objSO.fadeIn().css({height:docHeight});


		// BUGFIX refs#2722  2012/10/29  inou@spc
		var $ifr = $("#country-websites-iframe");
		$ifr.css({"left":left,"top":top}).width(objSB.width()).height(objSB.height());
		$ifr.show();


		//クローズ機能
		$(".regionHeading a").click(function(){
			objSB.fadeOut();
			objSO.fadeOut(200);
			$ifr.fadeOut();// BUGFIX refs#2722  2012/10/29 inou@spc
		});
		objSO.click(function(){
			objSB.fadeOut();
			objSO.fadeOut(200);
			$ifr.fadeOut();// BUGFIX refs#2722  2012/10/29 inou@spc
		});
		//#region-listのclickでは閉じさせない
		objSB.click(function(event){
			event.stopPropagation();
		});

	}<!-- //makeModal -->

} //countryWebsites


/* オブジェクト作成 ----------------------------------*/
var box; //オブジェクト
$(function() {
	box = new countryWebsites();
	$("body").append('<div id="country-websites"></div>'); //表示枠作成
	if(navigator.userAgent.match(/MSIE 6\.0/)){ //IE6のみ下にiframeを設置
		$("body").append('<iframe id="country-websites-iframe"></iframe>');
	}
});
