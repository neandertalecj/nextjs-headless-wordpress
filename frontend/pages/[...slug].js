import client from '../src/apollo/client'
import { GET_PAGES_URI } from '../src/queries/pages/get-pages'
import { GET_PAGE } from '../src/queries/pages/get-page'
import { useRouter } from 'next/router'
import { isEmpty } from 'lodash'

const Pages = ({ data }) => {
  console.log('==DATA Dymamicly==', data)
  const router = useRouter()

  if (router.isFallback) { // якщо  fallback: true - покаже лоадінг поки сторінка не згенерується.
    return <div>Loading...</div>
  }

  return router.query?.slug.join('/')
}

export default Pages

export async function getStaticProps({ params }) {// params із getStaticPaths()
  const { data, errors } = await client.query({
    query: GET_PAGE,
    variables: {
      uri: params?.slug.join("/"),
    },
  })

  const defaultProps = {
    props: {
      data:  data || {}
    },
    /**
     * Revalidate means that if a new request comes to server, then every 1 sec it will check
     * if the data is changed, if it is changed then it will update the
     * static file inside .next folder with the new data, so that any 'SUBSEQUENT' requests should have updated data.
     */
    revalidate: 1,
  }

  return {
    props: {
      data: {
        header: data?.header || [],
        menus: {
          headerMenus: data?.headerMenus?.edges || [],
          footerMenus: data?.footerMenus?.edges || [],
        },
        footer: data?.footer || [],
        page: data?. page ?? {},
        path: params?.slug.join('/')
      }
    },
    revalidate: 1
  }
}



export async function getStaticPaths() { //ми не використовуємо це самостійно, а із - це тідьки для створення шляху
  const { data } = await client.query({            //це використовується разом із getStaticProps
    query: GET_PAGES_URI
  })

  const pathsData = []

  data?.pages?.nodes && data?.pages?.nodes.map( page => {
    if ( ! isEmpty( page?.uri ) ) {   //uri  === "/about/samplr-page/" - коли є дочірня сторінка
      const slugs = page?.uri?.split('/').filter( pageSlug => pageSlug )//["", "about", "sample-page", ""]- фільтр похбувається пустих значень
      pathsData.push( { params: { slug: slugs }} )//slug === [...slug].js 
    }//[{ params: { slug: ['foo', 'bar']}}]   //("/foo/bar")
  })

  return {
      paths: pathsData,
      fallback: true
  }
}

