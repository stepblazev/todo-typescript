import topicIcons from '../assets/topic-icons.json';
import { TASK_NAME_LIMIT } from '../config';
import { ITopic } from '../models/ITopic';
import { Task } from './Task';

export class Topic implements ITopic {
	public _root: HTMLElement = document.createElement('div');

	public tasks: Task[] = [];

	private opened: boolean = false;
	private marked: boolean = false;

	public get Opened() {
		return this.opened;
	}

	public set Opened(value: boolean) {
		this.opened = value;
		this.update();
	}

	public get Marked() {
		return this.marked;
	}

	public set Marked(value: boolean) {
		this.marked = value;
		this.update();
	}

	constructor(public title: string) {
		this.render();
	}

	private render() {
		this._root.classList.add('topic');
		this._root.innerHTML = ` <div class="topic__header">
				<button class="topic__mark hoverable">
					${topicIcons.iconNotMarked} ${topicIcons.iconMarked}
				</button>
				<h3 class="topic__title">${this.title}</h3>
				<button class="topic__edit hoverable">${topicIcons.iconDelete}</button>
			</div>
			<div class="topic__more">
				<div class="topic__line"></div>
				<button class="topic__show-more">${topicIcons.iconShowMore}</button>
			</div>
			<div class="tasks">
				<p class="tasks__empty tasks__empty_show">Task list is empty</p>
				<ul class="tasks__list"></ul>
				<button class="tasks__add hoverable">New task</button>
			</div>`;

		this.initEvents();
	}

	private initEvents() {
		const markBUTTON: HTMLElement = this._root.querySelector('.topic__mark') as HTMLElement;
		markBUTTON.addEventListener('click', () => {
			this.Marked = !this.Marked;
		});

		const editBUTTON: HTMLElement = this._root.querySelector('.topic__edit') as HTMLElement;
		editBUTTON.addEventListener('click', () => {
			// DELETING THE TOPIC
		});

		const moreBUTTON: HTMLElement = this._root.querySelector(
			'.topic__show-more'
		) as HTMLElement;
		moreBUTTON.addEventListener('click', () => {
			this.Opened = !this.Opened;
		});

		const addBUTTON: HTMLElement = this._root.querySelector('.tasks__add') as HTMLElement;
		addBUTTON.addEventListener('click', () => {
			const name: string | null = prompt('Enter task name:');
			if (!name) return;

			const reducedName = name.slice(0, TASK_NAME_LIMIT);
			const exists: Task | undefined = this.tasks.find(
				(task) => task.name.toLowerCase() === reducedName.toLowerCase()
			);
			if (exists) return alert('Task with the same name already exists');

			const newTask: Task = new Task(reducedName);
			this.tasks.push(newTask);

			this.initTaskEvents(newTask);
			this.renderTasks();
		});
	}

	private renderTasks() {
		const _taskContainer = this._root.querySelector('.tasks__list');

		if (this.tasks.length === 0) {
			return this._root?.querySelector('.tasks__empty')!.classList.add('tasks__empty_show');
		} else {
			this._root?.querySelector('.tasks__empty')!.classList.remove('tasks__empty_show');
		}

		this.tasks.forEach((task) => {
			_taskContainer!.append(task._root);
		});
	}

	private initTaskEvents(task: Task) {
		const taskIndex = this.tasks.findIndex((t) => t.name === task.name);
		task._root.querySelector('.tasks__delete')!.addEventListener('click', () => {
			if (!confirm(`Delete task "${task.name}"?`)) return;
			task._root.remove();
			this.tasks.splice(taskIndex, 1);
			this.renderTasks();
		});
	}

	private update() {
		const _topic = this._root;

		const markBUTTON = _topic.querySelector('.topic__mark');
		const moreBUTTON = _topic.querySelector('.topic__line');

		if (this.opened) {
			_topic.classList.add('topic_opened');
			moreBUTTON!.classList.add('topic__line_opened');
		} else {
			_topic.classList.remove('topic_opened');
			moreBUTTON!.classList.remove('topic__line_opened');
		}

		if (this.marked) {
			markBUTTON!.classList.add('topic__mark_marked');
		} else {
			markBUTTON!.classList.remove('topic__mark_marked');
		}
	}
}
