import React from 'react'
import { Flex } from "@aircall/tractor";
import Footer from "../components/Footer/Footer";


interface Props {
  children: React.ReactNode
}

export class DashboardLayout extends React.Component<Props> {

  render() {

    const {children} = this.props

    return (
        <Flex alignItems="middle"  className={"w-full xs:width-auto"} justifyContent="center" flexDirection="column" height={"100%"}
              >
          {/* Container */}
          <Flex flexGrow={1} justifyContent="center" >
            {children}
          </Flex>
          <Footer/>
        </Flex>
    )
  }

}
