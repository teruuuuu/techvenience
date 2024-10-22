import Link from "next/link";

function CustomLink({ href, title }) {
	return <Link href={href} className="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline">{title}</Link>;
}

export default CustomLink;
