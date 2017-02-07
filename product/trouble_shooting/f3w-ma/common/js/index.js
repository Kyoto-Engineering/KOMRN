//--------------------------------------------------------------------------------------------
// トラブルシューティング用 トラブル選択スクリプト
// 2014/11/08　修正
//--------------------------------------------------------------------------------------------
//----------------------------------------------
//　言語用配列（）
//----------------------------------------------
$.lang_obj = new Object();
$.lang_obj.jp = ['点滅回数','','1回点滅','*回点滅','点滅回数を選択してください','表示灯','点滅している表示灯','システム構成','想定エラー内容','原因と対策'];
$.lang_obj.en = ['No. of blinks','Blinks ','1 time','* times','Select the No. of blinks.','Indicator','Blinking indicator','System Configuration','Expected error','Cause and measures']

if(!$.langType){
	//言語指定が無い
	$.langType='en';
}
// 台詞指定
$.lang_ary = $.lang_obj[$.langType];

//----------------------------------------------
//グローバル変数
$.g_pass = "/product/trouble_shooting/f3w-ma/common/img/";

//▼メモ
// flg_slc		選択オブジェクト
// flg_step		選択数値
// flg			言語？
// slcList_Log	オブジェのstock？

//----------------------------------------------
// 選択されたオブジェクトを返す
//----------------------------------------------
function ansChick_select(){
	//初期化
	ansList=[];
	var dom='#shooting_flow_0' + flg_step + ' .shooting_content';
	for(var i=0;i<$("li.setItem",dom).size();i++){	
		if($("li.setItem:eq("+i+")",dom).hasClass('on')){

			if($("li.setItem:eq("+i+") img",dom).size()!=0){
				var cName= $("li.setItem:eq("+i+") img",dom).attr("src").split('/');
				var pName = "";
				for( var s=0 ; s <= cName.length-2 ; s++){
					pName = pName + cName[s] + '/';
				}
				var iName = cName[cName.length-1].split('_time');
			}

			if($("li.setItem:eq("+i+") > div > p",dom).size()==0){
				var t = $("li.setItem:eq("+i+")",dom).text();
			}else{
				var t = $("li.setItem:eq("+i+") > div > p",dom).text();
				for(var j=0; j<$("li.setItem",dom).size();j++){
	
					var cName2= $("li.setItem:eq("+j+") img",dom).attr("src").split('/');
					var pName2 = "";
					for( var s=0 ; s <= cName2.length-2 ; s++){
						pName2 = pName2 + cName2[s] + '/';
					}
					var iName2 = cName2[cName2.length-1].split('_time');
					lastName = pName2 + iName2[0] + '_time0.gif?' + (new Date).getTime();
					$("li.setItem:eq("+j+") img",dom).attr("src",lastName);
				}

				if( $("li.setItem:eq("+i+") select",dom).size() != 0){
					t=t+ $("li.setItem:eq("+i+") select",dom).val();
					lastName = pName + iName[0] + "_time" + $("li.setItem:eq("+i+") select",dom).val() + '.gif?' + (new Date).getTime();
				}else{
					lastName = pName + iName[0] + '_time1.gif?' + (new Date).getTime();
				}
				$("li.setItem:eq("+i+") img",dom).attr("src",lastName);
			}
			ansList.push(t);
		}
	}
	var flg = 0;
	ansList.sort();

	slcList = [];
	for(var i=0;i < slcList_Log[flg_step].length;i++){
		var list = slcList_Log[flg_step][i].ans[flg_step-1];
		var t = "";
		kaiList=[];
		for(var j=0;j < list.length;j++){
			t=t+list[j].btn;
			if(list[j].cnt != null){
				t=t+list[j].cnt;
			}
			kaiList.push(t);
		}
		kaiList.sort();
		if( ansList.toString() == kaiList.toString()){
			slcList.push(slcList_Log[flg_step][i]);
		}
	}

	flg_slc[flg_step] = ansList;
	flg_step++;

	//-------------------------------------------------------------------------------------------------------------------------------------------
	if(flg_step<=4){
		slcList_Log[flg_step]=slcList;
		slc_reset(flg_step);

		//slcList の数が少ない場合、最終ステップに進む
		if(slcList.length>2){
			btn_make();
		}else{
			//グローバルオブジェ登録
			flg_slc[flg_step] = ansList;
			flg_step=4;
			slcList_Log[flg_step] = slcList;
		}
		
		//ステップ処理
		switch (flg_step) {
			case 1 :
				step1();
			break;
			case 2 :
				step2();
			break;
			case 3 :
				step3();
			break;
			case 4 :
				step4();
			break;
		}
		Sscroll();
	}
	//-------------------------------------------------------------------------------------------------------------------------------------------
}

