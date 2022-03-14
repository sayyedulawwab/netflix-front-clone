import React, { useEffect, useState } from 'react';
import profile_logo from '../assets/profile__logo.png';
import './Nav.css';

function Nav() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        setShow(true);
      } else setShow(false);
    });
    return () => {
      window.removeEventListener('scroll');
    };
  }, []);

  return (
    <div className={`nav ${show && 'nav__black'}`}>
      <img
        className="nav__logo"
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        alt="Netflix logo"
      />
      <img className="nav__avatar" src={profile_logo} alt="Profile logo" />
    </div>
  );
}

export default Nav;
