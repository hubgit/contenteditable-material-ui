import React from 'react'
import { exec, state } from './commands'

export default [
  {
    key: 'italic',
    group: 'format',
    icon: 'format_italic',
    title: 'Italic',
    state: () => state('italic'),
    result: () => exec('italic'),
  },
  {
    key: 'bold',
    group: 'format',
    icon: 'format_bold',
    title: 'Bold',
    state: containers =>
      state('bold') && !containers['H1'] && !containers['H2'],
    result: () => exec('bold'),
  },
  // {
  //   key: 'underline',
  //   group: 'format',
  //   icon: 'format_underline',
  //   title: 'Underline',
  //   state: containers => state('underline') && !containers['A'],
  //   result: () => exec('underline')
  // },
  // {
  //   key: 'strikethrough',
  //   group: 'format',
  //   icon: 'format_strikethrough',
  //   title: 'Strike-through',
  //   state: () => state('strikeThrough'),
  //   result: () => exec('strikeThrough')
  // },
  {
    key: 'superscript',
    group: 'format',
    icon: (
      <span>
        x<sup>2</sup>
      </span>
    ),
    title: 'Superscript',
    state: () => state('superscript'),
    result: () => exec('superscript'),
  },
  {
    key: 'subscript',
    group: 'format',
    icon: (
      <span>
        x<sub>2</sub>
      </span>
    ),
    title: 'Subscript',
    state: () => state('subscript'),
    result: () => exec('subscript'),
  },
  {
    key: 'title',
    group: 'block',
    // icon: <b>H<sub>1</sub></b>,
    title: 'Title',
    state: containers => containers['H1'],
    result: () => exec('formatBlock', '<H1>'),
  },
  {
    key: 'heading',
    group: 'block',
    // icon: <b>H<sub>2</sub></b>,
    title: 'Heading',
    state: containers => containers['H2'],
    result: () => exec('formatBlock', '<H2>'),
  },
  {
    key: 'paragraph',
    group: 'block',
    // icon: '¶',
    title: 'Paragraph',
    state: containers => containers['P'],
    result: () => exec('formatBlock', '<P>'),
  },
  {
    key: 'quote',
    group: 'block',
    // icon: 'format_quote',
    title: 'Quote',
    state: containers => containers['BLOCKQUOTE'],
    result: () => exec('formatBlock', '<BLOCKQUOTE>'),
  },
  {
    key: 'code',
    group: 'block',
    // icon: 'code',
    title: 'Code',
    state: containers => containers['PRE'],
    result: () => exec('formatBlock', '<PRE>'),
  },
  {
    key: 'olist',
    group: 'insert',
    icon: 'format_list_numbered',
    title: 'Ordered List',
    state: containers => containers['OL'],
    result: () => exec('insertOrderedList'),
  },
  {
    key: 'ulist',
    group: 'insert',
    icon: 'format_list_bulleted',
    title: 'Unordered List',
    state: containers => containers['UL'],
    result: () => exec('insertUnorderedList'),
  },
  {
    key: 'link',
    group: 'insert',
    icon: 'insert_link',
    title: 'Link',
    state: containers => containers['A'],
    result: () => {
      const url = window.prompt('Enter the link URL')
      if (url) exec('createLink', url)
    },
  },
  {
    key: 'image',
    group: 'insert',
    icon: 'add_a_photo',
    title: 'Image',
    state: containers => containers['IMG'],
    result: () => {
      // TODO: figure
      const url = window.prompt('Enter the image URL')
      // if (url) exec('insertImage', url)
      if (url)
        exec(
          'insertHTML',
          `
            <figure>
                <img src="${url}">
                <figcaption>
                  <p>Caption</p>
                </figcaption>
            </figure>
          `
        )
    },
  },
]
