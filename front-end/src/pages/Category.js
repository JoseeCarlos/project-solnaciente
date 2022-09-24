import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { CategoryService } from '../service/CategoryService';

const Crud = () => {
    let emptyCategory = {
        idcategory: null,
        image: null, 
        name: '',
        description: '',
        is_active: '',
        created_at: '',
        updated_at: '',

    };

    const [categories, setCategories] = useState(null);
    const [categoryDialog, setCategoryDialog] = useState(false);
    const [deleteCategoryDialog, setDeleteCategoryDialog] = useState(false);
    const [deleteCategoriesDialog, setDeleteCategoriesDialog] = useState(false);
    const [category, setCategory] = useState(emptyCategory);
    const [selectedCategories, setSelectedCategories] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        // const categoriesService = new CategoryService();
        // categoriesService.getCategories().then(data => setCategories(data));
        fetch('api/categories/')
            .then(response => response.json())
            .then(data => setCategories(data));
    }, []);

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    const openNew = () => {
        setCategory(emptyCategory);
        setSubmitted(false);
        setCategoryDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setCategoryDialog(false);
    }

    const hideDeleteCategoryDialog = () => {
        setDeleteCategoryDialog(false);
    }

    const hideDeleteCategoriesDialog = () => {
        setDeleteCategoriesDialog(false);
    }

    const saveCategory = () => {
        setSubmitted(true);

        if (category.name.trim()) {
            let _categories = [...categories];
            let _category = { ...category };
            if (category.id) {
                const index = findIndexById(category.id);

                _categories[index] = _category;
                toast.current.show({ severity: 'success', summary: '¡Éxito!', detail: 'Categoria Actualizada', life: 3000 });
            }
            else {
                _category.id = createId();
                _category.image = 'product-placeholder.svg';
                _categories.push(_category);
                toast.current.show({ severity: 'success', summary: '¡Éxito!', detail: 'Categoria Creada', life: 3000 });
            }

            setCategories(_categories);
            setCategoryDialog(false);
            setCategory(emptyCategory);
        }
    }

    const editCategory = (category) => {
        setCategory({ ...category });
        setCategoryDialog(true);
    }

    const confirmDeleteCategory = (category) => {
        setCategory(category);
        setDeleteCategoryDialog(true);
    }

    const deleteCategory = () => {
        let _categories = categories.filter(val => val.id !== category.id);
        setCategories(_categories);
        setDeleteCategoryDialog(false);
        setCategory(emptyCategory);
        toast.current.show({ severity: 'success', summary: '¡Éxito!', detail: 'Categoria Eliminada', life: 3000 });
    }

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < categories.length; i++) {
            if (categories[i].id === id) {
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
        setDeleteCategoriesDialog(true);
    }

    const deleteSelectedCategories = () => {
        let _categories = categories.filter(val => !selectedCategories.includes(val));
        setCategories(_categories);
        setDeleteCategoriesDialog(false);
        setSelectedCategories(null);
        toast.current.show({ severity: 'success', summary: '¡Éxito!', detail: 'Categorias Eliminadas', life: 3000 });
    }

    const onCategoryChange = (e) => {
        let _category = { ...category };
        _category['category'] = e.value;
        setCategory(_category);
    }

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _category = { ...category };
        _category[`${name}`] = val;

        setCategory(_category);
    }

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _category = { ...category };
        _category[`${name}`] = val;

        setCategory(_category);
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Nuevo" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
                    <Button label="Borrar" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedCategories || !selectedCategories.length} />
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

    const idBodyTemplate = (rowData) => {
        return (
            <>
                {rowData.id}
            </>
        );
    }

    const nameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Categoria</span>
                {rowData.name}
            </>
        );
    }

    const imageBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Imagen</span>
                <img src={`assets/demo/images/product/${rowData.image}`} alt={rowData.image} className="shadow-2" width="100" />
            </>
        )
    }

    const descriptionBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Descripción</span>
                {rowData.description}
            </>
        );
    }

    const statusBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Estado</span>
                <span className={`provider-badge status-lowstock`}>{ rowData.is_active === 0 ? 'Inactivo' : 'Activo' }</span>
            </>
        )
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editCategory(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning mt-2" onClick={() => confirmDeleteCategory(rowData)} />
            </div>
        );
    }

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Busqueda de Categoryos</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
    );

    const categoryDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={saveCategory} />
        </>
    );
    const deleteCategoryDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteCategoryDialog} />
            <Button label="Si" icon="pi pi-check" className="p-button-text" onClick={deleteCategory} />
        </>
    );
    const deleteCategoriesDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteCategoriesDialog} />
            <Button label="Si" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedCategories} />
        </>
    );

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                    <DataTable ref={dt} value={categories} selection={selectedCategories} onSelectionChange={(e) => setSelectedCategories(e.value)}
                        dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Mostrando {first} al {last} de {totalRecords} Categorias"
                        globalFilter={globalFilter} emptyMessage="No Categories found." header={header} responsiveLayout="scroll">
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem'}}></Column>
                        <Column field="id" header="ID" sortable body={idBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }} style={{ display: "none" }}></Column>
                        <Column field="name" header="Name" sortable body={nameBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column header="Image" body={imageBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="description" header="Descrición" body={descriptionBodyTemplate} sortable headerStyle={{ width: '14%', minWidth: '8rem' }}></Column>
                        <Column field="is_active" header="Estado" body={statusBodyTemplate} sortable headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>

                    <Dialog visible={categoryDialog} style={{ width: '450px' }} header="Detalles de la Categoria" modal className="p-fluid" footer={categoryDialogFooter} onHide={hideDialog}>
                        {category.image && <img src={`assets/demo/images/product/${category.image}`} alt={category.image} width="150" className="mt-0 mx-auto mb-5 block shadow-2" />}
                        <div className="field">
                            <label htmlFor="name">Nombre</label>
                            <InputText id="name" value={category.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !category.name })} />
                            {submitted && !category.name && <small className="p-invalid">El nombre es requerido.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="description">Descripción</label>
                            <InputTextarea id="description" value={category.description} onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20} autoFocus className={classNames({ 'p-invalid': submitted && !category.description })} />
                            {submitted && !category.description && <small className="p-invalid">La descrición es requerida.</small>}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteCategoryDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteCategoryDialogFooter} onHide={hideDeleteCategoryDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {category && <span>¿Está seguro que desea eliminar la categoria <b>{category.name}</b>?</span>}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteCategoriesDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteCategoriesDialogFooter} onHide={hideDeleteCategoriesDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {category && <span>¿Está seguro que desea eliminar las categorias?</span>}
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