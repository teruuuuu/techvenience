import { useContext,useState } from 'react';
import { TodoListContext } from '../../context/ToDoContext';
import ChartPage from '../parts/chart/BarChart';

const TodoChart = ({isShowMenu = true, size = null}) => {

	const {
        totalPoint,
        checkedTotalPoint,
        monthlyTotalPoint,
        monthlyCheckedPoint,
        weeklyTotalPoint,
        weeklyCheckedPoint
	} = useContext(TodoListContext);
    const list = [{
        title:`Total ${checkedTotalPoint}/${totalPoint}`,
        data:[checkedTotalPoint, totalPoint-checkedTotalPoint]
    },{
        title:`今月 ${monthlyCheckedPoint}/${monthlyTotalPoint}`,
        data:[monthlyCheckedPoint, monthlyTotalPoint-monthlyCheckedPoint]
    },{
        title:`今週 ${weeklyCheckedPoint}/${weeklyTotalPoint}`,
        data:[weeklyCheckedPoint, weeklyTotalPoint-weeklyCheckedPoint]
    }]

	return (
        <div class="flex flex-row flex-wrap flex-grow mt-2">
            {list.map((item) => (
                <div class="w-full md:w-1/2 xl:w-1/3 p-6">
                <div class="bg-white border-transparent rounded-lg shadow-xl">
                    <div class="uppercase text-gray-800 border-b-2 border-gray-300 rounded-tl-lg rounded-tr-lg p-2">
                        <h class="font-bold uppercase text-gray-600">{item.title}</h>
                    </div>
                    <div class="p-5">
                        <ChartPage title={item.title} chartData={item.data}/>
                    </div>
                </div>
                </div>
            ))}
        </div>
    )
}

export default TodoChart;