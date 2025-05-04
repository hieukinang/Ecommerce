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
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-[80px] border-t'>
      {/* Filter Options (Still on the left) */}
      <div className='w-full sm:w-60'>
        <p
          onClick={() => setShowFilter(!showFilter)}
          className='my-2 text-xl flex items-center cursor-pointer gap-2'
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`}
            src={assets.dropdown_icon}
            alt=''
          />
        </p>

        {/* Category Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'
            } sm:block`}
        >
          <p className='mb-3 text-sm font-medium'>PRODUCT CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            {['Lipstick', 'Perfume', 'Makeup', 'Skincare-Haircare'].map(
              (cat, index) => (
                <p key={index} className='flex gap-2'>
                  <input
                    className='w-3'
                    type='checkbox'
                    value={cat}
                    onChange={toggleCategory}
                  />
                  {cat}
                </p>
              )
            )}
          </div>
        </div>

        {/* Brand Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'
            } sm:block`}
        >
          <p className='mb-3 text-sm font-medium'>BRAND</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            {[
              'Dior', 'YSL', 'Christian Dior', 'MAC', '3CE', 'Chanel', 'Lancome', 'Tom Ford'
            ].map((brand, index) => (
              <p key={index} className='flex gap-2'>
                <input
                  className='w-3'
                  type='checkbox'
                  value={brand}
                  onChange={toggleSubCategory}
                />
                {brand}
              </p>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'
            } sm:block`}
        >
          <p className='mb-3 text-sm font-medium'>PRICE RANGE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            {[
              'Under 10$', '10 - 40 $', '40 - 80$', '80 - 100$', '100 - 150$', 'Above 150$',
            ].map((range, index) => (
              <p key={index} className='flex gap-2'>
                <input
                  className='w-3'
                  type='checkbox'
                  value={range}
                  onChange={toggleSubCategory}
                />
                {range}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className='flex-1'>
        {/* Search Bar (Moved here, above "All Collections") */}
        {showSearch && (
          <div className='flex justify-center mb-4'>
            <div className='relative w-[500px]'> {/* Làm ô tìm kiếm dài hơn */}
              <input
                type='text'
                placeholder='Search products...'
                value={search}
                onChange={handleInputChange}
                className='border-2 border-gray-300 text-sm px-4 py-3 w-full rounded-3xl text-center' // Căn giữa chữ
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
          </div>
        )}

        {/* Title: All Collections */}
        <div className='flex justify-between text-base sm:text-2xl mb-4 relative'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />

          {/* Product Sort */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className='border-2 border-gray-300 text-sm px-2'
          >
            <option value='relavent'>Sort by: Relavent</option>
            <option value='high-low'>Sort by: High to Low</option>
            <option value='low-high'>Sort by: Low to High</option>
          </select>
        </div>

        {/* Map products */}
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
  )
}

export default Collection
