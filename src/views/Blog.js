import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Article from "components/organisms/Article/Article";
import PropTypes from "prop-types";
import axios from "axios";
import Loader from "components/atoms/Loader";
import ReactPaginate from "react-paginate";
import PaginatedArticles from "components/helpers/PaginatedArticles";
import { articles } from "data/data";

const Wrapper = styled.div`
  width: 90%;
  margin: 20px auto;
  text-align: left;

  .paginationButtons {
    display: flex;
    justify-content: center;
    margin: 3em auto;
    list-style: none;
    /* d e l e t e */
    /*     background-color: lightblue; */

    .page-item {
      background-color: rgba(255, 255, 255, 0.23);
      margin: 10px;
      cursor: pointer;
      transition: all 0.25s;
      padding: 10px 15px;
      text-align: center;
      border-radius: 50%;
    }

    .active {
      color: ${({ theme }) => theme.colors.white};
      background-color: ${({ theme }) => theme.colors.black};
    }
  }
`;

export const URL = "https://graphql.datocms.com/";
export const query = `
{
  allArticles {
    id
    title
    short
    content
    category
    img {
      id
    }
    date
  }
}
`;

const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .post(
        URL,
        { query },
        {
          headers: {
            authorization: `Bearer ${process.env.REACT_APP_DATOCMS_TOKEN}`,
          },
        }
      )
      .then(({ data: { data } }) => {
        /*         setArticles(data.allArticles); */
        setTimeout(() => {
          console.log(data);
          setArticles(data.allArticles);
        }, 430);
      })
      .catch(() => {
        setError("Przepraszamy, nie udało się załadować artykułów.");
      });
  }, []);

  const [arts, setArts] = useState(articles.slice(0, 999));
  const [pageNumber, setPageNumber] = useState(0);

  const artsPerPage = 3;
  const pagesVisited = pageNumber * artsPerPage;

  const displayArts = articles
    .slice(pagesVisited, pagesVisited + artsPerPage)
    .map(({ id, title, category, short, content, date, image = null }) => (
      <Article
        title={title}
        short={short}
        category={category}
        key={id}
        date={date}
      />
    ));

  const pageCount = Math.ceil(articles.length / artsPerPage);
  const handleChangePage = (e) => {
    setPageNumber(e.selected);
    console.log(e.selected);
  };

  return (
    <Wrapper>
      {/*       {articles.length > 0 ? (
        articles.map(
          ({ id, title, category, short, content, date, image = null }) => (
            <Article
              title={title}
              short={short}
              category={category}
              key={id}
              date={date}
            />
          )
        )
      ) : (
        <p>{error ? error : <Loader />}</p>
      )} */}
      {articles.length > 0 ? (
        <>
          {displayArts}
          <ReactPaginate
            nextLabel="następna strona"
            previousLabel="poprzednia strona"
            pageCount={pageCount}
            onPageChange={handleChangePage}
            containerClassName="paginationButtons"
            /* --- */
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            activeClassName="active"
            renderOnZeroPageCount={null}
          />
        </>
      ) : error ? (
        error
      ) : (
        <Loader />
      )}
    </Wrapper>
  );
};

Blog.propTypes = {
  articles: PropTypes.arrayOf(),
};

export default Blog;