//----------------------------------------------
// クリックボタンの表示
//----------------------------------------------
function btn_make(){
	var dom='#shooting_flow_0' + flg_step + ' .shooting_content';

	var btn_name = [];
	var btn_img = [];
	var btn_cnt= [];
	for(var i=0;i < slcList.length;i++){
		var btn_list = slcList[i].ans[flg_step-1];
		for(var j=0;j < btn_list.length;j++){
			var s = btn_list[j].btn;
			if($.inArray(s, btn_name) == -1){
				btn_name.push(s);
				btn_img.push(btn_list[j].img);
				btn_cnt.push(0);
			}
		}
	}
	for(var i=0;i < slcList.length;i++){
		var btn_list = slcList[i].ans[flg_step-1];
		for(var j=0;j < btn_list.length;j++){
			if(btn_list[j].cnt != null){
				var  s = $.inArray(btn_list[j].btn, btn_name);
				if(btn_cnt[s] <= btn_list[j].cnt){ btn_cnt[s] = btn_list[j].cnt;}
			}
		}
	}
	
	var list = bData[flg_step-1];
	
	
	for(var i=0;i < list.length;i++){
		//2014-09-20修正
		var name_num = -1
		for (var ii=0; ii<btn_name.length; ii++) {
			if(btn_name[ii]==list[i].name){
				name_num=ii
				break;
			}
		}
		if(name_num != -1){
			var s = name_num;
			var dumy=[btn_name[s] , btn_img[s] , btn_cnt[s]];
			
			btn_name.splice(s, 1);
			btn_img.splice(s, 1);
			btn_cnt.splice(s, 1);
			
			//alert(dumy[0])
			
			btn_name.push(dumy[0]);
			btn_img.push(dumy[1]);
			btn_cnt.push(dumy[2]);
		} 
	}


	var t="";
	for(var i=0;i < btn_name.length;i++){
		if(flg_step == 1){
				t=t+'<li class="setItem">'+btn_name[i]+'</li>';
		}
		if((flg_step == 2) || (flg_step == 3)){

			var n =	btn_name[i];
			n=n.replace("（","<br /><span>（")
			n=n.replace("）","）</span>")
			
			var c =	btn_cnt[i];
			var m =	btn_img[i];

			var cName= m.split('/');
			var pName = "";
			for( var s=0 ; s <= cName.length-2 ; s++){
				pName = pName + cName[s] + '/';
			}
			var iName = cName[cName.length-1].split('_time');
			m = pName + iName[0] + '_time0.gif?' + (new Date).getTime();
			
			t=t+'<li class="setItem"><div class="lamp_box"><p>'+n+'</p><img src="'+$.g_pass+m+'?' + (new Date).getTime()+'" class='+m+' /></div>';
			if(c != 0){
				///*プルダウン途中まで
				//t=t+'<div class="UI_form_select"><div><span>&nbsp;</span></div><ul><li>&nbsp;</li>';
				//for(var j=1;j<=c;j++){
				//	t=t+'<li>'+j+'回点滅</li>';
				//}
				//t=t+'</ul></div>';
				//*/
				t=t+'<p>'+$.lang_ary[0]+'</p>';
				t=t+'<select><option value=""></option>';
				for(var j=1;j<=c;j++){
					if(j==1) {
						t=t+'<option value="'+j+'">' + $.lang_ary[2] + '</option>';
					} else {
						var timeStr = $.lang_ary[3];
						timeStr = timeStr.split('*').join(j);
						t=t+'<option value="'+j+'">' + j + timeStr + '</option>';
					}
				}
				t=t+'</select>';
				t=t+'<em>'+$.lang_ary[4]+'</em>';
			}
			t=t+'</li>';
		}
	}
	//書込
	$("ul" ,dom).html(t);
}

