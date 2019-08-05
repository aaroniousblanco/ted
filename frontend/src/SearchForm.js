import React from 'react';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

const SearchForm = props => (
  <div style={{marginTop: '50px' }}>
    <form onSubmit={e => props.fetchTitles(e)}>
      <Input
        style={{width: '300px', marginRight: '20px'}}
        placeholder="e.g. Forrest Gump"
        onChange={props.setSearchTermInput}
      />
      <Button type="submit">Search by Term</Button>
    </form>
  </div>
);

export default SearchForm;
