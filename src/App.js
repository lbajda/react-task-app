import React from 'react';
import PageTitle from './components/PageTitle';
import AppHeader from './components/AppHeader';
import AppContent from './components/AppContent';
import styles from './styles/modules/app.module.scss';

function App() {
  return (
    <div className="container px-4 lg:px-8 mx-auto">
      <PageTitle>TODO List</PageTitle>
      <div className={styles.app__wrapper}>
        <AppHeader />
        <AppContent />
      </div>
    </div>
  );
}

export default App;
