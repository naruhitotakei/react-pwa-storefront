import { ApolloClient } from "apollo-client";
import * as React from "react";
import { ApolloConsumer } from "react-apollo";
import Media from "react-media";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import ReactSVG from "react-svg";

import { CartSummary, Loader } from "..";
import { CheckoutContext, CheckoutContextInterface } from "./context";
import { GET_CHECKOUT } from "./queries";
import { default as Routes } from "./routes";

import { mediumScreen } from "../App/scss/variables.scss";
import "./scss/index.scss";

export class CheckoutProvider extends React.Component<
  {
    children: any;
    apolloClient: ApolloClient<any>;
    token: string;
    url: string;
  },
  CheckoutContextInterface
> {
  constructor(props) {
    super(props);
    this.state = {
      checkout: null,
      loading: false,
      updateCheckout: this.updateCheckout
    };
  }

  componentWillMount() {
    this.getCheckout();
  }

  getCheckout = async () => {
    this.setState({ loading: true });
    const { data } = await this.props.apolloClient.query({
      query: GET_CHECKOUT,
      variables: { token: this.props.token }
    });
    this.setState({ ...data, loading: false });
  };

  updateCheckout = checkout => {
    this.setState({ checkout });
  };

  render() {
    const { children } = this.props;
    return (
      <CheckoutContext.Provider value={this.state}>
        {children}
      </CheckoutContext.Provider>
    );
  }
}

const CheckoutApp: React.SFC<RouteComponentProps<{ match; token }>> = ({
  match: {
    url,
    params: { token = "" }
  }
}) => (
  <div className="checkout">
    <div className="checkout__menu">
      <div className="checkout__menu__bar">
        <ReactSVG path="../../images/logo.svg" />
      </div>
      <Link to="/">Return to shopping</Link>
    </div>
    <div className="container">
      <div className="checkout__grid">
        <ApolloConsumer>
          {client => (
            <CheckoutProvider apolloClient={client} token={token} url={url}>
              <CheckoutContext.Consumer>
                {({ loading }) =>
                  loading ? (
                    <Loader />
                  ) : (
                    <>
                      <div className="checkout__grid__content">
                        <Routes matchUrl={url} />
                      </div>
                      <Media
                        query={{ minWidth: mediumScreen }}
                        render={() => <CartSummary />}
                      />
                    </>
                  )
                }
              </CheckoutContext.Consumer>
            </CheckoutProvider>
          )}
        </ApolloConsumer>
      </div>
    </div>
  </div>
);

export default CheckoutApp;
