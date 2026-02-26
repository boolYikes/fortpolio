import { HashRouter, Routes, Route } from 'react-router-dom'
import Layout from '../layout/Layout.tsx'
import ProjectListPage from '../../pages/ProjectListPage.tsx'
import ProjectDetailPage from '../../pages/ProjectDetailPage.tsx'

export default function AppRouter() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<ProjectListPage />} />
          <Route path="/project/:id" element={<ProjectDetailPage />} />
        </Routes>
      </Layout>
    </HashRouter>
  )
}
