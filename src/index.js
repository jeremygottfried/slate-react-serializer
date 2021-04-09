import React from 'react'
import { Text } from 'slate'
import ReactDOMServer from 'react-dom/server'

export default function getSerializer({
  customTypes = {},
  markDownSerializer,
  useDefaults = true,
  disables = [],
  returnHTML = false
} = {}) {
  // HANDLE DIFFERENT SLATE TYPES
  const defaultTypes = useDefaults
    ? {
        div: ({ children }) => <div>{children}</div>,
        quote: ({ childen }) => (
          <blockquote>
            <p>{children}</p>
          </blockquote>
        ),
        'block-quote': ({ children }) => (
          <blockquote>
            <p>{children}</p>
          </blockquote>
        ),
        paragraph: ({ children }) => <p>{children}</p>,
        link: ({ children, url }) => <a href={url}>{children}</a>,
        'bulleted-list': ({ children }) => <ul>{children}</ul>,
        'heading-one': ({ children }) => <h1>{children}</h1>,
        'heading-two': ({ children }) => <h2>{children}</h2>,
        'heading-three': ({ children }) => <h3>{children}</h3>,
        'heading-four': ({ children }) => <h4>{children}</h4>,
        'heading-five': ({ children }) => <h5>{children}</h5>,
        'heading-six': ({ children }) => <h6>{children}</h6>,
        'list-item': ({ children }) => <li>{children}</li>,
        'check-list-item': ({ children, checked }) => (
          <div>
            <input type='checkbox' name='list-item' checked={checked} />
            <label htmlFor='list-item'>{children}</label>
          </div>
        ),
        'numbered-list': ({ children }) => <ol>{children}</ol>,
        q: ({ childen }) => (
          <blockquote>
            <p>{children}</p>
          </blockquote>
        ),
        p: ({ children }) => <p>{children}</p>,
        a: ({ children, url }) => <a href={url}>{children}</a>,
        ul: ({ children }) => <ul>{children}</ul>,
        h1: ({ children }) => <h1>{children}</h1>,
        h2: ({ children }) => <h2>{children}</h2>,
        h3: ({ children }) => <h3>{children}</h3>,
        h4: ({ children }) => <h4>{children}</h4>,
        h5: ({ children }) => <h5>{children}</h5>,
        h6: ({ children }) => <h6>{children}</h6>,
        li: ({ children }) => <li>{children}</li>,
        ol: ({ children }) => <ol>{children}</ol>,
        ...customTypes
      }
    : {}

  const disableTypes = disables.reduce((acc, key) => {
    acc[key] = ({ children }) => children
    return acc
  }, {})

  const types = {
    ...defaultTypes,
    ...disableTypes,
    ...customTypes
  }

  const serialize = (node) => {
    if (!node) return node
    // ADD STYLES TO TEXT
    if (Text.isText(node) || !!node.text) {
      let { text: stylizedText, bold, code, italic, underline } = node
      if (markDownSerializer) {
        // PROCESS TEXT WITH MARKDOWN
        stylizedText = markDownSerializer(stylizedText)
      }
      if (bold && !disables.includes('bold')) {
        stylizedText = <strong>{stylizedText}</strong>
      }
      if (code && !disables.includes('code')) {
        stylizedText = <code>{stylizedText}</code>
      }
      if (italic && !disables.includes('italic')) {
        stylizedText = <em>{stylizedText}</em>
      }
      if (underline && !disables.includes('underline')) {
        stylizedText = <u>{stylizedText}</u>
      }
      return stylizedText
    }

    // IF ARRAY, SERIALIZE EACH
    if (Array.isArray(node)) {
      return <React.Fragment>{node.map((n) => serialize(n))}</React.Fragment>
    }

    // GET SERIALIZED CHILDREN
    const children = node.children ? node.children.map((n) => serialize(n)) : ''

    // WRAP CHILDREN IN CURRENT NODE
    if (types[node.type]) {
      return types[node.type]({ ...node, children })
    } else {
      return children
    }
  }

  return returnHTML
    ? (value) => {
        const reactCode = serialize(value)
        return ReactDOMServer.renderToStaticMarkup(reactCode)
      }
    : serialize
}
