import Head from "next/head.js";
import Link from "next/link.js";
import { getDatabase } from "../lib/notion.js";
import Layout from '../components/layout.js'
export const databaseId = process.env.NEXT_PUBLIC_NOTION_DATABASE_ID;
import { ACCESABLE_IMAGE_PATH, GENRE_LIST, GENRES } from "../const/index.js";
import AppBanner from "../components/parts/home/appBanner.js";
import { ProjectsProvider } from "../context/ProjectsContext.jsx";
import { TodoListProvider } from "../context/ToDoContext.jsx";
import ProjectsGrid from "../components/projects/ProjectsGrid.jsx";
import Button from "../components/parts/reusable/button.js";
import saveImageIfNeeded from "../components/download/index.js";
import TodoListGrid from "../components/todo/TodoGrid.jsx";
import { OneLinerProvider } from "../context/OneLinerContext.jsx";
import OneLinerGrid from "../components/oneLiner/OneLinerGrid.jsx";
import ChartPage from "../components/parts/chart/BarChart.jsx"
import TodoChart from "../components/todo/ToDoChart.jsx";
export default function Home({ posts }) {

	// todo
	let { todoList, todoTagList, blogList, blogTagList, oneLinerList, oneLinerTagList} = createList(posts)
	
  return (
    <Layout>
      <Head>
        <title>Techvenience -  -</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto">
         <AppBanner />

         <ProjectsProvider list={blogList} tags={blogTagList}>
			<ProjectsGrid isShowMenu={false} size={3}></ProjectsGrid>
		</ProjectsProvider>

         <div className="mt-8 sm:mt-10 flex justify-center">
            <Link
              href={`/blog`}
              className="font-general-medium flex items-center px-6 py-3 rounded-lg shadow-lg hover:shadow-xl bg-indigo-500 hover:bg-indigo-600 focus:ring-1 focus:ring-indigo-900 text-white text-lg sm:text-xl duration-300"
              aria-label="More Projects"
            >
              <Button title={`View All`} />
            </Link>
          </div>

		<hr className="m-10 border"></hr>

		 <OneLinerProvider list={oneLinerList} tags={oneLinerTagList} >
			<OneLinerGrid />
		 </OneLinerProvider>

		  <TodoListProvider list={todoList} tags={todoTagList}>
			<TodoListGrid />
			<TodoChart />
		 </TodoListProvider>



        
      </div>{/* .container */}
    </Layout>
  );
}

export const getStaticProps = async () => {
  const database = await getDatabase(process.env.NEXT_PUBLIC_NOTION_DATABASE_ID);
  let props = []
  for(let item of database){
    props.push(item.properties)
  }
  saveImageIfNeeded(props, "blogList")
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
		this.createdAt = new Date(item.created_time).toLocaleString(
            "ja",
            {
              month: "short",
              day: "2-digit",
              year: "numeric",
            }
        );
		this.updatedAt = new Date(item.last_edited_time).toLocaleString(
            "ja",
            {
              month: "short",
              day: "2-digit",
              year: "numeric",
            }
        );
        this.title = item.properties["名前"].title[0].text.content;
        this.tags = item.properties["tags"].multi_select
		this.date = item.properties["date"].date
		this.type = item.properties["type"].select.name
    }
}

export class BlogEntity extends BaseEntity {
	constructor(item){
		super(item);

        this.description = item.properties["description"].rich_text
		if(item.properties["image"].files[0]){
			const tmpName = item.properties["image"].files[0].name
			const fileName = tmpName.replace(/ /g, '_')
			this.image = `/${ACCESABLE_IMAGE_PATH}/blogList/${fileName}`
		}
	}
}

export class ToDoEntity extends BaseEntity {
	constructor(item){
		super(item);

		this.description = item.properties["description"].rich_text
		this.start = item.properties["date"].date.start
		this.end = item.properties["date"].date.end
		this.check = item.properties["check"].checkbox
		this.difficulty = item.properties["difficulty"].select.name
		this.unit = item.properties["unit"].select.name
	}
}

export class OneLinerEntity extends BaseEntity {
	constructor(item){
		super(item);

		this.url = null
		if(item.properties["名前"].title[0].text.link){
			this.url = item.properties["名前"].title[0].text.link.url
		};
	}
}

export const createList = (posts) => {
	// ここで分割する
	// todo
	let todoList = []
	let todoTagList = []
	// blog
	let blogList = []
	let blogTagList = []
	// oneLiner
	let oneLinerList = []
	let oneLinerTagList = []

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
		} else if(type == "oneLiner"){
			const entity = new OneLinerEntity(post)
			oneLinerList.push(entity)
			entity.tags.forEach(tag => oneLinerTagList.push(tag.name));
		}
		blogList.sort((a, b) => {
			return new Date(b.date.start) - new Date(a.date.start);
		});
		todoList.sort((a, b) => {
			return new Date(b.date.start) - new Date(a.date.start);
		});
		oneLinerList.sort((a, b) => {
			return new Date(b.date.start) - new Date(a.date.start);
		});
	}

	return {
		todoList,
		todoTagList,
		blogList,
		blogTagList,
		oneLinerList,
		oneLinerTagList
	}

}