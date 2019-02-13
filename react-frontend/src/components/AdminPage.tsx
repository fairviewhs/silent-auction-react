import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import AdminLogin from './AdminLogin';
import CreateAuction from './CreateAuction';

export interface AdminPageProps {
  isLoggedInAdmin: boolean;
}

class AdminPage extends Component<AdminPageProps, any> {
  public render() {
    return (
      <Fragment>
        {
          !this.props.isLoggedInAdmin &&
          <AdminLogin />
        }
        {
          this.props.isLoggedInAdmin &&
          <CreateAuction />
        }
      </Fragment>
    );
  }
}

const mapStateToProps = (state: any) => ({
  isLoggedInAdmin: !!state.admin.token
})

export default connect(mapStateToProps)(AdminPage);