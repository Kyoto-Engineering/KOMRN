<?php



if(isset($_POST['inputForm:doConfirm']))

{


//mail from customer
            $to_mail = "info@keal.com.bd";   
            $email_subject="Omron Product Inquiry";
            
            $email_message="Sent From        : ".$_POST['inputForm:userEmail']."\r\n".$_POST['inputForm:userAddress']."\r".$_POST['inputForm:postalCode']."\r\n".
            		   "Inquired By      : ".$_POST['inputForm:userName']."\r\n".
            		   "Contact No       : ".$_POST['inputForm:userTel']."\r\n".
            		   "Inquiry Type     : ".$_POST['inputForm:inquiryType']."\r\n".
            		   "Inquiry Product  : ".$_POST['inputForm:productsType']."\r\n".
                     "Inquiry Product Model  : ".$_POST['inputForm:productModel']."\r\n\r\n".
                     
            		   
            		   
            		   
            		  "Inquiry Deacription: " .$_POST['inputForm:description-textarea']."\r\n\r\n";
            		    
            		    
            $headers = 'From: '.$_POST['inputForm:userEmail']."\r\n".
                     'Reply-To:'.$_POST['inputForm:userEmail'] . "\r\n" .
                     'X-Mailer: PHP/' . phpversion();

            'Reply-To: '.$_POST['inputForm:userEmail']."\r\n" .

            'Content-Type: text/html; charset=ISO-8859-1'."\r\n".

            'MIME-Version: 1.0'."\r\n\r\n";

            mail("<$to_mail>", "$email_subject","$email_message", "$headers"); 
}        
?>




<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns:te="http://www.seasar.org/teeda/extension" xml:lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:webcommon="appwebcommon" lang="en">

<head>
<meta content="en" http-equiv="Content-Language" /><meta content="text/html; charset=utf-8" http-equiv="Content-Type" /><meta content="text/css" http-equiv="Content-Style-Type" /><meta content="text/javascript" http-equiv="Content-Script-Type" /><!--+meta--><meta content="Please select from the choices below, the region you would like to contact, or the region which is closest to where you currently reside." name="description" /><meta content="contact,inquiry,request,order,feedback" name="keywords" /><meta content="CONTACT" name="WT.si_n" /><meta content="2" name="WT.si_x" /><!--+/meta--><title>Contact | Omron by Kyoto engineering &amp; Automation</title><link rel="stylesheet" type="text/css" href="../../common/css2/common.css" media="all" /><link rel="stylesheet" type="text/css" href="../../common/css/print.css" media="print" /><link rel="stylesheet" type="text/css" href="css/index.css" media="all" /><link title="OMRON" rel="start index" href="../../index-2.html" /><link title="Our Strengths" rel="chapter" href="../../index.php" /><link title="Products" rel="chapter" href="../../products/index.html" /><link title="Technical Support" rel="chapter" href="../../support/index.html" /><link title="Global Network" rel="chapter" href="../../global_network/index.html" /><link title="About Us" rel="chapter" href="../../about/index.html" /><link title="What's New" rel="chapter" href="../../whats_new/index.html" /><link rel="alternate" href="../../index.php" hreflang="en" />
<script type="text/javascript" src="../../common/js/common.js"></script>
<script type="text/javascript" src="../../common/js/rollover.js"></script>
<script type="text/javascript" src="../../common/js/cssSupport.js"></script>
<link rel="stylesheet" type="text/css" media="all" href="../../css/index.css"/>
<link rel="stylesheet" type="text/css" media="all" href="../../css/top.css"/>
<script type="text/javascript" src="../../shared/js/jquery.js"></script>
<script type="text/javascript" src="../../shared/js/function.js"></script>
<script type="text/javascript" src="../../shared/js/country_website.js"></script>
<script type="text/javascript" src="../../shared/js/global/ga9d07.js?20121001"></script>
<script type="text/javascript" language="JavaScript" src="js/index_settings.js" xml:space="preserve"></script><script type="text/javascript" language="JavaScript" src="js/index.js" xml:space="preserve"></script>


