import { useState, createContext } from 'react';

// Create todoList context
export const TodoListContext = createContext();

// Create the todoList context provider
export const TodoListProvider = ({list, tags, children}) => {
	const [todoList, setTodoList] = useState(list);
	const [tagList, setTagList] = useState(tags);
	const {initMonthlyTodo, initWeeklyTodo, initDaylyTodoList} = getInit(todoList)
	const { total, checkedPoint,monthTotal,monthCheckedPoint, weekTotal, weekCheckedPoint  } = calcPoint(todoList)
	console.log(total)
	console.log(checkedPoint)
	console.log(monthTotal)
	console.log(monthCheckedPoint)
	console.log(weekTotal)
	console.log(weekCheckedPoint)


	// ここで今日の日付から抽出してしまう
	const [monthlyTodo, setMonthlyTodo] = useState(initMonthlyTodo);// 今月の月間目標
	const [weeklyTodo, setWeeklyTodo] = useState(initWeeklyTodo);// 今週の週間目標
	const [daylyTodoList, setDaylyTodoList] = useState(initDaylyTodoList);//　今週の日課

	const [totalPoint, setTotalPoint] = useState(total);
	const [checkedTotalPoint, setCheckedTotalPoint] = useState(checkedPoint);
	const [monthlyTotalPoint, setMonthlyTotalPoint] = useState(monthTotal);
	const [monthlyCheckedPoint, setMonthlyCheckedPoint] = useState(monthCheckedPoint);
	const [weeklyTotalPoint, setweekTotalPoint] = useState(weekTotal);
	const [weeklyCheckedPoint, setWeeklyCheckedPoint] = useState(weekCheckedPoint);

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
				totalPoint,
				checkedTotalPoint,
				monthlyTotalPoint,
				monthlyCheckedPoint,
				weeklyTotalPoint,
				weeklyCheckedPoint
			}}
		>
			{children}
		</TodoListContext.Provider>
	);
};


const getInit = (todoList) => {
	const today = new Date();
	const currentMonth = today.getMonth();
	const currentWeekStart = new Date();
	
	// 日曜日を週の始まりとする
	currentWeekStart.setDate(today.getDate() - today.getDay());
	currentWeekStart.setHours(0, 0, 0, 0);

	const currentWeekEnd = new Date(currentWeekStart);
	currentWeekEnd.setDate(currentWeekStart.getDate() + 7);



	// 月間目標を取得
	const monthlyGoals = todoList.filter(todo => {
		const todoDate = new Date(todo.date.start);
		return todo.unit === 'month' && todoDate.getMonth() === currentMonth && todoDate.getFullYear() === today.getFullYear();
	});
	// todo.unit === "month" && 


	// 週間目標を取得
	const weeklyGoals = todoList.filter(todo => {
		const todoDate = new Date(todo.date.start);
		
		return (
			todo.unit === "week" && 
			todoDate >= currentWeekStart && 
			todoDate < currentWeekEnd
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

const calcPoint = (todoList) => {
	const today = new Date();
	const currentMonth = today.getMonth();
	const currentWeekStart = new Date();
	
	// 日曜日を週の始まりとする
	currentWeekStart.setDate(today.getDate() - today.getDay());
	currentWeekStart.setHours(0, 0, 0, 0);

	const currentWeekEnd = new Date(currentWeekStart);
	currentWeekEnd.setDate(currentWeekStart.getDate() + 7);

	let total = 0
	let checkedPoint = 0
	// month
	let monthTotal = 0
	let monthCheckedPoint = 0
	// week
	let weekTotal = 0
	let weekCheckedPoint = 0

	for(const todo of todoList) {
		const todoDate = new Date(todo.date.start);
		total += Number(todo.difficulty)
		if(todo.check){
			checkedPoint += Number(todo.difficulty)
		}
		if(todoDate.getMonth() === currentMonth && todoDate.getFullYear() === today.getFullYear()){
			monthTotal += Number(todo.difficulty)
			if(todo.check){
				monthCheckedPoint += Number(todo.difficulty)
			}
			if(todoDate >= currentWeekStart && todoDate < currentWeekEnd){
				weekTotal += Number(todo.difficulty)
				if(todo.check){
					weekCheckedPoint += Number(todo.difficulty)
				}
			}
		}
		
	}

	return {
		total,
		checkedPoint,
		monthTotal,
		monthCheckedPoint,
		weekTotal,
		weekCheckedPoint
	}
}
