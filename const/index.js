/** ドメイン */
export const DOMAIN = 'https://duotaro.github.io'
/** baseurl */
export const BASE_URL = 'https://duotaro.github.io'
/** ジャンル */
export const GENRE_ENUM = {
    GENRE1 : 'ai', 
    GENRE2 : 'design', 
    GENRE3 : 'management', 
    GENRE4 : 'tech'
}
/** ジャンル */
export const GENRES = [GENRE_ENUM.GENRE1, GENRE_ENUM.GENRE2, GENRE_ENUM.GENRE3, GENRE_ENUM.GENRE4]
/** ジャンル一覧 メニューなどに使用 */
export const GENRE_LIST = [
    {
        name: 'Home',
        genre: '',
        url : `${DOMAIN}`,
        src: 'https://cdn-ak.f.st-hatena.com/images/fotolife/d/duo-taro100/20230501/20230501154023.jpg',
        icon: "bi bi-house-fill"
    },
    {
        name: 'AI',
        genre: GENRE_ENUM.GENRE1,
        url : `${DOMAIN}/blog/ai/list`,
        src: 'https://cdn-ak.f.st-hatena.com/images/fotolife/d/duo-taro100/20230501/20230501154023.jpg',
        icon: "bi bi-robot"
    },
    {
        name: 'デザイン',
        genre: GENRE_ENUM.GENRE2,
        url : `${DOMAIN}/blog/design/list`,
        src: 'https://cdn-ak.f.st-hatena.com/images/fotolife/d/duo-taro100/20230501/20230501153952.jpg',
        icon: "bi bi-palette"
    },
    {
        name: 'マネジメント',
        genre: GENRE_ENUM.GENRE3,
        url : `${DOMAIN}/blog/management/list`,
        src: 'https://cdn-ak.f.st-hatena.com/images/fotolife/d/duo-taro100/20230501/20230501154006.jpg',
        icon: "bi bi-alarm"
    },
    {
        name: 'Technology',
        genre: GENRE_ENUM.GENRE4,
        url : `${DOMAIN}/blog/tech/list`,
        src: 'https://cdn-ak.f.st-hatena.com/images/fotolife/d/duo-taro100/20230501/20230501155201.jpg',
        icon: "bi bi-cpu"
    }
]
/**
 * genre title map
 */
export const GENRE_TITLE_MAP = {
    'ai' : 'AI 人工知能 CHAT-GPT',
    'design' : 'CSS デザイン Bootstrap Tailwind',
    'management' : '時間管理 タスク管理 プロジェクト管理 マネジメント',
    'tech' : '最新技術 テクノロジー Technology イノベーション',
}
/** 広告ID */
export const AD_CLIENT_ID = process.env.NEXT_PUBLIC_AD_CLIENT_ID
/** 人気記事 */
export const POPULAR_LIST = [
    {
        title: 'ブログも書ける！AIを使ったライティングツールまとめ',
        url: 'https://duotaro.github.io/blog/ai/detail/8395fda2-77c3-4d23-855c-82ae6c9cf985/'
    },
    {
        title: 'シンプルなタイムトラッキングで時間とコストを削減 「Toggl Track」',
        url: 'https://duotaro.github.io/blog/management/detail/e72dfce4-ff9e-4e3e-aa30-d0d753f2a605/'
    },
    {
        title: '効率的かつ迅速、安全性も備えたWebAssembly (Wasm) とは？',
        url: 'https://duotaro.github.io/blog/tech/detail/939b6442-3356-41dd-aa80-fcc5335bbf81/'
    },
]
/** おすすめ記事 */
export const RECOMMEND_LIST = [
    {
        title: 'AIはあなたが使っているアプリにも使われている',
        url: 'https://duotaro.github.io/blog/ai/detail/8395fda2-77c3-4d23-855c-82ae6c9cf985/'
    },
    {
        title: 'シンプルなタイムトラッキングで時間とコストを削減 「Toggl Track」',
        url: 'https://duotaro.github.io/blog/management/detail/e72dfce4-ff9e-4e3e-aa30-d0d753f2a605/'
    },
    {
        title: '作業を簡単に自動化できるAI「AI Agent」がすごい',
        url: 'https://duotaro.github.io/blog/ai/detail/ade7a08a-fa2b-41d0-81cc-8b112d993813/'
    },
]