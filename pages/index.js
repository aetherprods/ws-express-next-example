class Home extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    var HOST = location.origin.replace(/^http/, 'ws')
    var ws = new WebSocket(HOST); 
    
  }

  render() {
    return (<div>Welcome to Next.js!</div>)
  }
}

export default Home