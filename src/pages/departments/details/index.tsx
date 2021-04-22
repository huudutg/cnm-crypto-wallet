import React, { useEffect, useState } from 'react'
import {Layout, PageHeader, Card, Row, Col, Input, Button} from 'antd'
import {Router} from 'next/dist/client/router'

import BreadcrumbRender from 'src/components/breadcrumbRender'
import Command from 'src/components/command'
import IncludedGroup from 'src/components/includedGroups'


interface DepartmentProps {
  router: Router
  setActiveTab: Function
}

const Detail = (props: DepartmentProps) => {
  const [id, setID] = useState<string>('')

  useEffect(() => {
    setID(props.router.query?.id?.toString() || '')
    props.setActiveTab('departments')
  }, [props.router.query])

  return(
    <Layout>
      <PageHeader
        title='Department A'
        className='layout-header'
        onBack={() => window.history.back()}
        breadcrumb={{
          routes: [{
            path: '/departments',
            breadcrumbName: 'Department',
          }, {
            path: '/',
            breadcrumbName: 'Detail',
          },
          ]
        }}
        breadcrumbRender={BreadcrumbRender}
        extra={[
          <Button type='primary' key='btn-save'>SAVE CHANGES</Button>,
        ]}
      />
      <Layout.Content className='layout-content'>
        <Row gutter={[0, 21]}>
          <Col span={24}>
            <Card title='General'>
              <Row gutter={[14, 21]}>
                <Col xs={12} md={12} sm={24}>
                  <Command title='Department UUID' value='60053d37dae6177d14109247'/>
                </Col>
                <Col xs={12} md={12} sm={24}>
                  <p>Owner</p>
                  <Input value='Department A' readOnly/>
                </Col>
                <Col xs={12} md={12} sm={24}>
                  <p>Department Name</p>
                  <Input value='Department A'/>
                </Col>
                <Col xs={12} md={12} sm={24}>
                  <p>Department Description</p>
                  <Input.TextArea value='Gerrit site Administrators' rows={4}/>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={24}>
            {/* <IncludedGroup /> */}
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  )
}

export default Detail
