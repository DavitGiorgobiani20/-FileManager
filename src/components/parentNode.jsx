import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFile,
  faFolder,
  faFolderOpen
} from '@fortawesome/free-solid-svg-icons'
import { FILE_TYPES } from '../consts'

export const ParentNode = ({ id, title, children = null, type }) => {
  const [isOpen, setIsOpen] = useState(true)
  return (
    <li key={id}>
      {type === FILE_TYPES['file'] ? (
        <FontAwesomeIcon icon={faFile} />
      ) : isOpen ? (
        <FontAwesomeIcon
          style={{ cursor: 'pointer' }}
          onClick={() => setIsOpen(isOpen => !isOpen)}
          icon={faFolderOpen}
        />
      ) : (
        <FontAwesomeIcon
          style={{ cursor: 'pointer' }}
          onClick={() => setIsOpen(isOpen => !isOpen)}
          icon={faFolder}
        />
      )}{' '}
      {title}
      {children && isOpen && (
        <ul>
          {children.map(({ id, title, type, children }) => (
            <ParentNode
              key={id}
              title={title}
              children={children}
              type={type}
            />
          ))}
        </ul>
      )}
    </li>
  )
}