<script>
function validateForm() {
    var x = document.forms["inputForm"]["inputForm:inquiryType"].value;
    if (x == null || x == "") {
        alert("Type must be select");
        return false;
   }
   
 
   
   
   
      var x = document.forms["inputForm"]["inputForm:productModel"].value;
    if (x == null || x == "") {
        alert("Product Model must be fill out");
        return false;
   }
   
   
   
     
  
   
   var x = document.forms["inputForm"]["inputForm:description-textarea"].value;
    if (x == null || x == "") {
        alert("Enquiry Discription can not be empty");
        return false;
   }
   
   
     var x = document.forms["inputForm"]["inputForm:userName"].value;
    if (x == null || x == "") {
        alert("Please fill out the User Name");
        return false;
   }
   
   
   
    var x = document.forms["inputForm"]["inputForm:userCompanyName"].value;
    if (x == null || x == "") {
        alert("Company Name can not be empty");
        return false;
   }
   
   
   
      var x = document.forms["inputForm"]["inputForm:postalCode"].value;
    if (x == null || x == "") {
        alert("Postal Code can not be empty");
        return false;
   }
   
   
   
   
  
   
   
   
     var x = document.forms["inputForm"]["inputForm:userAddress"].value;
    if (x == null || x == "") {
        alert("User Address can not be empty");
        return false;
   }
   
   
var x = document.forms["inputForm"]["inputForm:userTel"].value;
    if (! /^[0-9]{11}$/.test(x)) {
  alert("Please input exactly 11 contact numbers!");
  return false;
}


  var x = document.forms["inputForm"]["inputForm:userFax"].value;
    if (x == null || x == "") {
        alert("Please fill out the Fax field.");
        return false;
   }




    var x = document.forms["inputForm"]["inputForm:userEmail"].value;
    if (x == null || x == "") {
        alert("Please fill out the email field.");
        return false;
   }
   var x = document.forms["inputForm"]["inputForm:userEmail"].value;
    var atpos = x.indexOf("@");
    var dotpos = x.lastIndexOf(".");
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {
        alert("Not a valid e-mail address");
        return false;
    }
   
   
 
   
   
  }
</script>




</head>
<!-- 
<body id="www-ia-omron-com" class="tmplC02" onload="productTypeEnable();">
 --><body class="tmplC02">
<div class="omron-ia">
<p class="non-visual"><a id="page-top" name="page-top" shape="rect">Page top</a></p>
<p class="non-visual"><a name="page-top" id="page-top">Page top</a></p>
<div class="header-area">
	<div class="site-identity">
		<div class="site-logo">
			<a href="../../index.php"><img src="../../images/logo_01_b13-260967.gif"  width="129" height="24" alt="OMRON" /></a>
		</div>
	<!-- /.site-identity --></div>
	<div class="utilities">
		<div class="country-select-area">
			<p class="canpany">Building Automation</p>
                        <?php echo '&nbsp' ; ?>
                        <br>
                        <p class="canpany">Industrial Automation</p>
                        <?php echo '&nbsp' ; ?>
                        <br>
                        <p class="canpany">Power Automation &amp; Safety </p>
			
		</div>
            
            <div class="japani">
                <img  src="../../shared/img/Japani Technology mnemonic.png" width="90" height="50" alt=""/>
            </div>
          
            
            
            <div class="flag">
            <img src="../../shared/img/Bangladesh-Flag_1.png" alt=""/>
            </div>
            <div class="kyoto">
                <p><b>Bangladesh Distributor</b></p>
                <img style="margin-left:-5px;"  src="../../shared/img/Kyoto-logo-Png.png" alt=""/>
            </div>
	<!-- /.utilities --></div>
<!-- /.header-area --></div>

<!--+global-navi-->
<!-- === [global-navi-area] === -->
<div class="global-navi-area">
<p class="non-visual"><a name="global-navi" id="global-navi">Global Navigation</a></p>
<ul>
<li class="home"><a href="../../index.php">Home</a></li>
<li class="product"><a href="../../products/index.html">Products</a></li>
<li class="home stay"><strong>Contact Us</strong></li>
</ul>
<!-- === /[global-navi-area] === --></div>
<!--+/global-navi-->

<!-- === [bread-crumb-area] === -->
<div class="bread-crumb-area">
<!--+bread-crumb-->
<ul><li><a shape="rect" href="../../index.php">Home</a><span class="separator"></span></li><li>Contact<span id="addTitleText"></span></li></ul>
<!--+/bread-crumb-->
<!-- === /[bread-crumb-area] === --></div>

<!-- === [contents-area] === -->
<div class="contents-area">

<!-- === [local-navi-area] === -->
<div class="local-navi-area">
<p class="non-visual"><a id="local-navi" name="local-navi" shape="rect">Local Navigation</a></p>
<!--+local-navi-->

<div class="related-info-listA01">
<ul></ul>
<!-- /related-info-listA01 --></div>

<div class="secure-sign">
<!-- Begin DigiCert site seal HTML and JavaScript --> <!--<div
id="DigiCertClickID_B5myI5Ic" data-language="en_US">
        <a href="
