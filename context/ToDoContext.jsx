import { useState, createContext } from 'react';

// Create todoList context
export const TodoListContext = createContext();

// Create the todoList context provider
export const TodoListProvider = ({list, tags, children}) => {
	const [todoList, setTodoList] = useState(list);
	const [tagList, setTagList] = useState(tags);
	const {initMonthlyTodo, initWeeklyTodo, initDaylyTodoList} = getInit(todoList)

	// ここで今日の日付から抽出してしまう
	const [monthlyTodo, setMonthlyTodo] = useState(initMonthlyTodo);// 今月の月間目標
	const [weeklyTodo, setWeeklyTodo] = useState(initWeeklyTodo);// 今週の週間目標
	const [daylyTodoList, setDaylyTodoList] = useState(initDaylyTodoList);//　今週の日課

	return (
		<TodoListContext.Provider
			value={{
				todoList,
				setTodoList,
				tagList,
				setTagList,
				monthlyTodo,
				setMonthlyTodo,
				weeklyTodo,
				setWeeklyTodo,
				daylyTodoList,
				setDaylyTodoList,
			}}
		>
			{children}
		</TodoListContext.Provider>
	);
};


const getInit = (todoList) => {
	const today = new Date();
	const currentMonth = today.getMonth();
	const currentWeekStart = today.getDate() - today.getDay(); // 日曜日を週の始まりとする

	// 月間目標を取得
	const monthlyGoals = todoList.filter(todo => {
		const todoDate = new Date(todo.date.start);
		return todoDate.getMonth() === currentMonth && todoDate.getFullYear() === today.getFullYear();
	});


	// 週間目標を取得
	const weeklyGoals = todoList.filter(todo => {
		const todoDate = new Date(todo.date.start);
		return (
			todoDate >= new Date(today.setDate(currentWeekStart)) && 
			todoDate < new Date(today.setDate(currentWeekStart + 7))
		);
	});

	// 日課を取得
	const dailyGoals = todoList.filter(todo => {
		const todoDate = new Date(todo.date.start);
		return todoDate.toDateString() === new Date().toDateString();
	});

	return {
		initMonthlyTodo : monthlyGoals.length > 0 ? monthlyGoals[0] : null,
		initWeeklyTodo : weeklyGoals.length > 0 ? weeklyGoals[0] : null,
		initDaylyTodoList :dailyGoals
	}

}
