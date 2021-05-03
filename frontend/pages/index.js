import Head from 'next/head'
import Image from 'next/image'
import client from '../src/apollo/client'
import Layout from '../src/components/layouts'
import { GET_MENUS } from '../src/queries/get-menus'

export default function Index({ data }) {
  console.log('---DATA---', data)
  return (
    <div>
      {/* <h3 className="text-lg leading-6 font-medium text-grey-900">
        Aplicant information
      </h3> */}
      <Layout data={data}>
        content
      </Layout>
    </div>
  )
}

export async function getStaticProps(context) {
  const { data, loading, networkStatus } = await client.query({
    query: GET_MENUS
  })
  return {
    props: {
      data: {
        header: data?.header || [],
        menus: {
          headerMenus: data?.headerMenus?.edges || [],
          footerMenus: data?.footerMenus?.edges || [],
        },
        footer: data?.footer || [],
      }
    },
    revalidate: 1
  }
}