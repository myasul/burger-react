import React, { Component, Fragment } from 'react';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrapperComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(request => {
                this.setState({
                    error: null
                });
                return request;
            });
            this.resInterceptor = axios.interceptors.response.use(response => response,
                error => {
                    this.setState({
                        error: error
                    })
                    return Promise.reject(error);
                });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        modalVisibilityHandler = () => {
            this.setState({
                error: null
            })
        }

        render() {
            return (
                <Fragment>
                    <Modal displayModal={this.state.error} close={this.modalVisibilityHandler}>
                        <p style={{ textAlign: 'center' }}>
                            {this.state.error ? this.state.error.message : null}
                        </p>
                    </Modal>
                    <WrapperComponent {...this.props} />
                </Fragment>
            )
        }
    }
}

export default withErrorHandler;