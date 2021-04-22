import React, {useEffect} from 'react'
import {Layout, PageHeader} from 'antd'

const Settings =  ({setActiveTab} : {setActiveTab : Function}) => {
  useEffect(() => {
    setActiveTab('settings')
  }, [])

  return(
    <Layout>
      <PageHeader
        title="Settings Board"
        className='layout-header'
        onBack={() => window.history.back()}
        breadcrumb={{routes: [{
          path: 'index',
          breadcrumbName: 'Settings',
        }]}}
      />
      <Layout.Content className=''>
        
      </Layout.Content>
    </Layout>
  )
}

export default Settings