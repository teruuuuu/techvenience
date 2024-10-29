import { useContext } from 'react';
import SingleProjectContext from '../../context/SingleProjectContext';
import Image from 'next/image';

const ProjectGallery = () => {
	const { pageData } = useContext(SingleProjectContext);

	console.log("--------------")
	console.log(pageData)
	console.log("--------------")

	return (
		<div className="flex items-center justify-center mt-12 mb-10 sm:mb-0">
			<Image
				src={pageData.image}
				className="rounded-xl cursor-pointer shadow-lg sm:shadow-none"
				alt={pageData.title}
				key={pageData.id}
				width={400}
				height={400}
			/>
		</div>
	);
};

export default ProjectGallery;
