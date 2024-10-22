import React from 'react';
import Layout from "../../components/layout"
import Link from 'next/link';

const TermsOfService = () => {
    return (
        <Layout>
          <div className="container mx-auto">
            <section className="py-5 ">
			  <div className="mt-5">
                <h1 className="text-3xl font-bold mb-4 text-center">利用規約</h1>

                <p className="mb-10">
                    当サイトを利用することで、利用規約に同意したものとみなされます。
                </p>

                <h2 className="text-2xl font-bold mb-2">1. 受諾</h2>
                <p className="mb-4 pl-5">当サイトを利用することで、利用規約に同意したものとみなされます。</p>

                <h2 className="text-2xl font-bold mb-2">2. サイトの利用</h2>
                <p className="mb-4 pl-5">当サイトは、個人の利用を目的として提供されています。商業目的での使用は許可されていません。</p>

                <h2 className="text-2xl font-bold mb-2">3. 知的財産権</h2>
                <p className="mb-4 pl-5">
                    当サイトに掲載されている全てのコンテンツ、ロゴ、画像は、著作権によって保護されています。
                </p>

                <h2 className="text-2xl font-bold mb-2">4. 利用者の責任</h2>
                <p className="mb-4 pl-5">
                    利用者は、当サイトを利用する際に適用される法律を遵守する責任があります。
                </p>

                <h2 className="text-2xl font-bold mb-2">5. 免責事項</h2>
                <p className="mb-4 pl-5">
                    当サイトは、情報の正確性や完全性について保証するものではありません。
                </p>

                <h2 className="text-2xl font-bold mb-2">6. 政策の変更</h2>
                <p className="mb-4 pl-5">
                    当利用規約は随時変更されることがあります。変更があった場合、当サイト上で通知します。
                </p>

                <h2 className="text-2xl font-bold mb-2">7. お問い合わせ</h2>
                <p className="mb-4 pl-5">
                    利用規約についての質問がある場合は、お問合せページよりご連絡ください。
                    <br />
                    <br />
                    <Link href={`/contact`} className='rounded my-2 py-2 px-3 bg-blue-500 hover:bg-blue-600 text-gray-200'>お問合せページ</Link>
                </p>
            </div>
          </section>
        </div>
      </Layout>
    );
};

export default TermsOfService;
