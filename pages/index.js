import Head from "next/head.js";
import Link from "next/link.js";
import { getDatabase } from "../lib/notion.js";
import Layout from '../components/layout.js'
export const databaseId = process.env.NEXT_PUBLIC_NOTION_DATABASE_ID;
import { ACCESABLE_IMAGE_PATH, GENRE_LIST, GENRES } from "../const/index.js";
import AppBanner from "../components/parts/home/appBanner.js";
import { ProjectsProvider } from "../context/ProjectsContext.jsx";
import ProjectsGrid from "../components/projects/ProjectsGrid.jsx";
import Button from "../components/parts/reusable/button.js";
import saveImageIfNeeded from "../components/download/index.js";

export default function Home({ posts }) {

	// todo
	let { todoList, todoTagList, blogList, blogTagList} = createList(posts)
	console.log(blogList)
	console.log(todoList)

  return (
    <Layout>
      <Head>
        <title>Techvenience -  -</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto">
         <AppBanner />

         <ProjectsProvider list={blogList} tags={blogTagList} size={6}>
				   <ProjectsGrid isShowMenu={false}></ProjectsGrid>
			   </ProjectsProvider>

         <div className="mt-8 sm:mt-10 flex justify-center">
            <Link
              href={`/blog/`}
              className="font-general-medium flex items-center px-6 py-3 rounded-lg shadow-lg hover:shadow-xl bg-indigo-500 hover:bg-indigo-600 focus:ring-1 focus:ring-indigo-900 text-white text-lg sm:text-xl duration-300"
              aria-label="More Projects"
            >
              <Button title={`View All`} />
            </Link>
          
          
          </div>

        
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
		this.start = null
		this.end = null
		this.check = false
		this.difficulty = 1
		this.unit = null
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

	return {
		todoList,
		todoTagList,
		blogList,
		blogTagList
	}

}