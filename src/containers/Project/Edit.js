import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Description, EditSection } from './Description';
import { StyledArticle } from './components';
import { Header } from './Header';
import { Loader } from '../../components/Loader';
import { SideBar } from './SideBar';
import { Publisher } from './SideBar/Publisher';

export const GET_PROJECT = gql`
  query project {
    project @client {
      amount
      category
      description
      id
      isPublished
      logoUrl
      paymentAddress
      projectImageUrl
      title
      txHash
      isOwner
    }
  }
`;

export class Project extends Component {
  render() {
    const { requestNetwork } = this.props;
    return (
      <Query query={GET_PROJECT}>
        {({ data, loading }) => {
          if (loading) {
            return <Loader />;
          }
          if (!data) {
            return <div />;
          }
          return (
            <Fragment>
              <Header project={data.project} />
              <StyledArticle>
                <Description project={data.project}>
                  <EditSection
                    projectId={data.project.id}
                    description={data.project.description}
                  />
                </Description>
                <SideBar>
                  <Publisher
                    requestNetwork={requestNetwork}
                    project={data.project}
                  />
                </SideBar>
              </StyledArticle>
            </Fragment>
          );
        }}
      </Query>
    );
  }
}