import Head from 'next/head'
import Image from 'next/image'
import client from '../src/apollo/client'
import Layout from '../src/components/layouts'
// import { GET_MENUS } from '../src/queries/get-menus'
import {GET_PAGE} from '../src/queries/pages/get-page'
import { handleRedirectsAndReturnData } from '../src/utils/slug'

export default function Index({ data }) {
  // console.log('---DATA---', data)
  return (
    <div>
      <Layout data={data}>
        content
      </Layout>
    </div>
  )
}

export async function getStaticProps() {
  
  const { data, errors } = await client.query({
    query: GET_PAGE,
		variables: {
			uri: '/', //!! це вкаже в квері шлях!!!
		},
  })

  const defaultProps =  {
    props: {
      data: data || {},
    },
    revalidate: 1,
  }

  return handleRedirectsAndReturnData( defaultProps, data, errors, 'page' )//field: 'page
}


// data: {
//   header: data?.header || [],
//   menus: {
//     headerMenus: data?.headerMenus?.edges || [],
//     footerMenus: data?.footerMenus?.edges || [],
//   },
//   footer: data?.footer || [],
//   page: data?.page || [],  //відсутні дані
// }