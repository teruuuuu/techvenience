import Link from "next/link";

export default function Title({ title, link = null, fontSize = "text-xl  sm:text-2xl lg:text-3xl" }) {
    
    return (
      <h2 className={`font-black text-center ${fontSize}`}>
          {link && (
            <Link href={link}>{title}</Link>
          )}
          {!link && (
            <>{title}</>
          )}
      </h2>
    );
}
