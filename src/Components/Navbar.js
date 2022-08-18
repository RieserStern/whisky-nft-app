import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { InvisibleButton } from '../Buttons/Buttons';
import Paragraph from './Paragraph';

const ThemeBarContainer = styled.div(({ theme, isLight }) => css`
    background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0));
    top: 0px;
	
	.inner { 
		background: ${isLight ? '#E5E5E5' : '#696969'};
		width: 44px;
		border-radius: 50px;
		justify-content: ${isLight ? 'flex-end' : 'flex-start'};
	}
`);

const CircleToggle = styled.div(({ theme, isLight }) => css`
	width: 20px;
	height: 20px;
	border-radius: 50px;
	background: ${theme.colors.primary_cta};

	i {
		font-size: 16px;
		color: ${isLight ? theme.colors.actual_white : '#696969'};
	};
`);

export const useDarkMode = () => {
    const [theme, setTheme] = useState('light');
    const toggleTheme = () => {
      if (theme === 'light') {
        window.localStorage.setItem('theme', 'dark')
        setTheme('dark')
      } else {
        window.localStorage.setItem('theme', 'light')
        setTheme('light')
      }
    };
  
    useEffect(() => {
      const localTheme = window.localStorage.getItem('theme');
      localTheme && setTheme(localTheme);
    }, []);

    return [theme, toggleTheme];
};


const Navbar = ({ theme, toggleTheme, loginStatus }) => {
    const isLight = theme === 'light';

    return (
		<ThemeBarContainer isLight={isLight} className="pt-3">
			<div className="container d-flex justify-content-between">
				<InvisibleButton onClick={toggleTheme} className="p-0">
					{isLight ? (
						<div className="inner d-flex align-items-center p-0">
							<CircleToggle isLight={isLight}>
								<i className="material-icons">brightness_6</i>
							</CircleToggle>
						</div>
					) : (
						<div className="inner d-flex align-items-center p-0">
							<CircleToggle isLight={isLight}>
								<i className="material-icons">brightness_6</i>
							</CircleToggle>
						</div>
					)}
				</InvisibleButton>
			</div>
			<div className="container d-flex fixedHeight">
					<a href="/">Whisky</a>
			</div>
		</ThemeBarContainer>
    )
};

Navbar.propTypes = {
  theme: PropTypes.string.isRequired,
  toggleTheme: PropTypes.func.isRequired,
}

export default Navbar;