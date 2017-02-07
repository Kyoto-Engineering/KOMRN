var SuggestObj;

function setsuggest(){
	SuggestObj = new Suggest("SuggestObj","keyword", "", "suggestEnable","suggestEnableArea","suggestBox1","suggestBox2","head-");
	SuggestObj.outputSearchForm();
}

if(window.addEventListener)
{
	window.addEventListener('load', setsuggest, false);
}
else if(window.attachEvent)
{
	window.attachEvent('onload', setsuggest);
}
