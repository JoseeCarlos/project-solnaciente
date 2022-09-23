import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { ListBox } from 'primereact/listbox';
import { Image } from "primereact/image";

const FormLayoutDemo = () => {

    let emptyProduct = {
        id: null,
        image: null,
        description: '',
        category: null,
        price: 0,
        quantity: 0,
        rating: 0,
        inventoryStatus: 'INSTOCK'
    };

    const [listboxValue, setListboxValue] = useState(null);
    const [dropdownItem, setDropdownItem] = useState(null);
    const dropdownItems = [
        { name: 'Option 1', code: 'Option 1' },
        { name: 'Leche', code: 'Option 2' },
        { name: 'Leche Pil', code: 'Option 3' },
        { name: 'Cafe con leche', code: 'Option 4' },
        { name: 'Perno', code: 'Option 5' }
    ];

    const listboxValues = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'Rome', code: 'RM' },
        { name: 'Paris', code: 'PRS' }
    ];


    const [products, setProducts] = useState(null);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    const openNew = () => {
        // setProduct(emptyProduct);
        // setSubmitted(false);
        // setProductDialog(true);
    }

    const editProduct = (product) => {
        // setProduct({ ...product });
        // setProductDialog(true);
    }

    const confirmDeleteProduct = (product) => {
        // setProduct(product);
    }

    const deleteProduct = () => {
        // let _products = products.filter(val => val.id !== product.id);
        // setProducts(_products);
        // setDeleteProductDialog(false);
        // setProduct(emptyProduct);
        // toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    }

    const confirmDeleteSelected = () => {
        // setDeleteProductsDialog(true);
    }

    const deleteSelectedProducts = () => {
        // let _products = products.filter(val => !selectedProducts.includes(val));
        // setProducts(_products);
        // // setDeleteProductsDialog(false);
        // setSelectedProducts(null);
        // toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    }

    const codeBodyTemplate = (rowData) => {
        return (
            <>
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

    const imageBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Imagen</span>
                <img src={`assets/demo/images/product/${rowData.image}`} alt={rowData.image} className="shadow-2" width="100" />
            </>
        )
    }

    const priceBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Pricio</span>
                {formatCurrency(rowData.price)}
            </>
        );
    }

    const categoryBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Categoría</span>
                {rowData.category}
            </>
        );
    }

    const statusBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Estado</span>
                <span className={`product-badge status-${rowData.inventoryStatus.toLowerCase()}`}>{rowData.inventoryStatus}</span>
            </>
        )
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning mt-2" onClick={() => confirmDeleteProduct(rowData)} />
            </div>
        );
    }


    const onInputNumberChange = (e, name) => {
        // const val = e.value || 0;
        // let _product = { ...product };
        // _product[`${name}`] = val;

        // setProduct(_product);
    }

    return (
        <div className="grid">
            <div className="col-12 md:col-6">
                <div className="card p-fluid">
                    <h5>Buscar Producto</h5>
                    <div className="field">
                        <ListBox value={listboxValue} onChange={(e) => setListboxValue(e.value)} options={listboxValues} optionLabel="name" filter />
                    </div>
                </div>
            </div>

            <div className="col-12 md:col-6">
                <div className="card p-fluid">
                    <h5>Registrar Compra</h5>
                    <h5>Image</h5>
                    <div className="flex justify-content-center">
                        <Image src="assets/demo/images/galleria/galleria11.jpg" alt="galleria" width={250} preview style={{ "margin-bottom": "10px" }}/>
                    </div>
                    <div className="formgrid grid">
                        <div className="field col">
                            <Dropdown id="proveedor" value={dropdownItem} onChange={(e) => setDropdownItem(e.value)} options={dropdownItems} optionLabel="name" placeholder="Proveedor"></Dropdown>
                        </div>
                        <div className="field col">
                            <label htmlFor="quantity" className="p-sr-only">Cantidad</label>
                            <InputNumber id="quantity" placeholder="Cantidad" />
                        </div>
                    </div>
                    <div className="formgrid grid">
                        <div className="field col">
                            <label htmlFor="price_in" className="p-sr-only">Precio de compra</label>
                            <InputNumber id="price_in" onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency" currency="USD" locale="en-US" placeholder="Precio de compra" />
                        </div>
                        <div className="field col">
                            <label htmlFor="price_out" className="p-sr-only">Precio de venta</label>
                            <InputNumber id="price_out" onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency" currency="USD" locale="en-US" placeholder="Precio de venta" />
                        </div>
                    </div>
                    <Button label="Registrar Compra"></Button>
                </div>
            </div>

            <div className="col-12">
                <div className="card">
                <h5>Compras registradas</h5>
                    <DataTable value={products} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                        dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                        globalFilter={globalFilter} emptyMessage="No products found." responsiveLayout="scroll">
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                        <Column field="code" header="Code" sortable body={codeBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="name" header="Proveedor" sortable body={nameBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="name" header="Producto" sortable body={nameBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column header="Image" body={imageBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="price" header="Cantidad" body={priceBodyTemplate} sortable headerStyle={{ width: '14%', minWidth: '8rem' }}></Column>
                        <Column field="category" header="Precio de compra" sortable body={categoryBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="inventoryStatus" header="Precio de venta" body={statusBodyTemplate} sortable headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="inventoryStatus" header="Total" body={statusBodyTemplate} sortable headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>
                </div>
            </div>
        </div >
    )
}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(FormLayoutDemo, comparisonFn);
