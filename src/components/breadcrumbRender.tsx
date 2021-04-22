import React from 'react'
import Link from 'next/link'
import {PageHeaderProps, Breadcrumb} from 'antd'

const BreadcrumbRender = (props: PageHeaderProps, _: React.ReactNode) => {
  return(
    <Breadcrumb>
      {props.breadcrumb?.routes?.map((el, index) => (
        <Breadcrumb.Item key={index}>
          <Link href={el.path}>
            <a>{el.breadcrumbName}</a>
          </Link>
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  )
}

export default BreadcrumbRender