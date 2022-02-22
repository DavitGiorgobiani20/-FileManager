import { FILE_TYPES } from '../consts'

export const files = {
  id: 1,
  title: 'root',
  type: FILE_TYPES['folder'],
  children: [
    {
      id: 2,
      title: 'pdfs',
      type: FILE_TYPES['folder'],
      children: [
        { id: 3, title: 'doc.pdf', type: FILE_TYPES['file'] },
        { id: 4, title: 'file.pdf', type: FILE_TYPES['file'] }
      ]
    },
    { id: 5, title: 'photo.jpg', type: FILE_TYPES['file'] }
  ]
}
