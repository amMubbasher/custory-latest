import { useCallback } from "react";
import useAppStore from '../../hooks/useAppStore';
import { useDropzone } from "react-dropzone";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { MdOutlineFileDownload, MdOutlineModeEdit, MdDeleteOutline } from "react-icons/md";

const UploadDesign = ({ selectedColor,productData,setIsCustomUpload, isFrontSide, isBackSide, printingType }) => {
  const frontUploadedImage = useAppStore(state => state.frontUploadedImage);
  const setFrontUploadedImage = useAppStore(state => state.setFrontUploadedImage);
  const backUploadedImage = useAppStore(state => state.backUploadedImage);
  const setBackUploadedImage = useAppStore(state => state.setBackUploadedImage);
  const frontUploadedLogo = useAppStore(state => state.frontUploadedLogo)
  const setFrontUploadedLogo = useAppStore(state => state.setFrontUploadedLogo)
  const backUploadedLogo = useAppStore(state => state.backUploadedLogo)
  const setBackUploadedLogo = useAppStore(state => state.setBackUploadedLogo)
  const setHasUnsavedChanges = useAppStore(state => state.setHasUnsavedChanges);

  const handleFrontUploadLogo = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      const imageUrl = URL.createObjectURL(file);
      setFrontUploadedLogo(imageUrl);
      setHasUnsavedChanges(true);
      setIsCustomUpload(true);
    },
    [setFrontUploadedLogo]
  );

  const handleBackUploadLogo = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      const imageUrl = URL.createObjectURL(file);
      setBackUploadedLogo(imageUrl);
      setHasUnsavedChanges(true);
      setIsCustomUpload(true);
    },
    [setBackUploadedLogo]
  );

  const handleFrontImageUpload = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      const imageUrl = URL.createObjectURL(file);
      setFrontUploadedImage(imageUrl);
      setHasUnsavedChanges(true);
      setIsCustomUpload(true);
    },
    [setFrontUploadedImage]
  );

  const handleBackImageUpload = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      const imageUrl = URL.createObjectURL(file);
      setBackUploadedImage(imageUrl);
      setHasUnsavedChanges(true);
      setIsCustomUpload(true);
    },
    [setBackUploadedImage]
  );

  function handleDownload(url, filename) {
    fetch(url, {
      method: "GET",
      headers: {},
    })
      .then((response) => response.blob())
      .then((blob) => {
        // Create a new URL for the blob
        const blobUrl = window.URL.createObjectURL(blob);
        // Create a temporary anchor element
        const link = document.createElement("a");
        link.href = blobUrl;
        link.setAttribute("download", filename);
        // Append the anchor to the body, click it, and then remove it
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((e) => console.error("Error downloading file:", e));
  }

  const frontLogo = useDropzone({accept: { "image/*": [".jpeg", ".jpg", ".png"] }, onDrop: handleFrontUploadLogo});
  const backLogo = useDropzone({accept: { "image/*": [".jpeg", ".jpg", ".png"] }, onDrop: handleBackUploadLogo});
  const frontDropzone = useDropzone({accept: { "image/*": [".jpeg", ".jpg", ".png"] }, onDrop: handleFrontImageUpload});
  const backDropzone = useDropzone({accept: { "image/*": [".jpeg", ".jpg", ".png"] }, onDrop: handleBackImageUpload});

  const dropzoneStyle = {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#000",
    borderStyle: "rounded",
    padding: "0.5rem",
    textAlign: "center",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    width: "100%",
  };

  function handleDownload(url, filename) {
    fetch(url, {
      method: "GET",
      // Include credentials if needed, for example, for authenticated requests
      // credentials: 'include',
      headers: {
        // If your server expects specific headers, include them here
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.blob();
      })
      .then((blob) => {
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((e) => console.error("Error downloading file:", e));
  }

  return (
    <div className="flex items-center justify-around my-5 gap-2.5 w-full max-md:flex-wrap">
      <div className={`bg-[#FFF9F2] w-full p-[10px] rounded-[16px] h-[508px] ${(!isFrontSide || (printingType && printingType.front === '')) && "cursor-not-allowed bg-gray-300"}`}
        data-tooltip-html={(!isFrontSide || (printingType && printingType.front === '')) 
          ? `<div class="text-start max-sm:text-xs text-sm p-2">
              <p class="font-bold mb-1">Choose 'Front Print' in Section 2, then:</p>
              <ol class="list-decimal">
                <li>Select a printing type in Section 3.</li>
                <li>Enable this section after completing the above steps.</li>
              </ol>
            </div>`
        : null
        }
        data-tooltip-id="tooltip-message-front"
      >
        <div className="flex items-center justify-between">
          <span className="text-sm">Front Print</span>
          <span className="flex justify-between items-center gap-2">
            <MdOutlineFileDownload />
            <button
              type="button"
              disabled={(!isFrontSide || (printingType && printingType.front === ''))}
              className="text-sm text-center underline font-normal underline-offset-2 outline-none disabled:cursor-not-allowed"
              onClick={(e) => {
                e.preventDefault(); // Prevent the default anchor behavior
                let imageUrl = `https://custorybucket.s3.ap-southeast-1.amazonaws.com/Products/${productData.id}/${selectedColor}/front.jpg`;
                imageUrl = imageUrl + "?timestamp=" + new Date().getTime();
                handleDownload(imageUrl, "FrontTemplate.jpg");
              }}
            >
              Download Template
            </button>
          </span>
        </div>
        <div className="flex items-center justify-between my-[10px]">
          <span className="text-sm font-normal">
            Upload Design <b>Without</b> template
          </span>
          {frontUploadedLogo && (
            <div className="flex items-center gap-1">
              <input {...frontLogo.getInputProps()} />
              <button
                {...frontLogo.getRootProps({ style: {} })}
                className="text-sm mr-1.5 flex items-center text-[#FF6600] outline-none"
              >
                <MdOutlineModeEdit />
                Edit
              </button>
              <button
                className="text-sm flex items-center text-[#FF0000] outline-none"
                onClick={() => {
                  setFrontUploadedLogo(null);
                  setHasUnsavedChanges(backUploadedLogo ? true : false);
                  setIsCustomUpload(backUploadedLogo ? true : false);
                }}
              >
                <MdDeleteOutline size={17} />
                Reset
              </button>
            </div>
          )}
        </div>
        <div className="rounded-[6px] flex items-center gap-2 h-[42px]">
          {frontUploadedLogo ? (
            <>
              <img src={frontUploadedLogo} alt="Logo" width="38" height="26" />
              <span className="text-xs font-medium">73051797092.png</span>
            </>
          ) : (
            <div className="ml-6 max-sm:mx-auto">
              <input {...frontLogo.getInputProps()} disabled={(!isFrontSide || (printingType && printingType.front === ''))} className="disabled:cursor-not-allowed" />
              <button disabled={(!isFrontSide || (printingType && printingType.front === ''))}
                {...frontLogo.getRootProps({ style: dropzoneStyle })}
                className="text-gray-500 w-[165px] h-[32px] flex items-center justify-between outline-none disabled:cursor-not-allowed"
              >
                <p>Upload your own design</p>
              </button>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between my-[10px]">
          <span className="text-sm font-normal">
            Upload Design <b>With</b> template
          </span>
          {frontUploadedImage && (
            <div className="flex items-center gap-1">
              <input {...frontDropzone.getInputProps()} />
              <button
                {...frontDropzone.getRootProps({ style: {} })}
                className="text-sm mr-1.5 flex items-center text-[#FF6600] outline-none"
              >
                <MdOutlineModeEdit />
                Edit
              </button>
              <button
                className="text-sm flex items-center text-[#FF0000] outline-none"
                onClick={() => {
                  setFrontUploadedImage(null);
                  setHasUnsavedChanges(backUploadedImage ? true : false);
                  setIsCustomUpload(backUploadedImage ? true : false);
                }}
              >
                <MdDeleteOutline size={17} /> Reset
              </button>
            </div>
          )}
        </div>

        {frontUploadedImage ? (
          <div className="flex relative justify-center items-center rounded-[6px] mt-[10px] h-[300px] w-full overflow-hidden">
            <img
              src={frontUploadedImage}
              alt="Product"
              className="w-full h-full object-contain"
            />
          </div>
        ) : (
          <div className="rounded-[6px] flex items-center gap-2 h-[42px]">
            <div className="ml-6 max-sm:mx-auto">
              <input {...frontDropzone.getInputProps()} disabled={(!isFrontSide || (printingType && printingType.front === ''))} className="disabled:cursor-not-allowed" />
              <button disabled={(!isFrontSide || (printingType && printingType.front === ''))}
                {...frontDropzone.getRootProps({ style: dropzoneStyle })}
                className="text-gray-500 w-[165px] h-[32px] flex items-center justify-between outline-none disabled:cursor-not-allowed"
              >
                <p className="mr-1">Upload your own design</p>
                <IoIosInformationCircleOutline
                    data-tooltip-html="
                    <div class='text-start max-sm:text-xs text-sm p-2 max-sm:max-w-[320px]'>
                        <ol class='list-decimal'>
                          <li>Download our product template from the provided link.</li>
                          <li>Ensure your designs follow our product template guidelines.</li>
                          <li>Upload your finalized design files.</li>
                        </ol>
                    </div>"
                    data-tooltip-id="my-tooltip-front"
                    className="ml-2 cursor-pointer"
                ></IoIosInformationCircleOutline>
                <ReactTooltip id="my-tooltip-front" place="bottom" />
              </button>
            </div>
          </div>
        )}
      </div>
      <ReactTooltip id="tooltip-message-front" place="top" />
      <div className={`bg-[#FFF9F2] w-full  p-[10px] rounded-[16px] h-[508px] ${(!isBackSide || (printingType && printingType.back === '')) && "cursor-not-allowed bg-gray-300"}`}
        data-tooltip-html={(!isBackSide || (printingType && printingType.back === '')) 
          ? `<div class="text-start max-sm:text-xs text-sm p-2">
              <p class="font-bold mb-1">Choose 'Back Print' in Section 2, then:</p>
              <ol class="list-decimal">
                <li>Select a printing type in Section 3.</li>
                <li>Enable this section after completing the above steps.</li>
              </ol>
            </div>`
        : null
        }
        data-tooltip-id="tooltip-message-back"
      >
        <div className="flex items-center justify-between">
          <span className="text-sm">Back Print</span>
          <span className="flex justify-between items-center gap-2">
            <MdOutlineFileDownload />
            <button
              type="button"
              disabled={(!isBackSide || (printingType && printingType.back === ''))}
              className="text-sm text-center underline font-normal underline-offset-2 outline-none disabled:cursor-not-allowed"
              onClick={(e) => {
                e.preventDefault(); // Prevent the default anchor behavior
                let imageUrl = `https://custorybucket.s3.ap-southeast-1.amazonaws.com/Products/${productData.id}/${selectedColor}/back.jpg`;
                imageUrl = imageUrl + "?timestamp=" + new Date().getTime();
                handleDownload(imageUrl, "BackTemplate.jpg");
              }}
            >
              Download Template
            </button>
          </span>
        </div>
        <div className="flex items-center justify-between my-[10px]">
          <span className="text-sm font-normal">
            Upload Design <b>Without</b> template
          </span>
          {backUploadedLogo && (
            <div className="flex items-center gap-1">
              <input {...backLogo.getInputProps()} />
              <button
                {...backLogo.getRootProps({ style: {} })}
                className="text-sm mr-1.5 flex items-center text-[#FF6600] outline-none"
              >
                <MdOutlineModeEdit /> Edit
              </button>
              <button
                className="text-sm flex items-center text-[#FF0000] outline-none"
                onClick={() => {
                  setBackUploadedLogo(null);
                  setHasUnsavedChanges(frontUploadedLogo ? true : false);
                  setIsCustomUpload(frontUploadedLogo ? true : false);
                }}
              >
                <MdDeleteOutline size={17} /> Reset
              </button>
            </div>
          )}
        </div>
        <div className="rounded-[6px] flex items-center gap-2 h-[42px]">
          {backUploadedLogo ? (
            <>
              <img src={backUploadedLogo} alt="Logo" width="38" height="26" />
              <span className="text-xs font-medium">73051797092.png</span>
            </>
          ) : (
            <div className="ml-6 max-sm:mx-auto">
              <input {...backLogo.getInputProps()} disabled={(!isBackSide || (printingType && printingType.back === ''))} className="disabled:cursor-not-allowed"/>
              <button disabled={(!isBackSide || (printingType && printingType.back === ''))}
                {...backLogo.getRootProps({ style: dropzoneStyle })}
                className="text-gray-500 w-[165px] h-[32px] flex items-center justify-between outline-none disabled:cursor-not-allowed"
              >
                <p>Upload your own design</p>
              </button>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between my-[10px]">
          <span className="text-sm font-normal">
            Upload Design <b>With</b> template
          </span>
          {backUploadedImage && (
            <div className="flex items-center gap-1">
              <input {...backDropzone.getInputProps()} />
              <button
                {...backDropzone.getRootProps({ style: {} })}
                className="text-sm mr-1.5 flex items-center text-[#FF6600] outline-none"
              >
                <MdOutlineModeEdit /> Edit
              </button>
              <button
                className="text-sm flex items-center text-[#FF0000] outline-none"
                onClick={() => {
                  setBackUploadedImage(null);
                  setHasUnsavedChanges(frontUploadedImage ? true : false);
                  setIsCustomUpload(frontUploadedImage ? true : false);
                }}
              >
                <MdDeleteOutline size={17} /> Reset
              </button>
            </div>
          )}
        </div>
        {backUploadedImage ? (
          <div className="flex relative justify-center items-center rounded-[6px] mt-[10px] h-[300px] w-full overflow-hidden">
            <img
              src={backUploadedImage}
              alt="Product"
              className="w-full h-full object-contain"
            />
          </div>
        ) : (
          <div className="rounded-[6px] flex items-center gap-2 h-[42px]">
            <div className="ml-6 max-sm:mx-auto">
              <input {...backDropzone.getInputProps()} disabled={(!isBackSide || (printingType && printingType.back === ''))} className="disabled:cursor-not-allowed"/>
              <button disabled={(!isBackSide || (printingType && printingType.back === ''))}
                {...backDropzone.getRootProps({ style: dropzoneStyle })}
                className="text-gray-500 w-[165px] h-[32px] flex items-center justify-between outline-none disabled:cursor-not-allowed"
              >
                <p className="mr-1">Upload your own design</p>
                <IoIosInformationCircleOutline
                    data-tooltip-html="
                    <div class='text-start max-sm:text-xs text-sm p-2 max-sm:max-w-[320px]'>
                        <ol class='list-decimal'>
                          <li>Download our product template from the provided link.</li>
                          <li>Ensure your designs follow our product template guidelines.</li>
                          <li>Upload your finalized design files.</li>
                        </ol>
                    </div>"
                    data-tooltip-id="my-tooltip-back"
                    className="ml-2 cursor-pointer"
                ></IoIosInformationCircleOutline>
                <ReactTooltip id="my-tooltip-back" place="bottom" />
              </button>
            </div>
          </div>
        )}
      </div>
      <ReactTooltip id="tooltip-message-back" place="top" />
    </div>
  );
};

export default UploadDesign;
