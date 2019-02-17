import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import AdminLogin from './AdminLogin';
import CreateAuction from './CreateAuction';
import SponsorForm from './SponsorForm';
import { fetchAuctions } from '../actions/auction';

export interface AdminPageProps {
  isLoggedInAdmin: boolean;
  fetchAuctions: () => any;
}

class AdminPage extends Component<AdminPageProps, any> {

  private getAuctionInterval: NodeJS.Timeout | null = null;

  getAuction = () => this.props.fetchAuctions();

  componentDidMount() {
    this.getAuction()//.then(() => console.log('done'));
    this.getAuctionInterval = setInterval(this.getAuction, 5000);
  }

  componentWillUnmount() {
    if (!!this.getAuctionInterval) {
      clearInterval(this.getAuctionInterval);
    }
  }

  public render() {
    return (
      <Fragment>
        {
          !this.props.isLoggedInAdmin &&
          <AdminLogin />
        }
        {
          this.props.isLoggedInAdmin &&
          <Fragment>
            <CreateAuction />
            <SponsorForm />
            <Results />
          </Fragment>
        }
      </Fragment>
    );
  }
}

const mapStateToProps = (state: any) => ({
  isLoggedInAdmin: !!state.admin.token
});

const mapDispatchToProps = {
  fetchAuctions
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);