import React from 'react';
import Layout from "../../components/layout"
import Link from 'next/link';
const PrivacyPolicy = () => {
    return (
        <Layout>
          <div className="container mx-auto">
            <section className="py-5 ">
			  <div className="mt-5 ">
                <h1 className="text-3xl font-bold mb-4 text-center">プライバシーポリシー</h1>

                <p className="mb-10 ">
                    このプライバシーポリシーでは、当サイトでどのような情報を収集し、どのように使用するかについて説明します。
                </p>
                <section>
                    <h2 className="text-2xl font-bold mb-2">1. 情報の収集</h2>
                    <p className="mb-4 pl-5">当サイトでは、以下の情報を収集することがあります。</p>
                    <ul className="list-disc list-inside mb-4 pl-5">
                        <li>名前</li>
                        <li>メールアドレス</li>
                        <li>クッキーやトラッキング技術による情報</li>
                    </ul>
                </section>
                <section>
                <h2 className="text-2xl font-bold mb-2">2. 情報の利用目的</h2>
                <p className="mb-4 pl-5">収集した情報は、以下の目的で使用します。</p>
                <ul className="list-disc list-inside mb-4 pl-5">
                    <li>サービスの提供</li>
                    <li>お問い合わせへの対応</li>
                    <li>サイトの改善</li>
                </ul>
                </section>
                <section>
                <h2 className="text-2xl font-bold mb-2">3. 情報の共有</h2>
                <p className="mb-4 pl-5">
                    収集した情報を第三者と共有することはありません。ただし、法的義務がある場合や、サービスプロバイダーと共有することがあります。
                </p>
                </section>
                <section>
                <h2 className="text-2xl font-bold mb-2">4. データの保護</h2>
                <p className="mb-4 pl-5">
                    収集した情報は安全に保護し、不正アクセスから守ります。
                </p>
                </section>
                <section>
                <h2 className="text-2xl font-bold mb-2">5. ユーザーの権利</h2>
                <p className="mb-4 pl-5">
                    あなたは自分の情報にアクセス、修正、削除する権利があります。
                </p>
                </section>
                <section>
                <h2 className="text-2xl font-bold mb-2">6. クッキー</h2>
                <p className="mb-4 pl-5">
                    当サイトではクッキーを使用して、ユーザー体験を向上させています。
                </p>
                </section>
                <section>
                <h2 className="text-2xl font-bold mb-2">7. プライバシーポリシーの変更</h2>
                <p className="mb-4 pl-5">
                    本ポリシーは随時変更されることがあります。変更があった場合、当サイト上で通知します。
                </p>
                </section>
                <section>
                <h2 className="text-2xl font-bold mb-2">8. お問い合わせ</h2>
                <p className="mb-4 pl-5">
                    プライバシーポリシーについての質問がある場合は、お問合せページよりご連絡ください。
                    <br />
                    <Link href={`/contact`} className='rounded my-2 py-2 px-3 bg-blue-500 hover:bg-blue-600 text-gray-200'>お問合せページ</Link>
                </p>
                </section>
            </div>
          </section>
        </div>
      </Layout>
    );
};

export default PrivacyPolicy;
