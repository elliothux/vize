/* eslint-disable react/prop-types */
'use strict';

import React, { Component } from 'react';

import './style.responsive.css';

class Block_0 extends Component {
  render() {
    return (
      <div className="mod">
        <div className="primary" onClick={() => (window.location.href = 'https://tmall.com')}>
          <img
            className="layer"
            src={
              'https://img.alicdn.com/imgextra/i4/O1CN01wlTP9j1rKLNX87sHW_!!6000000005612-2-tps-646-854.png'
            }
          />
          <div className="container">
            <img
              className="largeIcon"
              src={
                'https://img.alicdn.com/imgextra/i2/O1CN01VOOInv1va9VyrETPG_!!6000000006188-2-tps-118-144.png'
              }
            />
            <span className="num">01</span>
            <span className="top">TOP</span>
          </div>
          <img
            className="pic"
            src={
              'https://img.alicdn.com/imgextra/i3/O1CN011kSiIn1aDc5hKWBzw_!!6000000003296-2-tps-184-184.png'
            }
          />
          <div className="block">
            <img
              className="img"
              src={
                'https://img.alicdn.com/imgextra/i1/O1CN01P9xKze1RLYPth2Uch_!!6000000002095-2-tps-244-264.png'
              }
            />
            <div className="outer">
              <img
                className="smallItem"
                src={
                  'https://img.alicdn.com/imgextra/i1/O1CN01mzTSU81MoLEWKrcA7_!!6000000001481-2-tps-226-226.png'
                }
              />
              <div className="priceWrap">
                <span className="price">¥1540</span>
              </div>
            </div>
          </div>
        </div>
        <div className="side">
          <div className="group">
            <span className="title">甜酷女孩粗花羽绒服斩男</span>
            <span className="word">必备C位热门</span>
            <img
              className="txtBg"
              src={
                'https://img.alicdn.com/imgextra/i2/O1CN01uxunyh1cm582TIoUv_!!6000000003642-2-tps-442-60.png'
              }
            />
            <span className="num_1">1292</span>
          </div>
          <div className="container_1" onClick={() => this.props.emit('vote')}>
            <div className="block_1">
              <span className="txt">投给TA</span>
            </div>
            <img
              className="logo"
              src={
                'https://img.alicdn.com/imgextra/i3/O1CN01A1e8K41fUAUEmJ2GF_!!6000000004009-2-tps-282-96.png'
              }
            />
          </div>
        </div>
      </div>
    );
  }
}
export default Block_0;
