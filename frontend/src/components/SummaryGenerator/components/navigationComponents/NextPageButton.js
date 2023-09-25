import React from 'react'
import PropTypes from 'prop-types'

const NextPageButton = ({ css, page, pages, handleNextClick }) => {
  const nextClass = css || 'button is-black my-0 mx-3'

  if (page === pages) {
    return (
      <button className={nextClass} disabled>
        <span className='icon is-small'>
          <i className='material-icons'>keyboard_arrow_right</i>
        </span>
      </button>
    )
  }

  return (
    <button className={nextClass} onClick={handleNextClick}>
      <span className='icon is-small'>
        <i className='material-icons'>keyboard_arrow_right</i>
      </span>
    </button>
  )
}
NextPageButton.propTypes = {
  css: PropTypes.string,
  page: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
  handleNextClick: PropTypes.func.isRequired,
}

export default NextPageButton
