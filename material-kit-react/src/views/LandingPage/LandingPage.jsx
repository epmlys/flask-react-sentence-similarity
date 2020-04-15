import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons

// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import landingPageStyle from "assets/jss/material-kit-react/views/landingPage.jsx";

// Sections for this page
import ProductSection from "./Sections/ProductSection.jsx";


const dashboardRoutes = [];

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: "", sents: []};

    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  handleChange(event) {
    this.setState({text: event.target.value});
  }

  submitForm(e){
    e.preventDefault();

    const text = this.state.text;

    const url = 'http://localhost:3000/api/nlp/sbd';

    fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
    })
    .then( res => res.json())
    .then( data => {
        console.log(data);
        this.setState({sents: data});
    });
  }

  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <Header
          color="transparent"
          routes={dashboardRoutes}
          brand="Material Kit React"
          rightLinks={<HeaderLinks />}
          fixed
          changeColorOnScroll={{
            height: 400,
            color: "white"
          }}
          {...rest}
        />
        <Parallax filter image={require("assets/img/landing-bg.jpg")}>
          <div className={classes.container}>
          <form onSubmit={this.submitForm}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={9}>
                <h1 className={classes.title}>React Sentence Similarity</h1>
                <h4>
                Crafted by Mykola.
                </h4>
                <br />
                <CustomInput
                  labelText="Write or Paste your text here"
                  id="text"
                  value={this.state.text}
                  onChange={this.handleChange}
                  success
                  formControlProps={{
                    fullWidth: true
                  }}
                />
                <Button
                  color="danger"
                  type="submit"
                  >
                  <i className="fas fa-rocket" /> Text to Sentences
                </Button>
              </GridItem>
            </GridContainer>
            </form>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <ProductSection sents={this.state.sents}/>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(landingPageStyle)(LandingPage);
