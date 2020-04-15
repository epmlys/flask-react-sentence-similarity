import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import Chat from "@material-ui/icons/Chat";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import InfoArea from "components/InfoArea/InfoArea.jsx";
import Button from "components/CustomButtons/Button.jsx";

import productStyle from "assets/jss/material-kit-react/views/landingPageSections/productStyle.jsx";

class ProductSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {similarSents: []};
  }

  findSimilarSents(sent, e){
    e.preventDefault();

    const url = 'http://localhost:3000/api/nlp/similarity';

    fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ sent }),
    })
    .then( res => res.json())
    .then( data => {
        console.log(data);
        this.setState({similarSents: data});
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <h2 className={classes.title}>Let's look at sentences</h2>
              {this.props.sents.map((sent) => 
                <Button 
                  color="info"
                  onClick={(e) => this.findSimilarSents(sent, e)}
                >
                  {sent}
                </Button>
              )}
          </GridItem>
        </GridContainer>
        <div>
          <GridContainer>
            {this.state.similarSents.map((similar) =>
              <GridItem xs={12} sm={12} md={4}>
                <InfoArea
                  title={similar.score + "% " + similar.sent}
                  description={similar.text}
                  icon={Chat}
                  iconColor="info"
                  vertical
                />
              </GridItem>
            )}
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(productStyle)(ProductSection);
