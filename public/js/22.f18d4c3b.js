"use strict";(self["webpackChunkvideoplayerforbs"]=self["webpackChunkvideoplayerforbs"]||[]).push([[22],{5440:(e,o,l)=>{l.r(o),l.d(o,{default:()=>ie});l(6727);var a=l(9835),n=l(499),t=l(6970),i=l(9302),s=l(4376),r=l(321),d=l(1569),c=l(4389),p=l(3910),u=l(7071),m=l(4182),w=l(8957);const g={class:"row no-wrap items-center q-pa-sm q-gutter-xs"},f={class:"q-px-sm"},k={class:"col"},_=(0,a._)("div",{class:"q-uploader__title"},"업로드 할 파일을 등록하세요",-1),y={class:"q-uploader__subtitle"},q=(0,a.Uk)("모두 삭제"),W=(0,a.Uk)("완료된 파일 삭제"),Z=(0,a.Uk)("파일선택"),v=(0,a.Uk)("업드로 시작"),C=(0,a.Uk)("업로드 취소"),b={name:"uploadFiles",setup(e){const{notifyError:o}=(0,w.Z)(),{dialogRef:l,onDialogHide:i,onDialogOK:s,onDialogCancel:r}=(0,m.Z)(),d=`http://${window.location.hostname}:3000/api/files/upload`;function p(e){return e.filter((e=>c.Gb.includes(e.type)))}function u(e){o({message:`${e.length}의 지원하지 않은 포멧의 파일`,caption:"오류가 계속되면 관리자에게 문의 해주세요."})}function b(e){console.error(e)}return(e,o)=>{const i=(0,a.up)("q-spinner"),r=(0,a.up)("q-icon"),c=(0,a.up)("q-tooltip"),m=(0,a.up)("q-btn"),w=(0,a.up)("q-uploader-add-trigger"),h=(0,a.up)("q-uploader"),U=(0,a.up)("q-card-section"),Q=(0,a.up)("q-card-actions"),S=(0,a.up)("q-card"),x=(0,a.up)("q-dialog");return(0,a.wg)(),(0,a.j4)(x,{ref_key:"dialogRef",ref:l,persistent:""},{default:(0,a.w5)((()=>[(0,a.Wm)(S,{class:"q-dialog-plugin"},{default:(0,a.w5)((()=>[(0,a.Wm)(U,{class:"q-pa-none"},{default:(0,a.w5)((()=>[(0,a.Wm)(h,{style:{width:"100%"},flat:"",url:d,multiple:"",filter:p,accept:".mp3, .mp4, .wav, .avi, .flac, .mov, .acc, .mkv, .jpg, .png, .bmp",onRejected:u,onError:b},{header:(0,a.w5)((e=>[(0,a._)("div",g,[(0,a._)("div",f,[e.isUploading?((0,a.wg)(),(0,a.j4)(i,{key:0,class:"q-uploader__spinner"})):((0,a.wg)(),(0,a.j4)(r,{key:1,name:"upload",size:"sm"}))]),(0,a._)("div",k,[_,(0,a._)("div",y," 총 용량: "+(0,t.zw)(e.uploadSizeLabel)+" / "+(0,t.zw)(e.uploadProgressLabel),1)]),e.queuedFiles.length>0?((0,a.wg)(),(0,a.j4)(m,{key:0,icon:"clear_all",onClick:e.removeQueuedFiles,round:"",dense:"",flat:""},{default:(0,a.w5)((()=>[(0,a.Wm)(c,null,{default:(0,a.w5)((()=>[q])),_:1})])),_:2},1032,["onClick"])):(0,a.kq)("",!0),e.uploadedFiles.length>0?((0,a.wg)(),(0,a.j4)(m,{key:1,icon:"done_all",onClick:e.removeUploadedFiles,round:"",dense:"",flat:""},{default:(0,a.w5)((()=>[(0,a.Wm)(c,null,{default:(0,a.w5)((()=>[W])),_:1})])),_:2},1032,["onClick"])):(0,a.kq)("",!0),e.canAddFiles?((0,a.wg)(),(0,a.j4)(m,{key:2,type:"a",icon:"add_box",onClick:e.pickFiles,round:"",dense:"",flat:""},{default:(0,a.w5)((()=>[(0,a.Wm)(w),(0,a.Wm)(c,null,{default:(0,a.w5)((()=>[Z])),_:1})])),_:2},1032,["onClick"])):(0,a.kq)("",!0),e.canUpload?((0,a.wg)(),(0,a.j4)(m,{key:3,icon:"cloud_upload",onClick:e.upload,round:"",dense:"",flat:""},{default:(0,a.w5)((()=>[(0,a.Wm)(c,null,{default:(0,a.w5)((()=>[v])),_:1})])),_:2},1032,["onClick"])):(0,a.kq)("",!0),e.isUploading?((0,a.wg)(),(0,a.j4)(m,{key:4,icon:"clear",onClick:e.abort,round:"",dense:"",flat:""},{default:(0,a.w5)((()=>[(0,a.Wm)(c,null,{default:(0,a.w5)((()=>[C])),_:1})])),_:2},1032,["onClick"])):(0,a.kq)("",!0)])])),_:1},8,["accept"])])),_:1}),(0,a.Wm)(Q,{align:"right"},{default:(0,a.w5)((()=>[(0,a.Wm)(m,{style:{width:"80px"},label:"닫기",class:"text-primary",flat:"",rounded:"",onClick:(0,n.SU)(s)},null,8,["onClick"])])),_:1})])),_:1})])),_:1},512)}}};var h=l(3706),U=l(4458),Q=l(3190),S=l(7534),x=l(3940),z=l(2857),j=l(4455),D=l(6858),F=l(6246),P=l(1821),A=l(9984),I=l.n(A);const M=b,R=M;I()(b,"components",{QDialog:h.Z,QCard:U.Z,QCardSection:Q.Z,QUploader:S.Z,QSpinner:x.Z,QIcon:z.Z,QBtn:j.Z,QTooltip:D.Z,QUploaderAddTrigger:F.Z,QCardActions:P.Z});l(702);const H=(0,a._)("div",null,"폴더 생성",-1),O={name:"makeFolder",emits:[...m.Z.emits],setup(e,{emit:o}){const{dialogRef:l,onDialogHide:t,onDialogOK:i,onDialogCancel:s}=(0,m.Z)(),r=(0,n.iH)("");function d(){i(r.value)}return(e,o)=>{const i=(0,a.up)("q-icon"),c=(0,a.up)("q-card-section"),p=(0,a.up)("q-input"),u=(0,a.up)("q-btn"),m=(0,a.up)("q-card-actions"),w=(0,a.up)("q-form"),g=(0,a.up)("q-card"),f=(0,a.up)("q-dialog");return(0,a.wg)(),(0,a.j4)(f,{ref_key:"dialogRef",ref:l,persistent:"",onHide:(0,n.SU)(t)},{default:(0,a.w5)((()=>[(0,a.Wm)(g,{class:"q-dialog-plugin",style:{"border-radius":"8px"}},{default:(0,a.w5)((()=>[(0,a.Wm)(w,{onSubmit:d},{default:(0,a.w5)((()=>[(0,a.Wm)(c,{class:"row no-wrap bg-primary text-white",style:{padding:"0.7rem"}},{default:(0,a.w5)((()=>[(0,a.Wm)(i,{class:"q-mr-md",name:"folder",size:"sm"}),H])),_:1}),(0,a.Wm)(c,null,{default:(0,a.w5)((()=>[(0,a.Wm)(p,{modelValue:r.value,"onUpdate:modelValue":o[0]||(o[0]=e=>r.value=e),class:"q-px-md q-pt-md",dense:"",filled:"",label:"폴더이름"},null,8,["modelValue"])])),_:1}),(0,a.Wm)(m,{align:"right"},{default:(0,a.w5)((()=>[(0,a.Wm)(u,{style:{width:"80px"},label:"취소",flat:"",rounded:"",onClick:(0,n.SU)(s)},null,8,["onClick"]),(0,a.Wm)(u,{style:{width:"80px"},label:"확인",class:"text-primary",flat:"",rounded:"",type:"submit"})])),_:1})])),_:1})])),_:1})])),_:1},8,["onHide"])}}};var T=l(8326),E=l(6611);I()(O,"components",{QDialog:h.Z,QCard:U.Z,QForm:T.Z,QCardSection:Q.Z,QIcon:z.Z,QInput:E.Z,QCardActions:P.Z,QBtn:j.Z});var Y=l(1338),$=(l(6134),l(417)),B=l(5364);const V={class:"row no-wrap justify-between items-center"},K={class:"row justify-center q-pt-md"},L={class:"row no-wrap items-center q-gutter-x-sm"},G={class:"q-gutter-x-sm"},J={class:"row no-wrap items-center q-gutter-x-sm"},N={style:{"max-width":"200px","word-break":"break-all"}},X={class:"q-gutter-x-sm"},ee={name:"FilesPage",setup(e){const{notifyWarn:o,notifyError:l}=(0,w.Z)(),m=(0,i.Z)();function g(){m.dialog({component:R}).onOk((()=>{m.loading.show(),k(),m.loading.hide()}))}function f(e){m.dialog({component:Y.Z,componentProps:{icon:"delete",iconColor:"white",color:"red",title:"파일 삭제",message:`${e.name} 파일을 삭제 합니다.`}}).onOk((async()=>{m.loading.show();try{await d.api.get(`/files/deleteFile?name=${encodeURIComponent(e.name)}`),k(),m.loading.hide()}catch(o){m.loading.hide(),l({message:"파일 삭제 중 오류가 발생하였습니다.",caption:"잠시후에 다시 시도해 주세요. 오류가 계속되면 관리자에게 문의 해주세요."}),console.error(o)}}))}function k(){m.loading.show(),(0,c.bE)(),m.loading.hide()}return(0,a.bv)((()=>{p.IO.value=!0,k()})),(e,o)=>{const l=(0,a.up)("q-btn"),i=(0,a.up)("q-icon"),d=(0,a.up)("q-td"),m=(0,a.up)("q-tr"),w=(0,a.up)("q-table"),_=(0,a.up)("q-card-section"),y=(0,a.up)("q-card"),q=(0,a.up)("q-page");return(0,a.wg)(),(0,a.j4)(q,null,{default:(0,a.w5)((()=>[(0,a._)("div",V,[(0,a.Wm)(u.Z,{class:"animate__pulse",name:"파일 & 폴더",caption:"파일 & 폴더 관리",icon:"svguse:icons.svg#diskColor"}),(0,a._)("div",null,[(0,a.Wm)(l,{round:"",flat:"",color:"primary",icon:"upload",onClick:g},{default:(0,a.w5)((()=>[(0,a.Wm)(B.Z,{msg:"파일업로드"})])),_:1}),(0,a.Wm)(l,{round:"",flat:"",color:"yellow-8",icon:"refresh",onClick:k},{default:(0,a.w5)((()=>[(0,a.Wm)(B.Z,{msg:"새로고침"})])),_:1})])]),(0,a._)("div",K,[(0,a.Wm)(y,{style:{width:"100%"}},{default:(0,a.w5)((()=>[(0,a.Wm)(_,{class:"q-pa-none"},{default:(0,a.w5)((()=>[(0,a.Wm)(w,{class:"gt-sm",columns:(0,n.SU)(c.zF),rows:(0,n.SU)(c.oM),pagination:{rowsPerPage:0},"hide-pagination":""},{body:(0,a.w5)((e=>[(0,a.Wm)(m,{props:e},{default:(0,a.w5)((()=>[(0,a.Wm)(d,{key:"name",props:e,class:"text-left"},{default:(0,a.w5)((()=>[(0,a._)("div",L,[e.row.type&&e.row.type.includes("image")?((0,a.wg)(),(0,a.j4)(i,{key:0,name:"image",size:"sm",color:"primary"})):e.row.type&&e.row.type.includes("video")?((0,a.wg)(),(0,a.j4)(i,{key:1,name:"videocam",size:"sm",color:"blue-grey-10"})):(0,a.kq)("",!0),(0,a._)("div",null,(0,t.zw)(e.row.name),1)])])),_:2},1032,["props"]),(0,a.Wm)(d,{key:"size",props:e},{default:(0,a.w5)((()=>[(0,a.Uk)((0,t.zw)((0,n.SU)(r.ZP).humanStorageSize(e.row.size)),1)])),_:2},1032,["props"]),(0,a.Wm)(d,{key:"createdAt",props:e},{default:(0,a.w5)((()=>[(0,a.Uk)((0,t.zw)((0,n.SU)(s.ZP).formatDate(e.row.createdAt,"YYYY-MM-DD hh:mm:ss a")),1)])),_:2},1032,["props"]),(0,a.Wm)(d,{key:"actions",props:e},{default:(0,a.w5)((()=>[(0,a._)("div",G,[(0,a.Wm)((0,n.SU)($.Z),{name:"play_arrow",msg:"재생",onClick:o=>(0,n.SU)(p.MD)(e.row)},null,8,["onClick"]),(0,a.Wm)((0,n.SU)($.Z),{name:"delete",color:"red",size:"xs",msg:"삭제",onClick:o=>f(e.row)},null,8,["onClick"])])])),_:2},1032,["props"])])),_:2},1032,["props"])])),_:1},8,["columns","rows"]),(0,a.Wm)(w,{class:"lt-md",columns:(0,n.SU)(c.Fp),rows:(0,n.SU)(c.oM),pagination:{rowsPerPage:0},"hide-pagination":""},{body:(0,a.w5)((e=>[(0,a.Wm)(m,{props:e},{default:(0,a.w5)((()=>[(0,a.Wm)(d,{key:"name",props:e,class:"text-left"},{default:(0,a.w5)((()=>[(0,a._)("div",J,[e.row.type&&e.row.type.includes("image")?((0,a.wg)(),(0,a.j4)(i,{key:0,name:"image",size:"sm",color:"primary"})):e.row.type&&e.row.type.includes("video")?((0,a.wg)(),(0,a.j4)(i,{key:1,name:"videocam",size:"sm",color:"blue-grey-10"})):(0,a.kq)("",!0),(0,a._)("div",N,(0,t.zw)(e.row.name),1)])])),_:2},1032,["props"]),(0,a.Wm)(d,{key:"actions",props:e},{default:(0,a.w5)((()=>[(0,a._)("div",X,[(0,a.Wm)((0,n.SU)($.Z),{name:"play_arrow",msg:"재생",onClick:o=>(0,n.SU)(p.MD)(e.row)},null,8,["onClick"]),(0,a.Wm)((0,n.SU)($.Z),{name:"delete",color:"red",size:"xs",msg:"삭제",onClick:o=>f(e.row)},null,8,["onClick"])])])),_:2},1032,["props"])])),_:2},1032,["props"])])),_:1},8,["columns","rows"])])),_:1})])),_:1})])])),_:1})}}};var oe=l(9885),le=l(7580),ae=l(9546),ne=l(7220);const te=ee,ie=te;I()(ee,"components",{QPage:oe.Z,QBtn:j.Z,QCard:U.Z,QCardSection:Q.Z,QTable:le.Z,QTr:ae.Z,QTd:ne.Z,QIcon:z.Z})}}]);