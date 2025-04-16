import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css';

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <h1>404</h1>
      <p>Sayfa bulunamadı</p>
      <Link to="/">Ana Sayfaya Dön</Link>
    </div>
  );
};

export default NotFoundPage;