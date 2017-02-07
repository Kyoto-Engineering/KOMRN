//B5 Manul Filter.js


//IE8対応 (indexOfが使用できない)
(function() {

  if (!("indexOf" in Array.prototype)) {
    Array.prototype.indexOf = function(find, i) {
      var n;
      if (i === undefined) i = 0;
      if (i < 0) i += this.length;
      if (i < 0) i = 0;
      n = this.length;
      while (i < n) {
        if (i in this && this[i] === find) return i;
        i++;
      }
      return -1;
    };
  }
}).call(this);


//フィルタ表示以外のエリアをクリックした際は閉じる
$(document).click(function(event) {

  //Local Manual
  if($("#local_filter_wrapper").length >0){
    if (!$.contains($("#local_filter_wrapper")[0], event.target)) { // (2)
      $("#local_manual").hide(
        function(){
          filter_icon("local_manual");
        }
        );
      }
  }

  //Global Manual
  if($("#global_filter_wrapper").length > 0){
    if (!$.contains($("#global_filter_wrapper")[0], event.target)) { // (2)
      $("#global_manual").hide(
        function(){
          filter_icon("global_manual");
        }
        );
    }
  }
  //Global Local Manual
  if($("#global_local_filter_wrapper").length > 0){
    if (!$.contains($("#global_local_filter_wrapper")[0], event.target)) { // (2)
      $("#global_local_manual").hide(
        function(){
          filter_icon("global_local_manual");
        }
        );
    }
  }
})

//filter画面のオープン
function filter_open(open_id,check_data) {

  if($('#local_data').length>0){
    $('#local_data').exTableFilter('input.local_filter', {ignore:'1,2,3,4',
      onFilteringEnd : function(api){
        setOddEven("local_data");
      }
    });
  }
  if($('#global_local_data').length>0){
    $('#global_local_data').exTableFilter('input.global_local_filter', {ignore:'1,2,3,4',
      onFilteringEnd : function(api){
        setOddEven("global_local_data");
      }
    });
  }
  if($('#global_data').length>0){
    $('#global_data').exTableFilter('input.global_filter', {ignore:'1,2,3,4',
      onFilteringEnd : function(api){
        setOddEven("global_data");
      }
    });
  }

  $("#"+open_id).toggle(
      function() {
        //filter要素が選択中かどうかを確認
        filter_icon(open_id)
      });

  event.preventDefault ? event.preventDefault():event.returnValue=false;
}

//チェック状態だとフィルタ状態にする
function filter_icon(open_id) {

  if (open_id == "local_manual") {
    var filter_data = $(".local_filter");
    var flg = 0;
    for (var i = 0; i < filter_data.length; i++) {
      if (filter_data[i].checked) {
        flg = 1;
      }
    }
    if (flg) {
      $('#local_type').css('color', 'blue');
    } else {
      $('#local_type').css('color', 'black');
    }
  }else if(open_id == "global_manual"){
    var filter_data = $(".global_filter");
    var flg = 0;
    for (var i = 0; i < filter_data.length; i++) {
      if (filter_data[i].checked) {
        flg = 1;
      }
    }
    if (flg) {
      $('#global_type').css('color', 'blue');
    } else {
      $('#global_type').css('color', 'black');
    }
  }else{
    var filter_data = $(".global_local_filter");
    var flg = 0;
    for (var i = 0; i < filter_data.length; i++) {
      if (filter_data[i].checked) {
        flg = 1;
      }
    }
    if (flg) {
      $('#global_local_type').css('color', 'blue');
    } else {
      $('#global_local_type').css('color', 'black');
    }

  }
}


//filter画面のクローズ
function filter_closed(closed_id) {

  $("#"+closed_id).hide(
      function(){
        filter_icon(closed_id);
      }
      );
  event.preventDefault ? event.preventDefault():event.returnValue=false;
}


