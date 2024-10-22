import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';


const BlogSingle = ({ title, genre, src }) => {
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
			<Link href="/blog/detail/" aria-label="Single Blog">
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
						<p className="font-general-medium text-lg md:text-xl text-ternary-dark dark:text-ternary-light mb-2">
							{title}
						</p>
						<span className="text-lg text-ternary-dark dark:text-ternary-light">
							{genre}
						</span>
					</div>
				</div>
			</Link>
		</motion.div>
	);
};

export default BlogSingle;
