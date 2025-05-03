import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'

const Collection = () => {
  const { products, search, setSearch, showSearch } = useContext(ShopContext)

  const [showFilter, setShowFilter] = useState(false)
  const [filterProducts, setFilterProducts] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState('relavent')
  const [suggestedProducts, setSuggestedProducts] = useState([])

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value))
    } else {
      setCategory((prev) => [...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value))
    } else {
      setSubCategory((prev) => [...prev, e.target.value])
    }
  }

  const applyFilter = () => {
    let productsCopy = products.slice()

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      )
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      )
    }

    setFilterProducts(productsCopy)
  }

  const sortProduct = () => {
    let fbCopy = filterProducts.slice()

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fbCopy.sort((a, b) => a.price - b.price))
        break
      case 'high-low':
        setFilterProducts(fbCopy.sort((a, b) => b.price - a.price))
        break
      default:
        applyFilter()
        break
    }
  }

  useEffect(() => {
    applyFilter()
  }, [category, subCategory, search, showSearch, products])

  useEffect(() => {
    sortProduct()
  }, [sortType])

  const handleInputChange = (e) => {
    const inputValue = e.target.value
    setSearch(inputValue)

    const inputLower = inputValue.toLowerCase()
    if (inputLower.length > 0) {
      const suggestions = products.filter((item) =>
        item.name.toLowerCase().includes(inputLower)
      )
      setSuggestedProducts(suggestions.slice(0, 5)) // lấy tối đa 5 gợi ý
    } else {
      setSuggestedProducts([])
    }
  }

  const handleSuggestionClick = (name) => {
    setSearch(name)
    setSuggestedProducts([])
    setTimeout(() => {
      applyFilter()
    }, 0)
  }

  return (
    <div className='pt-24 px-4 md:px-10 lg:px-20'>
      {/* SEARCH BAR */}
      {showSearch && (
        <div className='mb-4 w-full max-w-md mx-auto relative'>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-full px-4 py-2 w-full text-sm"
          />
          {suggestedProducts.length > 0 && (
            <div className='absolute z-10 bg-white border border-gray-300 rounded-md mt-1 w-full shadow-md'>
              {suggestedProducts.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSuggestionClick(item.name)}
                  className='px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm'
                >
                  {item.name}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* FILTER + TITLE + SORT */}
      <div className='flex flex-col sm:flex-row sm:justify-between items-center gap-4 mb-6'>
        <p
          onClick={() => setShowFilter(!showFilter)}
          className='text-xl font-medium cursor-pointer flex items-center gap-2'
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`}
            src={assets.dropdown_icon}
            alt='dropdown'
          />
        </p>

        <div className='sm:ml-12 text-4xl w-full sm:w-auto text-center sm:text-left'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
        </div>

        <select
          onChange={(e) => setSortType(e.target.value)}
          className='border border-gray-300 rounded-md text-sm px-3 py-1'
        >
          <option value='relavent'>Sort by: Relevant</option>
          <option value='high-low'>Sort by: High to Low</option>
          <option value='low-high'>Sort by: Low to High</option>
        </select>
      </div>

      {/* BODY: FILTERS + PRODUCT LIST */}
      <div className='flex flex-col sm:flex-row gap-6'>
        {/* Filter Options */}
        <div className='min-w-60'>
          <div className={`${showFilter ? '' : 'hidden'} sm:block`}>
            {/* Category Filter */}
            <div className='border border-gray-300 pl-5 py-3 mb-5'>
              <p className='mb-3 text-sm font-medium'>PRODUCT CATEGORIES</p>
              <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                {['Lipstick', 'Perfume', 'Makeup', 'Skincare-Haircare'].map(
                  (cat, index) => (
                    <label key={index} className='flex gap-2'>
                      <input
                        className='w-3'
                        type='checkbox'
                        value={cat}
                        onChange={toggleCategory}
                      />
                      {cat}
                    </label>
                  )
                )}
              </div>
            </div>

            {/* Brand Filter */}
            <div className='border border-gray-300 pl-5 py-3 mb-5'>
              <p className='mb-3 text-sm font-medium'>BRAND</p>
              <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                {[
                  'Dior',
                  'YSL',
                  'Christian Dior',
                  'MAC',
                  '3CE',
                  'Chanel',
                  'Lancome',
                  'Tom Ford',
                ].map((brand, index) => (
                  <label key={index} className='flex gap-2'>
                    <input
                      className='w-3'
                      type='checkbox'
                      value={brand}
                      onChange={toggleSubCategory}
                    />
                    {brand}
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className='border border-gray-300 pl-5 py-3'>
              <p className='mb-3 text-sm font-medium'>PRICE RANGE</p>
              <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                {[
                  'Under 4.35 USD',
                  '4.35 USD - 8.70 USD',
                  '8.70 USD - 13.04 USD',
                  '13.04 USD - 21.74 USD',
                  '21.74 USD - 43.48 USD',
                  'Above 43.48 USD',
                ].map((range, index) => (
                  <label key={index} className='flex gap-2'>
                    <input
                      className='w-3'
                      type='checkbox'
                      value={range}
                      onChange={toggleSubCategory}
                    />
                    {range}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product List */}
        <div className='flex-1'>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {filterProducts.map((item, index) => (
              <ProductItem
                key={index}
                name={item.name}
                id={item._id}
                price={item.price}
                image={item.image}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Collection
