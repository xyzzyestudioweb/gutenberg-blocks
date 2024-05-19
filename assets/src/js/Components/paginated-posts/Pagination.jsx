import { useEffect, useState } from "react";
import { __ } from "@wordpress/i18n";

export default function Pagination({ perPage, page, totalPosts, totalPages, isEditMode, setPage, scrollToRef }) {
  const [startLoop, setStartLoop] = useState(1);
  const [endLoop, setEndLoop] = useState(5);

  // TODO: Add the following props to the block attributes to parametrize the pagination
  // Show or not first button to go to first page
  const firstButton = true;
  // Show or not previous button
  const prevButton = true;
  // Show or not next button
  const nextButton = true;
  // Show or not last button to go to last page
  const lastButton = true;

  const useEffectProps = isEditMode ? [perPage, totalPosts] : [page];

  useEffect(() => {
    const timeoutId = setTimeout(() => findPageNumbers(), 100);
    return () => clearTimeout(timeoutId);
  }, useEffectProps)

  const findPageNumbers = () => {
    if (page >= 7) {
      setStartLoop(page - 3);
      if (page + 3 < totalPages) {
        setEndLoop(page + 3);
      } else if (page <= totalPages && page > totalPages - 6) {
        setStartLoop(totalPages - 6);
        setEndLoop(totalPages);
      } else {
        setEndLoop(totalPages);
      }
    } else {
      setStartLoop(1);
      if (totalPages > 7) {
        setEndLoop(7);
      } else {
        setEndLoop(totalPages);
      }
    }
  }

  const handlePageChange = (newPage) => {
    // Ensure newPage is within valid range
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);

    // Scroll to top of container with an offset
    const offset = 92;
    window.scrollTo({ top: scrollToRef.current.offsetTop - offset, behavior: "smooth" });
  };

  const printArrow = (direction, status) => {
    if (direction === 'prev') {
      return (
        <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.22 5.27985C0.0783347 5.42036 0 5.611 0 5.80985V6.18985C0.0022986 6.38826 0.0811175 6.57813 0.219999 6.71985L5.36 11.8499C5.45388 11.9445 5.58168 11.9978 5.715 11.9978C5.84832 11.9978 5.97612 11.9445 6.07 11.8499L6.78 11.1399C6.87406 11.0477 6.92707 10.9216 6.92707 10.7899C6.92707 10.6582 6.87406 10.5321 6.78 10.4399L2.33 5.99985L6.78 1.55985C6.87466 1.46605 6.9279 1.33826 6.9279 1.20485C6.9279 1.07154 6.87466 0.943742 6.78 0.849852L6.07 0.149852C5.97612 0.055196 5.84832 0.00195312 5.715 0.00195312C5.58168 0.00195312 5.45388 0.055196 5.36 0.149852L0.22 5.27985Z" fill={status === 'active' ? '#005DA1' : '#888888'} />
        </svg>
      )
    }

    return (
      <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.78 6.71985C6.92069 6.57934 6.99982 6.3887 7 6.18985V5.80985C6.9977 5.61144 6.91888 5.42157 6.78 5.27985L1.64 0.149852C1.54612 0.055196 1.41832 0.00195312 1.285 0.00195312C1.15168 0.00195312 1.02388 0.055196 0.93 0.149852L0.22 0.859852C0.125936 0.952016 0.0729284 1.07816 0.0729284 1.20985C0.0729284 1.34154 0.125936 1.46769 0.22 1.55985L4.67 5.99985L0.22 10.4399C0.125343 10.5337 0.0721006 10.6615 0.0721006 10.7949C0.0721006 10.9282 0.125343 11.056 0.22 11.1499L0.93 11.8499C1.02388 11.9445 1.15168 11.9978 1.285 11.9978C1.41832 11.9978 1.54612 11.9445 1.64 11.8499L6.78 6.71985Z" fill={status === 'active' ? '#005DA1' : '#888888'} />
      </svg>
    )
  }

  const displayFirstButton = () => {
    if (page > 1) {
      return (<li onClick={() => handlePageChange(1)} className="items-pagination__page-num active">
        {printArrow('prev', 'active')}
        {printArrow('prev', 'active')}
      </li>)
    }
    return (<li className="items-pagination__page-num inactive">
      {printArrow('prev', 'inactive')}
      {printArrow('prev', 'inactive')}
    </li>)
  }

  const displayPrevButton = () => {
    if (page > 1) {
      return (<li onClick={() => handlePageChange(page - 1)} className="items-pagination__page-num active">
        {printArrow('prev', 'active')}
      </li>)
    }
    return (<li className="items-pagination__page-num inactive">
      {printArrow('prev', 'inactive')}
    </li>)
  }

  const displayNextButton = () => {
    if (page < totalPages) {
      return (<li onClick={() => handlePageChange(page + 1)} className="items-pagination__page-num active">
        {printArrow('next', 'active')}
      </li>)
    }
    return (<li className="items-pagination__page-num inactive">
      {printArrow('next', 'inactive')}
    </li>)
  }

  const displayLastButton = () => {
    if (page < totalPages) {
      return (<li onClick={() => handlePageChange(totalPages)} className="items-pagination__page-num active">
        {printArrow('next', 'active')}
        {printArrow('next', 'active')}
      </li>)
    }
    return (<li className="items-pagination__page-num inactive">
      {printArrow('next', 'inactive')}
      {printArrow('next', 'inactive')}
    </li>)
  }

  const displayPageNumbers = () => {
    return (
      Array.from({ length: endLoop - startLoop + 1 }, (_, i) => startLoop + i).map(num => (
        <li key={num} onClick={() => num !== page && handlePageChange(num)} className={'items-pagination__page-num ' + (num === page ? "selected" : "active")}>
          {num}
        </li>
      )))
  }

  return (
    <div className="items-pagination">
      {totalPosts > 0 && (
        <ul className="items-pagination__pages-list">
          {firstButton ? displayFirstButton() : null}
          {prevButton ? displayPrevButton() : null}
          {/* Page numbers */}
          {displayPageNumbers()}
          {nextButton ? displayNextButton() : null}
          {lastButton ? displayLastButton() : null}
        </ul>
      )}
    </div>
  )
}