var CONTACT_FORM_ID = "inputForm";
var FORM_NAME = "Contact";
var CONTACT_REQUIRED_FIELD = [

	{
		id      : "inquiryType",
		message : "Please select type.",
		related : [
			{
				id      : "productsType",
				equals	: "Products",
				message : "Please select product."
			}
		]
	},
	{
		id      : "contentOfInquiry0",
		message : "Please select content of inquiry",
		group   : [
			{
				id      : "contentOfInquiry1"
			},
			{
				id      : "contentOfInquiry2"
			},
			{
				id      : "contentOfInquiry3"
			},
			{
				id      : "contentOfInquiry4"
			},
			{
				id      : "contentOfInquiry5"
			}
		]

	},
	{
		id      : "receiveAnswer0",
		message : "Please select reply.",
		group   : [
			{
				id      : "receiveAnswer1"
			},
			{
				id      : "receiveAnswer2"
			},
			{
				id      : "receiveAnswer3"
			}
		]
	},
	{
		id      : "userName",
		message : "Please enter your name."
	},
	{
		id      : "userCompanyName",
		message : "Please enter company name."
	},
	{
		id      : "region",
		message : "Please select a region."

	},
	{
		id      : "country",
		message : "Please select a country."

	},
	{
		id      : "postalCode",
		message : "Please enter your postal code."
	},
	{
		id      : "userAddress",
		message : "Please enter your address"
	},
	{
		id      : "userTel",
		message : "Please enter your telephone number."
	},
	{
		id      : "userEmail",
		message : "Please enter your Email address."
	},
	{
		id      : "subject",
		message : "Please indicate what title best describes your inquiry."
	}
]

var CONTACT_REGION_BLOCK_CONFIG = {
	id          : "contact-select-region",
//	heading     : "Select Region",
	heading     : "",
//	description : "Please select from the choices below, the region you would like to contact, or the region which is closest to where you currently reside. (required)",
	description : "",
	region      : {
		label       : "Region",
		name        : "region",
		description : "",
		required    : true
	},
	country     : {
		label       : "Country",
		name        : "country",
		description : "",
		required    : true
	},
	others      : {
		label       : "Other Countries / Territories",
		name        : "otherAreas",
//		description : "Please specify :",
		description : "When you select Other Countries, please enter your country name below.",
		required    : false
	}
}

var CONTACT_REGION_LIST = [
	{
		label    : "Select your region",
		value    : "",
		children : [
			{
				label : "-- Please select your country --",
				value : ""
			}
		]
	},
	{
		label    : "Europe",
		value    : "Europe",
		children : [
			{
				label : "-- Please select your country --",
				value : ""
			},
			{
				label : "Austria",
				value : "Austria"
			},
			{
				label : "Belgium",
				value : "Belgium"
			},
			{
				label : "Czech Republic",
				value : "Czech Republic"
			},
			{
				label : "Denmark",
				value : "Denmark"
			},
			{
				label : "Finland",
				value : "Finland"
			},
			{
				label : "France",
				value : "France"
			},
			{
				label : "Germany",
				value : "Germany"
			},
			{
				label : "Hungary",
				value : "Hungary"
			},
			{
				label : "Italy",
				value : "Italy"
			},
			{
				label : "Netherlands",
				value : "Netherlands"
			},
			{
				label : "Norway",
				value : "Norway"
			},
			{
				label : "Poland",
				value : "Poland"
			},
			{
				label : "Portugal",
				value : "Portugal"
			},
			{
				label : "Romania",
				value : "Romania"
			},
			{
				label : "Russia",
				value : "Russia"
			},
			{
				label : "Spain",
				value : "Spain"
			},
			{
				label : "Sweden",
				value : "Sweden"
			},
			{
				label : "Switzerland",
				value : "Switzerland"
			},
			{
				label : "Turkey",
				value : "Turkey"
			},
			{
				label : "United Kingdom",
				value : "United Kingdom"
			},
			{
				label : "Other Countries",
				value : "Other Countries"
			}
		]
	},
	{
		label    : "Middle East",
		value    : "Middle East",
		children : [
			{
				label : "-- Please select your country --",
				value : ""
			}
		]
	},
	{
		label    : "Africa",
		value    : "Africa",
		children : [
			{
				label : "-- Please select your country --",
				value : ""
			},
			{
				label : "South Africa",
				value : "South Africa"
			},
			{
				label : "Other Countries",
				value : "Other Countries"
			}
		]
	},
	{
		label    : "Asia-Pacific",
		value    : "Asia-Pacific",
		children : [
			{
				label : "-- Please select your country --",
				value : ""
			},
			{
				label : "Australia",
				value : "Australia"
			},
			{
				label : "India",
				value : "India"
			},
			{
				label : "Indonesia",
				value : "Indonesia"
			},
			{
				label : "Malaysia",
				value : "Malaysia"
			},
			{
				label : "New Zealand",
				value : "New Zealand"
			},
			{
				label : "Philippines",
				value : "Philippines"
			},
			{
				label : "Singapore",
				value : "Singapore"
			},
			{
				label : "Thailand",
				value : "Thailand"
			},
			{
				label : "Vietnam",
				value : "Vietnam"
			},
			{
				label : "Other Countries",
				value : "Other Countries"
			}
		]
	},
	{
		label    : "Greater China",
		value    : "Greater China",
		children : [
			{
				label : "-- Please select your country --",
				value : ""
			},
			{
				label : "China",
				value : "China"
			},
			{
				label : "Taiwan",
				value : "Taiwan"
			},
			{
				label : "Hong Kong",
				value : "Hong Kong"
			}
		]
	},
	{
		label    : "Japan / Korea",
		value    : "Japan / Korea",
		children : [
			{
				label : "-- Please select your country --",
				value : ""
			},
			{
				label : "Japan",
				value : "Japan"
			},
			{
				label : "Korea",
				value : "Korea"
			}
		]
	},
	{
		label    : "Americas",
		value    : "Americas",
		children : [
			{
				label : "-- Please select your country --",
				value : ""
			},
			{
				label : "United States",
				value : "United States"
			},
			{
				label : "Canada",
				value : "Canada"
			},
			{
				label : "Brazil",
				value : "Brazil"
			},
			{
				label : "Mexico",
				value : "Mexico"
			},
			{
				label : "Argentina",
				value : "Argentina"
			},
			{
				label : "Latin America",
				value : "Latin America"
			},
			{
				label : "Other Countries",
				value : "Other Countries"
			}
		]
	}
]


