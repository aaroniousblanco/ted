import React from 'react';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

const SearchForm = props => {
    return (
        <div>
        <form onSubmit={(e) => props.fetchTitles(e)}>
            <Input placeholder="e.g. Forrest Gump"
            
            onChange={props.setSearchTermInput}
            />
            <Button type="submit">Search by Term</Button>
        </form>
        <div>
            
            <div className="search-results">
                
            </div>
        </div>
    </div>
    );
}

export default SearchForm;