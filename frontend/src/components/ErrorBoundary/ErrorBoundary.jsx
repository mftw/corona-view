import React from 'react'
import { withRouter } from 'react-router-dom'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
    this.resetError = this.resetError.bind(this);
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { 
      hasError: true,
      error
    };
  }

  componentDidCatch(error, errorInfo) {
    console.log("ErrorBoundary -> componentDidCatch -> error, errorInfo", error, errorInfo)
  }

  resetError() {
    this.setState({
      hasError: false
    })
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          <h1>Something went wrong.</h1>
          <p>
            Error occurred on the following route: "{this.props.location.pathname}"
          </p>
          <button onClick={this.resetError}>Prøv igen</button>
          <pre>
            {this.state.error.message}
          </pre>
        </div>
      );
    }
    return this.props.children; 
  }
}

export default withRouter(ErrorBoundary)