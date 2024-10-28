import { useContext,useState } from 'react';
import { TodoListContext } from '../../context/ToDoContext';
import Paragraphs, { Text } from '../parts/text/paragraphs';

const TodoListGrid = ({isShowMenu = true, size = null}) => {

	const [activeTab, setActiveTab] = useState("month");
	const {
		todoList,
		tagList,
		monthlyTodo,
		weeklyTodo,
		daylyTodoList,
	} = useContext(TodoListContext);

	const tabList = []
	tabList.push({
		id: "month",
		title: "月間目標"
	})
	tabList.push({
		id: "week",
		title: "週間目標"
	})
	tabList.push({
		id: "day",
		title: "日課"
	})

	return (
		<section className="py-5 mt-10 ">
			<div className="text-center mb-5">
				<p className="font-general-medium text-2xl sm:text-4xl mb-1 text-ternary-dark dark:text-ternary-light">
				ToDo
				</p>
			</div>

			<div className='p-10 rounded-xl border border-gray-200 dark:border-gray-400 shadow-lg hover:shadow-xl mb-10 sm:mb-0 bg-secondary-light dark:bg-ternary-dark'>
				<div className="mb-4 border-b border-gray-200 dark:border-gray-400">
					<ul className="flex flex-wrap -mb-px text-center justify-center items-center text-ternary-dark dark:text-ternary-light" role="tablist">
						{tabList.map((tab) => (
							<li className="me-2" role="presentation">
								<button
									className={`min-w-4 md:min-w-32 lg:min-w-36 inline-block p-4 rounded-t-lg ${
									activeTab === tab.id
										? "border-b-2 border-blue-500 text-blue-500"
										: "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
									}`}
									onClick={() => setActiveTab(tab.id)}
									type="button"
									role="tab"
									aria-controls={tab.id}
									aria-selected={activeTab === tab.id}
								>
									<span className="text-md md:text-xl font-bold">{tab.title}</span>
								</button>
							</li>
						))}
					
					</ul>
				</div>

				<div>
					{activeTab == "month" && monthlyTodo && (
						<div className="p-4 rounded-lg" id="month" role="tabpanel">
						  <ToDoParagraphs item={monthlyTodo.description} checked={monthlyTodo.check} />
						</div>
					)}
					{activeTab == "week" && weeklyTodo && (
						<div className="p-4 rounded-lg " id="month" role="tabpanel">
						  <ToDoParagraphs item={weeklyTodo.description} checked={weeklyTodo.check} />
						</div>
					)}
					{activeTab == "day" && (
						<div className="p-4 rounded-lg" id="day" role="tabpanel">
						{daylyTodoList.map((item) => (
							<ToDoParagraphs item={item.title}  checked={item.check} />
						))}
						</div>
					)}
				</div>
			</div>
		</section>
	);
};


export function ToDoParagraphs({ item, checked = false }) {
    if(!item){
        return <></>
    }

    const classname = `text-md font-light leading-relaxed text-ternary-dark dark:text-ternary-light`

    const isArray = Array.isArray(item);

    const whiteSpaceStyle = isArray ? { whiteSpace: 'pre-wrap', overflowWeap: 'break-word', wordBreak: 'break-all' } : {}
    return (
      <div className={classname} style={whiteSpaceStyle}>
        {isArray && (
            <ArrayParagraphs item={item} checked={checked}/>
        )}
        {!isArray && (
			<span className='flex items-center'>
			{checked && (
				<svg class="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
					<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
				</svg>
			)}
			{!checked && (
				<svg class="w-3.5 h-3.5 me-2 text-gray-500 dark:text-gray-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
					<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
				</svg>
			)}
          <span>{item}</span>  
		  </span>
        )}
      </div>
    );
}


// export function ArrayParagraphs({ item, checked = false }) {

//     const {
// 		annotations: { bold, code, color, italic, strikethrough, underline },
// 		text,
// 	} = item[0];
// 	const resultArray = text.content.split('\n').filter(res => res.trim() !== "");
// 	return (
// 	resultArray.map((value) => (
// 		  <span
// 			className={[
// 				bold ? "font-bold" : "",
// 				code ? "font-mono bg-gray-200 p-1 rounded" : "",
// 				italic ? "italic" : "",
// 				strikethrough ? "line-through" : "",
// 				underline ? "underline" : "",
// 			  "flex items-center"
// 			].join(" ")}
// 			style={color !== "default" ?  color  : {}}
// 			key={value.text.content}
// 		  >
// 			{checked && (
// 				<svg class="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
// 					<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
// 				</svg>
// 			)}
// 			{!checked && (
// 				<svg class="w-3.5 h-3.5 me-2 text-gray-500 dark:text-gray-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
// 					<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
// 				</svg>
// 			)}
// 			{value.text.link ? <Link className="text-black hover:text-blue-500 underline hover:no-underline transition duration-300" href={value.text.link.url}>{value.text.content}</Link> : value.text.content}
// 		  </span>
// 		)
// 	)
// 	)
// }



export function ArrayParagraphs({ item, checked = false }) {
  if (!item) {
    return null;
  }
  return item.map((value) => {
    const {
      annotations: { bold, code, color, italic, strikethrough, underline },
      text,
    } = value;
    return (
      <span
        className={[
          bold ? "font-bold" : "",
          code ? "font-mono bg-gray-200 p-1 rounded" : "",
          italic ? "italic" : "",
          strikethrough ? "line-through" : "",
          underline ? "underline" : "",
			  "flex items-center"
        ].join(" ")}
        style={color !== "default" ? { color } : {}}
        key={text.content}
      >
		{checked && (
			<svg class="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
				<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
			</svg>
		)}
		{!checked && (
			<svg class="w-3.5 h-3.5 me-2 text-gray-500 dark:text-gray-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
				<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
			</svg>
		)}
		<span>
        {text.link ? <Link className="text-black hover:text-blue-500 underline hover:no-underline transition duration-300" href={text.link.url}>{text.content}</Link> : text.content}
		</span>
      </span>
    );
  });
};


export default TodoListGrid;