https://www.digicert.com/unified-communications-ssl-tls.htm">UCC SSL
Certificate</a> </div> <script type="text/javascript"> var __dcid = __dcid
|| [];__dcid.push(["DigiCertClickID_B5myI5Ic", "7", "s", "black",
"B5myI5Ic"]);(function(){var cid=document.createElement
("script");cid.async=true;cid.src="//seal.digicert.com/seals/cascade/seal.min.js";var
 s = document.getElementsByTagName("script");var ls = s[(s.length -
1)];ls.parentNode.insertBefore(cid, ls.nextSibling);}()); </script>-->
<!-- End DigiCert site seal HTML and JavaScript -->

<!-- /secure-sign --></div>

<!--+/local-navi-->
<!-- === /[local-navi-area] === --></div>
<!-- === [primary-contents-area] === -->
<div class="primary-contents-area">
<p class="non-visual"><a id="contents" name="contents" shape="rect">Primary Contents</a></p>
<!--+primary-contents-->

<div class="heading-lvl01A01">
<h2>Contact<span id="addTitleTextH2"></span></h2>
<!-- /heading-lvl01A01 --></div>
<!-- heading-textA01 -->


<!-- /heading-textA01 -->
<div class="textA01">

<!-- information -->
<!-- /information -->

<p>Please fill out the contact form below.<br clear="none" />
A customer service representative in your area/country will respond to you.</p>
<p class="required">* is required information. Please complete all the mandatory fields marked with *.</p>
</div>
<form id="inputForm" name="inputForm" method="POST"  action="input.php" onsubmit="return validateForm()">
<span id="initValues" style="DISPLAY: none"></span>


<div id="attention-block" style="display:none;" class="attention-blockA01">
<h3 class="lvl01"><img height="12" alt="!" width="12" class="iconC01" src="../../common/img/icon_04.gif" />Please input it again after confirming the item marked in red.</h3>
<div class="description">
<ul id="attention-list" class="listA01"><!-- /listA01 --></ul>
<!-- /description --></div>
<!-- /attention-blockA01 --></div>


<span id="existMessages" style="display:none;">
<!-- TODO : design merge -->
</span>

<div class="form-blockA01">

<div class="form-blockA01-unit"><!-- Type -->
<dl><dt><span><em class="required">*</em><em>Type</em><br clear="none" /></span></dt><dd>
<p>
    <select id="inquiryType" name="inputForm:inquiryType" size="1" name="required" onchange="productTypeEnable();">
        <option value="" selected="selected">Please select.</option>
        <option value="Products">Products</option>
        <option value="Web Site">Web Site</option>
        <option value="Others">Others</option>
    </select>
</p>
</dd></dl>
<!-- /form-blockA01-unit --></div><!-- /Type -->

<div class="form-blockA01-unit"><!-- product model -->
<dl>
    <dt>
        <span>Product</span>
    </dt>
    <dd>
        <p>
            <select id="productsType" name="inputForm:productsType" size="1" disabled="disabled">
                <option value="" selected="selected">Please select.</option>
                <option value="Sensors">Sensors</option>
                <option value="Switches">Switches</option>
                <option value="Safety Components">Safety Components</option>
                <option value="Relays">Relays</option>
                <option value="Control Components">Control Components</option>
                <option value="Automation Systems">Automation Systems</option>
                <option value="Motion / Drives">Motion / Drives</option>
                <option value="robotics">robotics</option>
                <option value="Energy Conservation Support/Environment Measure Equipment">Energy Conservation Support/Environment Measure Equipment</option>
                <option value="Power Supplies / In Addition">Power Supplies / In Addition</option>
                <option value="Other Products">Other Products</option>
            </select>
        </p>
    </dd>
</dl>
<!-- /form-blockA01-unit -->

</div><!-- /Product Model -->

<div class="form-blockA01-unit"><!-- product model -->
<dl><dt><span>Product Model</span></dt><dd>
<p><input type="text" id="productModel" name="inputForm:productModel" value="" class="form-str" /></p>
</dd></dl>
<!-- /form-blockA01-unit --></div><!-- /Product Model -->




<div class="form-blockA01-unit"><!-- detaild description -->
<dl><dt><span><label for="description">Detailed Description</label></span></dt><dd>
<p>Please enter more information below.<br clear="none" />
<textarea id="description-textarea" name="inputForm:description-textarea" cols="30" rows="6"></textarea></p>
</dd></dl>
<!-- /form-blockA01-unit --></div><!-- /detail description -->

