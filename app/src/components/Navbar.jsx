var React = require('react');
var Link = require('react-router').Link;

var Nav = require('react-bootstrap').Nav;
var Navbar = require('react-bootstrap').Navbar;
var NavItem = require('react-bootstrap').NavItem;
var NavDropdown = require('react-bootstrap').NavDropdown;
var MenuItem = require('react-bootstrap').MenuItem;



function handleSelect(selectedKey) {
  alert('selected ' + selectedKey);
}

module.exports = React.createClass({
  getInitialState: function() {
    return ({something: undefined})
  },
  componentDidMount: function(
  //do something here if need be
  ) {},
  render: function() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Polls</a>
          </Navbar.Brand>
          <Navbar.Toggle/>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>

            <li><Link to="/allpolls">All Polls</Link></li>
            {this.props.user ? <li><Link to="/addpoll">Add Poll</Link></li> : null}
            {this.props.user ? <li><Link to="/mypolls">Manage My Polls</Link></li> : null}
            {this.props.user
              ?
                <li><a href="/logout">Logout</a></li>
              :
                <li><a href="/auth/github/callback">Login/Register</a></li>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
})
