import React, { Component } from 'react';
import './Overview.scss';

class Summary extends Component {
  render() {
    return (
      <div className='overview'>
        <div className='overviewBox'>
          <div className='category'>
            {'가구'} {'>'} {'소파/거실가구'} {'>'} {'소파'} {'>'} {'일반소파'}
          </div>
          <div className='overviewCover'>
            <div className='coverImageBox'>
              <div className='coverImageListBox'>zz</div>
              <div className='coverImageWrap'>xx</div>
            </div>
            <div className='overViewList'>
              <div className='seller'>zz</div>
              <div className='title'>xx</div>
              <div className='review'>
                <div className='reviewScore'>22</div>
                <div className='reviewCount'>22</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Summary;