<div class="form-blockA01-unit"><!-- I may receive your answer by: -->
<input id="receiveAnswerItemsSave" type="hidden" />
<dl><dt><span><label for="receiveAnswer"><em class="required">*</em><em>I may receive your answer by</em><br clear="none" /></label></span></dt><dd class="listWrapG2">

<form>
 <ul>
  <input type="radio" name="select" value="Phone" checked> Phone
  <input type="radio" name="select" value="Email"> Email
  <input type="radio" name="select" value="Visit"> visit 
    </ul>
</form>
</dd>
</dl>
<!-- /form-blockA01-unit --></div><!-- /I may receive your answer by: -->

<div class="form-blockA01-unit"><!-- Name: First, Last -->
<dl><dt><span><label for="userName"><em class="required">*</em><em>Your Name:</em></label></span></dt><dd>
<p><input type="text" id="userName" name="inputForm:userName" value="" class="form-str" /></p>
</dd></dl>
<!-- /form-blockA01-unit --></div><!-- /Name: First, Last -->

<div class="form-blockA01-unit"><!-- Company Name -->
<dl><dt><span><label for="userCompanyName"><em class="required">*</em><em>Company Name</em></label></span></dt><dd>
<p><input type="text" id="userCompanyName" name="inputForm:userCompanyName" value="" class="form-str" /></p>
</dd></dl>
<!-- /form-blockA01-unit --></div><!-- /Company name -->



<div class="form-blockA01-unit"><!-- postal code -->
<dl><dt><span><label for="postalCode"><em class="required">*</em><em>Postal Code</em></label></span></dt><dd>
<p>
<input type="text" id="postalCode" name="inputForm:postalCode" value="" class="form-str" /><br clear="none" />

</p>
</dd></dl>
<!-- /form-blockA01-unit --></div><!-- /postal code -->

<div class="form-blockA01-unit"><!-- address -->
<dl><dt><span><label for="userAddress"><em class="required">*</em><em>Address</em></label></span></dt><dd>
<p><input type="text" id="userAddress" name="inputForm:userAddress" value="" class="form-str" /></p>
</dd></dl>
<!-- /form-blockA01-unit --></div><!-- /address -->

<div class="form-blockA01-unit"><!-- telephone number -->
<dl><dt><span><label for="userTel"><em class="required">*</em><em>Mobile Number</em><br clear="none" />
</label></span></dt><dd>
<p><input type="text" id="userTel" name="inputForm:userTel" value="" class="form-str" /></p>
</dd></dl>
<!-- /form-blockA01-unit --></div><!-- /Telephone number -->



<div class="form-blockA01-unit"><!-- Email Address -->
<dl><dt><span><label for="userEmail"><em class="required">*</em><em>Email Address </em><br clear="none" />
</label></span></dt><dd>
<p><input type="text" id="userEmail" name="inputForm:userEmail" value="" class="form-str" /></p>
</dd></dl>
<!-- /form-blockA01-unit --></div><!-- /Email Address -->

<div class="link-listE01">
<ul><li><input type="submit" id="doConfirm" name="inputForm:doConfirm" value="confirm" class="text-button" /></li></ul>
<!-- /link-listE01 --></div>

<!-- /form-blockA01 --></div>

<input id="contentOfInquiryItemsSave" type="hidden" />
<input type="hidden" name="inputForm/view/contact/input.html" value="inputForm" /></form>
<!--+/primary-contents-->
<!-- === /[primary-contents-area] === --></div>
<!-- === [side-area] === -->
<div class="side-area">
<!-- === [related-info-area] === -->
<div class="related-info-area">
<p class="non-visual"><a id="related-info" name="related-info" shape="rect">Related Contents</a></p>
<!--+related-info-->

<!--+/related-info-->
<!-- === /[related-info-area] === --></div>
<!-- === /[side-area] === --></div>
<!-- === /[contents-area] === --></div>

<!-- === [top-page-link-area] === -->
<div class="top-page-link-area">
<ul class="top-page-link">
<li><a href="#page-top"><img src="../../common/img/icon_03.gif" width="5" height="8" alt="" class="iconB01" />Top of page</a></li>
</ul>
<!-- top-page-link-area --></div>
<!-- === /[top-page-link-area] === -->

<!-- === [footer-area] === -->
<div class="footer-area">
<p class="non-visual"><a name="footer" id="footer">Site Information</a></p>

<div class="footer-link">

<address>&copy; Copyright Kyoto Engineering &amp; Automation. All Rights Reserved.</address>
<!-- footer-link --></div>
<!-- === /[footer-area] === --></div>

<!-- /omron-ia --></div>

</body>
</html>