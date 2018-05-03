import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col , Container, ListGroup, ListGroupItem } from 'reactstrap';
import classnames from 'classnames';
import axios from 'axios';


class App extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1',
            user: ''
        };
        this.url = 'http://127.0.0.1:8080/user'
    }
    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    componentDidMount(){
        axios.get(this.url)
            .then(res => {
                // console.log( JSON.stringify(res.data));
                this.setState({ user : res.data});
            }).catch(function(err) {
                console.log('Fetch Error :-S', err);
            });
    }
    createUserInfo()
    {
        // const i = this.state.user.map((item, key) => {
        //     console.log(item)
        // })
        const i = Object.keys(this.state.user).map(key => {
            return <ListGroupItem>this.state.user[key]</ListGroupItem>
            }
        );

        console.log(i);
     return Object.entries(this.state.user).map((item) => {
            console.log(item)
              return <ListGroupItem>{item}</ListGroupItem>
          }
      )

    }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">PowerTools</h1>
        </header>
          <div>
              <Nav tabs>
                  <NavItem>
                      <NavLink
                          className={classnames({ active: this.state.activeTab === '1' })}
                          onClick={() => { this.toggle('1'); }}
                      >
                          Accounts
                      </NavLink>
                  </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="1" >
                      <Container>
                          <section className="infoBox">
                      <Row>
                          <Col>
                              <h4>Profile</h4>
                          </Col>
                          <Col>
                              <Row>
                                  <Col sm="8" className="infoRow">
                                      <h4>User Information</h4>
                                     <div>
]
                                     </div>
                                      <ListGroup>
                                          { this.createUserInfo() }

                                      </ListGroup>
                                  </Col>
                                  <Col sm="8" className="infoRow">
                                      <h4>Password Details</h4>
                                  </Col>
                                  <Col sm="8" className="infoRow">
                                      <h4>Whereabouts</h4>
                                  </Col>
                              </Row>
                          </Col>
                      </Row>
                          </section>
                      </Container>

                  </TabPane>
              </TabContent>
          </div>
      </div>
    );
  }
}

export default App;
