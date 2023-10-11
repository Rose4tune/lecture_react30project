import React, { useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import ImageBox from './component/ImageBox';

function App() {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className='container'>
      <div className='initial-box'>
          <div className='text-center'>
            이미지가 없습니다.<br/>
            이미지를 추가해주세요
          </div>
        <input type="file" ref={inputRef}/>
        <div className='plus-box'
          onClick = {() => {
            inputRef.current?.click()
          }}
        >
          +
        </div>
      </div>
    </div>
  );
}

export default App;
