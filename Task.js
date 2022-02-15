class Task {
	constructor(taskTitle) {
		this.taskTitle = taskTitle;
		this.id = Date.now();
		this.completed = false;
		this.description = "";
		this.reminder = {
			date: "",
			time: "",
			ON: false,
		};
		this.priority = "low";
		this.repeat = {
			when: "",
			ON: false,
		};
	}
}
