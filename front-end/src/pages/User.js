import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { UserService } from '../service/UserService';
import { RadioButton } from 'primereact/radiobutton';
// import { Select } from 'react-select'

const Crud = () => {
    let emptyUser = {
        iduser : null,
        name : '',
        first_name : '',
        second_name : '',
        ci : '',
        number : '',
        username : '',
        password : '',
        is_active : '',
        created_at : '',
        updated_at : '2022-05-01 00:00:00',
        idrole : '',
    };

    const [users, setUsers] = useState(null);
    const [userDialog, setUserDialog] = useState(false);
    const [deleteUserDialog, setDeleteUserDialog] = useState(false);
    const [deleteUsersDialog, setDeleteUsersDialog] = useState(false);
    const [user, setUser] = useState(emptyUser);
    const [selectedUsers, setSelectedUsers] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        // const userService = new UserService();
        // userService.getUsers().then(data => setUsers(data));
        fetch('/api/users/')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setUsers(data)})

        
        fetch('/api/roles/')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setRoles(data)}
            )
    }, []);

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    const openNew = () => {
        setUser(emptyUser);
        setSubmitted(false);
        setUserDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setUserDialog(false);
    }

    const hideDeleteUserDialog = () => {
        setDeleteUserDialog(false);
    }

    const hideDeleteUsersDialog = () => {
        setDeleteUsersDialog(false);
    }

    const saveUser = () => {
        setSubmitted(true);

        if (user.name.trim()) {
            let _users = [...users];
            let _user = {...user};
            if (user.iduser) {
                
                console.log(_user);
                console.log('update');
                fetch('/api/users/update/'+user.iduser, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(_user)
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    }
                )
                // const userService = new UserService();
                // userService.updateUser(_user).then(data => setUsers(data));
                // const index = findIndexById(user.iduser
            }
            else {
               
                user.password=generatePassword();
                user.username=generateUsername(user.name, user.first_name, user.second_name);
                console.log(user);
                fetch('/api/users/add', {
                    method: 'POST',
                    body: JSON.stringify(user),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data);

                    }
                )
            }

            // setUsers(_users);
            // setUserDialog(false);
            // setUser(emptyUser);
        }
    }

    const editUser = (user) => {
        setUser({ ...user });
        setUserDialog(true);
    }

    const confirmDeleteUser = (user) => {
        setUser(user);
        setDeleteUserDialog(true);
    }

    const deleteUser = () => {
       fetch('/api/users/delete/'+user.iduser, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            }
        )
    }

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    const exportCSV = () => {
        dt.current.exportCSV();
    }

    const confirmDeleteSelected = () => {
        setDeleteUsersDialog(true);
    }

    const deleteSelectedUsers = () => {
        let _users = users.filter(val => !selectedUsers.includes(val));
        setUsers(_users);
        setDeleteUsersDialog(false);
        setSelectedUsers(null);
        toast.current.show({ severity: 'success', summary: '¡Éxito!', detail: 'Usuario Eliminado', life: 3000 });
    }

    const onRoleChange = (e) => {
        let _user = { ...user };
        _user['role'] = e.value;
        setUser(_user);
    }

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _user = { ...user };
        _user[`${name}`] = val;

        setUser(_user);
    }

    const onRolesChange = (e) => {
        let _user = { ...user };
        _user['idrole'] = e.value;
        setUser(_user);
        
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Nuevo" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
                    <Button label="Borrar" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedUsers || !selectedUsers.length} />
                </div>
            </React.Fragment>
        )
    }

    const idBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">ID</span>
                {rowData.id}
            </>
        );
    }

    const fullNameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Nombre Completo</span>
                {rowData.name +' '+  rowData.first_name +' '+ rowData.second_name} 
            </>
        );
    }

    const ciBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">C.I.</span>
                {rowData.ci}
            </>
        );
    }

    const numberBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Número</span>
                {rowData.number}
            </>
        );
    }

    const usernameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Usuario</span>
                {rowData.username}
            </>
        );
    }

    const roleBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Número</span>
                {rowData.idrole }
            </>
        );
    }

    const statusBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Estado</span>
                <span className={`provider-badge status-${ rowData.is_active === 0 ?  'outofstock' : 'instock' }`}>{ rowData.is_active === 0 ? 'Inactivo' : 'Activo' }</span>
            </>
        )
    }

    const generateUsername = (name, last_name, second_last_name) => {
        for (let i = 0; i < 1; i++) {
            let username = String(name).charAt(0) + String(last_name).charAt(0) + String(second_last_name).charAt(0) + Math.floor(Math.random() * 1000);
            return username;
        }
    }

    const generatePassword = () => {
        //legth password 8
        let password = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 8; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return password;
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editUser(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger mt-2" onClick={() => confirmDeleteUser(rowData)} />
            </div>
        );
    }

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Busqueda de Usuarios</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
    );

    const userDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={saveUser} />
        </>
    );
    const deleteUserDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteUserDialog} />
            <Button label="Si" icon="pi pi-check" className="p-button-text" onClick={deleteUser} />
        </>
    );
    const deleteUsersDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteUsersDialog} />
            <Button label="Si" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedUsers} />
        </>
    );

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>

                    <DataTable ref={dt} value={users} selection={selectedUsers} onSelectionChange={(e) => setSelectedUsers(e.value)}
                        dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Mostrando {first} al {last} de {totalRecords} usuarios"
                        globalFilter={globalFilter} emptyMessage="No users found." header={header} responsiveLayout="scroll">
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                        <Column field="id" header="ID" sortable body={idBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }} style={{ display: 'none' }}></Column>
                        <Column field="name" header="Nombre Completo" sortable body={fullNameBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="ci" header="C.I." body={ciBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="number" header="Número" body={numberBodyTemplate} sortable headerStyle={{ width: '14%', minWidth: '8rem' }}></Column>
                        <Column field="username" header="Usuario" sortable body={usernameBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="role" header="Rol" body={roleBodyTemplate} sortable headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="userStatus" header="Estado" body={statusBodyTemplate} sortable headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>

                    <Dialog visible={userDialog} style={{ width: '450px' }} header="Detalles del Usuario" modal className="p-fluid" footer={userDialogFooter} onHide={hideDialog}>
                        <div className="field">
                            <label htmlFor="name">Nombre</label>
                            <InputText id="name" value={user.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !user.name })} />
                            {submitted && !user.name && <small className="p-invalid">El nombre es requerido.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="last_name">Primer Apellido</label>
                            <InputText id="last_name" value={user.first_name} onChange={(e) => onInputChange(e, 'first_name')} required autoFocus className={classNames({ 'p-invalid': submitted && !user.first_name })} />
                            {submitted && !user.first_name && <small className="p-invalid">El apellido es requerido.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="second_name">Segundo Apellido</label>
                            <InputText id="second_name" value={user.second_name} onChange={(e) => onInputChange(e, 'second_name')} />
                        </div>


                        <div className="field">
                            <label htmlFor="number">Ci</label>
                            <InputText id="number" value={user.number} onChange={(e) => onInputChange(e, 'number')} />
                        </div>
                        <div className="field">
                            <label htmlFor="ci">Número</label>
                            <InputText id="ci" value={user.ci} onChange={(e) => onInputChange(e, 'ci')} />
                        </div>
                        {roles.map((role) => (
                            <div className='field-radiobutton col-6' >
                            <RadioButton inputId={role.idRole} name="category" value={role.idRole} onChange={onRolesChange} checked={user.idrole === role.idRole} />
                            <label htmlFor={role.idRole}>{role.name}</label>
                        </div>
                        ))}
                        

                        {/* <div className="field">
                            <label className="mb-3">Rol de usuario</label>
                            <div className="formgrid grid">
                            {roles.map((item)=>(
                                
                                <h1>{item.name}</h1>
                            )) }
                            </div>
                        </div> */}


                       
                        {/* <div className="field">
                            <label htmlFor="role">Rol</label>
                            <Select id="role" options={user.role}></Select>
                        </div> */}
                    </Dialog>

                    <Dialog visible={deleteUserDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteUserDialogFooter} onHide={hideDeleteUserDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {user && <span>¿Está seguro que desea eliminar a <b>{user.name}</b>?</span>}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteUsersDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteUsersDialogFooter} onHide={hideDeleteUsersDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {user && <span>¿Está seguro que desea eliminar los usuarios seleccionados?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(Crud, comparisonFn);