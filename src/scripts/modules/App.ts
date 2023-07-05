import topicIcons from '../assets/topic-icons.json';
import { IApp } from '../models/IApp';
import { Task } from './Task';
import { TodoStore } from './TodoStore';
import { Topic } from './Topic';

export class App implements IApp {
	public _container: HTMLDivElement = document.getElementById('container') as HTMLDivElement;
	public _addButton: HTMLButtonElement = document.getElementById('add') as HTMLButtonElement;
	public _deleteButton: HTMLButtonElement = document.getElementById(
		'delete'
	) as HTMLButtonElement;
	public _searchInput: HTMLInputElement = document.getElementById('search') as HTMLInputElement;
	public _markedCheck: HTMLInputElement = document.getElementById('marked') as HTMLInputElement;
	public _nothingLabel: HTMLElement = document.getElementById('nothing') as HTMLElement;

	public Todo: TodoStore = new TodoStore();

	constructor() {
		this.initEvents();
		this.renderTopics(this.Todo.topics);
	}

	initEvents() {
		this._addButton.addEventListener('click', () => {
			const title: string | null = prompt('New topic title:');
			if (!title) return;
			const topicList = this.Todo.addTopic(title);
			this.renderTopics(topicList);
		});
		this._deleteButton.addEventListener('click', () => {
			if (confirm('Clear the topic list?')) this.Todo.deleteAll();
			this.renderTopics([]);
		});

		const getFiltered = () => {
			const search: string = this._searchInput.value;
			const marked: boolean = this._markedCheck.checked;
			const topicList = this.Todo.getSearched(search, marked);
			this.Todo.hideAll();
			this.renderTopics(topicList);
		};

		this._searchInput.addEventListener('input', getFiltered);
		this._markedCheck.addEventListener('change', getFiltered);
	}

	renderTopics(topics: Topic[]) {
		this._container.innerHTML = '';

		if (!topics?.length) {
			return this._nothingLabel.classList.add('nothing_show');
		} else {
			this._nothingLabel.classList.remove('nothing_show');
		}

		for (let current of topics) {
			const topicDIV = document.createElement('div');
			topicDIV.classList.add('topic');
			topicDIV.classList.add('hoverable');
			topicDIV.setAttribute('data-topic-id', current.id.toString());

			current.opened && topicDIV.classList.add('opened');
			/* ================================== */
			/* ==> */ const topicHeaderDIV = document.createElement('div');
			/* ==> */ topicHeaderDIV.classList.add('topic__header');
			/* ================================== */
			/* ==========> */ const topicMarkBUTTON = document.createElement('button');
			/* ==========> */ topicMarkBUTTON.classList.add('topic__mark');
			/* ==========> */ current.marked && topicMarkBUTTON.classList.add('marked');
			/* ==========> */ topicMarkBUTTON.innerHTML = `${topicIcons.iconNotMarked}${topicIcons.iconMarked}`;

			// NOTE MARK TOPIC EVENT
			topicMarkBUTTON.addEventListener('click', () => {
				topicMarkBUTTON.classList.toggle('marked');
				const newMarked: boolean = !current.marked;
				current.setMarked(newMarked);
			});

			/* ================================== */
			/* ==========> */ const topicTitleH3 = document.createElement('h3');
			/* ==========> */ topicTitleH3.classList.add('topic__title');
			/* ==========> */ topicTitleH3.textContent = current.title;
			/* ================================== */
			/* ==========> */ const topicEditBUTTON = document.createElement('button');
			/* ==========> */ topicEditBUTTON.classList.add('topic__edit');
			/* ==========> */ topicEditBUTTON.innerHTML = topicIcons.iconEdit;

			// NOTE EDIT MENU EVENT
			topicEditBUTTON.addEventListener('click', () => {
				console.log('NOT READY YET');
			});

			/* ================================== */
			/* ==> */ topicHeaderDIV.appendChild(topicMarkBUTTON);
			/* ==> */ topicHeaderDIV.appendChild(topicTitleH3);
			/* ==> */ topicHeaderDIV.appendChild(topicEditBUTTON);
			/* ================================== */
			/* ==> */ const topicMoreDIV = document.createElement('div');
			/* ==> */ topicMoreDIV.classList.add('topic__more');
			/* ================================== */
			/* ==========> */ const topicLineDIV = document.createElement('div');
			/* ==========> */ topicLineDIV.classList.add('topic__line');
			/* ==========> */ current.opened && topicLineDIV.classList.add('opened');
			/* ================================== */
			/* ==========> */ const topicShowMoreBUTTON = document.createElement('button');
			/* ==========> */ topicShowMoreBUTTON.classList.add('topic__show-more');
			/* ==========> */ topicShowMoreBUTTON.innerHTML = topicIcons.iconShowMore;

			// NOTE SHOWE MORE EVENT
			topicShowMoreBUTTON.addEventListener('click', () => {
				topicDIV.classList.toggle('opened');
				topicLineDIV.classList.toggle('opened');
				const newOpened: boolean = !current.opened;
				newOpened ? current.open() : current.hide();
			});

			/* ================================== */
			/* ==> */ topicMoreDIV.appendChild(topicLineDIV);
			/* ==> */ topicMoreDIV.appendChild(topicShowMoreBUTTON);
			/* ================================== */
			const tasksDIV = this.renderTasks(current);

			topicDIV.appendChild(topicHeaderDIV);
			topicDIV.appendChild(topicMoreDIV);
			topicDIV.appendChild(tasksDIV);

			this._container.appendChild(topicDIV);
		}
	}

