import React from 'react'
import classnames from 'classnames'
import { compose, withProps } from 'recompose'
import { debounce, filter } from 'lodash'
import { FormControl, FormHelperText, IconButton, Select, MenuItem, Toolbar, Tooltip, withStyles } from 'material-ui'
import styles from './styles'
import toolbar from './toolbar'
import { exec } from './commands'

const buildContainers = node => {
  const result = {}

  if (node.nodeType === 3) {
    node = node.parentNode
  }

  while (node && node.tagName) {
    result[node.tagName] = true
    node = node.parentNode
  }

  return result
}

// const isEmptyBlock = node => node
//   && node.nodeType === 1
//   && node.tagName === 'P'
//   && !node.textContent.length

class Editor extends React.Component {
  state = {
    selectedBlock: null,
    selectionType: 'None',
    active: {},
    containers: {},
  }

  constructor(props) {
    super(props)

    // TODO: move to `commands` or 'toolbar'?
    exec('DefaultParagraphSeparator', 'p')

    this.handleChange = debounce(this.notifyChange, 1000, { maxWait: 5000 })
  }

  componentDidMount() {
    this.editor.innerHTML = this.props.value

    document.addEventListener('selectionchange', this.handleSelectionChange)
    document.addEventListener('keyup', this.handleSelectionChange) // for cmd-b
    document.addEventListener('mouseup', this.handleSelectionChange)
  }

  handleSelectionChange = () => {
    const props = this.props
    const selection = document.getSelection()

    if (selection.anchorNode) {
      const containers = buildContainers(selection.anchorNode)

      const active = props.toolbar.reduce((result, action) => {
        if (action.state && action.state(containers)) {
          result[action.key] = true
        }

        return result
      }, {})

      const selectedBlock = props.toolbar.find(action => {
        return action.group === 'block' && active[action.key]
      })

      this.setState({
        selectionType: selection.type,
        selectedBlock: selectedBlock ? selectedBlock.key : null,
        active,
        containers,
      })
    } else {
      this.setState({
        selectionType: selection.type,
        selectedBlock: null,
        active: {},
        containers: {},
      })
    }
  }

  notifyChange = async () => {
    // TODO: prevent unload while saving

    // props.setSaving(true)
    await this.props.onChange({
      body: this.editor.innerHTML,
    })
    // props.setSaving(false)
  }

  handleAction = action => event => {
    event.preventDefault()
    action.result(this)
  }

  setBlockType = event => {
    const key = event.target.value
    this.props.toolbar.find(action => action.key === key).result()
  }

  render() {
    const { classes, toolbar, components: { PublishButton } } = this.props
    const { active, selectedBlock, selectionType } = this.state

    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <div
            className={classes.editor}
            contentEditable
            autoFocus
            onInput={this.handleChange}
            ref={node => {
              this.editor = node
            }}
          />
        </div>

        <Toolbar className={classes.toolbar} disableGutters>
          {/*<FormControl>
            <div>
              <Tooltip title="Save" placement="top">
                <IconButton
                  className={classes.button}
                  onClick={this.handleChange}>
                  save
                </IconButton>
              </Tooltip>
            </div>
            <FormHelperText>Save</FormHelperText>
          </FormControl>*/}

          {PublishButton && <PublishButton/>}

          <FormControl>
            <div className={classes.toolbarSection}>
              {filter(toolbar, { group: 'format' }).map(action => (
                <Tooltip title={action.title} placement="top" key={action.key}>
                  <IconButton
                    className={classnames(classes.button, {
                      [classes.active]: active[action.key],
                    })}
                    onMouseDown={this.handleAction(action)}
                    disabled={!['Range', 'Caret'].includes(selectionType)}
                  >
                    {action.icon}
                  </IconButton>
                </Tooltip>
              ))}
            </div>
            <FormHelperText>Format</FormHelperText>
          </FormControl>

          <FormControl>
            <div>
              {filter(toolbar, { group: 'insert' }).map(action => (
                <Tooltip title={action.title} placement="top" key={action.key}>
                  <IconButton
                    className={classes.button}
                    onMouseDown={this.handleAction(action)}
                  >
                    {action.icon}
                  </IconButton>
                </Tooltip>
              ))}
            </div>
            <FormHelperText>Insert</FormHelperText>
          </FormControl>

          <FormControl className={classes.blockControl}>
            <Select value={selectedBlock || ''} onChange={this.setBlockType}>
              {filter(toolbar, { group: 'block' }).map(action => (
                <MenuItem key={action.key} value={action.key}>
                  {/*<Icon>{action.icon}</Icon>*/}
                  {action.title}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Block</FormHelperText>
          </FormControl>
        </Toolbar>
      </div>
    )
  }
}

// TODO: ensure save on componentDidUnmount

export default compose(
  withProps({
    toolbar,
  }),
  withStyles(styles, {
    name: 'Editor',
  })
)(Editor)
