//--------------------------------------------------------------------------------------------
// トラブルシューティング用 言語ページ切替スクリプト
// 2014/11/08　修正
//--------------------------------------------------------------------------------------------

$(function(){
	eventtype = (window.ontouchstart===undefined)?'click':'touchstart';
//lNav

	$('.change-lang select').bind('change', function() {
		
		// valueの値の取得
		if($(this).val() == ""){
			return false;
		}
		if($(this).val() == "jp-manual"){
			window.location.href = "http://www.fa.omron.co.
    <meta name="distribution" content="global" />
		<meta name="googlebot" content="noodp" />
		<meta name="language" content="english" />
		<meta name="rating" content="general" />
		<meta name="robots" content="noydir" />
		<meta name="robots" content="index,follow"/>product/terms.html";
			return false;
		}
		var t =  '/'+$(this).val();
		if(t == '/en'){
			t="";
		}

		//言語の切替
		var langList=["jp","cn","it","ko","fr","de","es"];
		var hash = (window.location.pathname).split('/');
		var flg = 0;
		for(var i = 0; i < langList.length; i++){
			if(hash[1] == langList[i]){
				flg = 1;
				break;
			}
		}
		var hashPoint = 2;
		if( i == langList.length){//英語サイト
			hashPoint = 1;
		}
		for(var i = hashPoint; i < hash.length; i++){
			t=t+'/'+hash[i];
		}
		//ページ移動
		window.location.href = t;
		return false;

	});
})