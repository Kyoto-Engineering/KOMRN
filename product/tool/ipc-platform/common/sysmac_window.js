var winName=false;
function openURL(url) {
	//--------------------------
	//ウインドウサイズ
	//横695、縦615（OEJサイトのCADダウンロードと同じサイズ）
	var sizeW = 695;
	var sizeH = 615;
	//--------------------------
	//ウインドウがあったら閉じる
	if(winName.closed==false){
		winName.close();
	}
	//-------------------------- 
	//どのサイトからか？
	var chURL = 'omron.co.jp';
	var jumpUrl = url;
	//--------------------------
	//ウインドウ開く
	winName = window.open(jumpUrl, "name", "width="+sizeW+",height="+sizeH+",scrollbars=yes,resizable=yes");
	//--------------------------
	//ウインドウの位置
	winName.moveTo(50, 50);
	//--------------------------
	//フォーカス移動
	winName.focus();
}