//----------------------------------------------
//ステップ4
//----------------------------------------------
function step4(){
	$("#shooting_check").fadeIn();
	$('#shooting_check').on(eventtype, function(){
		
		if(flg_step == 4){
			flg_step = 5;
			var dom = "#shooting_result";

			//----------------------------------------------
			//テーブルの項目名の作成
			var t = '<tr><th>'+$.lang_ary[5]+'</th><th>'+$.lang_ary[6]+'</th>';
			
			//ステップ2までしかないものは.ans[2]が無いのでこの処理は飛ばす
			if(slcList[0].ans[2]){
				if(slcList[0].ans[2].length == 1){
					var k = slcList[0].ans[2];
					k= k[k.length-1].cnt;
					//言語毎の調整
					if($.langType=='jp'){
						//日本語
						if( k != null){
							t = t+'<th class="counter step3">';
						}else{
							t = t+'<th class="step3">';
						}
						t = t+$.lang_ary[7]+'</th>';
					}else{
						//その他の言語
						t = t+'<th class="counter step3">'+$.lang_ary[7]+'</th>';
					}
				}else{
					t = t+'<th class="counter2 step3" colspan='+slcList[0].ans[2].length+'>'+$.lang_ary[6]+'</th>';
				}
			}
			t=t+'</tr>';
			
			//----------------------------------------------
			//テーブルの要素行の作成
			t=t+'<tr>';
			t=t+'<td><div class="border">'+ slcList[0].ans[0][0].btn+"</div></td>";
			var list = slcList[0].ans[1][0];
			t=t+'<td>';
			t=t+'<br /><img src="'+$.g_pass+list.img+'?' + (new Date).getTime()+'" />';
			if(list.cnt != null ){
				//時間の複数形
				if(list.cnt==1) {
					t = t + $.lang_ary[1] + $.lang_ary[2];
				} else {
					var timeStr = $.lang_ary[3];
					timeStr = timeStr.split('*').join(list.cnt);
					t = t + $.lang_ary[1] + timeStr;
				}
			}else{
				t = t + list.btn;
			}
			t=t+"</td>";
			//ステップ2までしかないものは.ans[2]が無いのでこの処理は飛ばす
			if(slcList[0].ans[2]){
				var list = slcList[0].ans[2];
				for(var i=0;i<list.length;i++){
					
					//言語毎の調整
					if($.langType=='jp'){
						//日本語
						if(list[i].cnt != null){
							t=t+'<td class="counter step3">';
						}else{
							t=t+'<td class="step3">';
						}
					}else{
						t=t+'<td class="counter step3">';
					}
					
					t=t+list[i].btn+'<img src="'+$.g_pass+list[i].img + '?' + (new Date).getTime()+'" />';
					if(list[i].cnt != null){
						//時間の複数形
						if(list[i].cnt == 1) {
							t = t + $.lang_ary[1] + $.lang_ary[2];
						} else {
							var timeStr = $.lang_ary[3];
							timeStr = timeStr.split('*').join(list[i].cnt);
							t = t + $.lang_ary[1] + timeStr;
						}
					}
					t=t+"</td>";
				}
			}
			t=t+"</td></tr>";
			//書込
			$("table",dom).html(t);

			//----------------------------------------------
			//エラー内容の書込
			t="";
			//ga('send','event','button','click',slcList[0].error_id);
			_gaq.push(['_trackEvent', page_title, 'Click',slcList[0].error_id]);

			var eList = slcList[0].error;
			for(var i=0;i<eList.length;i++){
				if( eList.length > 1){
					var c = i+1;
				}else{
					var c = "";
				}
				t=t+'<div class="error_box">';
				t=t+'<h3 class="heading-lvl03A01">'+$.lang_ary[8]+c+'</h3>';
				t=t+'<div class="shooting_result_error"><p>'+eList[i].title+'</p></div>';
				t=t+'<h3 class="heading-lvl03A01">'+$.lang_ary[9]+c+'</h3>';
				t=t+'<div class="shooting_result_cause"><ul>';
				var list = eList[i].error_text;
				for(var j=0;j<list.length;j++){
					t=t+'<li>'+list[j].p+'</li>';
				}
				t=t+'</ul></div>';
				t=t+'</div>';
			}
			$("#error-area",dom).html(t);
			$("#shooting_result").fadeIn();
			//Sscroll();

		}
		return false;
	});
}