//filter画面の全選択
function filter_all(all_id){
  if(all_id == "local_manual"){
    var filter_data = $(".local_filter");

    for(var i=0;i<filter_data.length;i++){
      filter_data[i].checked = true;
    }
    $(".local_filter").trigger("change",[true]);
  }else if(all_id == "global_manual"){
    var filter_data = $(".global_filter");

    for(var i=0;i<filter_data.length;i++){
      filter_data[i].checked = true;
    }
    $(".global_filter").trigger("change",[true]);
  }else{
    var filter_data = $(".global_local_filter");

    for(var i=0;i<filter_data.length;i++){
      filter_data[i].checked = true;
    }
    $(".global_local_filter").trigger("change",[true]);
  }
  //alert(event);
  event.preventDefault ? event.preventDefault():event.returnValue=false;
}


//filter画面のクリアボタン
function filter_clear(clear_id){
  if (clear_id == "local_manual") {

    var filter_data = $(".local_filter");

    for (var i = 0; i < filter_data.length; i++) {
      filter_data[i].checked = false;
    }
    $(".local_filter").trigger("change",[false]);

  } else if(clear_id == "global_manual"){
    var filter_data = $(".global_filter");

    for (var i = 0; i < filter_data.length; i++) {
      filter_data[i].checked = false;
    }
    $(".global_filter").trigger("change",[false]);
  }else{
    var filter_data = $(".global_local_filter");

    for (var i = 0; i < filter_data.length; i++) {
      filter_data[i].checked = false;
    }
    $(".global_local_filter").trigger("change",[false]);
  }
  event.preventDefault ? event.preventDefault():event.returnValue=false;
}

//フィルタデータの取得
function filter_data(check_data) {
  var words=[];
  if(check_data == "local_checkdata"){
    //データ有無のチェック
    if(!isData("local_filter")){
      TableFilterNS.data=$('table#local_data tr');
      var flag=0;

      for(var i=0;i<TableFilterNS.data.length;i++){
        if(i==0){
          continue;
        }
        for(j=0;j<TableFilterNS.data[i].children.length;j++){
          if(j==0 && TableFilterNS.data[i].children[j].innerHTML !=="undefined"){
            if(flag==0) {
              //初回
              words.push(TableFilterNS.data[i].children[j].innerHTML);
              //setbr(TableFilterNS.data[i].children[j]);
              flag=1;
            }
            if(words.indexOf(TableFilterNS.data[i].children[j].innerHTML) ==-1){
              //alert(data[i].children[j].innerHTML);
              words.push(TableFilterNS.data[i].children[j].innerHTML);
              //setbr(TableFilterNS.data[i].children[j].innerHTML);
            }
          }
        }
      }
    }
  }else if (check_data == "global_checkdata"){
    if(!isData("global_filter")){
      TableFilterNS.data=$('table#global_data tr');
      var flag=0;

      for(var i=0;i<TableFilterNS.data.length;i++){
        if(i==0){
          continue;
        }
        for(j=0;j<TableFilterNS.data[i].children.length;j++){
          if(j==0 && TableFilterNS.data[i].children[j].innerHTML !=="undefined"){
            if(flag==0) {
              //初回
              words.push(TableFilterNS.data[i].children[j].innerHTML);
              flag=1;
            }
            if(words.indexOf(TableFilterNS.data[i].children[j].innerHTML) ==-1){
              words.push(TableFilterNS.data[i].children[j].innerHTML);
            }
          }
        }
      }
    }
  }else{
    if(!isData("global_local_filter")){
      TableFilterNS.data=$('table#global_local_data tr');
      var flag=0;

      for(var i=0;i<TableFilterNS.data.length;i++){
        if(i==0){
          continue;
        }
        for(j=0;j<TableFilterNS.data[i].children.length;j++){
          if(j==0 && TableFilterNS.data[i].children[j].innerHTML !=="undefined"){
            if(flag==0) {
              //初回
              words.push(TableFilterNS.data[i].children[j].innerHTML);
              flag=1;
            }
            if(words.indexOf(TableFilterNS.data[i].children[j].innerHTML) ==-1){
              words.push(TableFilterNS.data[i].children[j].innerHTML);
            }
          }
        }
      }
    }
  }

  //ソートキーの値変更
//  setSortKey();

  //yyyy年mm月dd日フォーマットに改行コード付与
  addBr_toDateFormate();
  return words;
}

