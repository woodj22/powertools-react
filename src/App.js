import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col , Container, ListGroup, ListGroupItem } from 'reactstrap';
import classnames from 'classnames';


class App extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1',
            user: []
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
        fetch(this.url, {
            mode: 'cors'  })
            .then(
                function(response) {
                    // console.log(response.entries)
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                            response.status);
                    }
                     return response.json();
                }
            ).then(data => this.setState({ user: data }))
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
            });
    }
  render() {
      // console.log(typeof(this.state.user));
      this.userList = Object.entries(this.state.user).map((item, index) => {
              return <ListGroupItem>{item}</ListGroupItem>
          }
      )
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
                                          { this.userList }

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
