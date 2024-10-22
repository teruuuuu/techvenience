import { useContext } from 'react';
import SingleBlogContext from '../../context/SingleBlogContext';
import { ClockIcon, TagIcon } from '@heroicons/react/16/solid';

const BlogSingleHeader = () => {
	const { singleBlogData } = useContext(SingleBlogContext);

	return (
		<div>
			<p className="font-general-medium text-left text-3xl sm:text-4xl font-bold text-primary-dark dark:text-primary-light mt-14 sm:mt-20 mb-7">
				{singleBlogData.ProjectHeader.title}
			</p>
			<div className="flex">
				<div className="flex items-center mr-10">
					<ClockIcon className="text-lg text-ternary-dark dark:text-ternary-light w-5 h-5" />
					<span className="font-general-regular ml-2 leading-none text-primary-dark dark:text-primary-light">
						{singleBlogData.ProjectHeader.publishDate}
					</span>
				</div>
				<div className="flex items-center">
					<TagIcon className="text-lg text-ternary-dark dark:text-ternary-light w-5 h-5" />
					<span className="font-general-regular ml-2 leading-none text-primary-dark dark:text-primary-light">
						{singleBlogData.ProjectHeader.tags}
					</span>
				</div>
			</div>
		</div>
	);
};

export default BlogSingleHeader;
