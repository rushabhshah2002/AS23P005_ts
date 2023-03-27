import { uploadCertiIndiInterface, editProfileInterface } from "../utils/types";
import { uploadCertiInstInterface, editProfileInstInterface } from "../utils/types";
const uploadCertiIndiStruct: uploadCertiIndiInterface = {
  email: "",
  frontCertiImg: "",
  dataUrl: "",
  alias: "",
  date: "",
  remarks: "",
};
const editProfileIndiStruct: editProfileInterface =
{
  name: "",
  phoneNo: 0,
  password: "",
  email: ""
}
export const struct =
{
  uploadCertiIndiStruct,
  editProfileIndiStruct
}
const uploadCertiInstStruct: uploadCertiInstInterface = {
  instituteEmail: "",
  representativeEmail: "",
  recEmail: "",
  frontCertiImg: "",
  name: "",
  degree: "",
  cgpa: 0,
  dataUrl: ""
};
const editProfileInstStruct: editProfileInstInterface =
{
  instituteName: "",
  identificationType: "",
  identificationNumber: 0,
  instituteEmail: "",
  representativeEmail: ""
}
export const inststruct =
{
  uploadCertiInstStruct,
  editProfileInstStruct,
  uploadCertiIndiStruct

}
const TemplateElementsStrct = 

  {alias: "BCA",
    certiTempId: "bbd601dbf1f255358a2114ca561a96cb",
    color: "",
    counter: 0,
    flag: "",
    height: 1414,
    imageCounter: 1,
    instEmail: "uni2395@gmail.com",
    link: "https://res.cloudinary.com/ur-cirkle/image/upload/v1678444529/bbd601dbf1f255358a2114ca561a96cb/TEMPLATE.png",
    preview: "https://res.cloudinary.com/ur-cirkle/image/upload/v1678444531/bbd601dbf1f255358a2114ca561a96cb/preview.png",
    shapeCounter: 2,
    size: 0,
    tempCount: 2,
    textCounter: 2,
    type: "meta",
    width: 2000,
    x: 0,
    y: 0}

