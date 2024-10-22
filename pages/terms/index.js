import Head from "next/head";
import Layout from '../../components/layout'
import { META_ABOUT_TITLE, META_ABOUT_DESCRIPTION } from "../../const/meta";
import Prepare from "../../components/parts/prepare";

export const databaseId = process.env.NEXT_PUBLIC_NOTION_DATABASE_ID;

export default function Terms({  }) {
  return (
    <Layout>
      <Head>
        <title>{META_ABOUT_TITLE}</title>
        <meta name="description" content="TechnologyとConvenienceを組み合わせた造語。​ITがもたらす便利なものを紹介します。最近はAI関連の記事が多いです。ChatGPT / Google Bard / OpenAI GPT / Replika" />
      </Head>

      <div className="container mt-5">
        <Prepare />
      </div>
    </Layout>
  );
}