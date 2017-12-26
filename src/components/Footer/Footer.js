import React, {Component} from 'react';

class Footer extends Component {
  render() {
    return (
      <footer className="app-footer">
        <span><a href="http://www.loldesign.com.br">Matchmapp</a> &copy; {(new Date()).getFullYear()}</span>
        <span className="ml-auto">Desenvolvido por <a href="http://www.loldesign.com.br">Loldesign</a></span>
      </footer>
    )
  }
}

export default Footer;
