// import React, { useEffect, useRef, useState } from "react";
// import { createStore } from "polotno/model/store";
// import { Editor } from "../../components/Editor/Editor";
// import { ArrowForward, ArrowForwardIos, WbSunny } from "@mui/icons-material";
// import Button from "../../components/common/Button";
// import { toast, Toaster } from "react-hot-toast";
// import dataURLtoFile from "../../utils/functions/dataURLToFile";

// import useTemplate from "../../hooks/useTemplate";
// import { useParams } from "react-router-dom";
// import { useGetDraft, useUpdateDraft } from "../../hooks/useDraft";
// import { CircularProgress } from "@mui/material";
// import ErrorState from "../../components/Account/ErrorState";
// import { getFileLink } from "../../utils/functions/generateImageLink";

// const store = createStore({
//   key: "nFA5H9elEytDyPyvKL7T",
//   // showCredit: true,
// });

// const DraftEditor = () => {
//   const headerRef = useRef();
//   const { id } = useParams();
//   const {
//     getDraft: { data: draft, isLoading, error },
//   } = useGetDraft({ id });
//   const { updateDraft } = useUpdateDraft();

//   const [height, setHeight] = useState(window.innerHeight - 70);
//   const [loading, setLoading] = useState(false);
//   useEffect(() => {
//     if (draft) {
//     store.loadJSON(draft?.data);
//     }
//   }, [draft]);
//   const handleSave = async () => {
//     setLoading(true);
//     try {
//       let jsonData = await store.toJSON();
//       const dataURL = await store.toDataURL();
//       let file = dataURLtoFile(dataURL, "testimg");
//       let fileURL = await getFileLink(file);
//       updateDraft.mutate({
//         draftId: id,
//         data: {
//           data: jsonData,
//           preview: fileURL,
//         },
//       });
//     } catch (err) {
//       console.log(err);
//     } finally {
//       setLoading(false);
//     }
//   };
//   if (isLoading)
//     return (
//       <div className="h-[100vh] w-full flex items-center justify-center flex-col">
//         <CircularProgress size={50} color="inherit" className="text-primary" />
//         <div className="text-xl">Getting draft..</div>
//       </div>
//     );
//   if (error)
//     return (
//       <ErrorState
//         error={error?.response?.data?.message || "Something went wrong!"}
//       />
//     );
//   return (
//     <>
//     <Toaster position="top-center"/>
//       <div
//         ref={headerRef}
//         className="py-4 max-md:px-5 max-xs:px-2 relative px-8 flex items-center justify-between"
//       >
//         <div className="text-lg hover:text-black transition-all cursor-pointer max-md:text-base text-primary gap-3 font-semibold flex items-center justify-center">
//           <WbSunny sx={{ xs: 25, sm: 32 }} />
//           <span className="max-md:hidden">Draft Editor</span>
//         </div>
//         <Button
//           onClick={handleSave}
//           className={`py-[7px] max-sm:text-sm max-sm:px-2 px-3 flex items-center gap-3`}
//         >
//           {updateDraft?.isLoading || loading ? (
//             <div>Loading..</div>
//           ) : (
//             <>
//               Save Design
//               <ArrowForwardIos sx={{ fontSize: 20 }} />
//             </>
//           )}
//         </Button>
//       </div>
//       <div style={{ height }} className=" w-full custom-scroll">
//         <Editor store={store} />
//       </div>
//     </>
//   );
// };

// export default DraftEditor;
import React, { useEffect, useRef, useState } from "react";
import { createStore } from "polotno/model/store";
import { Editor } from "./Editor";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Button from "../../components/common/Button";
import useAppStore from "../../hooks/useAppStore";
import { ArrowBackIos, ArrowForward } from "@mui/icons-material";
// import { useUpdateDraft } from "../../hooks/useDraft";
import { toast, Toaster } from "react-hot-toast";
import dataURLtoFile from "../../utils/functions/dataURLToFile";
import { getFileLink } from "../../utils/functions/generateImageLink";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import { useGetDraft, useUpdateDraft } from "../../hooks/useDraft";
import { useNavigate } from "react-router-dom";
import squre from '../../assets/squre.png' 
import { useParams } from "react-router-dom";

// import {square} from "../../assets/squre.png"

const store = createStore({
  key: "nFA5H9elEytDyPyvKL7T",
});

