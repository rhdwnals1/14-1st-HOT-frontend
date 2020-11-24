import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './OverView.scss';
import Slider from 'react-slick';
import SelectOption from './SelectOption/SelectOption';
import PrevArrow from '../../../component/Slick/PrevArrow';
import NextArrow from '../../../component/Slick/NextArrow';

class Summary extends Component {
  constructor() {
    super();
    this.state = {
      sale: 10,
      lowestPrice: 0,
      coverImageSrc: '',
      productList: [],
      selectedProducts: [],
    };
  }

  componentDidMount() {
    this.getProductList();
  }

  getProductList = () => {
    fetch('/Data/productDetailView.json', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          productList: result.result[0],
          coverImageSrc: result.result[0].product_images[0],
          lowestPrice: result.result[0].details[0].price,
        });
      });
  };

  getSelectedProduct = (e) => {
    const { options, selectedIndex, value } = e.target;
    const selectedProducts = [...this.state.selectedProducts];
    if (
      selectedProducts.some(
        (ele) => ele.label === options[selectedIndex].innerHTML
      )
    ) {
      alert('이미 선택한 옵션입니다.');
    } else {
      selectedProducts.push({
        label: options[selectedIndex].innerHTML,
        value: value,
        count: 1,
      });
      this.setState({
        selectedProducts,
      });
    }
  };

  getProductCount = (targetProduct, countString) => {
    const countNumber = parseInt(countString);
    const selectedProducts = [...this.state.selectedProducts];
    const index = selectedProducts.indexOf(targetProduct);
    selectedProducts[index].count = countNumber;
    this.setState({ selectedProducts });
  };

  changeCoverImage = (e) => {
    this.setState({ coverImageSrc: e.target.src });
  };
  handleDeleteProduct = (targetIndex) => {
    const selectedProductsIndex = this.state.selectedProducts.filter(
      (_, index) => index !== targetIndex
    );
    this.setState({ selectedProducts: selectedProductsIndex });
  };

  render() {
    const settings = {
      arrows: true,
      className: 'center',
      centerMode: true,
      infinite: true,
      centerPadding: '60px',
      slidesToShow: 1,
      speed: 500,
      rows: 1,
      slidesPerRow: 1,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
    };

    const {
      seller,
      product_name,
      product_images,
      number_of_reviews,
      number_of_product_bookmarks,
      number_of_shares,
    } = this.state.productList;
    const {
      sale,
      lowestPrice,
      productList,
      coverImageSrc,
      selectedProducts,
    } = this.state;
    const {
      changeCoverImage,
      getSelectedProduct,
      getProductCount,
      handleDeleteProduct,
    } = this;
    const salePrice = Math.floor(lowestPrice - (lowestPrice * sale) / 100);
    return (
      <>
        <div className='overview'>
          <div className='overviewBox'>
            <div className='category'>
              {'가구'} {'>'} {'소파/거실가구'} {'>'} {'소파'} {'>'} {'일반소파'}
            </div>
            <div className='overviewCover'>
              <div className='coverImagesBox'>
                <div className='coverImageListBox'>
                  {product_images &&
                    product_images.map((coverImageList, coverImageIndex) => (
                      <button key={coverImageIndex} className='coverImageBox'>
                        <img
                          src={coverImageList}
                          alt='coverImage'
                          className='miniCoverImage'
                          onMouseOver={changeCoverImage}
                        />
                      </button>
                    ))}
                </div>
                <div className='coverImageWrap'>
                  <img
                    src={coverImageSrc}
                    alt='coverImage'
                    className='coverImage'
                  />
                </div>
              </div>
              <div className='overViewList'>
                <div className='seller'>{seller}</div>
                <div className='title'>{product_name}</div>
                <div className='spaceReviewBox'>
                  <div className='reviewBox'>
                    <div className='reviewScore'>
                      <div className='scoreBox'>
                        <img
                          src='/images/fivestars.png'
                          className='scoreImage'
                          alt='stars'
                        />
                      </div>
                      <div className='reviewCount'>
                        {number_of_reviews && number_of_reviews}
                        {'개 리뷰'}
                      </div>
                    </div>
                    <div className='scrapBox'>
                      <div className='bookMarkBox'>
                        <img
                          src='/images/bookmark.png'
                          className='bookmarkImage'
                          alt='bookmarkImage'
                        />
                        <div className='bookmarkCount'>
                          {number_of_product_bookmarks &&
                            number_of_product_bookmarks
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        </div>
                      </div>
                      <div className='shareBox'>
                        <img
                          src='/images/share.png'
                          className='shareImage'
                          alt='shareImage'
                        />
                        <div className='shareCount'>
                          {number_of_shares &&
                            number_of_shares
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='priceBox'>
                    <div className='priceBar'>
                      <div className='sale'>
                        <div className='salePercent'>{sale}</div>
                        <div className='percent'>{'%'}</div>
                      </div>
                      <div className='price'>
                        <div className='prevPrice'>
                          {Math.floor(lowestPrice && lowestPrice)
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        </div>
                        <div className='currentPriceBox'>
                          <div className='currentPrice'>
                            {salePrice
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          </div>
                          <div className='won'>{'원'}</div>
                        </div>
                      </div>
                      <div className='lowestPrice'>
                        <img
                          src='/images/lowprice.png'
                          className='lowestPriceImage'
                          alt='lowprice'
                        />
                      </div>
                    </div>
                    <div className='couponPrice'>
                      <div className='earlybirdSalePrice'>
                        {Math.floor(lowestPrice - lowestPrice / sale - 20000)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      </div>
                      <div className='won'>{'원'}</div>
                      <div className='earlybirdSalePriceView'>
                        {'첫구매할인가 '}
                        {'>'}
                      </div>
                    </div>
                    <div className='reserveBox'>
                      <div className='reserveText'>
                        <span class='reservePoint'>
                          {Math.floor((lowestPrice - lowestPrice / sale) / 100)
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        </span>{' '}
                        {'적립해드립니다.'}
                      </div>
                      <div className='reserveAddPoint'>
                        <img
                          src='/images/gold.svg'
                          className='gold'
                          alt='gold'
                        />
                        {'100만원 이상 구매시 20,000P 추가 적립'}
                      </div>
                      <div className='interestFreePoint'>
                        {'월'}{' '}
                        {Math.floor((lowestPrice - lowestPrice / sale) / 7)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                        {'(7개월)'} {'무이자할부 >'}
                      </div>
                    </div>
                    <div className='deliveryInfoBox'>
                      <div className='deliveryInfo'>
                        <div className='deliveryMethod'>업체직접배송</div>
                        <div className='line'> | </div>
                        <div className='deliverySchedul'>15일 이내 배송</div>
                      </div>
                      <div className='deliveryStickyBox'>
                        <img
                          src='/images/freedelivery.png'
                          className='deliverySticky'
                          alt='freeDelivery'
                        />
                      </div>
                      <ul className='precautions'>
                        <li className='precautionsList'>
                          ∙ 조건에 따라 추가 비용 발생 가능 (상품 상세 정보
                          참고)
                        </li>
                        <li className='precautionsList'>
                          ∙ 제주도/도서산간 지역 배송 불가{' '}
                        </li>
                      </ul>
                    </div>
                    <div className='brandHome'>
                      <div className='brandIconBox'>
                        <img
                          src='/images/brandIcon.png'
                          className='brandHomeIcon'
                          alt='branIcon'
                        />
                      </div>
                      <Link to='/' className='linkReset brandName'>
                        {seller + ' 브랜드홈'}
                      </Link>
                    </div>
                    <SelectOption
                      giveProductInfo={productList}
                      giveSelectedProducts={selectedProducts}
                      takeSelectedProducts={getSelectedProduct}
                      takeSelectedProductsValue={getProductCount}
                      takeSelectedProductsDelIndex={handleDeleteProduct}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='menuTab'>
          <div className='menuTabContainer'>
            <div className='flexmenuTabContainer'>
              <div className='productInfo'>상품정보</div>
              <div className='review'>리뷰</div>
              <div className='question'>문의</div>
              <div className='delivery'>배송/환불</div>
              <div className='recommant'>추천</div>
            </div>
          </div>
          <div className='smallSelectOptionContainer'>
            <div className='feedContainer'>
              <div className='feedTitleBox'>
                <div className='feedTitle'>유저 스타일링 샷</div>
              </div>
              <div className='userPostContainer'>
                <Slider {...settings}>
                  <div class='feedBox'>
                    <img
                      src='images/samplebed1.jpg'
                      alt='feedBox'
                      className='feed'
                    />
                  </div>
                  <div class='feedBox'>
                    <img
                      src='images/samplebed2.jpg'
                      alt='feedBox'
                      className='feed'
                    />
                  </div>
                  <div class='feedBox'>
                    <img
                      src='images/samplebed3.jpg'
                      alt='feedBox'
                      className='feed'
                    />
                  </div>
                  <div class='feedBox'>
                    <img
                      src='images/samplebed4.jpg'
                      alt='feedBox'
                      className='feed'
                    />
                  </div>
                </Slider>
              </div>
              <div className='feedTextContainer'>
                <div className='feedTextTop'>상품정보</div>
                <div className='feedText'>
                  배송까지 최대 15일 (주말과 공휴일 제외) 소요됩니다.
                </div>
                <div className='feedText'>
                  주문확인 이후에는 구매 취소와 배송지 변경이 불가합니다.
                </div>
              </div>
              <div className='menuTabViewContainer'>
                <img src='/images/productInfo1.png' alt='sample' width='100%' />
                <img src='/images/productInfo2.png' alt='sample' width='100%' />
                <img src='/images/productInfo3.png' alt='sample' width='100%' />
              </div>
            </div>
            <div className='selectOptionContainer'>
              <div className='stickyContainer'>
                <SelectOption
                  giveProductInfo={productList}
                  giveSelectedProducts={selectedProducts}
                  takeSelectedProducts={getSelectedProduct}
                  takeSelectedProductsValue={getProductCount}
                  takeSelectedProductsDelIndex={handleDeleteProduct}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Summary;
