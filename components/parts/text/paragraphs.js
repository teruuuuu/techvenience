export default function Paragraphs({ text, maxWidth = "ml", addClass = "", mt = "mt-4" }) {
    if(!text){
        return <></>
    }

    const classname = `max-w-${maxWidth} ${mt} text-md font-light leading-relaxed text-ternary-dark dark:text-ternary-light ${addClass} `

    const isArray = Array.isArray(text);

    const whiteSpaceStyle = isArray ? { whiteSpace: 'pre-wrap', overflowWeap: 'break-word', wordBreak: 'break-all' } : {}
    return (
      <div className={classname} style={whiteSpaceStyle}>
        {isArray && (
            <Text text={text} />
        )}
        {!isArray && (
          <>{text}</>  
        )}
      </div>
    );
}



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
        {text.link ? <Link className="text-black hover:text-blue-500 underline hover:no-underline transition duration-300" href={text.link.url}>{text.content}</Link> : text.content}
      </span>
    );
  });
};
