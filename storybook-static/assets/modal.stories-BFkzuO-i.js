import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r}from"./index-DhMLlvMY.js";import{M as i}from"./modal-3HG6jeP_.js";import{B as y}from"./button-CreEIUG8.js";import{I as x,f as S}from"./input-q9z2Hils.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-2UU9FgV2.js";import"./index-D7lG0nq1.js";import"./icon-BJcJHAAT.js";import"./actions-D59ljUI3.js";import"./index-Dd5QUkq_.js";import"./tooltip-CwLrwrm3.js";const W={title:"Components/Modal",component:i,parameters:{layout:"centered"}},a=()=>{const[s,t]=r.useState(!0),[l,v]=r.useState(""),[k,O]=r.useState("");return e.jsxs(e.Fragment,{children:[e.jsx(y,{kind:"primary",size:"regular",onClick:()=>t(!0),children:"Open modal"}),e.jsxs(i,{open:s,onClose:()=>t(!1),title:"Create CV version",width:512,leftActions:[{label:"Cancel",variant:"secondary",onClick:()=>t(!1)}],rightActions:[{label:"Create",variant:"primary",disabled:!l.trim(),onClick:()=>t(!1)}],children:[e.jsx(x,{label:"Name",value:l,onChange:o=>v(o.target.value)}),e.jsx(S,{label:"Description",rows:4,value:k,onChange:o=>O(o.target.value)})]})]})},n=()=>{const[s,t]=r.useState(!0);return e.jsxs(e.Fragment,{children:[e.jsx(y,{kind:"primary",size:"regular",onClick:()=>t(!0),children:"Open modal"}),e.jsx(i,{open:s,onClose:()=>t(!1),title:"Manage tags",subtitle:"8 roles",width:500,leftActions:[{label:"Cancel",variant:"secondary",onClick:()=>t(!1)}],rightActions:[{label:"Update",variant:"primary",onClick:()=>t(!1)}],children:e.jsx("span",{style:{fontFamily:"var(--font-family)",fontSize:14,color:"var(--palette-blue-0)"},children:"Pick a tag to add to these roles:"})})]})};a.__docgenInfo={description:"Form dialog — title, fields, Cancel (left) and a primary action (right) in the Actions bar.",methods:[],displayName:"Default"};n.__docgenInfo={description:'`subtitle` is a small muted line under the title (Figma "Manage tags" — "8 roles")',methods:[],displayName:"WithSubtitle"};var c,p,d,m,u;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`() => {
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
}`,...(d=(p=a.parameters)==null?void 0:p.docs)==null?void 0:d.source},description:{story:"Form dialog — title, fields, Cancel (left) and a primary action (right) in the Actions bar.",...(u=(m=a.parameters)==null?void 0:m.docs)==null?void 0:u.description}}};var f,g,C,h,b;n.parameters={...n.parameters,docs:{...(f=n.parameters)==null?void 0:f.docs,source:{originalSource:`() => {
  const [open, setOpen] = useState(true);
  return <>
      <Button kind="primary" size="regular" onClick={() => setOpen(true)}>Open modal</Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Manage tags" subtitle="8 roles" width={500} leftActions={[{
      label: "Cancel",
      variant: "secondary",
      onClick: () => setOpen(false)
    }]} rightActions={[{
      label: "Update",
      variant: "primary",
      onClick: () => setOpen(false)
    }]}>
        <span style={{
        fontFamily: "var(--font-family)",
        fontSize: 14,
        color: "var(--palette-blue-0)"
      }}>Pick a tag to add to these roles:</span>
      </Modal>
    </>;
}`,...(C=(g=n.parameters)==null?void 0:g.docs)==null?void 0:C.source},description:{story:'`subtitle` is a small muted line under the title (Figma "Manage tags" — "8 roles")',...(b=(h=n.parameters)==null?void 0:h.docs)==null?void 0:b.description}}};const P=["Default","WithSubtitle"];export{a as Default,n as WithSubtitle,P as __namedExportsOrder,W as default};
