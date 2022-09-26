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
import { ProductService } from '../service/ProductService';

const Crud = () => {
    let emptyProduct = {
        idProduct: null,
        name: '',
        image: 'defaul.jpg',
        barcode: '',
        price_in: null,
        price_out: null,
        presentation: '',
        unit: '',
        stock: null,
        category_id: null,
        is_active: null,
        created_at: null,
        updated_at: '2022-01-01 00:00:00',
        id_provider: null,
        user_id: 2,
        id_brand: null,

    };

    const [products, setProducts] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [categories, setCategories] = useState([]);
    const toast = useRef(null);
    const dt = useRef(null);
    const [providers, setProviders] = useState([]);
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        // const productService = new ProductService();
        // productService.getProducts().then(data => setProducts(data));
        
        
        
        console.log(categories.length);
        fetch("/api/products/").then((res)=>res.json().then((data)=> {
            setProducts(data)
            data.map((item)=>console.log(item.idProduct))
          }
          ));

        fetch("/api/categories/").then((res)=>res.json().then((data)=> {
            setCategories(data)
            console.log(categories.length);
          }
            ));
        
        fetch("/api/providers/").then((res)=>res.json().then((data)=> {
            setProviders(data)
            console.log(providers.length);
          }
            ));

        fetch("/api/brands/").then((res)=>res.json().then((data)=> {
            setBrands(data)
            console.log(brands.length);
          }
            ));
        
    }, []);

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    }

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    }

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    }

    const saveProduct = () => {
        setSubmitted(true);

        if (product.name.trim()) {
            let _products = [...products];
            let _product = { ...product };
            if (product.idProduct) {

                fetch("/api/products/update/"+product.idProduct, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(product)
                }).then((res)=>res.json().then((data)=> {
                    console.log(data);
                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
                    setProductDialog(false);
                    setProduct(emptyProduct);
                    }
                    ));
                console.log("update");
            }
            else {
                // _product.idProduct = createId();
                fetch("/api/products/add", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(product)
                }).then((res)=>res.json().then((data)=> {
                    console.log(data);}
                    ));
                console.log("create");
                console.log(product);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            setProducts(_products);
            setProductDialog(false);
            setProduct(emptyProduct);

        }
    }

    const editProduct = (product) => {
        setProduct({ ...product });
        setProductDialog(true);
    }

    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    }

    const deleteProduct = () => {
        fetch("/api/products/delete/"+product.idProduct, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        }).then((res)=>res.json().then((data)=> {
            console.log(data);}
            ));
       console.log(product.idProduct);
        fetch("/api/products/").then((res)=>res.json().then((data)=> {
            setProducts(data)
            data.map((item)=>console.log(item.idProduct))
            }
            ));
        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    }

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
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
        setDeleteProductsDialog(true);
    }

    const deleteSelectedProducts = () => {
        let _products = products.filter(val => !selectedProducts.includes(val));
        setProducts(_products);
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    }

    const onCategoryChange = (e) => {
        let _product = { ...product };
        console.log(e.value);
        _product['category_id'] = e.value;
        console.log(_product);
        setProduct(_product);
    }

    const onProviderChange = (e) => {
        let _product = { ...product };
        _product['id_provider'] = e.value;
        console.log(_product);
        setProduct(_product);
    }
    const onBrandChange = (e) => {
        let _product = { ...product };
        _product['id_brand'] = e.value;
        console.log(_product);
        setProduct(_product);
    }

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };
        console.log(val+" "+name);
        _product[`${name}`] = val;

        setProduct(_product);
    }

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _product = { ...product };
        _product[`${name}`] = val;

        setProduct(_product);
    }

    const onInputFileChange = (e, name) => {
        const val = e.files[0];
        let _product = { ...product };
        console.log(val+" "+name);
        _product[`${name}`] = val;

        setProduct(_product);
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Nuevo" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
                    <Button label="Borrar" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} />
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
                <span className="p-column-title">Codigo</span>
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
    const barcodeBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Barcode</span>
                {rowData.barcode}
            </>
        );
    }
    const imagepBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Imagen</span>
                <img src={`assets/demo/images/product/${rowData.image}`} alt={rowData.image} className="shadow-2" width="100" />
            </>
        );
    }
    const priceinBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Price in</span>
                {rowData.price_in}
            </>
        );
    }
    const priceoutBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Price Out</span>
                {rowData.price_out}
            </>
        );
    }
    const presentationBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Price Out</span>
                {rowData.price_out}
            </>
        );
    }
    const categoryBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Category</span>
                {rowData.category}
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

    const categorysBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Categoría</span>
                {rowData.category_id}
            </>
        );
    }

    const ratingBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Calificación</span>
                <Rating value={rowData.rating} readonly cancel={false} />
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
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger mt-2" onClick={() => confirmDeleteProduct(rowData)} />
            </div>
        );
    }

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Busqueda de Productos</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
    );

    const productDialogFooter = (
        <>
            <Button label="CancelaR" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={saveProduct} />
        </>
    );
    const deleteProductDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
            <Button label="Si" icon="pi pi-check" className="p-button-text" onClick={deleteProduct} />
        </>
    );
    const deleteProductsDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductsDialog} />
            <Button label="Si" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedProducts} />
        </>
    );
    const myUploader = (event,name) => {

        const val = event.files[0].name;
        // let _product = { ...product };
        console.log(val+" "+name);
        // _product[`${name}`] = val;

        // setProduct(_product);

    }

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                    <DataTable ref={dt} value={products} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                        dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                        globalFilter={globalFilter} emptyMessage="No products found." header={header} responsiveLayout="scroll">
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem'}}></Column>
                        {/* <Column field="code" header="Code" sortable body={codeBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column> */}
                        <Column field="name" header="Name" sortable body={nameBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="barcode" header="Barcode" sortable body={barcodeBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="image" header="Image" sortable body={imagepBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="Presentation" header="Presentation" sortable body={priceoutBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="Category" header="Category" sortable body={categorysBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="is_active" header="Estado" body={statusBodyTemplate} sortable headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        {/* <Column field="PriceInt" header="PriceInt" sortable body={priceinBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="PriceOut" header="PriceOut" sortable body={presentationBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column> */}

                        {/* <Column header="Image" body={imageBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="price" header="Price" body={priceBodyTemplate} sortable headerStyle={{ width: '14%', minWidth: '8rem' }}></Column>
                        <Column field="category" header="Category" sortable body={categoryBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="rating" header="Reviews" body={ratingBodyTemplate} sortable headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="inventoryStatus" header="Status" body={statusBodyTemplate} sortable headerStyle={{ width: '14%', minWidth: '10rem' }}></Column> */}
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>

                    <Dialog visible={productDialog} style={{ width: '450px' }} header="Detalles del Producto" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                        { product.image=='defaul.jpg' ? <img src={`assets/demo/images/product/${product.image}`} alt={product.image} width="150" className="mt-0 mx-auto mb-5 block shadow-2" /> : <img src={`assets/demo/images/product/${product.image}`} alt={product.image} width="150" className="mt-0 mx-auto mb-5 block shadow-2" /> }
                        <div className="field">
                            <label htmlFor="name">Nombre</label>
                            <InputText id="name" value={product.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.name })} />
                            {submitted && !product.name && <small className="p-invalid">Name is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="image">Imagen</label>
                            <FileUpload name="demo[]" url="./assets/" customUpload uploadHandler={(e)=> myUploader(e,'image')} />
                            {submitted && !product.image && <small className="p-invalid">Image is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="barcode">Codigo de Barras</label>
                            <InputText id="barcode" value={product.barcode} onChange={(e) => onInputChange(e, 'barcode')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.barcode })} />
                            {submitted && !product.barcode && <small className="p-invalid">Barcode is required.</small>}
                        </div>
                       
                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="price_in">Precio de compra</label>
                                <InputNumber id="price_in" value={product.price_in} onChange={(e) => onInputNumberChange(e, 'price_in')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.price_in })} />
                                {/* {submitted && !product.price_in && <small className="p-invalid">Price in is required.</small>} */}
                            </div>
                            <div className="field col">
                                <label htmlFor="priceout">Precio de Venta</label>
                                <InputNumber id="priceout" value={product.price_out} onChange={(e) => onInputNumberChange(e, 'price_out')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.price_out })} />
                                {/* {submitted && !product.price_out && <small className="p-invalid">Price out is required.</small>} */}
                            </div>
                        </div>
                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="presentation">Presentacion</label>
                                <InputText id="presentation" value={product.presentation} onChange={(e) => onInputChange(e, 'presentation')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.presentation })} />
                                {submitted && !product.presentation && <small className="p-invalid">Presentation is required.</small>}
                            </div>
                            <div className="field col">
                                <label htmlFor="unit">Unidad de medida</label>
                                <InputText id="unit" value={product.unit} onChange={(e) => onInputChange(e, 'unit')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.unit })} />
                                {submitted && !product.unit && <small className="p-invalid">unit is required.</small>}
                            </div>
                        </div>
                        {/* <div className="field">
                            <label htmlFor="barcode">Presentacion</label>
                            <InputText id="description" value={product.description} onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20} />
                        </div>
                        <div className="field">
                            <label htmlFor="barcode">Unidad de medida</label>
                            <InputText id="description" value={product.description} onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20} />
                        </div> */}
                        <div className="field">
                                <label htmlFor="stock">stock</label>
                                <InputNumber id="stock" value={product.stock} onChange={(e) => onInputNumberChange(e, 'stock')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.stock })} />
                                {submitted && !product.stock && <small className="p-invalid">Stock is required.</small>}
                        </div>
                       

                        <div className="field">
                            <label className="mb-3">Categoria</label>
                            <div className="formgrid grid">
                           
                            { categories.map((item)=>(
                                
                                <div className="field-radiobutton col-6">
                                    <RadioButton inputId={item.idcategory} name="category" value={item.idcategory} onChange={onCategoryChange} checked={product.category_id === item.idcategory} />
                                    <label htmlFor={item.idcategory}>{item.name}</label>
                                </div>
                            )) }
                            </div>
                        </div>
                        <div className="field">
                            <label className="mb-3">Proveedor</label>
                            <div className="formgrid grid">
                           
                            { providers.map((item)=>(
                                
                                <div className="field-radiobutton col-6">
                                    <RadioButton inputId={item.idProvider} name="category" value={item.idProvider} onChange={onProviderChange} checked={product.id_provider === item.idProvider} />
                                    <label htmlFor={item.idProvider}>{item.name}</label>
                                </div>
                            )) }
                            </div>
                        </div>

                        <div className="field">
                            <label className="mb-3">Marca</label>
                            <div className="formgrid grid">
                           
                            { brands.map((item)=>(
                                
                                <div className="field-radiobutton col-6">
                                <RadioButton inputId={item.idbrand} name="category" value={item.idbrand} onChange={onBrandChange} checked={product.id_brand === item.idbrand} />
                                <label htmlFor={item.idbrand}>{item.name}</label>
                            </div>
                            )) }
                            </div>
                        </div>

                        {/* <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="price">Price</label>
                                <InputNumber id="price" value={product.price} onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency" currency="USD" locale="en-US" />
                            </div>
                            <div className="field col">
                                <label htmlFor="quantity">Quantity</label>
                                <InputNumber id="quantity" value={product.quantity} onValueChange={(e) => onInputNumberChange(e, 'quantity')} integeronly />
                            </div>
                        </div> */}
                    </Dialog>

                    <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {product && <span>Are you sure you want to delete <b>{product.name}</b>?</span>}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteProductsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {product && <span>Are you sure you want to delete the selected products?</span>}
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