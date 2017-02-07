$(function() {
    //プリントプレビュークリックイベント
    $(document).on('click','.print-preview',function(){
        doPrintPreview();
    });
});
/**
 * プリントプレビュー
 */
doPrintPreview = (function(){
    //現在のURLに'print'パラメータを付加し、新しいウィンドウで表示させる。
    window.open(location.href+'?print=true');
});

$(function() {
    //URLパラメータに'print'が存在する場合、
    if (location.href.indexOf('?print') > -1) { 
        //bodyにprintクラスを付加。
        $("body").addClass('print');

        //.btnBoxの中身を空にし、印刷ボタンをアペンド。
        $('.btnBox').html('').append('<input type="button" value="印刷する" id="doPrint" name="doPrint">');

        //印刷ボタンのクリックイベントに印刷機能を設定
        $('#doPrint').on('click', function(){
            window.print();
        });

    }
});
