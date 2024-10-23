import { useContext } from 'react';
import ProjectSingle from './ProjectSingle';
import { ProjectsContext } from '../../context/ProjectsContext';
import ProjectsFilter from './ProjectsFilter';
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';

const ProjectsGrid = ({isShowMenu = true, size = null}) => {
	const {
		projects,
		searchProject,
		tagList,
		setSearchProject,
		searchProjectsByTitle,
		selectProject,
		setSelectProject,
		selectProjectsByCategory,
	} = useContext(ProjectsContext);

	let resList = projects
	if(size){
		resList = projects.slice(0, size);
	}

	return (
		<section className="py-5 mt-10">
			<div className="text-center mb-5 sm:mb-16">
				<p className="font-general-medium text-2xl sm:text-4xl mb-1 text-ternary-dark dark:text-ternary-light">
				Post Collection
				</p>
			</div>
			{isShowMenu && (
			<div className="">
				<div
					className="
                        flex
                        justify-between
                        border-b border-primary-light
                        dark:border-secondary-dark
                        pb-3
                        gap-3
                        "
				>
					<div className="flex justify-between gap-2">
						<span
							className="
                                hidden
                                sm:block
                                bg-primary-light
                                dark:bg-ternary-dark
                                p-2.5
                                shadow-sm
                                rounded-xl
                                cursor-pointer
                                "
						>
							<MagnifyingGlassIcon className="text-ternary-dark dark:text-ternary-light w-5 h-5"></MagnifyingGlassIcon>
						</span>
						<input
							onChange={(e) => {
								setSearchProject(e.target.value);
							}}
							className="font-general-medium 
                                pl-3
                                pr-1
                                sm:px-4
                                py-2
                                border 
                            border-gray-200
                                dark:border-secondary-dark
                                rounded-lg
                                text-sm
                                sm:text-md
                                bg-secondary-light
                                dark:bg-ternary-dark
                                text-primary-dark
                                dark:text-ternary-light
                                "
							id="name"
							name="name"
							type="search"
							required=""
							placeholder="Search Projects"
							aria-label="Name"
						/>
					</div>

					<ProjectsFilter tagList={tagList} setSelectProject={setSelectProject} />
				</div>
			</div>
			)}

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6 sm:gap-10">
				{selectProject
					? selectProjectsByCategory.map((project) => (
							<ProjectSingle
								title={project.title}
								genre={project.tags}
								src={project.image}
								key={project.id}
								desc={project.description}
							/>
					  ))
					: searchProject
					? searchProjectsByTitle.map((project) => (
							<ProjectSingle
								title={project.title}
								genre={project.tags}
								src={project.image}
								key={project.id}
								desc={project.description}
							/>
					  ))
					: resList.map((project) => (
							<ProjectSingle
								title={project.title}
								genre={project.tags}
								src={project.image}
								key={project.id}
								desc={project.description}
							/>
					  ))}
			</div>
		</section>
	);
};

export default ProjectsGrid;
