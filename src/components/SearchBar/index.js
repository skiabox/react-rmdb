import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
// Image
import searchIcon from '../../images/search-icon.svg';
// Styles
import { Wrapper, Content } from './SearchBar.styles';

const SearchBar = ({ setSearchTerm }) => {
  const [state, setState] = useState('');
  //create a mutable local variable to stop useEffect from creating a timer in the initial render

  //useRef is a hook which returns an object with a current property set to the value passed to the hook.
  //This object is mutable so the current property can be changed.
  //Importantly this object exists outside of React’s render cycle, so the value persists throughout a components lifecycle.
  //It is not like the state variable that causes a re-render when it changes
  const initial = useRef(true);

  useEffect(() => {
    if (initial.current) {
      initial.current = false;
      return;
    }

    //this only runs when the state changes
    const timer = setTimeout(() => {
      setSearchTerm(state);
    }, 500);

    //clear things with this return statement at the end of each render
    return () => clearTimeout(timer);
  }, [setSearchTerm, state]);

  //input is called a react conrolled component since its value is in sync with the local state
  return (
    <Wrapper>
      <Content>
        <img src={searchIcon} alt="search-icon" />
        <input
          type="text"
          placeholder="Search Movie"
          onChange={event => setState(event.currentTarget.value)}
          value={state}
        />
      </Content>
    </Wrapper>
  );
};

SearchBar.propTypes = {
  setSearchTerm: PropTypes.func
};

export default SearchBar;
