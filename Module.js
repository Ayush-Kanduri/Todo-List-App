//Revealing Module Pattern using IIFE Module Design Pattern.
//----------------------------------------------------------------
let todoApp = (() => {
	let taskList = [];
	const inputTask = document.getElementById("task");
	const submitTask = document.getElementById("taskSubmit");
	const upperTabs = document
		.querySelectorAll(".tabs-box")[0]
		.querySelectorAll(".tabs");
	const lowerTabs = document
		.querySelectorAll(".tabs-box")[1]
		.querySelectorAll(".tabs");
	const allTabContent = document.querySelectorAll(".scroll > .content")[0];
	const incompleteTabContent =
		document.querySelectorAll(".scroll > .content")[1];
	const completedTabContent =
		document.querySelectorAll(".scroll > .content")[2];
	let taskItemTemplate = allTabContent.querySelector(".task").cloneNode(true);
	taskItemTemplate.style.display = "flex";
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
