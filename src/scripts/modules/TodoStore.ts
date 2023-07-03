// import template from '../assets/template.json';
import { ITodoStore } from '../models/ITodoStore';
import { Topic } from './Topic';

export class TodoStore implements ITodoStore {
	public topics: Topic[] = [];

	getSearched(search: string, marked: boolean) {
		const searchResult = this.topics.filter(
			(topic) =>
				topic.title.toLowerCase() === search.toLowerCase() &&
				(marked ? topic.marked === true : true)
		);
		return searchResult;
	}

	addTopic(title: string) {
		const newTopic: Topic = new Topic(title);
		this.topics.push(newTopic);
		return this.topics;
	}

	deleteTopic(id: number) {
		this.topics = this.topics.filter((topic) => topic.id != id);
		return this.topics;
	}

	deleteAll() {
		this.topics = [];
	}
}
