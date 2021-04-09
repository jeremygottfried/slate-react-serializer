import React from 'react'

import getSerializer from 'slate-react-serializer'

const RichText = () => {
  const value = [{"type":"paragraph","children":[{"text":"This is editable "},{"text":"rich","bold":true},{"text":" text, "},{"text":"much","italic":true},{"text":" better than a "},{"text":"<textarea>","code":true},{"text":"!"}]},{"type":"paragraph","children":[{"text":"Since it's rich text, you can do things like turn a selection of text "},{"text":"bold","bold":true},{"text":", or add a semantically rendered block quote in the middle of the page, like this:"}]},{"type":"block-quote","children":[{"text":"A wise quote."}]},{"type":"paragraph","children":[{"text":"Try it out for yourself!"}]}];

  const serializer = getSerializer();

  return serializer(value);
}

const Checklists = () => {
  const value = [{"type":"paragraph","children":[{"text":"With Slate you can build complex block types that have their own embedded content and behaviors, like rendering checkboxes inside check list items!"}]},{"type":"check-list-item","checked":true,"children":[{"text":"Slide to the left."}]},{"type":"check-list-item","checked":true,"children":[{"text":"Slide to the right."}]},{"type":"check-list-item","checked":false,"children":[{"text":"Criss-cross."}]},{"type":"check-list-item","checked":true,"children":[{"text":"Criss-cross!"}]},{"type":"check-list-item","checked":false,"children":[{"text":"Cha cha real smooth…"}]},{"type":"check-list-item","checked":false,"children":[{"text":"Let's go to work!"}]},{"type":"paragraph","children":[{"text":"Try it out for yourself!"}]}]

  const serializer = getSerializer();

  return serializer(value);

}

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

const OverrideDefaults = () => {
  const value = [{"type":"paragraph","children":[{"text":"This is editable "},{"text":"rich","bold":true},{"text":" text, "},{"text":"much","italic":true},{"text":" better than a "},{"text":"<textarea>","code":true},{"text":"!"}]},{"type":"paragraph","children":[{"text":"Since it's rich text, you can do things like turn a selection of text "},{"text":"bold","bold":true},{"text":", or add a semantically rendered link in the middle of the page, like this:"}]},{"type":"link","url":"https://en.wikipedia.org/wiki/Hypertext","children":[{"text":"Override link html"}]},{"type":"paragraph","children":[{"text":"Try it out for yourself!"}]}];
  const customTypes = {
    bold: ({ children }) => <span style={{ fontWeight: 700 }}>{children}</span>,
    link: ({ children }) => <button>{children}</button>
  }
  const serializer = getSerializer({ customTypes });

  return serializer(value);
}

const Images = () => {
  const value = [{"type":"paragraph","children":[{"text":"In addition to nodes that contain editable text, you can also create other types of nodes, like images or videos."}]},{"type":"image","url":"https://source.unsplash.com/kFrdX5IeQzI","children":[{"text":""}]},{"type":"paragraph","children":[{"text":"This example shows images in action. It features two ways to add images. You can either add an image via the toolbar icon above, or if you want in on a little secret, copy an image URL to your keyboard and paste it anywhere in the editor!"}]}]

  const customTypes = {
    image: ({ url }) => <iframe src={url} style={{ width: '100%', height: 'auto' }} />
  }

  const serializer = getSerializer({ customTypes });

  return serializer(value);
}

const Links = () => {
  const value = [{"type":"paragraph","children":[{"text":"In addition to block nodes, you can create inline nodes, like "},{"type":"link","url":"https://en.wikipedia.org/wiki/Hypertext","children":[{"text":"hyperlinks"}]},{"text":"!"}]},{"type":"paragraph","children":[{"text":"This example shows hyperlinks in action. It features two ways to add links. You can either add a link via the toolbar icon above, or if you want in on a little secret, copy a URL to your keyboard and paste it while a range of text is selected."}]}]

  const serializer = getSerializer();

  return serializer(value);
}

const Markdown = () => {
  const value = [{"type":"paragraph","children":[{"text":"Slate is flexible enough to add **decorations** that can format text based on its content. For example, this editor has **Markdown** preview decorations on it, to make it _dead_ simple to make an editor with built-in Markdown previewing."}]},{"type":"paragraph","children":[{"text":"## Try it out!"}]},{"type":"paragraph","children":[{"text":"Try it out for yourself!"}]}]

  const markDownSerializer = (text) => text // PROCESS MARKDOWN TEXT;

  const serializer = getSerializer({ markDownSerializer });

  return serializer(value);
}

const Disables = () => {
  const value = [{"type":"paragraph","children":[{"text":"This is editable "},{"text":"rich","bold":true},{"text":" text, "},{"text":"much","italic":true},{"text":" better than a "},{"text":"<textarea>","code":true},{"text":"!"}]},{"type":"paragraph","children":[{"text":"Since it's rich text, you can do things like turn a selection of text "},{"text":"bold","bold":true},{"text":", or add a semantically rendered block quote in the middle of the page, like this:"}]},{"type":"block-quote","children":[{"text":"A wise quote."}]},{"type":"paragraph","children":[{"text":"Try it out for yourself!"}]}];

  const serializer = getSerializer({ disables: ['bold', 'block-quote']});

  return serializer(value);
}

const ReturnHTML = () => {
  const value = [{"type":"paragraph","children":[{"text":"This is editable "},{"text":"rich","bold":true},{"text":" text, "},{"text":"much","italic":true},{"text":" better than a "},{"text":"<textarea>","code":true},{"text":"!"}]},{"type":"paragraph","children":[{"text":"Since it's rich text, you can do things like turn a selection of text "},{"text":"bold","bold":true},{"text":", or add a semantically rendered block quote in the middle of the page, like this:"}]},{"type":"block-quote","children":[{"text":"A wise quote."}]},{"type":"paragraph","children":[{"text":"Try it out for yourself!"}]}];

  const serializer = getSerializer({ returnHTML: true, });

  return serializer(value);
}

const App = () => {
  return <main style={{ margin: '3em' }}>
      <h2>Rich Text</h2>
      <RichText />

      <h2>Checklists</h2>
      <Checklists />

      <h2>Embeds</h2>
      <Embeds />

      <h2>OverrideDefaults</h2>
      <OverrideDefaults />

      <h2>Images</h2>
      <Images />

      <h2>Links</h2>
      <Links />

      <h2>Disables</h2>
      <Disables />

      <h2>Return an HTML String</h2>
      <ReturnHTML />
  </main>
}

export default App
