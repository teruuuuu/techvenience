import { Fragment, useContext } from 'react';
import SingleProjectContext from '../../context/SingleProjectContext';

const ProjectInfo = () => {
	const { blocksData } = useContext(SingleProjectContext);

	return (
			<div className="w-full text-left mt-10 md:mt-0">
				{blocksData.map((block, index) => (
					<Fragment key={block.id}>{renderBlock(block)}</Fragment>
				))}
			</div>
	);
};


export const Text = ({ text }) => {
	if (!text) {
	  return null;
	}
	return text.map((value) => {
	  const {
		annotations: { bold, code, color, italic, strikethrough, underline },
		text,
	  } = value;
	  return (
		<span
		  className={[
			bold ? "font-bold" : "",
			code ? "font-mono bg-gray-200 p-1 rounded" : "",
			italic ? "italic" : "",
			strikethrough ? "line-through" : "",
			underline ? "underline" : "",
		  ].join(" ")}
		  style={color !== "default" ? { color } : {}}
		  key={text.content}
		>
		  {text.link ? <a className="text-black hover:text-blue-500 underline hover:no-underline transition duration-300" href={text.link.url} target="_blank">{text.content}</a> : text.content}
		</span>
	  );
	});
  };
  
  const renderNestedList = (block, genre) => {
	const { type } = block;
	const value = block[type];
	if (!value) return null;
  
	const isNumberedList = value.children[0].type === "numbered_list_item";
  
	if (isNumberedList) {
	  return <ol>{value.children.map((block) => renderBlock(block))}</ol>;
	}
	return <ul>{value.children.map((block) => renderBlock(block))}</ul>;
  };
  
  const renderBlock = (block) => {
	const { type, id } = block;
	const value = block[type];
  
	switch (type) {
	  case "paragraph":
		const txtArray = value.rich_text
		if(!txtArray || txtArray.length == 0){
		  return (
			<p></p>
		  )
		};
  
		if(txtArray.length > 1){
		  const mention = txtArray[0].mention
		  if(!mention) {
			return (
			  <p>
				<Text text={value.rich_text} />
			  </p>
			);
		  }
		  const pageId = mention.page.id
		  const mentinTitle = txtArray[0].plain_text
		  return (
			<p>
			  <LocaleLink href={`/news/${pageId}`}>
				{mentinTitle}
			  </LocaleLink>
			</p>
		  );
		}
		return (
		  <p>
			<Text text={value.rich_text} />
		  </p>
		);
	  case "heading_1":
		return (
		  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-700 mb-2 mt-10">
			<Text text={value.rich_text} />
		  </h1>
		);
	  case "heading_2":
		return (
		  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-700 mb-2 mt-10">
			<Text text={value.rich_text} />
		  </h2>
		);
	  case "heading_3":
		return (
		  <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-gray-700 mb-2 mt-2">
			<Text text={value.rich_text} />
		  </h3>
		);
	  case "bulleted_list": {
		return (
		  <ul className="space-y-2 text-left text-gray-500 dark:text-gray-400 p-5 mt-5 mb-5 rounded-lg bg-gray-100">
			{value.children.map((child) => renderBlock(child))}
		  </ul>
		);
	  }
	  case "numbered_list": {
		return (
		  <ol className="space-y-2 text-left text-gray-500 dark:text-gray-400 p-5 mt-5 mb-5 rounded-lg bg-gray-100">
			{value.children.map((child) => renderBlock(child))}
		  </ol>
		);
	  }
	  case "bulleted_list_item":
	  case "numbered_list_item":
		return (
		  <li key={block.id} className="flex items-center space-x-3 rtl:space-x-reverse">
			<Text text={value.rich_text} />
			{!!value.children && renderNestedList(block, genre)}
		  </li>
		);
	  case "to_do":
		return (
		  <div>
			<label htmlFor={id}>
			  <input type="checkbox" id={id} defaultChecked={value.checked} />{" "}
			  <Text text={value.rich_text} />
			</label>
		  </div>
		);
	  case "toggle":
		return (
		  <details className="hover:bg-gray-50  transition duration-200 rounded-md hover:shadow-lg">
			<summary className="py-6 px-4 text-2xl  font-semibold w-full cursor-pointer marker:text-blue-500 list-none">
			  <Text text={value.rich_text} />
			</summary>
			{block.children?.map((child) => (
			  <Fragment key={child.id}>{renderBlock(child, genre)}</Fragment>
			))}
		  </details>
		);
	  case "child_page":
		return (
		  <div className="">
			<strong>{value.title}</strong>
			{block.children.map((child) => renderBlock(child, genre))}
		  </div>
		);
	  case "image":
		const src =
		  value.type === "external" ? value.external.url : `/${ACCESABLE_BLOG_IMAGE_PATH}/${block.parent.page_id}/${block.id}${DOWNLOAD_IMAGE_EXTENSION}`;
		const caption = value.caption ? value.caption[0]?.plain_text : "";
		return (
		  <figure>
			<img src={src} alt={caption} className="h-auto max-w-full rounded-lg" style={{width : '100%'}}/>
			{caption && <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">{caption}</figcaption>}
		  </figure>
		);
	  case "divider":
		return <hr key={id} />;
	  case "quote":
		let val = ''
		value.rich_text.map(t => {
		  val += t.plain_text
		})
		return <blockquote key={id}>{val}</blockquote>;
	  case "code":
		return (
		  <pre className="font-mono">
			<code className="font-mono bg-gray-200 p-1 rounded" key={id}>
			  {value.rich_text[0].plain_text}
			</code>
		  </pre>
		);
	  case "file":
		const src_file =
		  value.type === "external" ? value.external.url : value.file.url;
		const splitSourceArray = src_file.split("/");
		const lastElementInArray = splitSourceArray[splitSourceArray.length - 1];
		const caption_file = value.caption ? value.caption[0]?.plain_text : "";
		return (
		  <figure>
			<div className="max-w-md mx-auto">
			  📎{" "}
			  <a href={src_file} passHref target="_blank">
				{lastElementInArray.split("?")[0]}
			  </a>
			</div>
			{caption_file && <figcaption>{caption_file}</figcaption>}
		  </figure>
		);
	  case "bookmark":
		const href = value.url;
		return (
		  <a href={href} target="_brank" className="">
			{href}
		  </a>
		);
	  case "table": {
		return (
		  <table className="w-full border-collapse">
			<tbody>
			  {block.children?.map((child, i) => {
				const RowElement =
				  value.has_column_header && i == 0 ? "th" : "td";
				return (
				  <tr key={child.id}>
					{child.table_row?.cells?.map((cell, i) => {
					  return (
						<RowElement key={`${cell.plain_text}-${i}`}>
						  <Text text={cell} />
						</RowElement>
					  );
					})}
				  </tr>
				);
			  })}
			</tbody>
		  </table>
		);
	  }
	  case "column_list": {
		return (
		  <div className="">
			{block.children.map((block) => renderBlock(block))}
		  </div>
		);
	  }
	  case "column": {
		return <div>{block.children.map((child) => renderBlock(child))}</div>;
	  }
	  case "embed": {
		const url = value.url;
		// twitter埋め込み
		if(url.indexOf("https://twitter.com") > -1){
		  const pos = url.indexOf('?')
		  let tweetId = url.substring(0, pos).split('/')[5]
		  if (!tweetId) {
			tweetId = url.split('/')[5]
		  }
		  return (<TwitterTweetEmbed key={id} tweetId={tweetId} options={{ margin: '0 auto;' }} />)
		}
		return (
		  <a href={url} target="_brank" className="">
			{url}
		  </a>
		);
	  }
	  default:
		return `❌ Unsupported block (${
		  type === "unsupported" ? "unsupported by Notion API" : type
		})`;
	}
  };

export default ProjectInfo;
