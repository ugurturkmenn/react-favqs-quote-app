import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchQuote } from '../../store/quoteSlice';
import { RootState, AppDispatch } from '../../store/store';

const QuoteViewer: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { quote, author, loading, error } = useSelector((state: RootState) => state.quote);

  useEffect(() => {
    dispatch(fetchQuote());
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <p>{quote}</p>
      <h5>- {author}</h5>
      <button onClick={() => dispatch(fetchQuote())}>Get Another Quote</button>
    </div>
  );
};

export default QuoteViewer;
