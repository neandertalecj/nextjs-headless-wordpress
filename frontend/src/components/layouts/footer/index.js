import { isArray, isEmpty } from 'lodash'
import { sanitize } from '../../../utils/miscellaneous'
import Link from 'next/link'

const Footer = ({ footer, footerMenus }) => {

  // console.log('footer.sidebarOne',footer.sidebarOne)
  console.log('footerMenus',footerMenus[0].node?.path)

  return (
    <footer class="bg-teal-500 p-6">
      <div class="flex flex-wrap -mx-1 overflow-hidden text-white">

        {/* Widget One */}
        <div class="my-1 px-1 w-full overflow-hidden sm:w-full lg:w-1/2 xl:w-1/3">
          <div dangerouslySetInnerHTML={{__html: sanitize(footer?.sidebarOne)}} />
        </div>

        {/* Widget Two */}
        <div class="my-1 px-1 w-full overflow-hidden sm:w-full lg:w-1/2 xl:w-1/3">
          <div dangerouslySetInnerHTML={{__html: sanitize(footer?.sidebarTwo)}} />
        </div>

        {/* Footer Menus */}
        <div class="my-1 px-1 w-full overflow-hidden sm:w-full lg:w-1/2 xl:w-1/3">
          {!isEmpty( footerMenus ) && isArray(footerMenus) ? (
            <ul>
              { footerMenus.map( footerMenu => (
                <li key={footerMenu?.node?.id}>
                  <Link href={footerMenu?.node?.path}>
                    <a>
                      {footerMenu?.node?.label}
                    </a>
                  </Link>
                </li>
              ) ) }
            </ul>
          ) : null}
        </div>
      </div>
      {/*Copyright Text*/}
      <div className="mb-8 mt-8 w-full flex flex-wrap">
        <div className="w-full md:w-1/2 lg:w-1/4 text-white">{footer?.copyrightText ? footer.copyrightText : '© Codeytek Academy 2020'}</div>
        <div className="w-full lg:w-3/4 flex justify-end">
          
        </div>
      </div>
    </footer>
  )
}

export default Footer
