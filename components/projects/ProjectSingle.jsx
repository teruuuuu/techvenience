import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';


const ProjectSingle = ({ title, genre, src }) => {
	return (
		<motion.div
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
					<div className="text-center px-4 py-6">
						<h3 className="font-general-medium text-md md:text-xl font-semibold text-ternary-dark dark:text-ternary-light mb-2">
							{title}
						</h3>
						<span className="text-lg text-ternary-dark dark:text-ternary-light">
							{genre}
						</span>
					</div>
				</div>
			</Link>
		</motion.div>
	);
};

export default ProjectSingle;
