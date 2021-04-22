import React from 'react'
import { Layout, Image, Row, Col } from 'antd'

import Avatar from './avatar'

const Header = () => {
  return (
    <Layout.Header className='header'>
      <Row className='header-content' justify='space-between' align='middle'>
        <Col>
          <Row align='middle'>
            <Image src='/favicon.ico' className='header-logo' preview={false}/>
            <span className='header-title'>WearOS CL Tool</span>
          </Row>
        </Col>
        <Col>
          <Avatar/>
        </Col>
      </Row>
    </Layout.Header>
  )
}

export default Header