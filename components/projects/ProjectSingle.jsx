import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Paragraphs from "../../components/parts/text/paragraphs"

const ProjectSingle = ({ title, genre, src, desc }) => {
	return (
		<motion.div
			key={title}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1, delay: 1 }}
			transition={{
				ease: 'easeInOut',
				duration: 0.7,
				delay: 0.15,
			}}
		>
			<Link href="/projects/detail/" aria-label="Single Project">
				<div className="rounded-xl shadow-lg hover:shadow-xl cursor-pointer mb-10 sm:mb-0 bg-secondary-light dark:bg-ternary-dark">
					<div className='relative h-[200px]'>
						<Image
							src={src}
							fill
							className="rounded-t-xl border-none "
							alt={title}
							style={{
							  objectFit: "cover"
							}}
						/>
					</div>
					<div className="px-4 py-6">
						<h3 className="font-general-medium text-md md:text-xl font-semibold text-ternary-dark dark:text-ternary-light mb-2 p-2 h-13 lg:h-24 xl:h-15 overflow-hidden line-clamp-2">
							{title}
						</h3>
						<div className="flex  justify-center gap-2 text-sm text-ternary-light dark:text-ternary-light mb-2 p-2">
						  <Paragraphs text={desc} addClass='max-h-[4rem] overflow-hidden line-clamp-3'/>
						</div>
						<div className="flex items-center justify-center gap-2 text-sm text-ternary-light dark:text-ternary-light">
						{genre.map((r) => {
							return ( 
							<span className='px-2 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 focus:ring-1 focus:ring-indigo-900  duration-300'>
							{r.name}
							</span>
							)
						})}
						</div>
					</div>
				</div>
			</Link>
		</motion.div>
	);
};

export default ProjectSingle;
