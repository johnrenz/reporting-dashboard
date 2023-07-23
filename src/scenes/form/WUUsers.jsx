import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { AddEditWUUser } from './AddEditWUUser';

function WUUsers({ match }) {
    const { path } = match;
    
    return (
        <Routes>
            <Route path={`${path}/add`} component={AddEditWUUser} />
            <Route path={`${path}/edit/:username`} component={AddEditWUUser} />
        </Routes>
    );
}

export { WUUsers };