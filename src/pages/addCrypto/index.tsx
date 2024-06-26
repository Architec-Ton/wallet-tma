import { Outlet } from "react-router-dom"
import Page from "../../components/containers/Page"

import "./index.css"

const AddCrypto = () => {
  return (
    <Page>
      <Outlet />
    </Page>
  )
}

export default AddCrypto