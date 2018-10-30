import classNames from "classnames";
import * as React from "react";
import { Link } from "react-router-dom";
import Breadcrumbs, { Breadcrumb } from "../Breadcrumbs";

interface PageNavigationElement {
  active: boolean;
  label: string;
  url: string;
}

interface ArticlePageProps {
  breadcrumbs: Breadcrumb[];
  headerImage: string | null;
  navigation: PageNavigationElement[];
  page: {
    content: string;
    title: string;
  };
}
export const ArticlePage: React.SFC<ArticlePageProps> = ({
  breadcrumbs,
  headerImage,
  navigation,
  page
}) => (
  <div className="article-page">
    <div
      className="article-page__header"
      style={
        headerImage
          ? {
              backgroundImage: `url(${headerImage})`
            }
          : null
      }
    >
      <span className="article-page__header__title">
        <h1>{page.title}</h1>
      </span>
    </div>
    <div className="container">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="article-page__container">
        <div className="article-page__navigation">
          <ul>
            {navigation.map(menuElement => (
              <li
                className={classNames({
                  ["article-page__navigation-element"]: true,
                  ["article-page__navigation-element--active"]:
                    menuElement.active
                })}
              >
                <Link to={menuElement.url} key={menuElement.url}>
                  {menuElement.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div
          className="article-page__content"
          dangerouslySetInnerHTML={{
            __html: page.content
          }}
        />
      </div>
    </div>
  </div>
);
export default ArticlePage;