const DraftEditor = ({isLoading,isFirst,handleProceed,currentContent,handlePrev, isLast,currentProduct,currentQuantity}) => {
  const headerRef = useRef(); 
  const [height,setHeight] = useState(window.innerHeight - 70);
  const currentFront = useAppStore(state => state.currentFront);
  const currentBack = useAppStore(state => state.currentBack);
  const currentEditorProduct = useAppStore(state => state.currentEditorProduct);

  const setCurrentFront = useAppStore(state => state.setCurrentFront);
  const setCurrentBack = useAppStore(state => state.setCurrentBack)
  const navigate = useNavigate();
  // const headerRef = useRef();
  const { id } = useParams();
  const {
    getDraft: { data: draft, error },
  } = useGetDraft({ id });
  const { updateDraft } = useUpdateDraft();

  // const [height, setHeight] = useState(window.innerHeight - 70);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (draft) {
    store.loadJSON(draft?.data);
    localStorage.setItem('editorProduct', draft?.productId)
    }
  }, [draft]);
  const handleSave = async () => {
    setLoading(true);
    try {
      let jsonData = await store.toJSON();
      const dataURL = await store.toDataURL();
      let file = dataURLtoFile(dataURL, "testimg");
      let fileURL = await getFileLink(file);
      updateDraft.mutate({
        draftId: id,
        data: {
          data: jsonData,
          preview: fileURL,
        },
      });
    } catch (err) {
      // console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(()=>{
    if (headerRef.current) {
        setHeight(window.innerHeight - headerRef.current.clientHeight - 3); 
    }
  }, [headerRef.current])


  useEffect(() => {
    if (store.pages.length === 0) {
      const frontpage = store.addPage();
      
      frontpage.set({
        background: `${currentFront}?t=${Date.now()}`, 
      });

      frontpage.addElement({
        type: 'image',
        x: 290,
        y: 250,
        locked: true,
        width: 200,
        height: 200,
        src: squre,
      });

      frontpage.addElement({
        type: 'text',
        x: 50,
        y: 50,
        fill: 'black',
        locked: true,
        text: 'Front',
        fontSize: 36
      });

      
      const backpage = store.addPage();
      backpage.set({
        background: `${currentBack}?t=${Date.now()}`, 
      });

      backpage.addElement({
        type: 'image',
        x: 400,
        y: 250,
        locked: true,
        width: 300,
        height: 300,
        src: squre,
      });

      backpage.addElement({
        type: 'text',
        x: 50,
        y: 50,
        fill: 'black',
        locked: true,
        text: 'Back',
        fontSize: 36
      });

    }
  
    if (currentProduct?.title?.toLowerCase()?.includes('card')) {
      store.setSize(408, 616, true);
    }
  }, [currentProduct, currentFront, currentBack]);
  

  const handleContinue = async()=>{
    // let frontblob = store.saveAsImage({ pageId: store.pages[0].id });
    // let backblob = store.saveAsImage({ pageId: store.pages[0].id });
    // console.log(frontblob)
    const frontDataURL = await store.toDataURL({ pageId: store.pages[0].id });
    let frontFile = dataURLtoFile(frontDataURL, 'testimg');
    let frontFileURL = await getFileLink(frontFile);
    setCurrentFront(frontFileURL)
    const backDataURL = await store.toDataURL({ pageId: store.pages[1].id });
    let backFile = dataURLtoFile(backDataURL, 'testimg');
    let backFileURL = await getFileLink(backFile);
    setCurrentBack(backFileURL);

    navigate(`/shirtdetail/${currentEditorProduct}`);
    // let jsonData = store.toJSON();
    // console.log(jsonData)
    // handleProceed(jsonData);
    // let ids = store.pages.map(p=>p.id);
    // if (currentContent) {
    //   store.fromJSON(currentContent); 
    // }else {
    // store.deletePages(ids);
    // store.addPage(); 
    // }
  }

  // const {updateDraft} = useUpdateDraft();
  const [imgLoading,setImgLoading] = useState(false);

  const handleDraftSave = async()=>{
    if (updateDraft.isLoading) return; 
    if (imgLoading) return;
    const draftId = crypto.randomUUID();
    setImgLoading(true);

    try {
    const jsonContent = await store.toJSON();
    const dataURL = await store.toDataURL();
    let file = dataURLtoFile(dataURL, 'testimg');
    let fileURL = await getFileLink(file);
    let draftproductId = currentEditorProduct

    updateDraft.mutate({
      draftId,
      data : {
        data : jsonContent,
        preview : fileURL,
        currentEditorProduct: currentEditorProduct
      }
    });
  }catch(err) {
    toast.error(err?.response?.data?.message || 'Something went wrong!');
  }finally {
    setImgLoading(false);
  }
  }

  

  return (
    <>
    <Header/>
    <Toaster position="top-center"/>
      <div ref={headerRef} className="max-md:px-5 max-xs:px-2 relative px-8 flex items-center justify-between">
        <div className="text-lg hover:text-black transition-all cursor-pointer max-md:text-base text-primary gap-3 font-semibold flex items-center justify-center">
            <WbSunnyIcon sx={{xs : 25,sm: 32}}/>
            <span className="max-md:hidden">Custory Editor</span><span className="text-black hidden max-md:flex font-[400]"></span>
        </div>
        {/* <div className="absolute left-[50%] -translate-x-[50%] max-md:hidden">Designing {currentProduct?.title} ({currentQuantity})</div> */}
        <div className="flex items-center gap-3">
          {/* <IconButton disabled={isFirst} onClick={handlePrev}>
            <ArrowBackIos/>
          </IconButton> */}
        <div onClick={handleDraftSave} className="underline cursor-pointer mr-2">{(updateDraft.isLoading || imgLoading)?'Saving..':'Save as draft'}</div>
        <Button  onClick={handleContinue} className={`py-[7px] max-sm:text-sm max-sm:px-2 px-3 flex items-center gap-3`}>
          {isLoading?<div>Loading..</div>:<>{isLast?'Checkout':'Return back to finish order'}<ArrowForward sx={{fontSize: 20}}/></>}
        </Button>
        </div>
      </div>
      <div style={{height}} className=" w-full custom-scroll">
        <Editor handleContinue={handleContinue} store={store} />
      </div>
      <Footer />
    </>
  );
};

export default DraftEditor;