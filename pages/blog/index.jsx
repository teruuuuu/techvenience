import Head from "next/head";
import Layout from "../../components/layout";
import ProjectsGrid from "../../components/projects/ProjectsGrid";
import { GENRE_LIST } from "../../const";
import { ProjectsProvider } from "../../context/ProjectsContext";
import { getDatabase } from "../../lib/notion";

const Projects = ({posts}) => {
	

	// ここで分割する
	// todo
	let todoList = []
	let todoTagList = []
	// blog
	let blogList = []
	let blogTagList = []

	for(const post of posts){
		let type = null
	
		if(post.properties["type"] && post.properties["type"].select.name){
			type = post.properties["type"].select.name
		}
		
		if(type == "blog"){
			const entity = new BlogEntity(post)
			blogList.push(entity)
			entity.tags.forEach(tag => blogTagList.push(tag.name));
		} else if(type == "todo"){
			const entity = new ToDoEntity(post)
			todoList.push(entity)
			entity.tags.forEach(tag => todoTagList.push(tag.name));
		}
	}

	console.log(blogList)
	console.log(todoList)

	return (
		<Layout>
			<Head>
			<title>Techvenience - Projects-</title>
			<link rel="icon" href="/favicon.ico" />
			</Head>
			<ProjectsProvider list={blogList} tags={blogTagList}>
				<div className="container mx-auto">
					<ProjectsGrid />
				</div>
			</ProjectsProvider>
		</Layout>
	);
};

export default Projects;

export const getStaticProps = async () => {
  const database = await getDatabase(process.env.NEXT_PUBLIC_NOTION_DATABASE_ID);
  console.log(database)
  return {
    props: {
      posts: database
    },
    revalidate: 1,
  };
};


class BaseEntity {
    constructor(item) {
		this.id = item.id
        this.title = item.properties["名前"].title[0].text.content;
        this.description = item.properties["description"].rich_text
        this.tags = item.properties["tags"].multi_select
		this.date = item.properties["date"].date
		this.type = item.properties["type"].select.name
    }
}

export class BlogEntity extends BaseEntity {
	constructor(item){
		super(item);
		this.image = null
	}
}

export class ToDoEntity extends BaseEntity {
	constructor(item){
		super(item);
		this.start = null
		this.end = null
		this.check = false
		this.difficulty = 1
		this.unit = null
	}
}