import Input from 'components/Input/Input'
import useLocalStorage from 'hooks/useLocalStorage'
import React, { useCallback, useEffect, useId, useRef, useState } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;
`
const HistorySearchWrapper = styled.div`
  width: 100%;
  height: 10rem;
  position: absolute;
  z-index: 10;
  top: 75px;
  border: 1px solid #ced4da;
  border-radius: 0.375rem;
  background-color: #fff;
  overflow-y: scroll;
  overflow-x: hidden;
`
const HistorySearchItemWrapper = styled.div`
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: default;
  &:hover {
    background-color: #eee;
  }
  .fa-xmark {
    position: relative;
    z-index: 12;
    cursor: pointer;
  }
`

const Dropdown = () => {
  const { getItem, setItem } = useLocalStorage()
  const isSearchArrayInLocalStorage = !!getItem('search')
  const historyItemsLength = getItem('search')?.length
  const [searchText, setSearchText] = useState<string>('')
  const [searchArray, setSearchArray] = useState<string[]>(
    isSearchArrayInLocalStorage ? getItem('search') : []
  )
  const [focus, setFocus] = useState<boolean>(false)
  const [showSearch, setShowSearch] = useState<boolean>(false)
  const id = useId()
  const ref = useRef(null)
  const onHandleSearchProduct = (e: any) => {
    setSearchText(e.target.value)
  }
  const onHandleFocusSearchProduct = () => {
    setFocus(true)
  }
  const onHandleBlurSearchProduct = () => {
    setFocus(false)
  }

  useEffect(() => {
    setItem('search', searchArray)
  }, [searchArray])

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !(ref.current as any).contains(event.target)) {
        setShowSearch(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const onHandlePressEnter = (e: any) => {
    if (e.key === 'Enter') {
      setSearchText('')
      setSearchArray((pre) => {
        const cloneArr = [...pre]
        const filterItems = cloneArr.filter((a) => a !== searchText)
        return [searchText, ...filterItems]
      })
      setShowSearch(false)
    }
  }

  const onHandleChooseItem = (item: string) => {
    setSearchText(item)
    setShowSearch(false)
  }
  const onMouseOver = () => {
    setShowSearch(true)
  }
  const onDeleteHistoryItem = (e: any, item: string) => {
    e.stopPropagation()
    if (isSearchArrayInLocalStorage) {
      const storageItems = getItem('search')
      const newArray = storageItems.filter((i: string) => i !== item)
      if (newArray.length === 0) {
        setShowSearch(false)
      }
      setSearchArray(newArray)
    }
  }
  return (
    <Wrapper ref={ref}>
      <Input
        type='text'
        id='searchProduct'
        label='Search'
        onChange={onHandleSearchProduct}
        onFocus={onHandleFocusSearchProduct}
        onBlur={onHandleBlurSearchProduct}
        onKeyPress={onHandlePressEnter}
        value={searchText}
      />
      {((focus && !searchText && historyItemsLength > 0) ||
        (focus && searchText && historyItemsLength > 0) ||
        (!focus && showSearch) ||
        (!focus && showSearch && !searchText)) && (
        <HistorySearchWrapper>
          {searchArray.map((sa) => (
            <HistorySearchItemWrapper
              key={`${id}-${sa}`}
              onClick={() => onHandleChooseItem(sa)}
              onMouseOver={onMouseOver}
            >
              <div>
                <i className='fa-regular fa-clock me-2'></i>
                {sa}
              </div>
              <i
                className='fa-solid fa-xmark'
                onClick={(e) => onDeleteHistoryItem(e, sa)}
              ></i>
            </HistorySearchItemWrapper>
          ))}
        </HistorySearchWrapper>
      )}
    </Wrapper>
  )
}

export default Dropdown
