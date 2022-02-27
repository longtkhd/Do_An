import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { SearchBoxWapper } from './CustomStyled';

const SearchBox = ({ placeholder, onChange, value }: any) => {
  return (
    <SearchBoxWapper>
      <div className="form-group">
        <input
          className="ant-input"
          type="search"
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
        <span className="search-icon">
          <SearchOutlined />
        </span>
      </div>
    </SearchBoxWapper>
  );
};
export default SearchBox;
