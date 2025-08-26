import './../styles/dashboard.css'
import './../styles/add_prods.css'

import './../utils/util.css'
import Nav from './nav';
import home from '/home.png'
import { Link } from 'react-router';
import { useState , createRef, useEffect} from 'react';
import addProductStore from '../store/inventory/addProduct.store';
import PopUp from './popUp';
import sweetalertPop from '../class/sweetalert';
import authStore from '../store/auth/auth.store';
import Auth from './auth';
function AddProducts(){


    const name = createRef()
    const des = createRef()
    const sku = createRef()
    const stock = createRef()
    const sizes = createRef()
    const colors = createRef()
    const price = createRef()
    const tags = createRef()
    const catagory = createRef()
    const discount = createRef()
    const brand = createRef()
    const images = createRef()
    const {addProductsToDB, isLoadingProduct} = addProductStore()
    const Pop = new sweetalertPop()

    const {AuthNeeded, checkAuth} = authStore()
    useEffect(el=>{
        checkAuth()
    }, [])

    function addProductFun(el){
        el.preventDefault()
        console.log(tags.current.value)

        if(name.current.value.trim()==''){
            Pop.handleError("Product name is empty", "Please provide a valid product name")
            return;
        }
        if(des.current.value.trim()==''){
            Pop.handleError("Product description is empty", "Please provide a valid product description")
            return;
        }
        if(sku.current.value.trim()==''){
            Pop.handleError("Product SKU code is empty", "Please provide a valid SKU code description")
            return;
        }
        if(stock.current.value.trim()=='' || stock.current.value.trim()=='0'){
            Pop.handleError("Product inventory is empty", "Please provide a valid product inventory")
            return;
        }
        if(price.current.value.trim()=='' || price.current.value.trim()=='0'){
            Pop.handleError("Product price is 0", "Please provide a valid product price")
            return;
        }
        if(catagory.current.value.trim()=='' ){
            Pop.handleError("Product catagory is empty", "Please provide a valid product catagory")
            return;
        }
        if(brand.current.value.trim()=='' ){
            Pop.handleError("Product brand is empty", "Please provide a valid product brand")
            return;
        }
        if(tags.current.value.split(",").length==0 || tags.current.value.trim()==''){
            Pop.handleError("Product tags is empty", "Please provide a valid product tags")
            return;
        }
        if(colors.current.value.split(",").length==0 || colors.current.value.trim()==''){
            Pop.handleError("Product colors is empty", "Please provide a valid product colors")
            return;
        }
        if(sizes.current.value.split(",").length==0 || sizes.current.value.trim()==''){
            Pop.handleError("Product sizes is empty", "Please provide a valid product sizes")
            return;
        }
        

        addProductsToDB({
            name : name.current.value,
            des : des.current.value,
            sku : sku.current.value,
            stock : stock.current.value,
            price : price.current.value,
            catagory : catagory.current.value,
            discount : discount.current.value.trim() == '' ? 0 : discount.current.value,
            brand : brand.current.value,
            tags : tags.current.value.split(","),
            colors : colors.current.value.split(","),
            sizes : sizes.current.value.split(","),
            images : [],
        })
        name.current.value = ''
        des.current.value = ''
        sku.current.value = ''
        name.current.value = ''
        stock.current.value = ''
        price.current.value = ''
        catagory.current.value = ''
        discount.current.value = ''
        brand.current.value = ''
        tags.current.value = ''
        colors.current.value = ''
        sizes.current.value = ''
        
    }

    return(
        <div className='products flex flex-dir gap16'>

            {AuthNeeded &&
                <Auth/>
            }

            {isLoadingProduct &&
                <PopUp  msg="Please wait, we are adding your product." />
            }

            <h2 className='resHead'>Add products</h2>
            <form className='prodAddsmall grid grid-2-col gap16'>
                <div className="flex flex-dir gap8">
                    <label class="label" for="productName">Product Name</label>
                    <input ref={name} placeholder='product'  class="inp" type="text" id="productName" name="productName" />
                </div>


                <div className="flex flex-dir gap8">
                    <label class="label" for="productImages">Product Images</label>
                    <input ref={images} placeholder='product' class="inp" type="file" id="productImages" name="productImages" multiple />
                </div>

                <div className="flex flex-dir gap8">
                    <label class="label" for="productSku">Product SKU Code</label>
                    <input ref={sku} placeholder='product' class="inp" type="text" id="productSku" name="productSku" />
                </div>

                <div className="flex flex-dir gap8">
                    <label class="label" for="productInventory">Product Inventory</label>
                    <input ref={stock} placeholder='product' class="inp" type="number" id="productInventory" name="productInventory" />
                </div>

                <div className="flex flex-dir gap8">
                    <label class="label" for="productSizes">Product Sizes</label>
                    <input ref={sizes} placeholder='product' class="inp" type="text" id="productSizes" name="productSizes" placeholder="e.g. S, M, L, XL" />
                </div>

                <div className="flex flex-dir gap8">
                    <label class="label" for="productColors">Product Colors</label>
                    <input ref={colors} placeholder='product' class="inp" type="text" id="productColors" name="productColors" placeholder="e.g. Red, Blue" />
                </div>

                <div className="flex flex-dir gap8">
                    <label class="label" for="productPrice">Product Price</label>
                    <input ref={price} placeholder='product' class="inp" type="number" id="productPrice" name="productPrice" />
                </div>

                <div className="flex flex-dir gap8">
                    <label class="label" for="productTags">Product Tags</label>
                    <input ref={tags} placeholder='product' class="inp" type="text" id="productTags" name="productTags" placeholder="comma separated" />
                </div>

                <div className="flex flex-dir gap8">
                    <label class="label" for="productCategory">Product Category</label>
                    <select ref={catagory} class="inp" id="productCategory" name="productCategory">
                        <option value="">Select Category</option>
                        <option value="clothing">Clothing</option>
                        <option value="electronics">Electronics</option>
                        <option value="home">Home & Living</option>
                    </select>
                </div>

                <div className="flex flex-dir gap8">
                    <label class="label" for="discount">Discount %</label>
                    <input ref={discount} placeholder='product' class="inp" type="number" id="discount" name="discount" />
                </div>

                <div className="description_big flex flex-dir gap8">
                    <label class="label" for="productDescription">Product Description</label>
                    <textarea ref={des} class="inp" id="productDescription" name="productDescription"></textarea>
                </div>
                <div className="flex flex-dir gap8">
                    <label class="label" for="productBrand">Product Brand</label>
                    <input ref={brand} placeholder='product' class="inp" type="text" id="productBrand" name="productBrand" />
                </div>

                <div className="flex flex-dir gap8">
                    <label class="label" for="productBrand">Add product</label>
                    <button onClick={addProductFun} type="submit" class="inp standardBtn">Submit</button>
                </div>
                </form>

        </div>
    )
}

export default AddProducts