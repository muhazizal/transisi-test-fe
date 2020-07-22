// Button add new task
document.querySelector('#addTask').addEventListener('click', () => {
	const createNewTaskElement = (iconsClass, iconsName, titleName, statusId, statusText) => {
		// Task list today
		const taskListToday = document.querySelector('.task__list__today');

		// Create new task div element
		let newTaskDiv = document.createElement('div');
		newTaskDiv.classList.add('list');

		// Create new icon span element inside div
		let newIconsElement = document.createElement('span');
		let newIconsText = document.createTextNode(iconsName);
		newIconsElement.classList.add('material-icons', iconsClass);
		newIconsElement.appendChild(newIconsText);
		newTaskDiv.appendChild(newIconsElement);

		// Create new task title element
		let newTitleElement = document.createElement('p');
		let newTitleText = document.createTextNode(titleName);
		newTitleElement.appendChild(newTitleText);
		newTaskDiv.appendChild(newTitleElement);

		// Create new div list status
		let newStatusDiv = document.createElement('div');
		newStatusDiv.classList.add('list__status');
		newStatusDiv.id = statusId;
		newTaskDiv.appendChild(newStatusDiv);

		// Create new text status inside div list status
		let newStatusElement = document.createElement('p');
		let newStatusText = document.createTextNode(statusText);
		newStatusElement.appendChild(newStatusText);
		newStatusDiv.appendChild(newStatusElement);

		// Append new task into list div
		taskListToday.appendChild(newTaskDiv);
	};

	// Task title
	const taskTitle = ['Create dashboard layout', 'Fixing task CRUD', 'Discussion user API', 'Styling profile layout'];

	// Task status
	const taskStatus = ['Approved', 'In Progress', 'In Review', 'Waiting'];

	// Random task title
	let randomTaskTitle = Math.floor(Math.random() * taskTitle.length);

	// Random task status
	let randomTaskStatus = Math.floor(Math.random() * taskStatus.length);

	// Check for task status
	// And then call createNewTaskElement function
	if (taskStatus[randomTaskStatus] === 'Approved') {
		createNewTaskElement(
			'icons--approved',
			'done',
			taskTitle[randomTaskTitle],
			'approved',
			taskStatus[randomTaskStatus]
		);
	} else if (taskStatus[randomTaskStatus] === 'In Progress') {
		createNewTaskElement(
			'icons--approved',
			'done',
			taskTitle[randomTaskTitle],
			'progress',
			taskStatus[randomTaskStatus]
		);
	} else if (taskStatus[randomTaskStatus] === 'In Review') {
		createNewTaskElement('icons--normal', '', taskTitle[randomTaskTitle], 'review', taskStatus[randomTaskStatus]);
	} else if (taskStatus[randomTaskStatus] === 'Waiting') {
		createNewTaskElement('icons--normal', '', taskTitle[randomTaskTitle], 'waiting', taskStatus[randomTaskStatus]);
	} else {
		console.log('not found');
	}
});
