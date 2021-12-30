import { TabScreen } from 'navigation/types';
import React from 'react';

import { DiscoverFeed } from './DiscoverFeed';

const DiscoverTab: TabScreen<'Discover'> = () => {
  return <DiscoverFeed key="Discover" />;
};

export default DiscoverTab;
