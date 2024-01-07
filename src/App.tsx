import { useState } from "react";
import "./App.css";
import { Table,Button,Modal,Input,message } from "antd";
import {DeleteOutlined,EditOutlined, SearchOutlined} from '@ant-design/icons'

interface Student {
  id: number;
  name: string;
  email: string;
  Address: string;
}

const App: React.FC = () => {
  const [isEditing,setIsEditing]= useState(false);
  const [editingStudent,SetEditingStudent]=useState<Student | null>(null);
  const [dataSource, setDataSource] = useState([
    {
      id: 1,
      name: "Anil",
      email: "anil@gmail.com",
      Address: "Anils address",
    },
    {
      id: 2,
      name: "Sunil",
      email: "sunil@gmail.com",
      Address: "Sunils address",
    },
    {
      id: 3,
      name: "kapil",
      email: "kapil@gmail.com",
      Address: "Kapils address",
    },
    {
      id: 4,
      name: "Sahil",
      email: "Sahil@gmail.com",
      Address: "Sahils address",
    },
  ]);

  const columns = [
    {
      key: "id",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
      filterDropdown:({setSelectedKeys,selectedKeys,confirm})=>{
        return <>
        <Input 
        autoFocus
        placeholder="Type text here"
        onPressEnter={()=>{
          confirm()
        }}
        onBlur={()=>{
          confirm()
        }}
        value={selectedKeys[0]}
        onChange={(e)=>{
          setSelectedKeys(e.target.value?[e.target.value]:[]);
          confirm({closeDropdown:false})
        }}
        ></Input>
        </>
      },
      filterIcon:()=>{
        return <SearchOutlined/>
      },
      onFilter:(value,record)=>{
        return record.name.toLowerCase().includes(value.toLowerCase())
      }
    },
    {
      key: "email",
      title: "Email",
      dataIndex: "email",
    },
    {
      key: "address",
      title: "Address",
      dataIndex: "Address",
    },
    {
      key:"actions",
      title:"Actions",
      render:(record:{id:number})=>{
        return <>
          <EditOutlined onClick={()=>onEditStudent(record)}/>
          <DeleteOutlined onClick={()=>onDeleteStudent(record)} style={{'color':'red', 'marginLeft':12}}/>
        </>
      }
    }
  ];

const onAddStudent=()=>{
  const randomNumber=Math.floor(Math.random()*100);
  const newStudent:Student={
    id: randomNumber,
    name: "Name" + randomNumber,
    email: randomNumber+"@gamil.com",
    Address: randomNumber+" address",
  }
  setDataSource((pre)=>{
    return [...pre,newStudent]
  })
};

const onDeleteStudent=(record:Student)=>{
  Modal.confirm({
    title:"Are you sure you want to delete this student?",
    okText:"Yes",
    okType:"danger",
    onOk:()=>{
      setDataSource((pre)=>{
        return pre.filter((student)=>student.id!==record.id);
      })
    }
  })
}

const onEditStudent=(record:Student):void=>{
  setIsEditing(true);
  SetEditingStudent({...record});
}

const onReset=()=>{
  setIsEditing(false);
  SetEditingStudent(null);
}
 
  return (
    <div className="App">
      <header className="App-header">
        <Button onClick={onAddStudent}>Add Student</Button>
        <Table columns={columns} dataSource={dataSource}></Table>
        <Modal
          title="Add Student"
          okText="Save"
          open={isEditing}
          onCancel={()=>onReset()}
          onOk={()=>{
            setDataSource((pre)=>{
             return pre.map(student=>{
                  if(student.id===editingStudent?.id){
                    message.success("Edited Successfully")
                    return editingStudent
                  }
                  else{
                    return student
                  }
                
              })
            })
            onReset();
          }}
        >
            <Input value={editingStudent?.name||' '}
              onChange={(e)=>{
                SetEditingStudent((pre)=>{
                  return {...pre!,name:e.target.value}
                })
              }}
            />
            <Input value={editingStudent?.email||' '}
             onChange={(e)=>{
              SetEditingStudent((pre)=>{
                return {...pre!,email:e.target.value}
              })
            }}
            />
            <Input value={editingStudent?.Address||' '}
             onChange={(e)=>{
              SetEditingStudent((pre)=>{
                return {...pre!,Address:e.target.value}
              })
            }}
            />
        </Modal>
      </header>
    </div>
  );
};

export default App;
