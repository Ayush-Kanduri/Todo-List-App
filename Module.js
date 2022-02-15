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
	//Function: Displays the Number of Tasks Left in the DOM Screen//
	let taskCount = (taskList) => {
		const count = taskList.filter((task) => task.completed === false).length;
		lowerTabs[1].textContent = `${count} Tasks Left`;
	};
	//----------------------------------------------------------------
	//Function: Adds the Task into the DOM Screen//
	let addTaskToDOM = (task) => {
		//Adds the Content to the DOM
		taskItemTemplate.querySelector(".text p").textContent = task.taskTitle;
		allTabContent.appendChild(taskItemTemplate);
		//Clones the Task Item Template Node
		taskItemTemplate = taskItemTemplate.cloneNode(true);
	};
	//----------------------------------------------------------------
	//Function: Deletes the Tasks from the DOM Screen//
	let deleteTasksFromDOM = (task) => {
		//Tabs Array containing all the Content from all the Tabs Combined in the DOM Screen
		const tabs = [
			...allTabContent.querySelectorAll("div.task"),
			...incompleteTabContent.querySelectorAll("div.task"),
			...completedTabContent.querySelectorAll("div.task"),
		];
		//Removes the Content from the DOM Screen
		tabs.forEach((element) => element.remove());
	};
	//----------------------------------------------------------------
	//Function: Renders the Task List//
	let renderTaskList = (taskList) => {
		if (taskList.length > 0) {
			//Un-Highlights all the Tabs
			upperTabs.forEach((element) => element.classList.remove("active"));
			//Highlights the "All" Tab
			upperTabs[0].classList.add("active");
			//Removes the Content from the DOM Screen
			deleteTasksFromDOM();
			//Adds the Content from the Task List into the DOM Screen
			taskList.forEach((task) => {
				addTaskToDOM(task);
			});
			//Displays the Number of Tasks Left in the DOM Screen
			taskCount(taskList);
			return;
		}
	};
	//----------------------------------------------------------------
	//Function: Adds the Task into the Task List//
	let addTask = (task) => {
		if (task) {
			taskList.push(task);
			renderTaskList(taskList);
			return;
		}
	};
	//----------------------------------------------------------------
	//Function: Handles the KeyPress Events in the Todo List App//
	let handleKeyPress = (event) => {
		//Event.keyCode = 13 for "Enter" key
		if (event.key === "Enter") {
			const activeElement = document.activeElement;
			if (inputTask === activeElement) {
				//Calls the Click Event Listener on the Submit Task Button when the Enter Key is Pressed & the Focus is on the Input Task Element.
				submitTask.click();
			}
		}
	};
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
