import React from 'react';
import {Link} from 'react-router-dom';
import style from './Page2.scss';

function Page2() {
  return (
    <div className={style.page2}>
      <h2>page 2</h2>
      <div>
        <Link to="/page1">link to page1</Link>
      </div>
    </div>
  )
}

export default Page2;