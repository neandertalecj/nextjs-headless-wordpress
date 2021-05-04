import { gql } from "@apollo/client"


/** 
* Get Pages
*
*/


export const GET_PAGES_URI = gql`
  query MyQuery {
    pages {
      nodes {
        id
        uri
      }
    }
  }
`