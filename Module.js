//Revealing Module Pattern using IIFE Module Design Pattern.
//----------------------------------------------------------------
let todoApp = (() => {
	//----------------------------------------------------------------
	//Function: Handles the Click Events in the Todo List App//
	let handleClick = (event) => {
		//Event.target is the element that was clicked
		const target = event.target;
		//If the target is the submit button, then add the task to the list
		if (target.id === "taskSubmit") {
			const taskTitle = inputTask?.value;
			if (taskTitle === "") return;
			let task = new Task(taskTitle);
			addTask(task);
			inputTask.focus();
			inputTask.value = "";
		}
	};
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
