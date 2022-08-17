import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router";
import Axios from "axios";
import { InvisibleButton } from "../Buttons/Buttons";

import { Link } from 'react-router-dom';

import { AppUrl } from "../App";

const StyledRect = styled.rect(({ theme }) => css`
	fill: ${theme.colors.primary_cta};
`);

const MobileMenuIcon = () => (
	<svg
		width="30px"
		height="30px"
		viewBox="0 0 20 20"
		version="1.1"
		xmlns="http://www.w3.org/2000/svg"
		xmlnsXlink="http://www.w3.org/1999/xlink"
	>
		<title>Mobile Menu</title>
		<g id="Artboard" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
			<StyledRect id="Rectangle-Copy" fill="" x="0" y="0" width="30" height="2"></StyledRect>
			<StyledRect id="Rectangle-Copy-3" fill="" x="0" y="6" width="30" height="2"></StyledRect>
			<StyledRect id="Rectangle-Copy-4" fill="" x="0" y="12" width="30" height="2"></StyledRect>
		</g>
	</svg>
);

// Components
const Base = styled.div(({ theme }) => css`
	background: ${theme.colors.base_bg};
	font-family: Arial, Helvetica, sans-serif;

	.fixedHeight {
		min-height: 80px;
	}

	svg g {
		fill: ${theme.colors.primary_cta};
	}
`);

const MenuBase = styled.div(({ theme }) => css`
	background: ${theme.colors.base_bg};
	z-index: 2;
	color: ${theme.colors.primary_cta};
`);

const NavActionButton = styled(InvisibleButton)(({ theme }) => css`
	color: ${theme.colors.primary_cta};
	&:hover {
		color: ${theme.colors.text_primary};
	}
`);

const MobileProfileLink = styled.i(({ theme }) => css`
	color: ${theme.colors.primary_cta};
	font-size: 30px; 
`);

const Navbar = ({ loginStatus }) => {
	const [showMobileMenu, setMenuOpen] = useState(false);

	const navigate = useNavigate();

	const logOut = () => {
		Axios.post(`${AppUrl}/logout`).then((response) => {
			if (response.status === 200){
				localStorage.removeItem("token");
				navigate("/Login");
				window.location.reload(true);
			}
		});
	};

	useEffect(() => [loginStatus]);

    return (
        <Base className="d-flex justify-content-center">
            <div className="container d-flex fixedHeight">
					<a href="/">Whisky</a>
            </div>
        </Base>
    )

}

export default Navbar;
