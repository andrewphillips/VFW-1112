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
	

	// Variable defaults
	var packageCat = [":: Choose a Size ::", "Envelope", "Small Package", "Large Package", "Oversize Package"];
	makeCats();
	

	//Set click events
	var displayLink = $("displaydatalink");
	displayLink.addEventListener("click", getData)			
	var clearLink = $("cleardatalink");
	clearLink.addEventListener("click", clearLocal); 
	var submit = $("submitbutton");
	submit.addEventListener("click", storeData);

});