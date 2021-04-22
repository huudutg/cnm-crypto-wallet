import React, {useRef} from 'react'
import {Input} from 'antd'
import {SnippetsOutlined} from '@ant-design/icons'

interface CommandProps {
  title?: string
  value?: string 
}

const Command = (props: CommandProps) => {
  const ref = useRef(null)
  return(
    <div className='gr-infor'>
      <div className='gr-label'>{props.title}</div>
      <Input
        ref={ref}
        className='gr-read-input'
        suffix={
          <SnippetsOutlined 
            onClick={() => {
              (ref.current as any).select()
              document.execCommand('copy')
            }}
          />
        }
        value={props.value}
        readOnly
      />
    </div>
  )
}

export default Command