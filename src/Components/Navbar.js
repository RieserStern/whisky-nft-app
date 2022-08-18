import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { InvisibleButton } from '../Buttons/Buttons';
import ConnectWalletButton from '../Buttons/ConnectWalletButton';
import GradientButton from "../Buttons/GradientButton";
import Paragraph from './Paragraph';
import { textAlign } from '@mui/system';

const ThemeBarContainer = styled.div(({ theme, isLight }) => css`
    height: 50px;
	background-color: rgba(246, 245, 242, 0.85);
	
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

const NavActionButton = styled(InvisibleButton)(({ theme }) => css`
	color: ${theme.colors.primary_cta};
	&:hover {
		color: ${theme.colors.text_primary};
	}
`);

const walletStyle = {
	marginRight: '20px',
	marginBottom: "10px"
}

const themeToggleStyle = {
	left: '20px',
	marginBottom: "10px"
}

const ethereum = window.ethereum;
let address = null
let account = null

const Navbar = ({ theme, toggleTheme, loginStatus }) => {
    const isLight = theme === 'light';

	async function ConnectWallet() {
		if (address === null || account === null){
		  const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
		  account = accounts[0]
		  address = ethereum.selectedAddress
		}
	
		console.log(address);
	};

    return (
		<ThemeBarContainer isLight={isLight} className="pt-3 Navbar position-fixed top-0 left-0 w-100 d-flex d-flex col-12 justify-content-between align-items-center">
			<div className="container d-flex justify-content-between d-none d-lg-block m-auto" style={themeToggleStyle}>
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
			<div className="d-none d-lg-block" style={walletStyle}>
				<GradientButton text="Connect Wallet" onClick={() => ConnectWallet()} />
			</div>
		</ThemeBarContainer>
    )
};

Navbar.propTypes = {
  theme: PropTypes.string.isRequired,
  toggleTheme: PropTypes.func.isRequired,
}

export default Navbar;