	renderTasks(topic: Topic): HTMLElement {
		const { tasks } = topic;

		const tasksDIV = document.createElement('div');
		tasksDIV.classList.add('tasks');

		/* ================================== */
		/* ==> */ const tasksListUL = document.createElement('ul');
		/* ==> */ tasksListUL.classList.add('tasks__list');
		/* ================================== */
		for (let i = 0; i < tasks.length; i++) {
			const current: Task = tasks[i];

			/* ==========> */ const tasksLI = document.createElement('li');
			/* ==========> */ tasksLI.innerHTML = `${topicIcons.iconWait}${topicIcons.iconChecked}<span>${tasks[i].name}</span>`;
			/* ================================== */
			/* ==========> */ const tasksControlsDIV = document.createElement('div');
			/* ==========> */ tasksControlsDIV.classList.add('tasks__controls');
			/* ================================== */
			/* ====================> */ const tasksOrderBUTTON = document.createElement('button');
			/* ====================> */ tasksOrderBUTTON.classList.add('tasks__order');
			/* ====================> */ tasksOrderBUTTON.innerHTML = topicIcons.iconOrder;

			// NOTE CHANGE TASK ORDER EVENT
			tasksOrderBUTTON.addEventListener('click', () => {
				topic.decreaseTaskOrder(current);
				this.renderTopics(this.Todo.topics);
			});

			/* ================================== */
			/* ====================> */ const tasksDeleteBUTTON = document.createElement('button');
			/* ====================> */ tasksDeleteBUTTON.classList.add('tasks__delete');
			/* ====================> */ tasksDeleteBUTTON.innerHTML = topicIcons.iconDelete;

			// NOTE DELETE TASK EVENT
			tasksDeleteBUTTON.addEventListener('click', () => {
				if (!confirm(`Delete task '${current.name}'?`)) return;
				topic.deleteTask(current.order);
				this.renderTopics(this.Todo.topics);
			});

			/* ================================== */
			/* ==========> */ tasksControlsDIV.appendChild(tasksOrderBUTTON);
			/* ==========> */ tasksControlsDIV.appendChild(tasksDeleteBUTTON);
			/* ==========> */ tasksLI.appendChild(tasksControlsDIV);
			/* ================================== */
			tasksListUL.appendChild(tasksLI);
		}
		/* ================================== */
		const tasksAddBUTTON = document.createElement('button');
		tasksAddBUTTON.classList.add('tasks__add');
		tasksAddBUTTON.classList.add('hoverable');
		tasksAddBUTTON.textContent = 'New task';

		// NOTE ADD NEW TASK EVENT
		tasksAddBUTTON.addEventListener('click', () => {
			const taskName = prompt('Enter task name:');
			if (!taskName) return;
			topic.addTask(taskName);
			this.renderTopics(this.Todo.topics);
		});

		/* ================================== */
		tasksDIV.appendChild(tasksListUL);
		tasksDIV.appendChild(tasksAddBUTTON);

		return tasksDIV;
	}
}
