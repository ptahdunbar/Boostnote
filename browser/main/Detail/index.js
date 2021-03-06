import React, { PropTypes } from 'react'
import CSSModules from 'browser/lib/CSSModules'
import styles from './Detail.styl'
import _ from 'lodash'
import MarkdownNoteDetail from './MarkdownNoteDetail'
import SnippetNoteDetail from './SnippetNoteDetail'
import ee from 'browser/main/lib/eventEmitter'

const OSX = global.process.platform === 'darwin'

class Detail extends React.Component {
  constructor (props) {
    super(props)

    this.focusHandler = () => {
      this.refs.root != null && this.refs.root.focus()
    }
    this.deleteHandler = () => {
      this.refs.root != null && this.refs.root.handleDeleteMenuClick()
    }
  }

  componentDidMount () {
    ee.on('detail:focus', this.focusHandler)
    ee.on('detail:delete', this.deleteHandler)
  }

  componentWillUnmount () {
    ee.off('detail:focus', this.focusHandler)
    ee.off('detail:delete', this.deleteHandler)
  }

  render () {
    let { location, notes, config } = this.props
    let note = null
    if (location.query.key != null) {
      let splitted = location.query.key.split('-')
      let storageKey = splitted.shift()
      let folderKey = splitted.shift()
      let noteKey = splitted.shift()

      note = _.find(notes, {
        storage: storageKey,
        folder: folderKey,
        key: noteKey
      })
    }

    if (note == null) {
      return (
        <div styleName='root'
          style={this.props.style}
          tabIndex='0'
        >
          <div styleName='empty'>
            <div styleName='empty-message'>{OSX ? 'Command(⌘)' : 'Ctrl(^)'} + N<br/>to create a new post</div>
          </div>
        </div>
      )
    }

    if (note.type === 'SNIPPET_NOTE') {
      return (
        <SnippetNoteDetail
          note={note}
          config={config}
          ref='root'
          {..._.pick(this.props, [
            'dispatch',
            'storages',
            'style',
            'ignorePreviewPointerEvents',
            'location'
          ])}
        />
      )
    }

    return (
      <MarkdownNoteDetail
        note={note}
        config={config}
        ref='root'
        {..._.pick(this.props, [
          'dispatch',
          'storages',
          'style',
          'ignorePreviewPointerEvents',
          'location'
        ])}
      />
    )
  }
}

Detail.propTypes = {
  dispatch: PropTypes.func,
  storages: PropTypes.array,
  style: PropTypes.shape({
    left: PropTypes.number
  }),
  ignorePreviewPointerEvents: PropTypes.bool
}

export default CSSModules(Detail, styles)
