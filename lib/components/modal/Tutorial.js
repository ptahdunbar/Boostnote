import React, { PropTypes } from 'react'
import MarkdownPreview from 'boost/components/MarkdownPreview'
import CodeEditor from 'boost/components/CodeEditor'

export default class Tutorial extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      slideIndex: 0
    }
  }

  handlePriorSlideClick () {
    if (this.state.slideIndex > 0) this.setState({slideIndex: this.state.slideIndex - 1})
  }

  handleNextSlideClick () {
    if (this.state.slideIndex < 4) this.setState({slideIndex: this.state.slideIndex + 1})
  }

  startButtonClick (e) {
    this.props.close()
  }

  render () {
    let content = this.renderContent(this.state.slideIndex)

    let dotElements = []
    for (let i = 0; i < 5; i++) {
      dotElements.push(<i key={i} className={'fa fa-fw fa-circle' + (i === this.state.slideIndex ? ' active' : '')}/>)
    }

    return (
      <div className='Tutorial modal'>
        <button onClick={e => this.handlePriorSlideClick()} className={'priorBtn' + (this.state.slideIndex === 0 ? ' hide' : '')}>
          <i className='fa fa-fw fa-angle-left'/>
        </button>
        <button onClick={e => this.handleNextSlideClick()} className={'nextBtn' + (this.state.slideIndex === 4 ? ' hide' : '')}>
          <i className='fa fa-fw fa-angle-right'/>
        </button>
        {content}
        <div className='dots'>
          {dotElements}
        </div>
      </div>
    )
  }

  renderContent (index) {
    switch (index) {
      case 0:
        return (<div className='slide slide0'>
          <div className='title'>Welcome to Boost</div>
          <div className='content'>
            Boost is a brand new note app for software<br/>
            Don't waste time cleaning up your data.<br/>
            devote that time to more creative work.<br/>
            Hack your memory.
          </div>
        </div>)
      case 1:
        let content = '## Boost is a note app for engineer.\n\n - Write with markdown\n - Stylize beautiful'
        return (<div className='slide slide1'>
          <div className='title'>Write with Markdown</div>
          <div className='content'>
            Markdown is available.<br/>
            Your notes will be stylized beautifully and quickly.
            <div className='markdown'>
              <pre className='left'>{content}</pre>
              <MarkdownPreview className='right' content={content}/>
            </div>
          </div>
        </div>)
      case 2:
        let code = 'import shell from \'shell\'\r\nvar React = require(\'react\')\r\nvar { PropTypes } = React\r\nimport markdown from \'boost\/markdown\'\r\nvar ReactDOM = require(\'react-dom\')\r\n\r\nfunction handleAnchorClick (e) {\r\n  shell.openExternal(e.target.href)\r\n  e.preventDefault()\r\n}\r\n\r\nexport default class MarkdownPreview extends React.Component {\r\n  componentDidMount () {\r\n    this.addListener()\r\n  }\r\n\r\n  componentDidUpdate () {\r\n    this.addListener()\r\n  }\r\n\r\n  componentWillUnmount () {\r\n    this.removeListener()\r\n  }'
        return (<div className='slide slide2'>
          <div className='title'>Beautiful code highlighting</div>
          <div className='content'>
            Boost supports code syntax highlighting.<br/>
            There are more than 100 different type of language.
            <div className='code'>
              <CodeEditor readOnly mode='jsx' code={code}/>
            </div>
          </div>
        </div>)
      case 3:
        return (<div className='slide slide3'>
          <div className='title'>Easy to access with Finder</div>
          <div className='content'>
            With Finder, You can search your articles faster.<br/>
            You can open Finder by pressing Control + shift + tab<br/>
            To put the content of an article in the clipboard, press Enter.<br/>
            So you can paste it with Cmd(⌘) + V

            <img width='480' src='../../resources/finder.png'/>
          </div>
        </div>)
      case 4:
        return (<div className='slide slide4'>
          <div className='title'>Are you ready?</div>
          <div className='content'>
          <button onClick={e => this.startButtonClick(e)}>Start<br/>Boost</button>
          </div>
        </div>)
      default:
        return null
    }
  }
}

Tutorial.propTypes = {
  close: PropTypes.func
}