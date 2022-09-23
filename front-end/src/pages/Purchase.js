import React, { useState, useEffect, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { ListBox } from 'primereact/listbox';
import { Image } from "primereact/image";
import classNames from 'classnames';
import { Toast } from 'primereact/toast';


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
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [productlist, setProductlist] = useState(null);
    const [providers, setProviders] = useState(null);
    const toast = useRef(null);
    

    let emptyPurchase = {
        idpurchase : null,
        total_quantity : 0,
        total_price : 0,
        purchase_date : '2022-01-01',
        is_active : '',
        updated_at : '2022-01-01',
        iduser : 2,
        idprovider : null,
        idproduct : null,
        idpurchase : null,
        quantity : 0,
        price : 0,
    }

    const [purchase, setPurchase] = useState(emptyPurchase);
    


    

    useEffect(() => {
        fetch('/api/products/')
            .then(res => res.json())
            .then(data => { 
                setProductlist(data);
                console.log(data)
                console.log(listboxValues)
            });
        
        fetch('/api/providers/')
            .then(res => res.json())
            .then(data => {
                setProviders(data);
                console.log(data)
            }
            );
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    const selectedProvider = (e) => {
        console.log(e.value)
        let _purchase = { ...purchase };
        _purchase['idprovider'] = e.value.idProvider;
        setPurchase(_purchase);

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

    const setSelectionProducts = (e) => {
        setSelectedProducts(e.value);
        let _purchase = { ...purchase };
        _purchase['idproduct'] = e.value.idProduct;
        _purchase['price'] = e.value.price_in;
        setPurchase(_purchase);


    }


    const onInputNumberChange = (e, name) => {
        let val = e.value;
        let _purchase = { ...purchase };
        _purchase[`${name}`] = val;
        setPurchase(_purchase);
    }

    const savePurchase = () => {
        console.log(purchase)
        fetch('/api/purchases/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(purchase)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            }
            );
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Purchase added', life: 3000 });

    }

    const onCuantityChange = (e) => {
        let _purchase = { ...purchase };
        _purchase['quantity'] = e.value;
        console.log(_purchase)
        console.log(purchase)
        let total = _purchase.quantity * _purchase.price;
        _purchase['total_price'] = total;
        setPurchase(_purchase);
    }

    return (
        <div className="grid">
            <Toast ref={toast} />
            <div className="col-12 md:col-6">
                <div className="card p-fluid">
                    <h5>Buscar Producto</h5>
                    <div className="field">
                        <ListBox value={productlist} options={productlist}  onChange={setSelectionProducts} optionLabel="name" filter />

                    </div>
                </div>
            </div>

            <div className="col-12 md:col-6">
                <div className="card p-fluid">
                <h5>Registrar Compra</h5>
                    <div className="formgrid grid">
                        <div className="field col">
                        <div className="flex justify-content-center">
                                <Image src="assets/demo/images/galleria/galleria11.jpg" alt="galleria" width={250} preview style={{ "margin-bottom": "10px" }}/>
                            </div>
                            
                        </div>
                        <div className="field col">
                            <label htmlFor="name">Nombre: </label>
                            <br />
                            <label htmlFor="name">{ selectedProducts.name ? " "+selectedProducts.name : ' Seleccione un producto' }</label>
                        </div>
                    </div>
                    
                    
                    <div className="formgrid grid">
                        <div className="field col">
                            <label htmlFor="name">Proveedor</label>
                            <Dropdown id="provider" value={providers} onChange={selectedProvider} options={providers} optionLabel="name" placeholder="Proveedor"></Dropdown>
                        </div>
                        <div className="field col">
                            <label>Cantidad Disponible</label>
                            <InputNumber id="quantity" value={selectedProducts.stock} disabled required autoFocus className={classNames({ 'p-invalid': submitted && !selectedProducts.stock })} />
                            {submitted &&  !selectedProducts.stock && <small className="p-invalid">Stock is required.</small>}
                        </div>
                    </div>
                    <div className="formgrid grid">
                        <div className="field col">
                            <label>Precio de compra</label>
                            <InputNumber id="price_in" value={selectedProducts.price_in} disabled  onChange={(e) => onInputNumberChange(e, 'price')} mode="currency" currency="USD" locale="en-US" placeholder="Precio de compra" />
                        </div>
                        <div className="field col">
                            <label>Precio de venta</label>
                            <InputNumber id="price_out" value={selectedProducts.price_out} disabled onValueChange={(e) => onInputNumberChange(e, 'price_out')} mode="currency" currency="USD" locale="en-US" placeholder="Precio de venta" />
                        </div>
                    </div>
                    <div className="field">
                            <label htmlFor="barcode">Cantidad</label>
                            <InputNumber id="barcode" required autoFocus onChange={(e) => onCuantityChange(e)} className={classNames({ 'p-invalid': submitted && purchase.quantity })} />
                            {submitted && <small className="p-invalid">Barcode is required.</small>}
                    </div>
                    <div className="field">
                            <label htmlFor="barcode">Precio Total: {purchase.total_price} </label>
                    </div>
                    <Button label="Registrar Compra" onClick={savePurchase} ></Button>
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
