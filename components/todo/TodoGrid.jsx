import { useContext,useState } from 'react';
import { TodoListContext } from '../../context/ToDoContext';
import Paragraphs from '../parts/text/paragraphs';

const TodoListGrid = ({isShowMenu = true, size = null}) => {

	const [activeTab, setActiveTab] = useState("month");
	const {
		todoList,
		tagList,
		monthlyTodo,
		weeklyTodo,
		daylyTodoList,
	} = useContext(TodoListContext);

	return (
		<section className="py-5 mt-10 ">
			<div className="text-center mb-5">
				<p className="font-general-medium text-2xl sm:text-4xl mb-1 text-ternary-dark dark:text-ternary-light">
				TODO
				</p>
			</div>

			<div className='p-10 rounded-xl border border-gray-200 dark:border-gray-400 shadow-lg hover:shadow-xl mb-10 sm:mb-0 bg-secondary-light dark:bg-ternary-dark'>
				<div className="mb-4 border-b border-gray-200 dark:border-gray-400">
					<ul className="flex flex-wrap -mb-px text-center justify-center items-center text-ternary-dark dark:text-ternary-light" role="tablist">
						<li className="me-2" role="presentation">
							<button
								className={`min-w-4 md:min-w-32 lg:min-w-36 inline-block p-4 border-b-2 rounded-t-lg ${
								activeTab === "month"
									? "border-blue-500 text-blue-500"
									: "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
								}`}
								onClick={() => setActiveTab("month")}
								type="button"
								role="tab"
								aria-controls={"month"}
								aria-selected={activeTab === "month"}
							>
								<span className="text-md md:text-xl font-bold">月間目標</span>
							</button>
						</li>
						<li className="me-2" role="presentation">
							<button
								className={`min-w-4 md:min-w-32 lg:min-w-36 inline-block p-4 border-b-2 rounded-t-lg ${
								activeTab === "week"
									? "border-blue-500 text-blue-500"
									: "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
								}`}
								onClick={() => setActiveTab("week")}
								type="button"
								role="tab"
								aria-controls={"week"}
								aria-selected={activeTab === "week"}
							>
								<span className="text-md md:text-xl font-bold">週間目標</span>
							</button>
						</li>
						<li className="me-2" role="presentation">
							<button
								className={`min-w-4 md:min-w-32 lg:min-w-36 inline-block p-4 border-b-2 rounded-t-lg ${
								activeTab === "day"
									? "border-blue-500 text-blue-500"
									: "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
								}`}
								onClick={() => setActiveTab("day")}
								type="button"
								role="tab"
								aria-controls={"day"}
								aria-selected={activeTab === "day"}
							>
								<span className="text-md md:text-xl font-bold">日課</span>
							</button>
						</li>
					</ul>
				</div>

				<div>
					{activeTab == "month" && (
						<div className="p-4 rounded-lg" id="month" role="tabpanel">
						  <Paragraphs text={monthlyTodo.description} />
						</div>
					)}
					{activeTab == "week" && (
						<div className="p-4 rounded-lg" id="month" role="tabpanel">
						  <Paragraphs text={weeklyTodo.description} />
						</div>
					)}
					{activeTab == "day" && (
						<div className="p-4 rounded-lg" id="day" role="tabpanel">
						{daylyTodoList.map((item) => (
							<Paragraphs text={item.title} />
						))}
						</div>
					)}
				</div>
			</div>
		</section>
	);
};

export default TodoListGrid;
