import client from '../src/apollo/client'
import { GET_PAGES_URI } from '../src/queries/pages/get-pages'
import { GET_PAGE } from '../src/queries/pages/get-page'
import { useRouter } from 'next/router'
import { isEmpty } from 'lodash'
import Layout from '../src/components/layouts'
import { isCustomPageUri } from '../src/utils/slug'
import { handleRedirectsAndReturnData } from '../src/utils/slug'

const Page = ({ data }) => {
  //console.log('==DATA Dymamicly==', data) //...  page: {id: 'cG9zdDoxMw==',title: 'About',content: '\n<p>About content</p>\n',slug: 'about',uri: '/about/', __typename: 'Page'}
  const router = useRouter()

  if (router.isFallback) { // якщо  fallback: true - покаже лоадінг поки сторінка не згенерується.
    return <div>Loading...</div>
  }

  // console.log('router.query?.slug', router.query?.slug) // [ 'about' ]   !!(3)!!

  return (//router.query?.slug.join('/')
  <Layout data={data}>
    <div>{data?.page?.content}</div>
  </Layout>

  )
}

export default Page

export async function getStaticProps({ params }) {// params із getStaticPaths()
  //console.log('params',params) // !!(2)!!  { slug: [ 'about' ] }
  const { data, errors } = await client.query({
    query: GET_PAGE,
    variables: {
      uri: params?.slug.join("/"),
    },
  })

  const defaultProps =  {
    props: {
      data: data || {}
    },
    //   data: {
    //     header: data?.header || [],
    //     menus: {
    //       headerMenus: data?.headerMenus?.edges || [],
    //       footerMenus: data?.footerMenus?.edges || [],
    //     },
    //     footer: data?.footer || [],
    //     page: data?.page ?? {},
    //     path: params?.slug.join('/')
    //   }
    // },
    revalidate: 1
  }

  return handleRedirectsAndReturnData( defaultProps, data, errors, 'page' )//field: 'page
}



export async function getStaticPaths() { //ми не використовуємо це самостійно, а із - це тідьки для створення шляху
  const { data } = await client.query({            //це використовується разом із getStaticProps
    query: GET_PAGES_URI
  })

  const pathsData = [] // [{"params":{"slug":["stories"]}},{"params":{"slug":["inspiration"]}},{"params":{"slug":["memories"]}},{"params":{"slug":["gallery"]}},{"params":{"slug":["special-journeys"]}},{"params":{"slug":["login"]}},{"params":{"slug":["blog"]}},{"params":{"slug":["child-two"]}},{"params":{"slug":["child-one"]}},{"params":{"slug":["privacy-policy-2"]}}]

  data?.pages?.nodes && data?.pages?.nodes.map( page => {
    if ( ! isEmpty( page?.uri ) && ! isCustomPageUri( page?.uri ) ) {//якщо не кастомна сторінка: "/"   //uri  === "/about/samplr-page/" - коли є дочірня сторінка
      const slugs = page?.uri?.split('/').filter( pageSlug => pageSlug )//["", "about", "sample-page", ""]- фільтр похбувається пустих значень
      pathsData.push( { params: { slug: slugs }} )//slug === [...slug].js 
    }//[{ params: { slug: ['foo', 'bar']}}]   //("/foo/bar")
  })

    // console.log('pathsData', JSON.stringify(pathsData))  //!!(1)!!

  return {
    paths: pathsData,
    fallback: true
  }
}

