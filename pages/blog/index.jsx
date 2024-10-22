import Head from "next/head";
import Layout from "../../components/layout";
import ProjectsGrid from "../../components/projects/ProjectsGrid";
import { GENRE_LIST } from "../../const";
import { ProjectsContext, ProjectsProvider } from "../../context/ProjectsContext";
import { getDatabase } from "../../lib/notion";
import { useContext } from "react";
import { createList } from "..";

const BlogList = ({posts}) => {
	// ここで分割する
	let { blogList, blogTagList} = createList(posts)

	return (
		<Layout>
			<Head>
			<title>Techvenience - Projects-</title>
			<link rel="icon" href="/favicon.ico" />
			</Head>
			<ProjectsProvider list={blogList} tags={blogTagList} size={null}>
				<div className="container mx-auto">
					<ProjectsGrid />
				</div>
			</ProjectsProvider>
		</Layout>
	);
};

export default BlogList;

export const getStaticProps = async () => {
	const database = await getDatabase(process.env.NEXT_PUBLIC_NOTION_DATABASE_ID);
	//let props = []
	// for(let item of database){
	//   props.push(item.properties)
	// }
	// saveImageIfNeeded(props, "blogList")
	return {
	  props: {
		posts: database
	  },
	  revalidate: 1,
	};
  };
  