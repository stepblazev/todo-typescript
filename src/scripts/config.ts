export const TASKS_LIMIT: number = 10;

const topicTemplate: string = `

<div class="topic hoverable">
    <div class="topic__header">
        <button class="topic__mark">
            <svg>not marked</svg>
            <svg>marked</svg>
        </button>
        <h3 class="topic__title">New Topic 1</h3>
        <button class="topic__edit">
            <svg>edit</svg>
        </button>
    </div>
    <div class="topic__more">
        <div class="topic__line"></div>
        <button class="topic__show-more">
            <svg>more</svg>
        </button>
    </div>
    <div class="tasks">
        <ul class="tasks__list">
            <li>
                <svg>wait</svg>
                <svg>checked</svg>
                <span>Wash the dishes</span>
                <div class="tasks__controls">
                    <button class="tasks__order">
                        <svg>order</svg>
                    </button>
                    <button class="tasks__delete">
                        <svg>delete</svg>
                    </button>
                </div>
            </li>
        </ul>
        <button class="tasks__add hoverable">Add new</button>
    </div>
</div>

`;
