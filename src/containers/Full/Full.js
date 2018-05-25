import React, {Component} from 'react';
import {Link, Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';


import Users from '../../views/Users/';
import UserForm from '../../views/Users/Form/';
import Lotery from '../../views/Lotery/';
import LoteryForm from '../../views/Lotery/Form/';
import Offers from '../../views/Offers/';
import OfferForm from '../../views/Offers/Form/';

class Full extends Component {
  componentDidMount(){
    isSignedIn()
      .then((currentUser) => {
        storeCurrentUser(currentUser.data)
      }).catch((error) => {
        this.props.history.push('/login')
      })
  }

  render() {
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar {...this.props}/>
          <main className="main">
            <Breadcrumb />
            <Container fluid>
              <Switch>
                <Route path="/usuarios/adicionar"   name="Usuário"  component={UserForm}/>
                <Route path="/usuarios/:id"         name="Usuário"  component={UserForm}/>
                <Route path="/usuarios"             name="Usuários" component={Users}/>
                <Route path="/sorteios/adicionar"   name="Sorteio"  component={LoteryForm}/>
                <Route path="/sorteios/:id"         name="Sorteio"  component={LoteryForm}/>
                <Route path="/sorteios"             name="Sorteios" component={Lotery}/>
                <Route path="/ofertas/adicionar"    name="Oferta"   component={OfferForm}/>
                <Route path="/ofertas/:id"          name="Oferta"   component={OfferForm}/>
                <Route path="/ofertas"              name="Ofertas"  component={Offers}/>
              </Switch>
            </Container>
          </main>
          <Aside />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Full;
