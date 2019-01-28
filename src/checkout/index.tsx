import { mediumScreen } from "../components/App/scss/variables.scss";
import "./scss/index.scss";

import classNames from "classnames";
import * as React from "react";
import Media from "react-media";
import { generatePath, Redirect, RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import ReactSVG from "react-svg";

import { ApolloConsumer } from "react-apollo";
import {
  CartSummary,
  Loader,
  Offline,
  OfflinePlaceholder,
  Online,
  OverlayManager
} from "../components";
import CartProvider from "../components/CartProvider";
import { CartContext } from "../components/CartProvider/context";
import { BASE_URL } from "../core/config";
import logoImg from "../images/logo.svg";
import { CheckoutContext } from "./context";
import CheckoutProvider from "./provider";
import { reviewUrl, Routes } from "./routes";

const CheckoutApp: React.FC<RouteComponentProps> = ({ history }) => {
  const reviewPage =
    history.location.pathname.indexOf(
      generatePath(reviewUrl, { token: undefined })
    ) !== -1;

  return (
    <div className="checkout">
      <div className="checkout__menu">
        <div className="checkout__menu__bar">
          <ReactSVG path={logoImg} />
        </div>
        <Link to={BASE_URL}>Return to shopping</Link>
      </div>
      <div className="container">
        <Online>
          <div
            className={classNames("checkout__grid", {
              "checkout__grid--review": reviewPage
            })}
          >
            <ApolloConsumer>
              {client => (
                <CartProvider apolloClient={client}>
                  <CartContext.Consumer>
                    {cart => (
                      <CheckoutProvider>
                        <CheckoutContext.Consumer>
                          {({ checkout, loading, checkoutToken }) => {
                            const fetchingExisting = loading && !!checkoutToken;
                            const emptyCartAndCheckout =
                              !cart.lines.length && !checkout;

                            if (fetchingExisting) {
                              return <Loader />;
                            }

                            if (emptyCartAndCheckout) {
                              return <Redirect to={BASE_URL} />;
                            }

                            return (
                              <>
                                <div
                                  className={classNames({
                                    checkout__grid__content: !reviewPage
                                  })}
                                >
                                  <Routes />
                                </div>
                                {!reviewPage && (
                                  <Media
                                    query={{ minWidth: mediumScreen }}
                                    render={() => (
                                      <CartSummary checkout={checkout} />
                                    )}
                                  />
                                )}
                              </>
                            );
                          }}
                        </CheckoutContext.Consumer>
                      </CheckoutProvider>
                    )}
                  </CartContext.Consumer>
                </CartProvider>
              )}
            </ApolloConsumer>
          </div>
        </Online>
        <Offline>
          <OfflinePlaceholder />
        </Offline>
      </div>
      <OverlayManager />
    </div>
  );
};

export default CheckoutApp;
