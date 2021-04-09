# slate-react-serializer

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/slate-react-serializer.svg)](https://www.npmjs.com/package/slate-react-serializer) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save slate-react-serializer
```

## Usage

```jsx
import React, { Component } from 'react'

import getSerializer from 'slate-react-serializer';

const serializer = getSerializer();

class Example extends Component {
  render() {
    return serializer(this.props.slateValue)
  }
}
```

By default, will serialize:
- div
- quote
- 'block-quote'
- paragraph
- link
- 'bulleted-list'
- 'heading-one'
- 'heading-two'
- 'heading-three'
- 'heading-four'
- 'heading-five'
- 'heading-six'
- 'list-item'
- 'check-list-item'
- 'numbered-list'
- q
- p
- a
- ul
- h1
- h2
- h3
- h4
- h5
- h6
- li
- ol

### Add custom serializer or override default
```jsx
const Embeds = () => {
  const value = [{"type":"paragraph","children":[{"text":"In addition to simple image nodes, you can actually create complex embedded nodes. For example, this one contains an input element that lets you change the video being rendered!"}]},{"type":"video","url":"https://player.vimeo.com/video/26689853","children":[{"text":""}]},{"type":"paragraph","children":[{"text":"Try it out! This editor is built to handle Vimeo embeds, but you could handle any type."}]}]
  const customTypes = {
    video: ({ url }) => (
      <div style={{ padding: '50% 0px 0px', position: 'relative' }}>
        <iframe src={url} style={{ position: 'absolute', top: '0px', left: '0px', width: '100%', height: '100%' }} />
      </div>
    )
  }
  const serializer = getSerializer({ customTypes });

  return serializer(value);
}
```

### Output html string instead of react code
```jsx
const ReturnHTML = () => {
  const value = [{"type":"paragraph","children":[{"text":"This is editable "},{"text":"rich","bold":true},{"text":" text, "},{"text":"much","italic":true},{"text":" better than a "},{"text":"<textarea>","code":true},{"text":"!"}]},{"type":"paragraph","children":[{"text":"Since it's rich text, you can do things like turn a selection of text "},{"text":"bold","bold":true},{"text":", or add a semantically rendered block quote in the middle of the page, like this:"}]},{"type":"block-quote","children":[{"text":"A wise quote."}]},{"type":"paragraph","children":[{"text":"Try it out for yourself!"}]}];

  const serializer = getSerializer({ returnHTML: true, });

  return serializer(value);
}
```

### Disable defaults
```jsx
const Disables = () => {
  const value = [{"type":"paragraph","children":[{"text":"This is editable "},{"text":"rich","bold":true},{"text":" text, "},{"text":"much","italic":true},{"text":" better than a "},{"text":"<textarea>","code":true},{"text":"!"}]},{"type":"paragraph","children":[{"text":"Since it's rich text, you can do things like turn a selection of text "},{"text":"bold","bold":true},{"text":", or add a semantically rendered block quote in the middle of the page, like this:"}]},{"type":"block-quote","children":[{"text":"A wise quote."}]},{"type":"paragraph","children":[{"text":"Try it out for yourself!"}]}];

  const serializer = getSerializer({ disables: ['bold', 'block-quote']});

  return serializer(value);
}
```

### Add a markdown serializer
```jsx
const Markdown = () => {
  const value = [{"type":"paragraph","children":[{"text":"Slate is flexible enough to add **decorations** that can format text based on its content. For example, this editor has **Markdown** preview decorations on it, to make it _dead_ simple to make an editor with built-in Markdown previewing."}]},{"type":"paragraph","children":[{"text":"## Try it out!"}]},{"type":"paragraph","children":[{"text":"Try it out for yourself!"}]}]

  const markDownSerializer = (text) => processText(text) // PROCESS MARKDOWN TEXT;

  const serializer = getSerializer({ markDownSerializer });

  return serializer(value);
}
```


## License

MIT © [jeremygottfried](https://github.com/jeremygottfried)
