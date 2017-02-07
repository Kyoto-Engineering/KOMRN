//--------------------------------------------------------------------------------------------
// トラブルシューティング用 マニュアル表示用スクリプト
// 2014/11/08　修正
//--------------------------------------------------------------------------------------------
// w40～w120 まで10刻みで存在
$.lang_obj = new Object();
$.lang_obj.jp = [{cls:'',txt:'マニュアル名称'},{cls:'w80',txt:'カタログ番号'},{cls:'w90',txt:'ダウンロード'}];
$.lang_obj.en = [{cls:'',txt:'Manual Name'},{cls:'w100',txt:'Catalog Number'},{cls:'w80',txt:'Download'}];
$.lang_obj.cn = [{cls:'',txt:'手册名称'},{cls:'w100',txt:'产品目录编号'},{cls:'w80',txt:'下载'}];
$.lang_obj.it = [{cls:'',txt:'Nome del manuale'},{cls:'w100',txt:'Numero di catalogo'},{cls:'w80',txt:'Scarica'}];
$.lang_obj.ko = [{cls:'',txt:'매뉴얼 명칭'},{cls:'w100',txt:'카탈로그 번호'},{cls:'w80',txt:'다운로드'}];
$.lang_obj.fr = [{cls:'',txt:"Nom du mode d'emploi"},{cls:'w100',txt:'Numéro de catalogue'},{cls:'w100',txt:'Télécharger'}];
$.lang_obj.de = [{cls:'',txt:'Name des Handbuchs'},{cls:'w100',txt:'Katalognummer'},{cls:'w80',txt:'Download'}];
$.lang_obj.es = [{cls:'',txt:'Nombre del manual'},{cls:'w100',txt:'Número de catálogo'},{cls:'w80',txt:'Descargar'}];

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
	//読込URL
	var pass = "";
	var j = window.location.pathname;
	j = j.indexOf('/') == 0 ? j : '/' + j;
	var t = j.split( "/" );
	if( t[ t.length-1 ] == ""){
		pass = j;
	}else{
		for(var i=0;i<t.length-1;i++){
			pass = pass + t[i]+"/";
		}
	}
	
	//jPass = pass+'download.json';
	$("#test_text p.dug1").text($.jPass);
	
	
	//読込
	$.ajax({
		type: 'GET',
		url: $.jPass,
		dataType: 'jsonp',
		jsonpCallback: 'callback',
		success: function(json){
			//console.log($.jPass);
			//console.log(json.list.length);
			manualList = json.list;
			//テーブルの作成
			var t="";
			t=t+'<tr>';
			t=t+'<th>'+$.lang_ary[0].txt+'</th>';
			t=t+'<th class="'+$.lang_ary[1].cls+'">'+$.lang_ary[1].txt+'</th>';
			t=t+'<th class="'+$.lang_ary[2].cls+'">'+$.lang_ary[2].txt+'</th>';
			t=t+'</tr>';
			var tBg="";
			//console.log(j);
			//console.log(manualList.length);
			//HTMLに書かれた配列変数を回す
			for(var j=0;j<$.dId.length;j++){
				//jsonから取り込んだObjecを回すt
				for(var i=0;i<manualList.length;i++){
					if(manualList[i].documentCode.indexOf($.dId[j])>=0){
						if(tBg == ""){
							tBg = "bg";
						}else{
							tBg = "";
						}
						t=t+'<tr>';
						t=t+'<td class="'+tBg+'">'+manualList[i].documentName+'</td>';
						t=t+'<td class="'+tBg+'">'+manualList[i].documentCode+'</td>';
						t=t+'<td class="'+tBg+'"><a href="'+$.pdfurl+manualList[i].url1+'" target="_blank"><img src="'+$.localurl+'common/img/icon_pdf.gif" width="16" height="18" class="iconPDF" />'+$.lang_ary[2].txt+'</a></td>';
						t=t+'</tr>';
					}
				}
			}
			//console.log(t);
			$("table.shooting_table").html(t);
		}
	});

})