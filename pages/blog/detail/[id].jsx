import ProjectGallery from '../../../components/projects/ProjectGallery';
import ProjectHeader from '../../../components/projects/ProjectHeader';
import ProjectInfo from '../../../components/projects/ProjectInfo';
import ProjectRelatedProjects from '../../../components/projects/ProjectRelatedProjects';
import { SingleProjectProvider } from '../../../context/SingleProjectContext';
import { motion } from 'framer-motion';
import { singleProjectData as singleProjectDataJson } from '../../../data/singleProjectData';
import Layout from "../../../components/layout";
import { getBlocks, getDatabase, getPage } from '../../../lib/notion';

const ProjectSingle = ({page, blocks}) => {
    
	// create page entity not blocks


	return (
		<Layout>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, delay: 1 }}
				transition={{
					ease: 'easeInOut',
					duration: 0.6,
					delay: 0.15,
				}}
				className="container mx-auto mt-5 sm:mt-10"
			>
				<SingleProjectProvider page={page} blocks={blocks}>
					<ProjectHeader />
					<ProjectGallery />
					<ProjectInfo />
					<ProjectRelatedProjects />
				</SingleProjectProvider>
			</motion.div>
		</Layout>
	);
};

export default ProjectSingle;

export const getStaticPaths = async () => {
	const database = await getDatabase(process.env.NEXT_PUBLIC_NOTION_DATABASE_ID);
		
    let resList = []
    for(let item of database){
		
		const type = item.properties["type"].select.name
		if(type !== "blog")	{
			continue;
		}
        let res = {id : item.id}
        resList.push({params: res})
    }

	console.log("getStaticPaths")
	console.log(resList)

   return {
        paths: resList,
        fallback: false,
    };
};

export const getStaticProps = async (context) => {
	const { id } = context.params;
	const detailPage = await getPage(id);
    const detailBlocks = await getBlocks(id)

	console.log("getStaticProps")
	console.log(detailPage)
	console.log(detailBlock)
	return {
	  props: {
		page: detailPage,
		blocks: detailBlocks
	  },
	  revalidate: 1,
	};
};
  