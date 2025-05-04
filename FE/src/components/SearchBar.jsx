import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Dùng axios để gọi API

function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (query.trim() === '') {
        setResults([]);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8080/api/search?q=${query}`);
        setResults(response.data); // Giả sử API trả về danh sách JSON
      } catch (error) {
        console.error('Lỗi khi tìm kiếm:', error);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchData();
    }, 300); // Chờ 300ms sau khi người dùng ngưng gõ mới gọi API (chống spam server)

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <div>
      <input
        type="text"
        placeholder="Tìm kiếm..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul>
        {results.map((item, index) => (
          <li key={index}>{item.name}</li> // Ví dụ mỗi item có field "name"
        ))}
      </ul>
    </div>
  );
}

export default SearchBar;