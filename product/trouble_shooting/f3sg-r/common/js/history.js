//--------------------------------------------------------------------------------------------
// トラブルシューティング用 マニュアル表示用スクリプト
// 2014/11/08　修正
//--------------------------------------------------------------------------------------------
// w40～w120 まで10刻みで存在
$.lang_obj = new Object();
$.lang_obj.jp = ['更新内容 （詳細を開く）','更新内容 （詳細を閉じる）'];
$.lang_obj.en = ['Upgrade Information (Open details)','Upgrade Information (Close details)'];
$.lang_obj.cn = [];
$.lang_obj.it = [];
$.lang_obj.ko = [];
$.lang_obj.fr = [];
$.lang_obj.de = [];
$.lang_obj.es = [];

if(!$.langType){
	//言語指定が無い
	$.langType='en';
}
// 台詞指定
$.lang_ary = $.lang_obj[$.langType];

//トラブルシューティングのローカルフォルダ指定（本格運用になった場合、PDFの格納先が変わる）
$.pdfurl = '/product/trouble_shooting/f3sg-r/pdf/'
$.localurl = '/product/trouble_shooting/f3sg-r/'


// IE8(consoleでエラーを出さない)
if (!('console' in window)) {  
   window.console = {};  
   window.console.log = function(str){return str};
} 
//----------------------------------------------
// JSONデータの読込
//----------------------------------------------
$(function(){
	var baseObj = $('#updated');
	var idName = baseObj.attr('id');
	$('#'+idName+'_txt').hide('first')
	baseObj.html('<img src="'+$.localurl+'common/img/icon01.gif" />'+$.lang_ary[0]);
	
	$('#updated').click(function(){
		//alert("aaa")
		var baseObj = $(this);
		var idName = baseObj.attr('id');
		
		if($('#'+idName+'_txt').css('display')=='none'){
			$('#'+idName+'_txt').show('first')
			baseObj.html('<img src="'+$.localurl+'common/img/icon02.gif" />'+$.lang_ary[1]);
		}else{
			$('#'+idName+'_txt').hide('first')
			baseObj.html('<img src="'+$.localurl+'common/img/icon01.gif" />'+$.lang_ary[0]);
		}
		
		return false;
	});

})