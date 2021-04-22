import React from 'react'
import {Dropdown, Button} from 'antd'
import {EllipsisOutlined} from '@ant-design/icons'

interface DropdownMenuProps {
  overlay: React.ReactElement
}

const DropdownMenu = (props: DropdownMenuProps) => (
  <Dropdown overlay={props.overlay}>
    <Button className='bt-more'>
      <EllipsisOutlined
        style={{
          fontSize: 20,
          verticalAlign: 'top',
        }}
      />
    </Button>
  </Dropdown>
);

export default DropdownMenu