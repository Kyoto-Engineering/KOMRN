//--------------------------------------------------------------------------------------------
// トラブルシューティング用 相互リンク用スクリプト
// 2015/02/13
//--------------------------------------------------------------------------------------------
$(document).ready(function(){
	//基本
	var idName = "reciprocal_link";
	var obj = $('#' + idName + ' a');
	var baseURL = location.pathname;
	//location.href;
	//alert(baseURL)
	
	//言語
	var langAry =["en","jp","cn","de","es","fr","it","ko"];
	// 言語のチェック
	for (var i = 1; i < langAry.length; i++){
		//alert(baseURL.indexOf('/' + langAry[i] + '/'))
		if(baseURL.indexOf('/' + langAry[i] + '/')>=0){
			$('#' + idName + '_' + langAry[i]).css('display','');
			// 多言語が選ばれた時点で英語非表示
			$('#' + idName + '_' + langAry[0]).css('display','none');
		}else{
			$('#' + idName + '_' + langAry[i]).css('display','none');
		}
	}
	
	//aタグに対して処理
	for (var i = 0; i < obj.length; i = i +1){
		var tempObj = obj.eq(i);
		var ch_str = tempObj.attr('class');
		//toolフォルダ以外でクラス名を含むURLの場合
		if(baseURL.indexOf('/tool/')<0 && baseURL.indexOf(ch_str)>=0){
			//非表示
			tempObj.css('display','none');
		}
	}
	
	//最後に親要素表示
	$('#' + idName).css('display','');
	
});