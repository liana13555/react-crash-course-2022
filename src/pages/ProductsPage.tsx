import React from 'react';
import {Product} from '../components/Product'
import { useProducts } from '../hooks/products'
import {Loader} from '../components/Loader';
import { ErrorMessage } from '../components/ErrorMessage';
import { Modal } from '../components/Modal';
import { CreateProduct } from '../components/CreateProduct';
import { useContext, useState } from 'react';
import { IProduct } from '../models';
import {ModalContext} from '../context/ModalContext'

export function ProductPage() { 
  const { products, loading, error, addProduct } = useProducts()
  // const [modal, setModal] = useState(true) // changed on Context
  const {modal, open, close} = useContext(ModalContext)

  const createHandler = (product: IProduct) => {
    // setModal(false) // changed on Context
    close()
    addProduct(product)
  }

  return (
    <div className='container mx-auto max-w-2xl pt-5'>
      {loading && <Loader />}
      {error && <ErrorMessage error={error} />}
      {products.map(product => <Product product={product} key={product.id} />)}

      {modal && <Modal title='Create new product'
        // onClose={() => setModal(false)} // changed on Context
       onClose={close}
      >
        <CreateProduct onCreate ={createHandler} />
      </Modal>}

      <button className='fixed bottom-5 right-5 rounded-full bg-red-700 text-white text-2xl px-4 py-2'
        // onClick={() => setModal(true)} // changed on Context
        onClick={open}      
      >+</button>
    </div>
  )
    
}