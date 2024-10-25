import { useContext,useState } from 'react';
import { OneLinerContext } from '../../context/OneLinerContext';
import Paragraphs from '../parts/text/paragraphs';

const OneLinerGrid = ({}) => {

	const {
		oneLiner,
		tagList
	} = useContext(OneLinerContext);

	let resList = oneLiner.slice(0, 5);

	return (
		<section className="py-5 mt-10 ">
			<div className="text-center mb-5">
				<p className="font-general-medium text-2xl sm:text-4xl mb-1 text-ternary-dark dark:text-ternary-light">
				ひとこと
				</p>
			</div>

			<div className='p-10 rounded-xl border border-gray-200 dark:border-gray-400 shadow-lg hover:shadow-xl mb-5 sm:mb-0 bg-secondary-light dark:bg-ternary-dark'>
				<div className="">
					<ul className=" rounded-lg divide-y divide-gray-200 dark:border-gray-400">
						{resList.map((item, index) => (
							<li key={index} className="px-4 py-2">
								{item.url && (
									<a href={item.url} target="_blank" >
										<div className="flex justify-between items-center text-ternary-dark dark:text-ternary-light hover:text-blue-200 dark:hover:text-blue-300">
											<span className=" text-lg">{item.title}</span>
											<span className="text-secondary-dark dark:text-gray-300 text-xs">
												{new Date(item.date.start).toLocaleString(
													"en",
													{
													month: "short",
													day: "2-digit",
													year: "numeric",
													}
												)}
												</span>
										</div>
									</a>
								)}
								{!item.url && (
								<div className="flex justify-between items-center text-ternary-dark dark:text-ternary-light">
									<span className=" text-lg">{item.title}</span>
									<span className="text-secondary-dark dark:text-gray-300 text-xs">
										{new Date(item.date.start).toLocaleString(
											"en",
											{
											month: "short",
											day: "2-digit",
											year: "numeric",
											}
										)}
										</span>
								</div>
							)}
							</li>
						))}
					</ul>	
				</div>
			</div>
		</section>
	);
};

export default OneLinerGrid;
