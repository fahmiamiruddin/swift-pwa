import React from 'react';
import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Core from '@core_modules/produkku/pages/default/core';

const DefaultPage = (props) => (
    <Core
        {...props}
    />
);

DefaultPage.getInitialProps = async () => ({ namespacesRequired: [] });

export default withApollo({ ssr: true })(withTranslation()(DefaultPage));
