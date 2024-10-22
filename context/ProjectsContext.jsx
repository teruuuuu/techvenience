import { useState, createContext } from 'react';

// Create projects context
export const ProjectsContext = createContext();

// Create the projects context provider
export const ProjectsProvider = ({list, tags, size, children}) => {
	const [projects, setProjects] = useState(list);
	const [tagList, setTagList] = useState(tags);
	const [searchProject, setSearchProject] = useState('');
	const [selectProject, setSelectProject] = useState('');

	// Search projects by project title
	const searchProjectsByTitle = projects.filter((item) => {
		const titleMatches = item.title.toLowerCase().includes(searchProject.toLowerCase());
	
		// descriptionが配列であることを考慮し、text.contentを取得
		const descriptionContent = item.description.map(desc => desc.text.content).join(' ');
		const descriptionMatches = descriptionContent.toLowerCase().includes(searchProject.toLowerCase());
	
		// 検索文字列が空の場合は全てのアイテムを返す
		return titleMatches || descriptionMatches || searchProject === '';
	});

	// Select projects by project category
	const selectProjectsByCategory = projects.filter((item) => {
		if(selectProject == "全て"){
			return true
		}
		let tags = item.tags;
		return tags.some(cat => cat.name === selectProject);
	});

	return (
		<ProjectsContext.Provider
			value={{
				projects,
				setProjects,
				tagList,
				setTagList,
				searchProject,
				setSearchProject,
				searchProjectsByTitle,
				selectProject,
				setSelectProject,
				selectProjectsByCategory,
			}}
		>
			{children}
		</ProjectsContext.Provider>
	);
};
