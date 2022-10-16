import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { ProviderService } from '../service/ProviderService';
import { ConnectedOverlayScrollHandler } from 'primereact/utils';
import { Dropdown } from 'primereact/dropdown';

const Crud = () => {
    let emptyProvider = {
        idProvider: null,
        name: '',
        description: '',
        direction: '',
        phone: '',
        is_active: null,
        created_at: '',
        updated_at: '2022-01-01 00:00:00'
    };

    const [providers, setProviders] = useState(null);
    const [providersFiltered, setProvidersFiltered] = useState(null);
    const [providerDialog, setProviderDialog] = useState(false);
    const [deleteProviderDialog, setDeleteProviderDialog] = useState(false);
    const [deleteProvidersDialog, setDeleteProvidersDialog] = useState(false);
    const [provider, setProvider] = useState(emptyProvider);
    const [selectedProviders, setSelectedProviders] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const [selectedActive, setSelectedActive] = useState(null);
    const data = [
        {name: 'Proveedores Activos', value : 'active'},
        {name: 'Proveedores Inactivos', value : 'inactive'},
        {name: 'Todos los Proveedores', value : 'all'}
    ];

    useEffect(() => {
        // const providerService = new ProviderService();
        // providerService.getProviders().then(data => setProviders(data));
        fetch('/api/providers/').then(res => res.json()).then(data => {
            setProviders(data)
            setProvidersFiltered(data)
            console.log(data.length)
        });
    }, []);

    const onActiveChange = (e) => {
        setSelectedActive(e.value);
        setProviders(providersFiltered);
        if(e.value === 'active'){
            setProviders(providers.filter((val) => {
                return val.is_active === 1;
            }))
        }
        if(e.value === 'inactive'){
            setProviders(providers.filter((val) => {
                return val.is_active === 0;
            }))
        }
    };

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    const openNew = () => {
        setProvider(emptyProvider);
        setSubmitted(false);
        setProviderDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setProviderDialog(false);
    }

    const hideDeleteProviderDialog = () => {
        setDeleteProviderDialog(false);
    }

    const hideDeleteProvidersDialog = () => {
        setDeleteProvidersDialog(false);
    }

    const saveProvider = () => {
        setSubmitted(true);

        if (provider.name.trim()) {
            let _providers = [...providers];
            let _provider = { ...provider };
            if (provider.idProvider) {
                fetch('/api/providers/update/' + provider.idProvider, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(provider)
                }).then(res => res.json()).then(data => {
                    console.log(data)
                    // const index = findIndexById(provider.idProvider);

                    // _providers[index] = _provider;
                    // setProviders(_providers);
                    setProviderDialog(false);
                    setProvider(emptyProvider);
                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Provider Updated', life: 3000 });
                });
                console.log('update')
            }
            else {
                _provider.id = createId();
                _provider.image = 'provider-placeholder.svg';
                _providers.push(_provider);
                toast.current.show({ severity: 'success', summary: '¡Éxito!', detail: 'Proveedor Creado', life: 3000 });
                fetch('/api/providers/add', {
                    method: 'POST',
                    body: JSON.stringify(provider),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }).then(res => res.json()).then(data => {
                    console.log(data)
                    toast.current.show({ severity: 'success', summary: '¡Éxito!', detail: 'Proveedor Creado', life: 3000 });
                    setProviderDialog(false);
                    setProviders(providers => [...providers, data]);
                }).catch(err => console.error(err));
                console.log(_provider)
            }

            setProviders(_providers);
            setProviderDialog(false);
            setProvider(emptyProvider);
        }
    }

    const editProvider = (provider) => {
        setProvider({ ...provider });
        setProviderDialog(true);
    }

    const confirmDeleteProvider = (provider) => {
        setProvider(provider);
        setDeleteProviderDialog(true);
    }

    const deleteProvider = () => {
       fetch('/api/providers/delete/' + provider.idProvider, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(provider)
        }).then(res => res.json()).then(data => {
            console.log(data)
            // const index = findIndexById(provider.id
            // _providers[index] = _provider;
            // setProviders(_providers);
            setDeleteProviderDialog(false);
            setProvider(emptyProvider);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Provider Deleted', life: 3000 });
        });
    }

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < providers.length; i++) {
            if (providers[i].id === id) {
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
        setDeleteProvidersDialog(true);
    }

    const deleteSelectedProviders = () => {
        let _providers = providers.filter(val => !selectedProviders.includes(val));
        setProviders(_providers);
        setDeleteProvidersDialog(false);
        setSelectedProviders(null);
        toast.current.show({ severity: 'success', summary: '¡Éxito!', detail: 'Proveedores Eliminados', life: 3000 });
    }

    const onCategoryChange = (e) => {
        let _provider = { ...provider };
        _provider['category'] = e.value;
        setProvider(_provider);
    }

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _provider = { ...provider };
        _provider[`${name}`] = val;

        setProvider(_provider);
    }

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _provider = { ...provider };
        _provider[`${name}`] = val;

        setProvider(_provider);
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Nuevo" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
                    <Button label="Borrar" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedProviders || !selectedProviders.length} />
                </div>
            </React.Fragment>
        )
    }

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Cargar Imagen" chooseLabel="Cargar Imagen" className="mr-2 inline-block" />
            </React.Fragment>
        )
    }

    const codeBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">ID</span>
                {rowData.code}
            </>
        );
    }

    const nameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Nombre</span>
                {rowData.name}
            </>
        );
    }

    const descriptionBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Descripción</span>
                {rowData.description}
            </>
        )
    }

    const directionBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Dirección</span>
                {rowData.direction}
            </>
        );
    }

    const phoneBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Teléfono</span>
                {rowData.phone}
            </>
        );
    }

    const createDateBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Añadido el:</span>
                {rowData.created_at}
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

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editProvider(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger mt-2" onClick={() => confirmDeleteProvider(rowData)} />
            </div>
        );
    }

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Busqueda de Proveedores</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <Dropdown value={selectedActive} options={data} onChange={onActiveChange} optionLabel="name" placeholder="Tipo de Usuarios"/>
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
    );

    const providerDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={saveProvider} />
        </>
    );
    const deleteProviderDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProviderDialog} />
            <Button label="Si" icon="pi pi-check" className="p-button-text" onClick={deleteProvider} />
        </>
    );
    const deleteProvidersDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProvidersDialog} />
            <Button label="Si" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedProviders} />
        </>
    );

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                    <DataTable ref={dt} value={providers} selection={selectedProviders} onSelectionChange={(e) => setSelectedProviders(e.value)}
                        dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Mostrando {first} al {last} de {totalRecords} proveedores"
                        globalFilter={globalFilter} emptyMessage="No providers found." header={header} responsiveLayout="scroll">
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                        {/* <Column field="code" header="ID" sortable body={codeBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem', display: 'none' }} style={{ display: 'none'}}></Column> */}
                        <Column field="name" header="Nombre" sortable body={nameBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="description" header="Descripción" body={descriptionBodyTemplate} sortable headerStyle={{ width: '14%', minWidth: '8rem' }}></Column>
                        <Column field="direction" header="Dirección" body={directionBodyTemplate} sortable headerStyle={{ width: '14%', minWidth: '8rem' }}></Column>
                        <Column field="phone" header="Teléfono" sortable body={phoneBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="providerStatus" header="Estado" body={statusBodyTemplate} sortable headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="createDate" header="Añadido el:" body={createDateBodyTemplate} sortable headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>

                    <Dialog visible={providerDialog} style={{ width: '450px' }} header="Detalles del Proveedor" modal className="p-fluid" footer={providerDialogFooter} onHide={hideDialog}>
                        <div className="field">
                            <label htmlFor="name">Nombre</label>
                            <InputText id="name" value={provider.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !provider.name })} />
                            {submitted && !provider.name && <small className="p-invalid">El nombre es requerido.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="description">Descripción</label>
                            <InputTextarea id="description" value={provider.description} onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20} className={classNames({ 'p-invalid': submitted && !provider.description })} />
                            {submitted && !provider.description && <small className="p-invalid">La descripcion es requerida.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="direction">Dirección</label>
                            <InputTextarea id="direction" value={provider.direction} onChange={(e) => onInputChange(e, 'direction')} required rows={3} cols={20} className={classNames({ 'p-invalid': submitted && !provider.direction })} />
                            {submitted && !provider.direction && <small className="p-invalid">La dirección es requerida.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="phone">Teléfono</label>
                            <InputText id="phone" value={provider.phone} onChange={(e) => onInputChange(e, 'phone')} autoFocus />
                        </div>
                    </Dialog>

                    <Dialog visible={deleteProviderDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteProviderDialogFooter} onHide={hideDeleteProviderDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {provider && <span>¿Está seguro de eliminar al proveedor <b>{provider.name}</b>?</span>}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteProvidersDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteProvidersDialogFooter} onHide={hideDeleteProvidersDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {provider && <span>¿Está seguro de eliminar a estos proveedores?</span>}
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