import React from "react";

import { Routes, Route} from 'react-router-dom';
import { useParams } from 'react-router';
import Dashboard from "../pages/Dashborad";
import List from '../pages/Lists';
import Layout from '../components/Layout';


const AppRoutes: React.FC = () => (

    <Layout>
        <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/list/:type" element={<List />} />
        </Routes>
    </Layout>
);

export default AppRoutes;