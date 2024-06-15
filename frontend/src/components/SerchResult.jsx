import React from 'react';
import Card from '../components/Card';

function SearchResults({ results }) {
    return (
        <div className="search-results-container">
            {results.length > 0 ? (
                results.map(product => (
                    <div className="search-result-item" key={product.idProduct}>
                        <Card product={product} />
                    </div>
                ))
            ) : (
                <p>No se encontraron productos.</p>
            )}
        </div>
    );
}

export default SearchResults;