//Filter項目の有無を確認
function isData(cls_filter) {
  var filter_data = $("."+cls_filter);
  var retValue=false;

  if(filter_data.length > 0){
    retValue=true;
  }
  return retValue;
}

////Sortkeyの付与
//function setSortKey(){
//  //sortkeyデータ取得
//  var sortData = $('td#table_sort');
//  for(var i=0;i<sortData.length;i++){
//    //置換マッピング表
//    sortData[i].innerHTML = mappingType(sortData[i].innerHTML);
//  }
//}

//yyyy年mm月dd日フォーマットにbrの付与
function addBr_toDateFormate(){
  //日付データの取得
  var dateData = $('.td_date');

  for(var i=0;i<dateData.length;i++){
    if(dateData[i].innerHTML.match(/(\d+)年(\d+)月(\d+)日/)!=null){
      var sortKeyData = $(dateData[i]).children('.sortKey');
      dateData[i].innerHTML=dateData[i].innerHTML.match(/(\d+)年/)[0] + "<br/>" + dateData[i].innerHTML.match(/(\d+)月(\d+)日/)[0];

      if(sortKeyData!=null){
            $(dateData[i]).append(sortKeyData);
      }
    }
  }
}

//function mappingType(cell_text_value){
//  var replace_value=cell_text_value;
//  cell_text_value = $.trim(cell_text_value);
//  //置換マッピング表
//  var mapping_key =
//  {
//    "mappingData":[
//      {
//        "type_name":"ユーザーズマニュアル",
//        "type_value":"001"
//      },
//      {
//        "type_name":"テクニカルガイド",
//        "type_value":"002"
//      },
//      {
//        "type_name":"取扱説明書（現品票）",
//        "type_value":"003"
//      },
//      {
//        "type_name":"User's Manual",
//        "type_value":"001"
//      },
//      {
//        "type_name":"Technical Guide",
//        "type_value":"002"
//      },
//      {
//        "type_name":"Instraction Manual",
//        "type_value":"003"
//      },
//      {
//        "type_name":"用户手册",
//        "type_value":"001"
//      },
//      {
//        "type_name":"技术规范",
//        "type_value":"002"
//      },
//      {
//        "type_name":"安装手册",
//        "type_value":"003"
//      },
//      {
//        "type_name":"用戶手冊",
//        "type_value":"001"
//      },
//      {
//        "type_name":"技術規範",
//        "type_value":"002"
//      },
//      {
//        "type_name":"安裝手冊",
//        "type_value":"003"
//      }
//    ]
//  };
//
//  for(var i=0;i < mapping_key.mappingData.length;i++){
//    if(cell_text_value.indexOf(mapping_key.mappingData[i].type_name) != -1){
//      replace_value = cell_text_value.replace(mapping_key.mappingData[i].type_name,mapping_key.mappingData[i].type_value);
//      break;
//    }
//  }
//
//  return replace_value;
//}

function setOddEven(tableID){
//  var tablerow = $("table#"+tableID+" tr");
  var tablerow = $("table#"+tableID+" tr:visible");
  for(var i=0;i<tablerow.length;i++){
    if(i==0)
      continue;
    if(i==1){
      //tablerow[i].className＝”odd first-child”;
      tablerow[i].className="odd first-child";
      continue;
    }else if ( (i%2)==1 ){
      tablerow[i].className="odd";
      //tablerow[i].className＝”odd”;
      continue;
      //tablerow[i].classList.add('odd');
    }else{
      tablerow[i].className="even";
      //tablerow[i].className＝”even”;
      //tablerow[i].classList.add('even');
    }
  }
}

var sortKeyTextExtraction = function(node) 
{
    var $sortKey = $(node).find('.sortKey');
    if ($sortKey[0]) {
        return $sortKey.text();
    } else {
        return $(node).text();
    }
};
