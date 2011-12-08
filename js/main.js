/* Andrew Phillips VFW 1112 Project 3 */

//Wait until the DOM is ready.
window.addEventListener("DOMContentLoaded", function() {  


	//getElementById Function
	function $(x){
		var theElement = document.getElementById(x);
		return theElement;
	} 
	
	
// Variable defaults
	var packageCat = [":: Choose a Size ::", "Envelope", "Small Package", "Large Package", "Oversize Package"];
	var	dontRushValues;
	var	rushValues;
	var	shipNotifyValue;
	var	bringValues;
	var	progressNotifyValue;
	var	errorMsg = $("errors");
	var	submit = $("submitbutton");
	var	clearLink = $("cleardatalink");
	var	displayLink = $("displaydatalink");
	
	

	//build selection or options
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
		var progressRadio = document.forms[0].progressNotify;
		for(var i=0; i<progressRadio.length; i++){
			if(progressRadio[i].checked){
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
	
	function storeData(key){
		if (!key){
			var id = Math.floor(Math.random()*100000001);
		} else {
			id = key;
		}
		//Gather up all our form field values and store in an object.
		//Object properties contain array with the form label and input value.
		getSelectedShipRadio();
		getSelectedProgressRadio();
		getRushValue();
		getDontRushValue();
		var item = {};
			item.packagenick 			= ["Package Name:", $('packagenick').value];
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
	
	function validate(e){
		//Elements we want to check
		var getPackageNick = $("packagenick");
		var getCategoryName = $("groups");
		var getShipDate = $("datesend");
		
		//Reset validation errors
		
		//Reset Error Messages
		errorMsg.innerHTML = "";
		getPackageNick.style.border = "1px solid black";
		getCategoryName.style.border = "1px solid black";
		getShipDate.style.border = "1px solid black";
		
		
		//Get Error Messages
		var messageAry = [];
		// Category Validation
		if(getPackageNick.value === ""){
			var packageError = "Please enter a name for your shipment.";
			getPackageNick.style.border = "1px solid red";
			messageAry.push(packageError);
		}
		if(getCategoryName.value === "Pick a Package Category"){
			var categoryError = "Please choose a category.";
			getCategoryName.style.border = "1px solid red";
			messageAry.push(categoryError);
		}
		if(getShipDate.value === ""){
			var dateError = "Please enter a date.";
			getShipDate.style.border = "1px solid red";
			messageAry.push(dateError);
		}
		
		// if there were errors, display on screen
		if(messageAry.length >= 1){
			for(var i=0, j=messageAry.length; i < j; i++) {
				var txt = document.createElement("li");
				txt.innerHTML = messageAry[i];
				errorMsg.appendChild(txt);
			}
			e.preventDefault();
			return false;
		}else{
			storeData(this.key);
		}
		
	}
	
	function editItem(){
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
		//Show the form
		toggleControls("off");
		
		//populate with existing data
		$('packagenick').value = item.name[1];
		$('datesend').value = item.date[1];
		$('groups').value = item.category[1];
		if (item.rushorder[1] === "Yes"){
			$('rushValues').setAttribute("checked", "checked");
		}
		if (item.dontrush [1] === "Yes"){
			$('dontRushValues').setAttribute("checked", "checked");
		}
		
		$('numberpackages').value = item.numberpackages[1];
		$('notes').value = item.notes[1];
		var shipRadios = document.forms[0].shipNotify;
			for(var i=0; i<shipRadios.length; i++){
				if(shipRadios[i].value == "Yes" && item.shipNotify[1] == "Yes"){
					shipRadios[i].setAttribute("checked", "checked");
				}else if(shipRadios[i].value == "No" && item.shipNotify[1] == "No"){
					shipRadios[i].setAttribute("checked", "checked");
				}
			}
			
		var progressRadio = document.forms[0].progressNotify;
			for(var j=0; j<shipRadios.length; j++){
				if(progressRadio[j].value == "Yes" && item.progressNotify[1] == "Yes"){
					progressRadio[j].setAttribute("checked", "checked");
				}else if(shipRadios[j].value == "No" && item.progressNotify[1] == "No"){
					progressRadio[j].setAttribute("checked", "checked");
				}
			}

		
		//Remove the initial listener from the input save contact button
		submit.removeEventListener("click", storeData);
		//Change value submit >> edit
		$('submit').value = "Edit Shipment";
		var editSubmit = $("submit");
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;

	}

	function makeItemLinks(key, linksLi){
		//add edit single item link
		var editLink = document.createElement('a');
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Shipment";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		
		//add line break
		var breakTag = document.createElement('br');
		linksLi.appendChild(breakTag);
		
		function deleteItem() {
			var ask = confirm("Are you sure you want to delete this shipment?");
			if(ask) {
				localStorage.removeItem(this.key);
				window.location.reload();
			}else{
				alert("The shipment was not deleted");
			}
		} 
				
		//add delete single item link
		var deleteLink = document.createElement('a');
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Shipment";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
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
			var linksLi = document.createElement('li');
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
				makeSubList.appendChild(linksLi);
			}
		makeItemLinks(localStorage.key(i), linksLi); //Create Edit and Delete links for each item in local storage
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


	//Set click events
	displayLink.addEventListener("click", getData);			
	clearLink.addEventListener("click", clearLocal); 
	submit.addEventListener("click", storeData);
	
	//call cats!
	makeCats();

});