import React from 'react';
import FlashMessage from './FlashMessage';
import {connect} from 'react-redux';
import {del as deleteFlashMessage} from '../actions';

class FlashMessagesList extends React.Component {

    render() {
        const {deleteFlashMessage} = this.props;

        const messages = this.props.messages.map(message => <FlashMessage key={message.id} message={message} deleteFlashMessage={deleteFlashMessage}/>);

        return (
            <div>
                {messages}
            </div>
        );
    }
}

FlashMessagesList.propTypes = {
    messages: React.PropTypes.array.isRequired,
    deleteFlashMessage: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {messages: state.flashMessages};
}

export default connect(mapStateToProps, {deleteFlashMessage})(FlashMessagesList);
