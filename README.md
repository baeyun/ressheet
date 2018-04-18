<p align="center">
	<img src="https://raw.githubusercontent.com/bukharim96/ress/master/resources/ress-logo@80.25percent.png">
</p>

<h1 align="center">RESSheet</h1>

<p align="center">
	<small>Only ~3kb, no external dependencies &amp; supports all major browsers</small>
</p>

***React Evaluated StyleSheet***, better known as **RESS**, is a tiny preprocessor that aims to be for React what LESS is to CSS. Highlights:

> - **Easy** to use and get started with
> - **Light-weight**, minified version is less than 1kb
> - **No dependencies**, built without the clutter of dependencies
> - **Consistency** across browsers (including the notorious Internet Explorer)
> - **MIT Licensed**, perfect for personal and commercial use

## Getting Started

### Installation

Package could be installed via `npm`.

```
npm install ressheet --save
```

### Import / require() Package

ES6 Import Approach:

```javascript
import RESSheet from 'ressheet'
```

NPM / CommonJS require() Approach:

```javascript
var RESSheet = require('ressheet')
```

## Showcase

<p align="center">
  <img src="https://raw.githubusercontent.com/bukharim96/ress/master/resources/ress-code-plus-showcase.png">
</p>

## Usage

RESSheet allows you to write better StyleSheets with React (Native) by using component `props` as CSS-like classes. Check the following `title` component:

```javascript
import React, { Component } from 'react'
import { Text } from 'react-native'
import RESSheet from 'ressheet'

class Title extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let titleStyles = new RESSheet(this.props, {
        default: {
          fontWeight: 'bold',
          color: '#000',
          fontSize: 25,
          textAlign: 'center'
        },
        
        'h1, h2, h3, h4, h5, h6': {
          marginBottom: 12,
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Ubuntu', 'Helvetica Neue', sans-serif",
          textTransform: 'uppercase',

          fancy: {
            fontFamily: 'cursive',
            fontStyle: 'italic'
          }
        },

        h1: { fontSize: 30 },
        h2: { fontSize: 25 },
        h3: { fontSize: 20 },
        h4: { fontSize: 15 },
        h5: { fontSize: 10 },
        h6: { fontSize: 7 }
      })

    return <Text style={titleStyles} children={this.props.children} />
  }
}
```

I bet you noticed that `new RESSheet(props, {...})` accepts two parameters, namely: props object and the *RESSheet* object. I used a class component just for demonstration, however always make sure to use stateless components where possible. Anyways, the `<Title />` component could now be used as follows:

```html
<Title>This is an ordinary title</Title>
<Title h1>This is an H1 title</Title>
<Title h2 fancy>This is a fancy H2 title</Title>
<Title h3>This is an H3 title</Title>
<Title h6>This is an H6 title</Title>
```

The following would then display:

<p align="center">
	<img src="https://raw.githubusercontent.com/bukharim96/ress/master/resources/ress-001.PNG">
</p>

Notice how RESSheet allows multi *selectors* in `'h1, h2, h3, h4, h5, h6': {...}`. Styles specified there would affect components with any `h1` - `h6` props. RESSheet also features nested, styles similiar to LESS, as seen in the above demo.

Without RESSheet, the above code would've been larger. This code is valid for both, `react` and `react-native`.

## Browser &amp; Device Support

**Note**: RESSheet supports both `react` and `react-native` out-of-the-box, along with all major browsers as highlighted below:

| Android | IOS   | Chrome | Edge  | Firefox | IE    | Opera | Safari|
|---------|-------|--------|-------|---------|-------|-------|-------|
| (Yes)   | (Yes) | (Yes)  | (Yes) | (Yes)   | (Yes) | (Yes) | (Yes) |

## Contributing

**RESSheet** is a free and open source library, and I'd appreciate any help you're willing to give - be it fixing bugs, improving documentation, or suggesting new features or enhancements.

## [License](https://github.com/bukharim96/pregx/blob/master/LICENSE)

**RESSheet** is licensed under the **MIT License** which makes it great for both personal and commercial use.

<p align="center"><strong>Enjoy</i> ;)</strong></p>