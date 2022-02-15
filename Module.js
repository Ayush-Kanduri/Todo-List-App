//Revealing Module Pattern using IIFE Module Design Pattern.
//----------------------------------------------------------------
let todoApp = (() => {
	//----------------------------------------------------------------
	//Function: Initializes the Todo List App//
	let initialiseApp = () => {
		//Click Event Delegation
		document.addEventListener("click", handleClick);
		//KeyPress Event Delegation
		document.addEventListener("keyup", handleKeyPress);
	};
	//----------------------------------------------------------------
	return {
		initialise: initialiseApp,
	};
})();
//----------------------------------------------------------------
