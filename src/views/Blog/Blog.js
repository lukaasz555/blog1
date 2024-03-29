import React, { useState } from 'react';
import Article from 'components/organisms/Article/Article';
import Loader from 'components/atoms/Loader/Loader';
import ReactPaginate from 'react-paginate';
import { Wrapper } from './Blog.styles';

const Blog = ({ articles, setArticles, error, isFiltered }) => {
	const [pageNumber, setPageNumber] = useState(0);
	const artsPerPage = 3;
	const pagesVisited = pageNumber * artsPerPage;

	const displayArts = articles
		.slice(pagesVisited, pagesVisited + artsPerPage)
		.map(({ id, title, short, content, date, image = null }) => (
			<Article title={title} short={short} key={id} id={id} date={date} />
		));

	const pageCount = Math.ceil(articles.length / artsPerPage);
	const handleChangePage = (e) => {
		setPageNumber(e.selected);
	};

	return (
		<Wrapper>
			{articles.length > 0 ? (
				<>
					{displayArts}
					<ReactPaginate
						pageCount={pageCount}
						onPageChange={handleChangePage}
						containerClassName='paginationButtons'
						pageRangeDisplayed={3}
						marginPagesDisplayed={2}
						pageClassName='page-item'
						pageLinkClassName='page-link'
						previousClassName='page-item'
						previousLinkClassName='page-link'
						nextClassName='page-item'
						nextLinkClassName='page-link'
						breakLabel='...'
						breakClassName='page-item'
						breakLinkClassName='page-link'
						activeClassName='active'
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

export default Blog;
