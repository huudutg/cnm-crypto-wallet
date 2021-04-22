import React from 'react'
import DefaultErrorPage from 'next/error'
import {Layout} from 'antd'

const PageNotFound = () => {
  return(
    <Layout>
      <Layout.Header style={{backgroundColor: 'white'}}>
      </Layout.Header>
      <Layout.Content className=''>
        <DefaultErrorPage statusCode={404}/>
      </Layout.Content>
    </Layout>
  )
}

export default PageNotFound