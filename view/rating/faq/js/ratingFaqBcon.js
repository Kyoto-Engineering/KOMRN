function getParentUrl(){
	return parent.location;
}

function getFaqNo(){
	var gp = window.location.search;
	var qs;
	var pArray = new Array();
	var i = 0;
	if(gp){
		gp = gp.substring(1, gp.length);
		qs = gp.split("&");
		while(qs[i]){
			pArray = qs[i].split("=");
			if( pArray[0] == "id" ){
				var faqno = pArray[1]
				if( faqno.match(/FAQ\d+/) ){ 
					faqno = faqno.replace("FAQ", "");
					return faqno;	
				}
			}
			i++;
		}
	}
	return null;
}

function sendFaqAnswer( answer ){
	var faqno = getFaqNo();
	var param1 = getParentUrl();
	var param2 = "FAQ" + faqno + "rating";
	
	parent.dcsMultiTrack('DCS.dcsuri', param1, 'WT.ti', param2, 'DCSext.FAQNO', 'FAQNO' + faqno, 'DCSext.FAQCTR', answer );
	location.replace('/view/rating/faq/result.cgi?faqNo=' + faqno + '&rating=' + answer );
}
