import React, { useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import ImageBox from './component/ImageBox';

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [imageList, setImageList] = useState<string[]>([]);

  return (
    <div className='container'>
      <div className='initial-box'>
        {
          imageList.length === 0 &&
          <div className='text-center'>
            이미지가 없습니다.<br/>
            이미지를 추가해주세요
          </div>
        }
        <input type="file" ref={inputRef}
          onChange = {event => {
            if(event.currentTarget.value) {
              const v = event.currentTarget.value;
              setImageList(prev => [...prev, v])
            }
          }}
        />
        <div className='plus-box'
          onClick = {() => {
            inputRef.current?.click()
          }}
        >
          +
        </div>
        {
          imageList.map((el, idx) => <ImageBox key={el + idx} src={el}/>)
        }
      </div>
    </div>
  );
}

export default App;
