import { ParentNode } from './components/parentNode'
import './style.scss'
import { Popup } from './components/Modal'
import { useState } from 'react'
import { files } from './data'

function App() {
  const findObjectByID = (files, id) => {
    if (files.id === id) {
      return files
    } else if (files.children != null) {
      let i
      let result = null
      for (i = 0; result == null && i < files.children.length; i++) {
        result = findObjectByID(files.children[i], id)
      }
      return result
    }
    return null
  }
  const [data, setData] = useState(files)

  const onSave = (folder, obj) => {
    let el = findObjectByID(files, folder.id)

    el.children = Reflect.has(el, 'children') ? [...el.children, obj] : [obj]

    let newFiles = { ...files, ...el.children }
    setData(newFiles)
  }

  return (
    <div className="tree">
      <Popup files={data} onSave={onSave} />
      <ul>
        <ParentNode
          key={files.id}
          id={files.id}
          title={files.title}
          type={files.type}
          children={files.children}
        />
      </ul>
    </div>
  )
}

export default App
