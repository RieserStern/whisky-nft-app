import React from "react";
import styled, { css } from "styled-components";
import { PageBody } from "../Components/FormInputs";
import Heading from "../Components/Heading";
import GradientButton from "../Buttons/GradientButton";
import { SecondaryButton, LinkButton } from "../Buttons/Buttons";
import Paragraph from "../Components/Paragraph";
import { Link } from "react-router-dom";
import Slider from "react-slick";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Images
import MobileAccentShapeDark from "../Assets/SVG/mobile-accent-shape-dark.svg";
import MobileAccentShapeLight from "../Assets/SVG/mobile-accent-shape-light.svg";

import { useNavigate } from "react-router";

const ShowcaseBase = styled.div(
  ({ theme, currentTheme }) => css`
    min-height: 600px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    z-index: 1;

    @media screen and (min-width: ${theme.breakpoints.lg}) {
      background-size: 80%;
      background-repeat: no-repeat;
      background-position: center center;
    }
  `
);

const Card = styled.div(
  ({ theme }) => css`
    background: ${theme.colors.card_bg};
    border-radius: 20px;
  `
);

const IconCard = ({ icon, title, text, children, link }) => (
  <Link
    to={`/Prices#${link}`}
    className="col-12 col-sm-6 col-md-6 col-xl-3 mb-4 mb-xl-0 text-decoration-none"
  >
    <Card className="p-4 text-center mb-4 mb-xl-0 h-100">
      {children}
      {/* Make these icons tomorrow */}
      <Heading size="24px" bold>
        {title}
      </Heading>
      <Paragraph size="14px">{text}</Paragraph>
    </Card>
  </Link>
);

const GradientHeading = styled(Heading)(
  ({ theme }) => css`
    @supports (-webkit-background-clip: text) {
      background: -webkit-linear-gradient(
        300deg,
        #fce608,
        #ff7586,
        #b372ce,
        #6f86ff
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  `
);

const Showcase = ({ theme }) => (
  <ShowcaseBase className="position-relative mb-5 w-100" currentTheme={theme} />
);

const AccentShape = styled.img(
  ({ theme }) => css`
    position: absolute;
    display: block;
    bottom: 30px;
    left: -5%;
    width: 105%;
    z-index: 0;

    @media screen and (min-width: ${theme.breakpoints.sm}) {
      bottom: 0px;
    }

    @media screen and (min-width: ${theme.breakpoints.lg}) {
      display: none;
    }
  `
);

const SliderBar = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <div>
          <Slider {...settings}>
            <div>
              <h3>1</h3>
            </div>
            <div>
              <h3>2</h3>
            </div>
            <div>
              <h3>3</h3>
            </div>
            <div>
              <h3>4</h3>
            </div>
            <div>
              <h3>5</h3>
            </div>
            <div>
              <h3>6</h3>
            </div>
          </Slider>
        </div>
    )
}

const Home = ({ theme }) => {
    const navigate = useNavigate();

    return (
        <PageBody>
            <div className="row pt-5 d-flex justify-content-center container m-auto p-0">
                <div className="col-12 col-lg-6 col-xxl-5 d-flex align-items-center justify-content-center">
                    <div className="my-5">
                    <Heading size="48px" bold className="mb-0">
                        Non-Custodial,
                    </Heading>
                    <GradientHeading size="48px" bold>
                        Whisky NFT MarketPlace
                    </GradientHeading>
        
                    <div className="row mt-5 pt-5">
                        <div className="col-12 col-sm-6">
                        <GradientButton
                            text="Sign Up"
                            className="w-100 mb-3"
                            fontSize="20px"
                        />
                        </div>
                        <div className="col-12 col-sm-6">
                        <SecondaryButton
                            className="w-100"
                            round
                            color="navyGrey"
                            textColor="white"
                            text="How it Works"
                            boldText={false}
                        />
                        </div>
                    </div>
                    </div>
                </div>
                <div className="col-12 col-lg-6 col-xxl-7 position-relative">
                    <Showcase theme={theme} />
                    <AccentShape
                    src={
                        theme === "dark" ? MobileAccentShapeDark : MobileAccentShapeLight
                    }
                    alt="dasd"
                    className="d-sm-none"
                    />
                </div>
            </div>
            <div className="container mt-4">
                <div className="row justify-content-center mb-4">
                <IconCard
                    link="solana"
                    title="Solana"
                    // icon={IconSolana}
                    text="The open-source crypto with the fastest responsive speed and rapidly growing ecosystem."
                >
                    {/* <img src={IconSolana} alt="Solana" className="mb-3" /> */}
                </IconCard>
                <IconCard
                    link="solana"
                    title="Lumos Rewards"
                    text="Our SPL asset focused on providing users an incentive to trade regularly, event participation & referrals."
                >
                    {/* <img src={IconLumosRewards} alt="Lumos" className="mb-3" /> */}
                </IconCard>
                <IconCard
                    title="KIN"
                    text="The open-source crypto with the fastest responsive speed and rapidly growing ecosystem."
                >
                    {/* <img src={IconKin} alt="KIN" className="mb-3" /> */}
                </IconCard>
                <IconCard
                    title="COPE"
                    text="The open-source crypto with the fastest responsive speed and rapidly growing ecosystem."
                >
                    {/* <div className="mb-3">
                    <CopeIcon />
                    </div> */}
                </IconCard>
                </div>

            </div>
        </PageBody>
    )

}

export default Home;

