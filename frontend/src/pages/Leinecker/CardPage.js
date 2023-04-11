import React from 'react';

import PageTitle from '../../components/Leinecker/PageTitle';
import LoggedInName from '../../components/Leinecker/LoggedInName';
import CardUI from '../../components/Leinecker/CardUI';

const CardPage = () =>
{
    return(
        <div>
            <PageTitle />
            <LoggedInName />
            <CardUI />
        </div>
    );
}
export default CardPage;