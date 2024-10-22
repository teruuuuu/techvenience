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

/** 広告ID */
export const AD_CLIENT_ID = process.env.NEXT_PUBLIC_AD_CLIENT_ID


export const DOWNLOAD_IMAGE_PATH = 'public/images/download'
export const ACCESABLE_IMAGE_PATH = 'images/download'
export const DOWNLOAD_BLOG_IMAGE_PATH = 'public/images/download/blogDetail'
export const ACCESABLE_BLOG_IMAGE_PATH = 'images/download/blogDetail'