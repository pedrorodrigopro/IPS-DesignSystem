import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r}from"./index-DhMLlvMY.js";import{M as m}from"./modal-BYmnW-pZ.js";import{B as g}from"./button-CreEIUG8.js";import{I as h,f as v}from"./input-BpruS0E4.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-2UU9FgV2.js";import"./index-D7lG0nq1.js";import"./icon-D2SvuOdm.js";import"./actions-BEYLSr8Q.js";import"./index-Dd5QUkq_.js";const M={title:"Components/Modal",component:m,parameters:{layout:"centered"}},t=()=>{const[d,a]=r.useState(!0),[o,u]=r.useState(""),[f,C]=r.useState("");return e.jsxs(e.Fragment,{children:[e.jsx(g,{kind:"primary",size:"regular",onClick:()=>a(!0),children:"Open modal"}),e.jsxs(m,{open:d,onClose:()=>a(!1),title:"Create CV version",width:512,leftActions:[{label:"Cancel",variant:"secondary",onClick:()=>a(!1)}],rightActions:[{label:"Create",variant:"primary",disabled:!o.trim(),onClick:()=>a(!1)}],children:[e.jsx(h,{label:"Name",value:o,onChange:n=>u(n.target.value)}),e.jsx(v,{label:"Description",rows:4,value:f,onChange:n=>C(n.target.value)})]})]})};t.__docgenInfo={description:"Form dialog — title, fields, Cancel (left) and a primary action (right) in the Actions bar.",methods:[],displayName:"Default"};var s,i,l,p,c;t.parameters={...t.parameters,docs:{...(s=t.parameters)==null?void 0:s.docs,source:{originalSource:`() => {
  const [open, setOpen] = useState(true);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  return <>
      <Button kind="primary" size="regular" onClick={() => setOpen(true)}>Open modal</Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Create CV version" width={512} leftActions={[{
      label: "Cancel",
      variant: "secondary",
      onClick: () => setOpen(false)
    }]} rightActions={[{
      label: "Create",
      variant: "primary",
      disabled: !name.trim(),
      onClick: () => setOpen(false)
    }]}>
        <Input label="Name" value={name} onChange={e => setName(e.target.value)} />
        <InputTextarea label="Description" rows={4} value={description} onChange={e => setDescription(e.target.value)} />
      </Modal>
    </>;
}`,...(l=(i=t.parameters)==null?void 0:i.docs)==null?void 0:l.source},description:{story:"Form dialog — title, fields, Cancel (left) and a primary action (right) in the Actions bar.",...(c=(p=t.parameters)==null?void 0:p.docs)==null?void 0:c.description}}};const _=["Default"];export{t as Default,_ as __namedExportsOrder,M as default};
