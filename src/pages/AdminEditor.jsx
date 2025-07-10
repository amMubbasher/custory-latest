import React, { useEffect, useRef, useState } from "react";
import { createStore } from "polotno/model/store";
import { Editor } from "../components/Editor/Editor";
import { ArrowForward, ArrowForwardIos, WbSunny } from "@mui/icons-material";
import Button from "../components/common/Button";
import { toast } from "react-hot-toast";
import dataURLtoFile from "../utils/functions/dataURLToFile";
import { getFileLink } from "../utils/functions/generateImageLink";
import useTemplate from "../hooks/useTemplate";

const store = createStore({
  key: "nFA5H9elEytDyPyvKL7T",
  // showCredit: true,
});

const AdminEditor = () => {
    const headerRef = useRef();
    const [isAuthorized,setIsAuthorized] = useState(false);
    const {createTemplate,isLoadingCreateTemplate} = useTemplate({
      createTemplateSuccessCallback : (data)=> {
        toast.success('Template has been added successfully!');
        let pageIds = store.pages.map(p=>p.id);
        store.deletePages(pageIds);
        store.addPage();
      },
      createTemplateErrorCallback : (error)=>{
        toast.error(`Something went wrong!`)
      }
    });
    const [height,setHeight] = useState(window.innerHeight - 70);
    const [loading,setLoading] = useState(false);
    const handleSave = async()=>{
        try {
        setLoading(true);
        const dataURL = await store.toDataURL();
        let file = dataURLtoFile(dataURL, 'testimg');
        let fileURL = await getFileLink(file);
        setLoading(false);
        let json = store.toJSON();
        
        createTemplate({
          data : {
            title : 'New Template',
            json,
            preview : fileURL
          }
        })
        
        }catch(err) {
            // console.log(err);
            toast.error('Something went wrong');
        }finally {
          setLoading(false)
        }

    }
    const [isAsked,setIsAsked] = useState(false);

    useEffect(()=>{
      setIsAsked(true);
      if (!isAuthorized && !isAsked) {
        let username = prompt("Enter username")
        let password = prompt("Enter password password")
        if (username === 'admin@sunshinejoy' && password === 'admin') {
          setIsAuthorized(true);
        }
        else {
          alert('Invalid password or username. Refresh to try again!')
        }
      }
    }, [])

    if (!isAuthorized) return null;
  return (
    <>
      <div
        ref={headerRef}
        className="py-4 max-md:px-5 max-xs:px-2 relative px-8 flex items-center justify-between"
      >
        <div className="text-lg hover:text-black transition-all cursor-pointer max-md:text-base text-primary gap-3 font-semibold flex items-center justify-center">
          <WbSunny sx={{ xs: 25, sm: 32 }} />
          <span className="md:hidden">Sunshine Joy Admin</span>
        </div>
        <Button
          onClick={handleSave}
          className={`py-[7px] max-sm:text-sm max-sm:px-2 px-3 flex items-center gap-3`}
        >
          {(isLoadingCreateTemplate || loading) ? (
            <div>Loading..</div>
          ) : (
            <>
              Save Design
              <ArrowForwardIos sx={{ fontSize: 20 }} />
            </>
          )}
        </Button>
      </div>
      <div style={{ height }} className=" w-full custom-scroll">
        <Editor store={store} />
      </div>
    </>
  );
};

export default AdminEditor;
