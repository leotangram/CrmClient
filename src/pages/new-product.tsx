import Layout from '@/components/Layout'

const NewProduct = () => (
  <Layout>
    <h1 className="text-2xl text-gray-800 font-light">Crear nuevo producto</h1>
    <div className="flex justify-center mt-5">
      <div className="w-full max-w-lg">
        <form
          className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
          // onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Nombre
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              // onBlur={handleBlur}
              // onChange={handleChange}
              placeholder="Nombre producto"
              type="text"
              // value={name}
            />
            {/* {touched.name && errors.name && (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{errors.name}</p>
              </div>
            )} */}
          </div>
          <div className="mb-4">
            <label
              htmlFor="existence"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Cantidad disponible
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="existence"
              // onBlur={handleBlur}
              // onChange={handleChange}
              placeholder="Cantidad disponible"
              type="number"
              // value={name}
            />
            {/* {touched.name && errors.name && (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{errors.name}</p>
              </div>
            )} */}
          </div>
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Precio
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="price"
              // onBlur={handleBlur}
              // onChange={handleChange}
              placeholder="Precio producto"
              type="number"
              // value={name}
            />
            {/* {touched.name && errors.name && (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{errors.name}</p>
              </div>
            )} */}
          </div>
          <button
            className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
            type="submit"
          >
            Agregar nuevo producto
          </button>
        </form>
      </div>
    </div>
  </Layout>
)

export default NewProduct
