/* Andrew Phillips VFW 1112 Project 2 */

//Wait until the DOM is ready.
window.addEventListener("DOMContentLoaded", function() {  

	//getElementById Function
	function $(x){
		var theElement = document.getElementById(x);
		return theElement;
	} 
	
	function makeCats(){
		var formTag = document.getElementsByTagName("form"), //formTag is an array of all form tags.
			selectLi = $('select'),
			makeSelect = document.createElement('select');
			makeSelect.setAttribute("id", "groups");
		for(var i=0, j=packageCat.length; i<j; i++){
			var makeOption = document.createElement('option');
			var optText = packageCat[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		}
		selectLi.appendChild(makeSelect);
	}
	
//Find value of selected radio button
	function getSelectedShipRadio(){
		var shipRadios = document.forms[0].shipNotify;
		for(var i=0; i<shipRadios.length; i++){
			if(shipRadios[i].checked){
				shipNotifyValue = shipRadios[i].value;
			}
		}
	}
	
	function getSelectedProgressRadio(){
		var ProgressRadio = document.forms[0].progressNotify;
		for(var i=0; i<ProgressRadio.length; i++){
			if(ProgressRadio[i].checked){
				progressNotifyValue = progressRadio[i].value;
			}
		}
	}
	
	//Find value of selected checkboxes
	function getRushValue(){
		if($('rushorder').checked){
			rushValues = $("rushorder").value;
		}else{
			rushValues = "No";
		}
	}
		function getDontRushValue(){
		if($("dontrush").checked){
			dontRushValues = $("dontrush").value;
		}else{
			dontRushValues = "No";
		}
	}
	
	function toggleControls(n){
		switch(n){
			case "on":
				$('shippingform').style.display = "none";
				$('cleardatalink').style.display = "inline";
				$('displaydatalink').style.display = "none";
				$('newitemlink').style.display = "inline";
				break;
			case "off":
				$('shippingform').style.display = "block";
				$('cleardatalink').style.display = "inline";
				$('displaydatalink').style.display = "inline";
				$('newitemlink').style.display = "none";
				$('items').style.display = "none";
			break;
		default:
			return false;
		}
	}
	
	function storeData(){
		var id 					= Math.floor(Math.random()*100000001);
		//Gather up all our form field values and store in an object.
		//Object properties contain array with the form label and input value.
		getSelectedShipRadio();
		getSelectedProgressRadio();
		getRushValue();
		getDontRushValue();
		var item = {};
			item.packagenick 			= ["(Optional) Name Package:", $('packagenick').value];
			item.datesend 				= ["Ship Date:", $('datesend').value];
			item.category 				= ["Package Type:", $('groups').value];
			item.rushorder 				= ["Expedite Shipment:", rushValues ];
			item.dontrush 				= ["Don't Expedite Shipment:", dontRushValues ];
			item.numberpackages 	= ["Amount to be Shipped:", $('numberpackages').value];
			item.notes 					= ["Shipping Notes:", $('notes').value];
			item.shipNotify 			= ["Send an \'Item Shipped\' notification?", shipNotifyValue];
			item.progressNotify	 	= ["Update progress of shipped package?", progressNotifyValue];
	
		localStorage.setItem(id, JSON.stringify(item));
		alert("Item(s) ready to ship!");
	}
	
	function getData(){
		toggleControls("on");
		if(localStorage.length === 0){
		alert("There is no data in local storage.");
	}
	
	//Write Data from Local Storage to the browser.
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$('items').style.display = "block";
		for(var i=0, len=localStorage.length; i<len; i++){
			var makeli = document.createElement('li');
			makeList.appendChild(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			//convert the string from local storage value back to an object by using JSON.parse().
			var obj = JSON.parse(value);
			var makeSubList = document.createElement('ul');
			makeli.appendChild(makeSubList);
			for(var n in obj){
			var makeSubLi = document.createElement('li');
				makeSubList.appendChild(makeSubLi);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubLi.innerHTML = optSubText;
			}
		}
	}
	
	function clearLocal(){
		if(localStorage.length === 0){
		alert("There is no data to clear.");
		}else{
		localStorage.clear();
		alert("Local storage has been cleared!");
		window.location.reload();
		return false;
		}
	} 

	// Variable defaults
	var packageCat = [":: Choose a Size ::", "Envelope", "Small Package", "Large Package", "Oversize Package"];
	var	shipNotifyValue;
	var	bringValues;
	var	progressNotifyValue;

	makeCats();
	

	//Set click events
	var displayLink = $("displaydatalink");
	displayLink.addEventListener("click", getData);			
	var clearLink = $("cleardatalink");
	clearLink.addEventListener("click", clearLocal); 
	var submit = $("submitbutton");
	submit.addEventListener("click", storeData);

});