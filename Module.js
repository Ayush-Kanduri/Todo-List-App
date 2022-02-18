//Revealing Module Pattern using IIFE Module Design Pattern.
//----------------------------------------------------------------
let todoApp = (() => {
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
	let taskCount = () => {
		const taskList = getLocalStorage("taskList");
		const count = taskList.filter((task) => task.completed === false).length;
		lowerTabs[1].textContent = `${count} Tasks Left`;
	};
	//----------------------------------------------------------------
	//Function: Adds the Task into the DOM Screen//
	let addTaskToDOM = (task) => {
		taskItemTemplate.querySelector(".text p").textContent = task.taskTitle;
		taskItemTemplate.querySelector(".text p").id = task.id;
		//To maintain if the task is checked or not.
		if (task.completed === true) {
			taskItemTemplate
				.querySelector(".text p")
				.classList.add("line-through");
		} else {
			taskItemTemplate
				.querySelector(".text p")
				.classList.remove("line-through");
		}
		//Appends the node to the DOM
		allTabContent.appendChild(taskItemTemplate);
		//Clones the Task Item Template Node
		taskItemTemplate = taskItemTemplate.cloneNode(true);
	};
	//----------------------------------------------------------------
	//Function: Deletes the Tasks from the DOM Screen//
	let deleteTasksFromDOM = () => {
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
	//Function: Renders the All Tab//
	let renderAllTab = (taskList) => {
		//Highlights the "All" Tab
		upperTabs[0].classList.add("active");
		//Adds the Content from the Local Storage Task List into the DOM Screen
		taskList.forEach((task) => addTaskToDOM(task));
	};
	//----------------------------------------------------------------
	//Function: Renders the Task List//
	let renderTaskList = () => {
		const taskList = getLocalStorage("taskList");
		const activeTab = localStorage.getItem("active");
		if (taskList.length > 0) {
			//Removes the Content from the DOM Screen
			deleteTasksFromDOM();
			//Un-Highlights all the Tabs
			upperTabs.forEach((element) => element.classList.remove("active"));
			//Conditional Rendering for Tabs
			if (activeTab === "all") {
				renderAllTab(taskList);
			}
			//Displays the Number of Tasks Left in the DOM Screen
			taskCount();
			return;
		} else {
			upperTabs[0].classList.remove("active");
			upperTabs[1].classList.remove("active");
			upperTabs[2].classList.remove("active");
		}
	};
	//----------------------------------------------------------------
	//Function: Adds the Task into the Task List//
	let addTask = (taskTitle) => {
		if (taskTitle) {
			const data = getLocalStorage("taskList");
			if (data) {
				data.push(new Task(taskTitle));
				setLocalStorage(data);
			} else {
				const taskList = [];
				const task = new Task(taskTitle);
				taskList.push(task);
				setLocalStorage(taskList);
			}
			renderTaskList();
			return;
		}
	};
	//----------------------------------------------------------------
	//Function: Adds the TaskList into the Browser Local Storage//
	let setLocalStorage = (taskList) => {
		if (taskList.length > 0) {
			window.localStorage.setItem("taskList", JSON.stringify(taskList));
			return;
		}
	};
	//----------------------------------------------------------------
	//Function: Fetches the TaskList from the Browser Local Storage//
	let getLocalStorage = (taskList) => {
		return JSON.parse(window.localStorage.getItem(taskList));
	};
	//----------------------------------------------------------------
	//Function: Checks/Unchecks Off the Task & Marks it as Completed/Incomplete//
	let taskCompletedToggle = (taskId) => {
		const taskList = getLocalStorage("taskList");
		taskList.forEach((task) => {
			if (task.id === Number(taskId)) {
				task.completed = !task.completed;
				setLocalStorage(taskList);
				renderTaskList();
				return;
			}
		});
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
		const target = event.target;
		//If the target is the "submit" button, then add the task to the list
		if (target.id === "taskSubmit") {
			//Optional Chaining Operator
			const taskTitle = inputTask?.value;
			if (taskTitle === "") return;
			//Sets All Tab as Active in Local Storage
			localStorage.setItem("active", "all");
			addTask(taskTitle);
			inputTask.focus();
			inputTask.value = "";
		}
		//If the target is the "check" button, then toggle the LineThrough Class
		if (target.id === "check") {
			const ele = target.parentNode.nextElementSibling.querySelector("p");
			ele.classList.toggle("line-through");
			taskCompletedToggle(ele.id);
			return;
		}
		//If the target is the "All-Tabs" button, then display the Content of the Tab
		if (target.id === "all") {
			const taskList = getLocalStorage("taskList");
			if (taskList.length > 0) {
				localStorage.setItem("active", target.id);
				renderTaskList();
				return;
			}
		}
		// //If the target is the "delete" button, then delete that task
		// if (target.id === "delete") {
		// 	// const ele = target.parentNode.nextElementSibling.querySelector("p");
		// 	// ele.classList.toggle("line-through");
		// 	// taskCompletedToggle(ele.id);
		// 	console.log("delete");
		// 	return;
		// }
		// //If the target is the "edit" button, then edit that task
		// if (target.id === "delete") {
		// 	console.log("delete");
		// 	return;
		// }
	};
	//----------------------------------------------------------------
	//Function: Initializes the Todo List App//
	let initialiseApp = () => {
		//Click Event Delegation
		document.addEventListener("click", handleClick);
		//KeyPress Event Delegation
		document.addEventListener("keyup", handleKeyPress);
		//To Render the TaskList on the Screen, on every Window Load/Reload
		window.onload = () => {
			const data = getLocalStorage("taskList");
			if (data) renderTaskList();
		};
	};
	//----------------------------------------------------------------
	return {
		initialise: initialiseApp,
	};
})();
//----------------------------------------------------------------
