import React from 'react'


interface Props {
  children: React.ReactNode
}

export class Layout extends React.Component<Props> {

  render() {

    const {children} = this.props

    return (
        <div className={"main"}>
          <div className={"sidebar"}>
          </div>
          <div> {children}</div>
        </div>
    )
  }

}
