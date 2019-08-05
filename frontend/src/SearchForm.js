import React from 'react';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

const SearchForm = ({ setSearchTermInput, fetchTitles }) => (
  <div style={{ marginTop: '50px' }}>
    <form onSubmit={e => fetchTitles(e)}>
      <Input
        style={{ width: '300px', marginRight: '20px' }}
        placeholder="e.g. Forrest Gump"
        onChange={setSearchTermInput}
      />
      <Button type="submit">Search by Movie Title</Button>
    </form>
  </div>
);

SearchForm.propTypes = {
  setSearchTermInput: PropTypes.func.isRequired,
  fetchTitles: PropTypes.func.isRequired,
};

export default SearchForm;
