import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <nav>
        <div class="nav-wrapper">
          <ul className="left">
            <a href="#" class="brand-logo">
              News App
            </a>
          </ul>
          <ul id="nav-mobile" class="right hide-on-med-and-down">
            <li>
              <a href="/auth/google">Login with Google</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
