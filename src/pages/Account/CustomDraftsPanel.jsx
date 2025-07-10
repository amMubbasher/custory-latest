import React from 'react';
import { observer } from 'mobx-react-lite';
import { useInfiniteAPI } from 'polotno/utils/use-api';
import useAppStore from "../../hooks/useAppStore";
import { SectionTab } from 'polotno/side-panel';
import MdPhotoLibrary from '@meronex/icons/md/MdPhotoLibrary';

import { ImagesGrid } from 'polotno/side-panel/images-grid';
import useTemplate from '../../hooks/useTemplate';
import { DesignServices, WbSunny } from '@mui/icons-material';
import { useGetDrafts } from '../../hooks/useDraft';

export const TemplatesPanel = observer(({ store }) => {
  // load data
 const {getDrafts : {data,isLoading : isLoadingTemplateFetch}} = useGetDrafts();
 const setCurrentEditorProduct = useAppStore(state => state.setCurrentEditorProduct);
 const setCurrentFront = useAppStore(state => state.setCurrentFront);
 const setCurrentBack = useAppStore(state => state.setCurrentBack)
  return (
    <div style={{ height: '100%' }}>
      <ImagesGrid
        shadowEnabled={false}
        images={data}
        getPreview={(item) => item.preview}
        isLoading={isLoadingTemplateFetch}
        onSelect={async (item) => {
          // just inject it into store
          store.loadJSON(item.data);
          setCurrentEditorProduct(item.productId)

        }}
        rowsNumber={2}
      />
    </div>
  );
});

// define the new custom section
export const DraftSection = {
  name: 'My Drafts',
  Tab: (props) => (
    <SectionTab name="My Drafts" {...props}>
      <div className='flex items-center justify-center'>
        <DesignServices  />
      </div>
    </SectionTab>
  ),
  // we need observer to update component automatically on any store changes
  Panel: TemplatesPanel,
};
