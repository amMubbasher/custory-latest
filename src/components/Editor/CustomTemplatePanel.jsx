import React from 'react';
import { observer } from 'mobx-react-lite';
import { useInfiniteAPI } from 'polotno/utils/use-api';

import { SectionTab } from 'polotno/side-panel';
import MdPhotoLibrary from '@meronex/icons/md/MdPhotoLibrary';

import { ImagesGrid } from 'polotno/side-panel/images-grid';
import useTemplate from '../../hooks/useTemplate';
import { WbSunny } from '@mui/icons-material';

export const TemplatesPanel = observer(({ store }) => {
  // load data
 const {templates : data, isLoadingTemplateFetch} = useTemplate();

  return (
    <div style={{ height: '100%' }}>
      {/* <ImagesGrid
        shadowEnabled={false}
        images={data}
        getPreview={(item) => item.preview}
        isLoading={isLoadingTemplateFetch}
        onSelect={async (item) => {
        
          // just inject it into store
          store.loadJSON(item.json);
        }}
        rowsNumber={2}
      /> */}
    </div>
  );
});

// define the new custom section
export const TemplatesSection = {
  name: 'custom-templates',
  Tab: (props) => (
    <SectionTab name="Custom" {...props}>
      <div className='flex items-center justify-center'>
        <WbSunny  />
      </div>
    </SectionTab>
  ),
  // we need observer to update component automatically on any store changes
  Panel: TemplatesPanel,
};