//----------------------------------------------
//ステップ3
//----------------------------------------------
function step3(){
	$("#shooting_flow_03").fadeIn();
	$("#shooting_flow_02").addClass("active");

	var dom = '#shooting_flow_03 .shooting_content';
	$("li.setItem",dom).removeClass("on");

							
	$('li.setItem .lamp_box',dom).on(eventtype, function(){
		$(dom).find("li").removeClass("on");
		$("em",dom).css("display","none");

		if(( $(this).siblings(".UI_form_select").size() == 0) && ( $(this).siblings("select").size() == 0) ){
			$(".UI_form_select ul",dom).css("display","none");
			slc_reset(3);
			$(this).parent().addClass("on");
			ansChick_select();
			//Sscroll();
		}else{
			/*プルダウンUIとちゅうまで
			$(this).siblings(".UI_form_select").find("ul").css("display","block");*/
			if( $(this).siblings("select").val() == 0){
				$(this).siblings("em").css("display","block");
			}else{
				$(this).parent().addClass("on");
				$(this).siblings("em").css("display","none");
				slc_reset(3);
				$(this).parent().addClass("on");
				ansChick_select();
				//Sscroll();
			}
		}
		return false;
	});

	$('#shooting_flow_03 .shooting_content li.setItem').bind('change', function() {
		var c = $("select",this).val();
		var t = $("p",this).text + c;
		if(c > 0){
			$("li",dom).removeClass("on");
			$("em",this).css("display","none");
			$(this).addClass("on");
			slc_reset(3);
			ansChick_select();
			//Sscroll();
		}else{
			$(this).removeClass("on");
			$("em",this).css("display","block");
		}
		return false;
	});

}

//----------------------------------------------
//ステップ2
//----------------------------------------------
function step2(){

	$("#shooting_flow_02").fadeIn();
	$("#shooting_flow_01").addClass("active");

	var dom = '#shooting_flow_02 .shooting_content';
	$("li.setItem",dom).removeClass("on");

	$('li.setItem .lamp_box',dom).on(eventtype, function(){
		
		$(dom).find("li").removeClass("on");
		$("em",dom).css("display","none");
		
		if(( $(this).siblings(".UI_form_select").size() == 0) && ( $(this).siblings("select").size() == 0) ){
			
			$(".UI_form_select ul",dom).css("display","none");
			slc_reset(2);
			$(this).parent().addClass("on");
			ansChick_select();

		}else{
			//プルダウンUIとちゅうまで
			if( $(this).siblings("select").val() == 0){
				$(this).siblings("em").css("display","block");
			}else{
				$(this).parent().addClass("on");
				$(this).siblings("em").css("display","none");
				slc_reset(2);
				$(this).parent().addClass("on");
				ansChick_select();
				//step3();
				//Sscroll();
			}
		}
		return false;
	});

	$('#shooting_flow_02 .shooting_content li.setItem').bind('change', function() {
		var c = $("select",this).val();
		var t = $("p",this).text + c;
		if(c > 0){
			$("li",dom).removeClass("on");
			$("em",this).css("display","none");
			$(this).addClass("on");
			slc_reset(2);
			ansChick_select();
			//step3();
			//Sscroll();
		}else{
			$(this).removeClass("on");
			$("em",this).css("display","block");
		}

		return false;
	});

}