export const groupOfElementsStruct = 
{
  image : [TemplateElementsStrct , TemplateElementsStrct],
  shape : [TemplateElementsStrct , TemplateElementsStrct],
  qr : [TemplateElementsStrct],
  text : [TemplateElementsStrct],
  meta : [TemplateElementsStrct],
}
export const readyTemplates = 
[
  {
    "asset_id": "2283934d604d61ac28539928cfe2b833",
    "public_id": "rushabh/Templates/image-PhotoRoom_gm4pgf",
    "format": "png",
    "version": 1677655648,
    "resource_type": "image",
    "type": "upload",
    "created_at": "2023-03-01T07:27:28Z",
    "bytes": 571394,
    "width": 904,
    "height": 1280,
    "folder": "rushabh/Templates",
    "url": "http://res.cloudinary.com/ur-cirkle/image/upload/v1677655648/rushabh/Templates/image-PhotoRoom_gm4pgf.png",
    "secure_url": "https://res.cloudinary.com/ur-cirkle/image/upload/v1677655648/rushabh/Templates/image-PhotoRoom_gm4pgf.png"
  },
  {
    "asset_id": "3b7f09de44da14e675edaebd9beddcf2",
    "public_id": "rushabh/Templates/intership_qmespk",
    "format": "png",
    "version": 1677655647,
    "resource_type": "image",
    "type": "upload",
    "created_at": "2023-03-01T07:27:27Z",
    "bytes": 362582,
    "width": 904,
    "height": 1280,
    "folder": "rushabh/Templates",
    "url": "http://res.cloudinary.com/ur-cirkle/image/upload/v1677655647/rushabh/Templates/intership_qmespk.png",
    "secure_url": "https://res.cloudinary.com/ur-cirkle/image/upload/v1677655647/rushabh/Templates/intership_qmespk.png"
  },
  {
    "asset_id": "e9c71e627a5c10bc9b0a64d07da3c93d",
    "public_id": "rushabh/Templates/Participation_kmzuly",
    "format": "png",
    "version": 1677655647,
    "resource_type": "image",
    "type": "upload",
    "created_at": "2023-03-01T07:27:27Z",
    "bytes": 551605,
    "width": 904,
    "height": 1280,
    "folder": "rushabh/Templates",
    "url": "http://res.cloudinary.com/ur-cirkle/image/upload/v1677655647/rushabh/Templates/Participation_kmzuly.png",
    "secure_url": "https://res.cloudinary.com/ur-cirkle/image/upload/v1677655647/rushabh/Templates/Participation_kmzuly.png"
  },
  {
    "asset_id": "4d315bf69c8fa38d415e607d07b92f7a",
    "public_id": "rushabh/Templates/Graduation_Dip_twrlgz",
    "format": "png",
    "version": 1677655646,
    "resource_type": "image",
    "type": "upload",
    "created_at": "2023-03-01T07:27:26Z",
    "bytes": 162796,
    "width": 2000,
    "height": 1414,
    "folder": "rushabh/Templates",
    "url": "http://res.cloudinary.com/ur-cirkle/image/upload/v1677655646/rushabh/Templates/Graduation_Dip_twrlgz.png",
    "secure_url": "https://res.cloudinary.com/ur-cirkle/image/upload/v1677655646/rushabh/Templates/Graduation_Dip_twrlgz.png"
  },
  {
    "asset_id": "884324077ac1a739ae45cccc5efc4d8d",
    "public_id": "rushabh/Templates/temp_bknwh6",
    "format": "webp",
    "version": 1677655646,
    "resource_type": "image",
    "type": "upload",
    "created_at": "2023-03-01T07:27:26Z",
    "bytes": 30944,
    "width": 1280,
    "height": 904,
    "folder": "rushabh/Templates",
    "url": "http://res.cloudinary.com/ur-cirkle/image/upload/v1677655646/rushabh/Templates/temp_bknwh6.webp",
    "secure_url": "https://res.cloudinary.com/ur-cirkle/image/upload/v1677655646/rushabh/Templates/temp_bknwh6.webp"
  },
  {
    "asset_id": "429f25989d68ffdb3659f778ed616927",
    "public_id": "rushabh/Templates/Completion_ou6meg",
    "format": "png",
    "version": 1677655646,
    "resource_type": "image",
    "type": "upload",
    "created_at": "2023-03-01T07:27:26Z",
    "bytes": 311111,
    "width": 2000,
    "height": 1414,
    "folder": "rushabh/Templates",
    "url": "http://res.cloudinary.com/ur-cirkle/image/upload/v1677655646/rushabh/Templates/Completion_ou6meg.png",
    "secure_url": "https://res.cloudinary.com/ur-cirkle/image/upload/v1677655646/rushabh/Templates/Completion_ou6meg.png"
  },
  {
    "asset_id": "b505afa13d5644da65d647424fba2ddd",
    "public_id": "rushabh/Templates/Achievement_rx9dt3",
    "format": "png",
    "version": 1677655645,
    "resource_type": "image",
    "type": "upload",
    "created_at": "2023-03-01T07:27:25Z",
    "bytes": 273348,
    "width": 2000,
    "height": 1414,
    "folder": "rushabh/Templates",
    "url": "http://res.cloudinary.com/ur-cirkle/image/upload/v1677655645/rushabh/Templates/Achievement_rx9dt3.png",
    "secure_url": "https://res.cloudinary.com/ur-cirkle/image/upload/v1677655645/rushabh/Templates/Achievement_rx9dt3.png"
  },
  {
    "asset_id": "16ab9647984eb5ea43428cfc9f50f0c0",
    "public_id": "rushabh/Templates/Achievement1_gvjrzg",
    "format": "png",
    "version": 1677655645,
    "resource_type": "image",
    "type": "upload",
    "created_at": "2023-03-01T07:27:25Z",
    "bytes": 205500,
    "width": 2000,
    "height": 1414,
    "folder": "rushabh/Templates",
    "url": "http://res.cloudinary.com/ur-cirkle/image/upload/v1677655645/rushabh/Templates/Achievement1_gvjrzg.png",
    "secure_url": "https://res.cloudinary.com/ur-cirkle/image/upload/v1677655645/rushabh/Templates/Achievement1_gvjrzg.png"
  },
  {
    "asset_id": "d1aa85a35f8edfe3ec1e0fc1d0083789",
    "public_id": "rushabh/Templates/Appreciation_aqplfo",
    "format": "png",
    "version": 1677655645,
    "resource_type": "image",
    "type": "upload",
    "created_at": "2023-03-01T07:27:25Z",
    "bytes": 163485,
    "width": 2000,
    "height": 1414,
    "folder": "rushabh/Templates",
    "url": "http://res.cloudinary.com/ur-cirkle/image/upload/v1677655645/rushabh/Templates/Appreciation_aqplfo.png",
    "secure_url": "https://res.cloudinary.com/ur-cirkle/image/upload/v1677655645/rushabh/Templates/Appreciation_aqplfo.png"
  },
  {
    "asset_id": "0b4de47d8bfe67fc3b6a669804c6729b",
    "public_id": "rushabh/Templates/Completion1_yphw14",
    "format": "png",
    "version": 1677655645,
    "resource_type": "image",
    "type": "upload",
    "created_at": "2023-03-01T07:27:25Z",
    "bytes": 158108,
    "width": 1280,
    "height": 904,
    "folder": "rushabh/Templates",
    "url": "http://res.cloudinary.com/ur-cirkle/image/upload/v1677655645/rushabh/Templates/Completion1_yphw14.png",
    "secure_url": "https://res.cloudinary.com/ur-cirkle/image/upload/v1677655645/rushabh/Templates/Completion1_yphw14.png"
  },
  {
    "asset_id": "2283934d604d61ac28539928cfe2b833",
    "public_id": "rushabh/Templates/image-PhotoRoom_gm4pgf",
    "format": "png",
    "version": 1677655648,
    "resource_type": "image",
    "type": "upload",
    "created_at": "2023-03-01T07:27:28Z",
    "bytes": 571394,
    "width": 904,
    "height": 1280,
    "folder": "rushabh/Templates",
    "url": "http://res.cloudinary.com/ur-cirkle/image/upload/v1677655648/rushabh/Templates/image-PhotoRoom_gm4pgf.png",
    "secure_url": "https://res.cloudinary.com/ur-cirkle/image/upload/v1677655648/rushabh/Templates/image-PhotoRoom_gm4pgf.png"
  },
  {
    "asset_id": "3b7f09de44da14e675edaebd9beddcf2",
    "public_id": "rushabh/Templates/intership_qmespk",
    "format": "png",
    "version": 1677655647,
    "resource_type": "image",
    "type": "upload",
    "created_at": "2023-03-01T07:27:27Z",
    "bytes": 362582,
    "width": 904,
    "height": 1280,
    "folder": "rushabh/Templates",
    "url": "http://res.cloudinary.com/ur-cirkle/image/upload/v1677655647/rushabh/Templates/intership_qmespk.png",
    "secure_url": "https://res.cloudinary.com/ur-cirkle/image/upload/v1677655647/rushabh/Templates/intership_qmespk.png"
  },
  {
    "asset_id": "e9c71e627a5c10bc9b0a64d07da3c93d",
    "public_id": "rushabh/Templates/Participation_kmzuly",
    "format": "png",
    "version": 1677655647,
    "resource_type": "image",
    "type": "upload",
    "created_at": "2023-03-01T07:27:27Z",
    "bytes": 551605,
    "width": 904,
    "height": 1280,
    "folder": "rushabh/Templates",
    "url": "http://res.cloudinary.com/ur-cirkle/image/upload/v1677655647/rushabh/Templates/Participation_kmzuly.png",
    "secure_url": "https://res.cloudinary.com/ur-cirkle/image/upload/v1677655647/rushabh/Templates/Participation_kmzuly.png"
  },
  {
    "asset_id": "4d315bf69c8fa38d415e607d07b92f7a",
    "public_id": "rushabh/Templates/Graduation_Dip_twrlgz",
    "format": "png",
    "version": 1677655646,
    "resource_type": "image",
    "type": "upload",
    "created_at": "2023-03-01T07:27:26Z",
    "bytes": 162796,
    "width": 2000,
    "height": 1414,
    "folder": "rushabh/Templates",
    "url": "http://res.cloudinary.com/ur-cirkle/image/upload/v1677655646/rushabh/Templates/Graduation_Dip_twrlgz.png",
    "secure_url": "https://res.cloudinary.com/ur-cirkle/image/upload/v1677655646/rushabh/Templates/Graduation_Dip_twrlgz.png"
  },
  {
    "asset_id": "884324077ac1a739ae45cccc5efc4d8d",
    "public_id": "rushabh/Templates/temp_bknwh6",
    "format": "webp",
    "version": 1677655646,
    "resource_type": "image",
    "type": "upload",
    "created_at": "2023-03-01T07:27:26Z",
    "bytes": 30944,
    "width": 1280,
    "height": 904,
    "folder": "rushabh/Templates",
    "url": "http://res.cloudinary.com/ur-cirkle/image/upload/v1677655646/rushabh/Templates/temp_bknwh6.webp",
    "secure_url": "https://res.cloudinary.com/ur-cirkle/image/upload/v1677655646/rushabh/Templates/temp_bknwh6.webp"
  },
  {
    "asset_id": "429f25989d68ffdb3659f778ed616927",
    "public_id": "rushabh/Templates/Completion_ou6meg",
    "format": "png",
    "version": 1677655646,
    "resource_type": "image",
    "type": "upload",
    "created_at": "2023-03-01T07:27:26Z",
    "bytes": 311111,
    "width": 2000,
    "height": 1414,
    "folder": "rushabh/Templates",
    "url": "http://res.cloudinary.com/ur-cirkle/image/upload/v1677655646/rushabh/Templates/Completion_ou6meg.png",
    "secure_url": "https://res.cloudinary.com/ur-cirkle/image/upload/v1677655646/rushabh/Templates/Completion_ou6meg.png"
  },
  {
    "asset_id": "b505afa13d5644da65d647424fba2ddd",
    "public_id": "rushabh/Templates/Achievement_rx9dt3",
    "format": "png",
    "version": 1677655645,
    "resource_type": "image",
    "type": "upload",
    "created_at": "2023-03-01T07:27:25Z",
    "bytes": 273348,
    "width": 2000,
    "height": 1414,
    "folder": "rushabh/Templates",
    "url": "http://res.cloudinary.com/ur-cirkle/image/upload/v1677655645/rushabh/Templates/Achievement_rx9dt3.png",
    "secure_url": "https://res.cloudinary.com/ur-cirkle/image/upload/v1677655645/rushabh/Templates/Achievement_rx9dt3.png"
  },
  {
    "asset_id": "16ab9647984eb5ea43428cfc9f50f0c0",
    "public_id": "rushabh/Templates/Achievement1_gvjrzg",
    "format": "png",
    "version": 1677655645,
    "resource_type": "image",
    "type": "upload",
    "created_at": "2023-03-01T07:27:25Z",
    "bytes": 205500,
    "width": 2000,
    "height": 1414,
    "folder": "rushabh/Templates",
    "url": "http://res.cloudinary.com/ur-cirkle/image/upload/v1677655645/rushabh/Templates/Achievement1_gvjrzg.png",
    "secure_url": "https://res.cloudinary.com/ur-cirkle/image/upload/v1677655645/rushabh/Templates/Achievement1_gvjrzg.png"
  },
  {
    "asset_id": "d1aa85a35f8edfe3ec1e0fc1d0083789",
    "public_id": "rushabh/Templates/Appreciation_aqplfo",
    "format": "png",
    "version": 1677655645,
    "resource_type": "image",
    "type": "upload",
    "created_at": "2023-03-01T07:27:25Z",
    "bytes": 163485,
    "width": 2000,
    "height": 1414,
    "folder": "rushabh/Templates",
    "url": "http://res.cloudinary.com/ur-cirkle/image/upload/v1677655645/rushabh/Templates/Appreciation_aqplfo.png",
    "secure_url": "https://res.cloudinary.com/ur-cirkle/image/upload/v1677655645/rushabh/Templates/Appreciation_aqplfo.png"
  },
  {
    "asset_id": "0b4de47d8bfe67fc3b6a669804c6729b",
    "public_id": "rushabh/Templates/Completion1_yphw14",
    "format": "png",
    "version": 1677655645,
    "resource_type": "image",
    "type": "upload",
    "created_at": "2023-03-01T07:27:25Z",
    "bytes": 158108,
    "width": 1280,
    "height": 904,
    "folder": "rushabh/Templates",
    "url": "http://res.cloudinary.com/ur-cirkle/image/upload/v1677655645/rushabh/Templates/Completion1_yphw14.png",
    "secure_url": "https://res.cloudinary.com/ur-cirkle/image/upload/v1677655645/rushabh/Templates/Completion1_yphw14.png"
  }
];
export const chartsApi = [
  {
    name : "MCA",
    certIssued : 50,
  },
  {
    name : "BCA",
    certIssued : 20,
  },
  {
    name : "BSC IT",
    certIssued : 10,
  },
  {
    name : "BSC IT",
    certIssued : 10,
  },
  {
    name : "BSC IT",
    certIssued : 10,
  },
  {
    name : "BSC IT",
    certIssued : 10,
  },

]
export const PieChartApi = [
  { name: 'A', value: 60, color: '#ff0000' },
  { name: 'B', value: 60, color: '#00ff00' },
  { name: 'C', value: 60, color: '#0000ff' },
];