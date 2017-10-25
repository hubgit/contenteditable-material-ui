export default {
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    flex: 1,
    overflowY: 'auto',
  },
  toolbar: {
    boxSizing: 'border-box',
    background: '#f6f6f6',
    display: 'flex',
    minHeight: 0,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 48,
    paddingRight: 48,
    // justifyContent: 'center',
    width: '80ch',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  toolbarSection: {
    display: 'flex',
    alignItems: 'center'
  },
  blockControl: {
    minWidth: 120,
  },
  button: {
    height: 32,
    width: 32,
    borderRadius: 2,
    fontSize: 20,
    marginLeft: 5,
    marginRight: 5,
    '&:hover': {
      color: 'cornflowerblue',
    },
    '&:not(:last-child)': {
      marginRight: 10,
    },
    '& sub': {
      fontSize: '60%'
    },
    '& sup': {
      fontSize: '60%'
    }
  },
  active: {
    backgroundColor: 'lightgray',
  },
  editor: {
    boxSizing: 'border-box',
  },
}