//----------------------------------------------
//ステップ1
//----------------------------------------------
function step1(){
	btn_make();
	$("#shooting_flow_01").css("display","block");
	$('#shooting_flow_01 .shooting_content li').on(eventtype, function(){
		slc_reset(1);
		var dom = '#shooting_flow_01 .shooting_content';
		$("li",dom).removeClass("on");
		$(this).addClass("on");

		ansChick_select();
		//step2();
		//Sscroll();

		return false;
	});
}

//----------------------------------------------
//表示リセット
//----------------------------------------------
function slc_reset(i){
	flg_step = i;

	if(flg_step==1){
		flg_slc=[];
		slcList_Log=[0,slcListMoto.slice(0)];
		slcList = slcList = slcListMoto.slice(0);
		$("#shooting_flow_01").removeClass("active");
		$("#shooting_flow_02").css("display","none");
		$("#shooting_flow_02").removeClass("active");
		$("#shooting_flow_03").css("display","none");
		$("#shooting_check").css("display","none");
		$("#shooting_result").css("display","none");
	}
	if(flg_step==2){
		slcList = slcList = slcList_Log[2].slice(0);
		$("#shooting_flow_02").removeClass("active");
		$("#shooting_flow_03").css("display","none");
		$("#shooting_check").css("display","none");
		$("#shooting_result").css("display","none");
		$('#shooting_flow_03 .shooting_content ul li').removeClass("on");

	}
	if(flg_step==3){
		slcList = slcList = slcList_Log[3].slice(0);
		$("#shooting_check").css("display","none");
		$("#shooting_result").css("display","none");
	}
	if(flg_step==4){
		step4();
	}
	if(flg_step==0){
		$('.shooting_content ul li').removeClass("on");
		$("#shooting_flow_01").css("display","none");
		$("#shooting_flow_01").removeClass("active");
		$("#shooting_flow_02").css("display","none");
		$("#shooting_flow_02").removeClass("active");
		$("#shooting_flow_03").css("display","none");
		$("#shooting_check").css("display","none");
		$("#shooting_result").css("display","none");
	}
}

//----------------------------------------------
// 画面スクロール処理
//----------------------------------------------
function Sscroll(){
	if(flg_step == 4){
		var target = $('#shooting_check');
	}
	if(flg_step == 5){
		var target = $('#shooting_result');
	}
	if(flg_step <= 3){
		var target = $('#shooting_flow_0' + flg_step);
	}
	var position = target.offset().top - 40;
	$($.browser.safari ? 'body' : 'html').animate({scrollTop:position}, scrollspeed, 'swing');
}

//----------------------------------------------
//----------------------------------------------
$(function(){
	//----------------------------------------------
	//JSON 読込処理
	slc_reset(0);
	slcList=0;
	scrollspeed = 400;
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
	
	var cacheclear = String(Math.floor(Math.random() * 9999));
	j = pass+'troubleshooting.json?a='+cacheclear;
	
	$("#test_text p.dug1").text(j);
	$.getJSON( j , function(data){
	})
	.success(function(data) {
    	//alert("成功");
    	slcListMoto = data[0].error;
		page_title = data[0].page_title;
		bData = data[0].btn_list;
		slc_reset(1);
		step1();
	})
	.error(function(jqXHR, textStatus, errorThrown) {
	    alert("エラー：" + textStatus);
	    //alert("テキスト：" + jqXHR.responseText);
	})
	.complete(function() {
	    //alert("完了");
	});

	$('#shooting_resrt').on(eventtype, function(){
		slc_reset(1);
		step1();
		return false;
	});
	$('.address_block a').on(eventtype, function(){
		if(flg_step == 5){
			_gaq.push(['_trackEvent', page_title, 'Click', 'slc_'+slcList[0].error_id+'_Contact']);
		}
	});
})




