import React, { useState } from 'react'
import Modal from 'react-modal'
import './modal.scss'
import { FILE_TYPES } from '../consts'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

export const Popup = ({ files, onSave }) => {
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
  const [modalIsOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [type, setType] = useState(FILE_TYPES['folder'])

  const handleSaveButton = () => {
    if (name.length) {
      let selectedFolder = findObjectByID(files, 1)

      onSave(selectedFolder, {
        id: +new Date(),
        title: name,
        type
      })

      closeModal()
    }
  }

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  const inputFields =
    type === FILE_TYPES['file'] ? (
      <FileFields name={name} setName={setName} />
    ) : (
      <FolderFields name={name} setName={setName} />
    )

  return (
    <div>
      <button onClick={openModal}>Add file/folder</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="modal-body">
          <div>
            Add File/Folder
            <hr style={{ border: '1px solid black' }} />
          </div>{' '}
          <br />
          <div>
            <label>
              <input
                style={{ marginLeft: '30px' }}
                type="radio"
                name="type"
                onChange={e => setType(e.target.value)}
                value={FILE_TYPES['file']}
              />{' '}
              File
            </label>
            <label>
              <input
                style={{ marginLeft: '120px' }}
                type="radio"
                name="type"
                onChange={e => setType(e.target.value)}
                value={FILE_TYPES['folder']}
              />{' '}
              Folder
            </label>{' '}
            <br /> <br />
          </div>
          {inputFields}
          <div style={{ marginLeft: '30px' }}>
            <button onClick={handleSaveButton}>Save</button>
            <button onClick={closeModal} style={{ marginLeft: '30px' }}>
              Close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

const FileFields = ({ setName, name }) => (
  <div>
    <select style={{ marginLeft: '30px' }}>
      <option value="">Choose folder</option>
      <option value="1">root</option>
    </select>
    <br /> <br />
    <input
      style={{ marginLeft: '30px' }}
      type="text"
      value={name}
      onChange={e => setName(e.target.value)}
      placeholder="Enter file name"
    />
    <select name="" id="">
      <option value="">pdf</option>
      <option value="">jpg</option>
    </select>{' '}
    <br /> <br /> <br />
  </div>
)

const FolderFields = ({ name, setName }) => (
  <div>
    <select style={{ marginLeft: '30px' }}>
      <option value="">Choose folder</option>
      <option value="1">root</option>
    </select>
    <br /> <br />
    <input
      style={{ marginLeft: '30px' }}
      type="text"
      value={name}
      onChange={e => setName(e.target.value)}
      placeholder="Enter folder name"
    />
    <br /> <br /> <br />
  </div>
)
