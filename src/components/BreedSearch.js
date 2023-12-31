//  FETCH BREEDS AND SEARCH
//
//  Copyright Jori Hiltunen 2023
//

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import LOCALIZATION from '../constants/en_default'
import GLOBALS from '../constants/globals'

/**
 * Add search form and functionality:
 * Fetch breeds and sub-breeds in an array. Search that array for input.
 * @param {boolean} resetToggle         Reset value for callback toggling
 * @param {function} setResetToggle     Reset toggle callback
 * @param {function} setSearchOutput    Search output callback
 * @returns {React.Component}           Text-input for search and reset-button inside a <form>
 */

function BreedSearch({ resetToggle, setResetToggle, setSearchOutput }) {

    const [searchInput, setSearchInput] = useState('')
    const [breeds, setBreeds] = useState([])

    useEffect(() => fetchBreeds(), [])
    useEffect(() => { setSearchInput('') }, [resetToggle])

    // Fetch breedlist with axios
    const fetchBreeds = () => {
        axios.get(`${GLOBALS.DOG_API}breeds/list/all`)
            .then((res) => {
                setBreeds(res.data.message)
            })
            .catch(error => console.error(`${LOCALIZATION.BREED_SEARCH.FETCH_ERROR} ${error}`))
    }

    // Check input for real changes
    const handleInput = (e) => {
        const textInput = e.target.value.toLowerCase().replace(/[^a-z]/, '')

        setSearchInput(textInput)
        textInput !== searchInput && handleSearch(textInput)
    }

    // Match search to breed list
    const handleSearch = (textInput) => {
        let breedsAndSubBreeds = Object.keys(breeds).map(breed => [breed.toLowerCase(), []])
        let results = []

        for (const [breed, subBreeds] of Object.entries(breeds)) {
            if (subBreeds.length) {
                const subBreed = subBreeds.map((subBreed) => [breed, subBreed.toLowerCase()])
                breedsAndSubBreeds = breedsAndSubBreeds.concat(subBreed)
            }
        }

        for (const breedArray of breedsAndSubBreeds) {
            if (textInput) {
                for (const breedName of breedArray) breedName.includes(textInput) && results.push(breedArray)
            }
        }

        setSearchOutput(results.sort())
    }

    return (
        <form className='' onSubmit={(e) => e.preventDefault()}>
            <div className="row">
                <div className="col">
                    <label className='row fs-3 fw-bold' htmlFor='breed-search'>
                        Search:
                    </label>
                </div>
                <div className="col fs-3 text-end">
                    [
                    <a
                        className='text-decoration-underline'
                        type="button"
                        onClick={() => setResetToggle(!resetToggle)}>
                        reset
                    </a>
                    ]
                </div>
            </div>
            <div className="row">
                <div className="col pe-0">
                    <input
                        id="breed-search"
                        className='row'
                        type='text'
                        value={searchInput}
                        onChange={handleInput}
                    />
                </div>
            </div>
        </form>
    )
}

export default BreedSearch;