import React from 'react';
import { Container } from 'reactstrap';
import { Link } from 'react-router';

class ReadmeTemporary extends React.Component {
  render () {
    return (
      <Container>
        <Link to="/thesaurus">Thesaurus</Link><br />
        Read the <a href="#" target="_blank">documentation</a>
      </Container>
    );
  }
}

export default ReadmeTemporary;
